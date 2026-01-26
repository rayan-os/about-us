"use client";

import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  BackgroundVariant,
  ReactFlowProvider,
  getSmoothStepPath,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "motion/react";
import { toPng, toSvg } from "html-to-image";
import { Image, Copy, Check } from "lucide-react";

type CompactAgentNodeData = {
  name: string;
  role: string;
  avatarSrc: string;
  incomingHandlePositions?: number[];
  outgoingHandlePositions?: number[];
  incomingHandleRefs?: RefObject<HTMLDivElement>[];
  outgoingHandleRefs?: RefObject<HTMLDivElement>[];
};

type IconNodeData = {
  label: string;
  incomingHandlePositions?: number[];
  outgoingHandlePositions?: number[];
  incomingHandleRefs?: RefObject<HTMLDivElement>[];
  outgoingHandleRefs?: RefObject<HTMLDivElement>[];
  topHandleRef?: RefObject<HTMLDivElement>;
  bottomHandleRef?: RefObject<HTMLDivElement>;
  topOutHandleRef?: RefObject<HTMLDivElement>;
  bottomOutHandleRef?: RefObject<HTMLDivElement>;
};

type BeamPath = {
  id: string;
  d: string;
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const FolderCheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    <path d="m9 13 2 2 4-4" />
  </svg>
);

function CompactAgentNode({ data }: NodeProps) {
  const {
    name,
    role,
    avatarSrc,
    incomingHandlePositions,
    outgoingHandlePositions,
    incomingHandleRefs,
    outgoingHandleRefs,
  } = data as CompactAgentNodeData;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {incomingHandlePositions?.length ? (
        incomingHandlePositions.map((pos, idx) => (
          <Handle
            key={`agent-in-${idx}`}
            id={`in-${idx}`}
            type="target"
            position={Position.Left}
            style={{ top: `${pos}%` }}
            className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
          />
        ))
      ) : (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
        />
      )}
      {incomingHandleRefs?.length
        ? incomingHandleRefs.map((ref, idx) => (
            <div
              key={`agent-in-ref-${idx}`}
              ref={ref}
              className="absolute h-2 w-2 pointer-events-none opacity-0"
              style={{
                top: `${incomingHandlePositions?.[idx] ?? 50}%`,
                left: 0,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))
        : null}
      {outgoingHandlePositions?.length ? (
        outgoingHandlePositions.map((pos, idx) => (
          <Handle
            key={`agent-out-${idx}`}
            id={`out-${idx}`}
            type="source"
            position={Position.Right}
            style={{ top: `${pos}%` }}
            className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
          />
        ))
      ) : (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
        />
      )}
      {outgoingHandleRefs?.length
        ? outgoingHandleRefs.map((ref, idx) => (
            <div
              key={`agent-out-ref-${idx}`}
              ref={ref}
              className="absolute h-2 w-2 pointer-events-none opacity-0"
              style={{
                top: `${outgoingHandlePositions?.[idx] ?? 50}%`,
                right: 0,
                transform: "translate(50%, -50%)",
              }}
            />
          ))
        : null}

      <div
        className="absolute inset-0 flex items-center gap-3 border border-white/10 bg-[#111111]"
        style={{
          boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
          borderRadius: "6px",
          padding: "0 12px",
        }}
      >
        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
          <img src={avatarSrc} alt={name} className="h-full w-full object-cover" crossOrigin="anonymous" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-xs font-medium text-white/90 whitespace-nowrap">{name}</div>
          <div
            style={{
              color: "#FF6A00",
              fontSize: "9px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontFamily: '"IBM Plex Mono", monospace',
              marginTop: "2px",
              whiteSpace: "nowrap",
            }}
          >
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}

function IconNode({ data }: NodeProps) {
  const {
    label,
    incomingHandlePositions,
    incomingHandleRefs,
    topHandleRef,
    bottomHandleRef,
  } = data as IconNodeData;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Top incoming handle */}
      <Handle
        id="in-top"
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
      {topHandleRef && (
        <div
          ref={topHandleRef}
          className="absolute h-2 w-2 pointer-events-none opacity-0"
          style={{
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      
      {/* Bottom incoming handle */}
      <Handle
        id="in-bottom"
        type="target"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
      {bottomHandleRef && (
        <div
          ref={bottomHandleRef}
          className="absolute h-2 w-2 pointer-events-none opacity-0"
          style={{
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
        />
      )}

      {/* Left incoming handles */}
      {incomingHandlePositions?.length ? (
        incomingHandlePositions.map((pos, idx) => (
          <Handle
            key={`icon-in-${idx}`}
            id={`in-${idx}`}
            type="target"
            position={Position.Left}
            style={{ top: `${pos}%` }}
            className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
          />
        ))
      ) : (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
        />
      )}
      {incomingHandleRefs?.length
        ? incomingHandleRefs.map((ref, idx) => (
            <div
              key={`icon-in-ref-${idx}`}
              ref={ref}
              className="absolute h-2 w-2 pointer-events-none opacity-0"
              style={{
                top: `${incomingHandlePositions?.[idx] ?? 50}%`,
                left: 0,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))
        : null}

      <div 
        className="absolute inset-0 flex items-center gap-3 border border-white/10 bg-[#141414] text-white/70"
        style={{ borderRadius: "6px", padding: "0 12px" }}
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#0f0f0f]">
          <FolderCheckIcon className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <span className="text-[11px] text-white/70 whitespace-nowrap">{label}</span>
      </div>
    </div>
  );
}

function StartNode({ data }: NodeProps) {
  const { label, outgoingHandlePositions, outgoingHandleRefs, topOutHandleRef, bottomOutHandleRef } =
    data as IconNodeData;

  return (
    <div className="relative h-full w-full">
      {/* Top outgoing handle */}
      <Handle
        id="out-top"
        type="source"
        position={Position.Top}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
      {topOutHandleRef && (
        <div
          ref={topOutHandleRef}
          className="absolute h-2 w-2 pointer-events-none opacity-0"
          style={{
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      
      {/* Bottom outgoing handle */}
      <Handle
        id="out-bottom"
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
      {bottomOutHandleRef && (
        <div
          ref={bottomOutHandleRef}
          className="absolute h-2 w-2 pointer-events-none opacity-0"
          style={{
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
        />
      )}

      {/* Right outgoing handles */}
      {outgoingHandlePositions?.length ? (
        outgoingHandlePositions.map((pos, idx) => (
          <Handle
            key={`start-out-${idx}`}
            id={`out-${idx}`}
            type="source"
            position={Position.Right}
            style={{ top: `${pos}%`, right: -2, transform: "translate(0, -50%)" }}
            className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
          />
        ))
      ) : (
        <Handle
          type="source"
          position={Position.Right}
          style={{ right: -2, transform: "translate(0, -50%)" }}
          className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
        />
      )}
      {outgoingHandleRefs?.length
        ? outgoingHandleRefs.map((ref, idx) => (
            <div
              key={`start-out-ref-${idx}`}
              ref={ref}
              className="absolute h-2 w-2 pointer-events-none opacity-0"
              style={{
                top: `${outgoingHandlePositions?.[idx] ?? 50}%`,
                right: 0,
                transform: "translate(50%, -50%)",
              }}
            />
          ))
        : null}
      <div 
        className="flex h-full w-full items-center gap-3 border border-white/10 bg-[#141414] text-white/70"
        style={{ borderRadius: "6px", padding: "0 12px" }}
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#0f0f0f]">
          <UserIcon className="h-3.5 w-3.5 text-white/70" />
        </div>
        <span className="text-[11px] text-white/70 whitespace-nowrap">{label}</span>
      </div>
    </div>
  );
}

function PassageAgentsCompactDiagramInner() {
  const handleRefs = useMemo(
    () => ({
      talent: {
        out: [
          createRef<HTMLDivElement>(),
          createRef<HTMLDivElement>(),
        ],
        outTop: createRef<HTMLDivElement>(),
        outBottom: createRef<HTMLDivElement>(),
      },
      mark: {
        in: [createRef<HTMLDivElement>()],
        out: [createRef<HTMLDivElement>()],
      },
      jackie: {
        in: [createRef<HTMLDivElement>()],
        out: [createRef<HTMLDivElement>()],
      },
      david: {
        in: [createRef<HTMLDivElement>()],
        out: [createRef<HTMLDivElement>()],
      },
      ella: {
        in: [createRef<HTMLDivElement>()],
        out: [createRef<HTMLDivElement>()],
      },
      submit: {
        in: [
          createRef<HTMLDivElement>(),
          createRef<HTMLDivElement>(),
        ],
        inTop: createRef<HTMLDivElement>(),
        inBottom: createRef<HTMLDivElement>(),
      },
    }),
    []
  );

  // Compact grid layout positions - using top/bottom handles to reduce height
  const initialNodes = useMemo<Node[]>(
    () => [
      {
        id: "talent",
        type: "start",
        position: { x: 0, y: 107 },
        data: {
          label: "Talent",
          outgoingHandlePositions: [33, 67],
          outgoingHandleRefs: handleRefs.talent.out,
          topOutHandleRef: handleRefs.talent.outTop,
          bottomOutHandleRef: handleRefs.talent.outBottom,
        },
        style: { width: 120, height: 56 },
      },
      {
        id: "mark",
        type: "agent",
        position: { x: 170, y: 0 },
        data: {
          name: "Mark",
          role: "AI support",
          avatarSrc: "/assets_ai/Mark.png",
          incomingHandlePositions: [50],
          outgoingHandlePositions: [50],
          incomingHandleRefs: handleRefs.mark.in,
          outgoingHandleRefs: handleRefs.mark.out,
        },
        style: { width: 155, height: 56 },
      },
      {
        id: "david",
        type: "agent",
        position: { x: 170, y: 70 },
        data: {
          name: "David",
          role: "AI processor",
          avatarSrc: "/assets_ai/David.png",
          incomingHandlePositions: [50],
          outgoingHandlePositions: [50],
          incomingHandleRefs: handleRefs.david.in,
          outgoingHandleRefs: handleRefs.david.out,
        },
        style: { width: 155, height: 56 },
      },
      {
        id: "jackie",
        type: "agent",
        position: { x: 170, y: 140 },
        data: {
          name: "Jackie",
          role: "AI counselor",
          avatarSrc: "/assets_ai/Jackie.png",
          incomingHandlePositions: [50],
          outgoingHandlePositions: [50],
          incomingHandleRefs: handleRefs.jackie.in,
          outgoingHandleRefs: handleRefs.jackie.out,
        },
        style: { width: 155, height: 56 },
      },
      {
        id: "ella",
        type: "agent",
        position: { x: 170, y: 210 },
        data: {
          name: "Ella",
          role: "AI interviewer",
          avatarSrc: "/assets_ai/Ella.png",
          incomingHandlePositions: [50],
          outgoingHandlePositions: [50],
          incomingHandleRefs: handleRefs.ella.in,
          outgoingHandleRefs: handleRefs.ella.out,
        },
        style: { width: 155, height: 56 },
      },
      {
        id: "submit",
        type: "icon",
        position: { x: 376, y: 105 },
        data: {
          label: "Submit",
          incomingHandlePositions: [33, 67],
          incomingHandleRefs: handleRefs.submit.in,
          topHandleRef: handleRefs.submit.inTop,
          bottomHandleRef: handleRefs.submit.inBottom,
        },
        style: { width: 120, height: 56 },
      },
    ],
    [handleRefs]
  );

  const initialEdges = useMemo<Edge[]>(
    () => [
      // Talent → Mark (top handle)
      {
        id: "e-talent-mark",
        source: "talent",
        target: "mark",
        sourceHandle: "out-top",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      // Talent → David (right side handle)
      {
        id: "e-talent-david",
        source: "talent",
        target: "david",
        sourceHandle: "out-0",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      // Talent → Jackie (right side handle)
      {
        id: "e-talent-jackie",
        source: "talent",
        target: "jackie",
        sourceHandle: "out-1",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      // Talent → Ella (bottom handle)
      {
        id: "e-talent-ella",
        source: "talent",
        target: "ella",
        sourceHandle: "out-bottom",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      // Mark → Submit (top handle)
      {
        id: "e-mark-submit",
        source: "mark",
        target: "submit",
        sourceHandle: "out-0",
        targetHandle: "in-top",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      // David → Submit (left side handle)
      {
        id: "e-david-submit",
        source: "david",
        target: "submit",
        sourceHandle: "out-0",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      // Jackie → Submit (left side handle)
      {
        id: "e-jackie-submit",
        source: "jackie",
        target: "submit",
        sourceHandle: "out-0",
        targetHandle: "in-1",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      // Ella → Submit (bottom handle)
      {
        id: "e-ella-submit",
        source: "ella",
        target: "submit",
        sourceHandle: "out-0",
        targetHandle: "in-bottom",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
    ],
    []
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [copiedPng, setCopiedPng] = useState(false);
  const reactFlowRef = useRef<HTMLDivElement>(null);

  const nodeTypes = useMemo(
    () => ({
      agent: CompactAgentNode,
      icon: IconNode,
      start: StartNode,
    }),
    []
  );

  const resolveHandleRef = useCallback(
    (nodeId: string, handleId: string | null | undefined, direction: "in" | "out") => {
      const nodeHandles = handleRefs[nodeId as keyof typeof handleRefs];
      if (!nodeHandles) return null;

      // Handle top/bottom special cases
      if (handleId === "out-top" && "outTop" in nodeHandles) {
        return nodeHandles.outTop as RefObject<HTMLDivElement>;
      }
      if (handleId === "out-bottom" && "outBottom" in nodeHandles) {
        return nodeHandles.outBottom as RefObject<HTMLDivElement>;
      }
      if (handleId === "in-top" && "inTop" in nodeHandles) {
        return nodeHandles.inTop as RefObject<HTMLDivElement>;
      }
      if (handleId === "in-bottom" && "inBottom" in nodeHandles) {
        return nodeHandles.inBottom as RefObject<HTMLDivElement>;
      }

      // Check if the direction property exists on this node's handles
      if (!(direction in nodeHandles)) return null;
      const refs = (nodeHandles as Record<string, unknown>)[direction];
      if (!refs || !Array.isArray(refs) || !refs.length) return null;

      const index = handleId ? Number(handleId.split("-")[1] ?? 0) : 0;
      return refs[index] ?? refs[0];
    },
    [handleRefs]
  );

  const [beamPaths, setBeamPaths] = useState<BeamPath[]>([]);
  const [beamDimensions, setBeamDimensions] = useState({ width: 0, height: 0 });

  const updatePaths = useCallback(() => {
    if (!reactFlowRef.current) return;

    const containerRect = reactFlowRef.current.getBoundingClientRect();
    setBeamDimensions({ width: containerRect.width, height: containerRect.height });

    const nextPaths = edges
      .map((edge) => {
        const fromRef = resolveHandleRef(edge.source, edge.sourceHandle, "out");
        const toRef = resolveHandleRef(edge.target, edge.targetHandle, "in");

        if (!fromRef?.current || !toRef?.current) return null;

        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const sourceX = rectA.left - containerRect.left + rectA.width / 2;
        const sourceY = rectA.top - containerRect.top + rectA.height / 2;
        const targetX = rectB.left - containerRect.left + rectB.width / 2;
        const targetY = rectB.top - containerRect.top + rectB.height / 2;

        // Determine source/target positions based on handle type
        let sourcePosition = Position.Right;
        let targetPosition = Position.Left;
        
        if (edge.sourceHandle === "out-top") {
          sourcePosition = Position.Top;
        } else if (edge.sourceHandle === "out-bottom") {
          sourcePosition = Position.Bottom;
        }
        
        if (edge.targetHandle === "in-top") {
          targetPosition = Position.Top;
        } else if (edge.targetHandle === "in-bottom") {
          targetPosition = Position.Bottom;
        }

        const [d] = getSmoothStepPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
          sourcePosition,
          targetPosition,
        });

        return { id: edge.id, d };
      })
      .filter((path): path is BeamPath => Boolean(path));

    setBeamPaths(nextPaths);
  }, [edges, resolveHandleRef]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updatePaths();
    });

    if (reactFlowRef.current) {
      resizeObserver.observe(reactFlowRef.current);
    }

    updatePaths();

    return () => {
      resizeObserver.disconnect();
    };
  }, [updatePaths]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      updatePaths();
    });
    return () => cancelAnimationFrame(raf);
  }, [nodes, edges, updatePaths]);

  const filterNodes = (node: HTMLElement) => {
    const classList = node.classList;
    if (!classList) return true;
    if (classList.contains("react-flow__controls")) return false;
    if (classList.contains("react-flow__background")) return false;
    if (classList.contains("react-flow__minimap")) return false;
    if (classList.contains("react-flow__panel")) return false;
    if (classList.contains("react-flow__resize-control")) return false;
    if (classList.contains("copy-buttons-container")) return false;
    return true;
  };

  const copyAsPng = useCallback(async () => {
    if (!reactFlowRef.current) return;

    try {
      const dataUrl = await toPng(reactFlowRef.current, {
        cacheBust: true,
        backgroundColor: "#0a0a0a",
        filter: filterNodes,
        skipFonts: true,
        pixelRatio: 3,
        includeQueryParams: true,
      });

      // Try clipboard API first
      try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopiedPng(true);
        setTimeout(() => setCopiedPng(false), 2000);
      } catch (clipboardErr) {
        // Fallback: download the image
        const link = document.createElement("a");
        link.download = "passage-agents-compact-diagram.png";
        link.href = dataUrl;
        link.click();
        setCopiedPng(true);
        setTimeout(() => setCopiedPng(false), 2000);
      }
    } catch (err) {
      console.error("Failed to generate PNG:", err);
    }
  }, []);

  const copyAsSvg = useCallback(async () => {
    if (!reactFlowRef.current) return;

    try {
      const dataUrl = await toSvg(reactFlowRef.current, {
        cacheBust: true,
        backgroundColor: "#0a0a0a",
        filter: filterNodes,
        skipFonts: true,
        includeQueryParams: true,
      });

      // Try clipboard API first
      try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ "image/svg+xml": blob }),
        ]);
        setCopiedSvg(true);
        setTimeout(() => setCopiedSvg(false), 2000);
      } catch (clipboardErr) {
        // Fallback: download the SVG
        const link = document.createElement("a");
        link.download = "passage-agents-compact-diagram.svg";
        link.href = dataUrl;
        link.click();
        setCopiedSvg(true);
        setTimeout(() => setCopiedSvg(false), 2000);
      }
    } catch (err) {
      console.error("Failed to generate SVG:", err);
    }
  }, []);

  return (
    <div
      className="relative w-full bg-[#0a0a0a] h-[50vh] min-h-[360px]"
      ref={reactFlowRef}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.35 }}
        className="workflow-diagram"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={0.8}
          color="rgba(255,255,255,0.08)"
        />
        <Controls
          position="top-left"
          showInteractive={false}
          className="!bg-[#181818] !border-white/[0.08] !rounded-[6px] !top-3 !left-3 [&>button]:!bg-transparent [&>button]:!border-transparent [&>button]:!text-white/50 [&>button:hover]:!bg-white/5 [&>button]:!w-6 [&>button]:!h-6 [&>button:nth-child(4)]:!hidden"
        />
      </ReactFlow>

      <svg
        className="pointer-events-none absolute inset-0 z-[1]"
        width={beamDimensions.width}
        height={beamDimensions.height}
        viewBox={`0 0 ${beamDimensions.width} ${beamDimensions.height}`}
      >
        {beamPaths.map((path) => (
          <g key={`beam-${path.id}`}>
            <path
              d={path.d}
              stroke={`url(#beam-gradient-${path.id})`}
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <motion.linearGradient
                id={`beam-gradient-${path.id}`}
                gradientUnits="userSpaceOnUse"
                initial={{ x1: "10%", x2: "0%", y1: "0%", y2: "0%" }}
                animate={{ x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }}
                transition={{
                  duration: 12,
                  delay: 0,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
              >
                <stop stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="2%" stopColor="#a78bfa" />
                <stop offset="5%" stopColor="#f472b6" />
                <stop offset="8%" stopColor="#f472b6" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </g>
        ))}
      </svg>

      <div className="copy-buttons-container absolute top-3 right-3 flex items-center gap-2 z-[2]">
        <button
          onClick={copyAsPng}
          className="flex items-center gap-2 px-3 py-2 bg-[#181818] border border-white/[0.08] rounded-[4px] text-white/60 text-xs hover:bg-white/5 hover:text-white/80 transition-all"
        >
          {copiedPng ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Image className="w-3.5 h-3.5" />
              <span>Copy PNG</span>
            </>
          )}
        </button>

        <button
          onClick={copyAsSvg}
          className="flex items-center gap-2 px-3 py-2 bg-[#181818] border border-white/[0.08] rounded-[4px] text-white/60 text-xs hover:bg-white/5 hover:text-white/80 transition-all"
        >
          {copiedSvg ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy SVG</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function PassageAgentsCompactDiagram() {
  return (
    <ReactFlowProvider>
      <PassageAgentsCompactDiagramInner />
    </ReactFlowProvider>
  );
}
