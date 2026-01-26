"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  NodeResizer,
  ReactFlowProvider,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "motion/react";
import {
  BadgeCheck,
  Check,
  FileCheck,
  FileText,
  Image,
  Mail,
  Phone,
  Search,
  Sparkles,
  Target,
  Users,
  Video,
  Copy,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { toPng, toSvg } from "html-to-image";

type TaskItem = {
  label: string;
  icon: LucideIcon;
  color: string;
};

type AgentNodeData = {
  title: string;
  name: string;
  role: string;
  avatarSrc: string;
  tasks: TaskItem[];
  incomingHandlePositions?: number[];
  outgoingHandlePositions?: number[];
};

type IconNodeData = {
  label: string;
  icon: LucideIcon;
  incomingHandlePositions?: number[];
  outgoingHandlePositions?: number[];
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

const FingerprintPatternIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
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
    style={style}
  >
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
    <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/>
    <path d="M2 12a10 10 0 0 1 18-6"/>
    <path d="M2 16h.01"/>
    <path d="M21.8 16c.2-2 .131-5.354 0-6"/>
    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/>
    <path d="M8.65 22c.21-.66.45-1.32.57-2"/>
    <path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>
  </svg>
);

const ScanEyeIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
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
    style={style}
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
    <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
    <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
    <circle cx="12" cy="12" r="1"/>
    <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/>
  </svg>
);

function TaskPill({ item }: { item: TaskItem }) {
  const Icon = item.icon;

  return (
    <div
      className="flex items-center gap-2 rounded-[4px] border border-white/10 bg-[#141414] px-3 py-2 text-[11px] text-white/80"
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: item.color }} />
      <span className="whitespace-nowrap">{item.label}</span>
    </div>
  );
}

function AgentNode({ data, selected }: NodeProps) {
  const {
    title,
    name,
    role,
    avatarSrc,
    tasks,
    incomingHandlePositions,
    outgoingHandlePositions,
  } = data as AgentNodeData;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <NodeResizer
        minWidth={260}
        minHeight={180}
        isVisible={selected}
        lineClassName="!border-white/20"
        handleClassName="!w-2 !h-2 !bg-white/40 !border-0"
      />

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

      <div
        className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
      >
        <div className="px-4 pt-4 text-[11px] uppercase tracking-[0.08em] text-white/35">
          {title}
        </div>

        <div className="flex items-center gap-3 px-4 pt-3">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <img src={avatarSrc} alt={name} className="h-full w-full object-cover" crossOrigin="anonymous" />
          </div>
          <div>
            <div className="text-sm font-medium text-white/90">{name}</div>
            <div
              style={{
                color: "#FF6A00",
                fontSize: "10px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontFamily: '"IBM Plex Mono", monospace',
                marginTop: "4px",
              }}
            >
              {role}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 px-4 pb-4">
          {tasks.map((item) => (
            <TaskPill key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IconNode({ data, selected }: NodeProps) {
  const {
    label,
    icon,
    incomingHandlePositions,
    outgoingHandlePositions,
  } = data as IconNodeData;
  const Icon = icon;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <NodeResizer
        minWidth={120}
        minHeight={60}
        isVisible={selected}
        lineClassName="!border-white/20"
        handleClassName="!w-2 !h-2 !bg-white/40 !border-0"
      />

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
      {outgoingHandlePositions?.length ? (
        outgoingHandlePositions.map((pos, idx) => (
          <Handle
            key={`icon-out-${idx}`}
            id={`out-${idx}`}
            type="source"
            position={Position.Right}
            style={{ top: `${pos}%` }}
            className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
          />
        ))
      ) : null}

      <div className="absolute inset-0 flex items-center gap-3 rounded-md border border-white/10 bg-[#141414] px-4 text-white/70">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0f0f0f]">
          <Icon className="h-4 w-4 text-emerald-400" />
        </div>
        <span className="text-xs text-white/70">{label}</span>
      </div>
    </div>
  );
}

function StartNode({ data }: NodeProps) {
  const { label, outgoingHandlePositions } = data as IconNodeData;

  return (
    <div className="relative h-full w-full">
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
      <div className="flex h-full w-full items-center gap-3 rounded-md border border-white/10 bg-[#141414] px-4 text-white/70">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0f0f0f]">
          <UserIcon className="h-4 w-4 text-white/70" />
        </div>
        <span className="text-xs text-white/70">{label}</span>
      </div>
    </div>
  );
}

function EndNode({ data }: NodeProps) {
  const { label, icon } = data as IconNodeData;
  const Icon = icon;

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#141414] text-white/70">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-2 text-center text-xs text-white/55">{label}</div>
    </div>
  );
}

const getAgentHeight = (taskCount: number) => 150 + taskCount * 36;

interface PassageAgentsDiagramProps {
  hideControls?: boolean;
  hideCopyButtons?: boolean;
  disableInteraction?: boolean;
  allowPanOnly?: boolean;
}

function PassageAgentsDiagramInner({
  hideControls = false,
  hideCopyButtons = false,
  disableInteraction = false,
  allowPanOnly = false,
}: PassageAgentsDiagramProps) {
  const initialNodes = useMemo<Node[]>(
    () => [
      {
        id: "talent",
        type: "start",
        position: { x: 10, y: 260 },
        data: {
          label: "Talent",
          outgoingHandlePositions: [35, 65],
        },
        style: { width: 160, height: 70 },
      },
      {
        id: "mark",
        type: "agent",
        position: { x: 260, y: 60 },
        data: {
          title: "Mark's workflow",
          name: "Mark",
          role: "AI support",
          avatarSrc: "/assets_ai/Mark.png",
          incomingHandlePositions: [50],
          outgoingHandlePositions: [50],
          tasks: [
            { label: "Connect to human", icon: Users, color: "#60a5fa" },
            { label: "Answer emails", icon: Mail, color: "#fbbf24" },
            { label: "Answer calls", icon: Phone, color: "#34d399" },
          ],
        },
        style: { width: 300, height: getAgentHeight(3) },
      },
      {
        id: "jackie",
        type: "agent",
        position: { x: 260, y: 330 },
        data: {
          title: "Jackie's workflow",
          name: "Jackie",
          role: "AI counselor",
          avatarSrc: "/assets_ai/Jackie.png",
          incomingHandlePositions: [50],
          outgoingHandlePositions: [35, 65],
          tasks: [
            { label: "Counseling", icon: Users, color: "#f472b6" },
            { label: "Find opportunities", icon: Search, color: "#fb7185" },
            { label: "Create application", icon: FileText, color: "#60a5fa" },
          ],
        },
        style: { width: 300, height: getAgentHeight(3) },
      },
      {
        id: "david",
        type: "agent",
        position: { x: 640, y: 140 },
        data: {
          title: "David's workflow",
          name: "David",
          role: "AI processor",
          avatarSrc: "/assets_ai/David.png",
          incomingHandlePositions: [35, 65],
          outgoingHandlePositions: [50],
          tasks: [
            { label: "KYC", icon: FingerprintPatternIcon as LucideIcon, color: "#60a5fa" },
            { label: "Document analysis", icon: ScanEyeIcon as LucideIcon, color: "#ef4444" },
            { label: "Diligence screening", icon: Search, color: "#f59e0b" },
            { label: "Credit check", icon: FileCheck, color: "#facc15" },
          ],
        },
        style: { width: 320, height: getAgentHeight(4) },
      },
      {
        id: "ella",
        type: "agent",
        position: { x: 640, y: 460 },
        data: {
          title: "Ella's workflow",
          name: "Ella",
          role: "AI interviewer",
          avatarSrc: "/assets_ai/Ella.png",
          incomingHandlePositions: [50],
          outgoingHandlePositions: [50],
          tasks: [
            { label: "Live interview", icon: Video, color: "#60a5fa" },
            { label: "Assess talent", icon: Sparkles, color: "#facc15" },
          ],
        },
        style: { width: 300, height: getAgentHeight(2) },
      },
      {
        id: "submit",
        type: "icon",
        position: { x: 1040, y: 272 },
        data: {
          label: "Submit application",
          icon: FolderCheckIcon,
          incomingHandlePositions: [35, 65],
        },
        style: { width: 220, height: 70 },
      },
    ],
    []
  );

  const initialEdges = useMemo<Edge[]>(
    () => [
      {
        id: "e-talent-mark",
        source: "talent",
        target: "mark",
        sourceHandle: "out-0",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      {
        id: "e-talent-jackie",
        source: "talent",
        target: "jackie",
        sourceHandle: "out-1",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.2 },
      },
      {
        id: "e-mark-david",
        source: "mark",
        target: "david",
        sourceHandle: "out-0",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.2)", strokeWidth: 1.2 },
      },
      {
        id: "e-jackie-david",
        source: "jackie",
        target: "david",
        sourceHandle: "out-0",
        targetHandle: "in-1",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.2)", strokeWidth: 1.2 },
      },
      {
        id: "e-jackie-ella",
        source: "jackie",
        target: "ella",
        sourceHandle: "out-1",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.2)", strokeWidth: 1.2 },
      },
      {
        id: "e-david-submit",
        source: "david",
        target: "submit",
        sourceHandle: "out-0",
        targetHandle: "in-0",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.22)", strokeWidth: 1.2 },
      },
      {
        id: "e-ella-submit",
        source: "ella",
        target: "submit",
        sourceHandle: "out-0",
        targetHandle: "in-1",
        type: "smoothstep",
        style: { stroke: "rgba(255,255,255,0.22)", strokeWidth: 1.2 },
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
      agent: AgentNode,
      icon: IconNode,
      start: StartNode,
      end: EndNode,
    }),
    []
  );

  const [beamPaths, setBeamPaths] = useState<BeamPath[]>([]);
  const [beamDimensions, setBeamDimensions] = useState({ width: 0, height: 0 });
  const [hasBeenPanned, setHasBeenPanned] = useState(false);
  const isInitializedRef = useRef(false);
  const { getViewport, fitView, setViewport } = useReactFlow();

  const DEFAULT_VIEWPORT = { x: 9, y: 27.5, zoom: 0.57 };

  const handleResetView = useCallback(() => {
    if (allowPanOnly) {
      setViewport(DEFAULT_VIEWPORT);
    } else {
      fitView({ padding: 0.2 });
    }
    setHasBeenPanned(false);
  }, [fitView, setViewport, allowPanOnly]);

  const updatePaths = useCallback(() => {
    if (!reactFlowRef.current) return;

    const containerRect = reactFlowRef.current.getBoundingClientRect();
    setBeamDimensions({ width: containerRect.width, height: containerRect.height });

    // Get the current viewport transform (zoom and pan)
    const viewport = getViewport();
    const { x: panX, y: panY, zoom } = viewport;

    const nextPaths = edges
      .map((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);

        if (!sourceNode || !targetNode) return null;

        // Get handle positions from node data
        const sourceData = sourceNode.data as { outgoingHandlePositions?: number[] };
        const targetData = targetNode.data as { incomingHandlePositions?: number[] };

        // Determine which handle index to use
        const sourceHandleIndex = edge.sourceHandle ? Number(edge.sourceHandle.split("-")[1] ?? 0) : 0;
        const targetHandleIndex = edge.targetHandle ? Number(edge.targetHandle.split("-")[1] ?? 0) : 0;

        const sourceHandlePercent = sourceData.outgoingHandlePositions?.[sourceHandleIndex] ?? 50;
        const targetHandlePercent = targetData.incomingHandlePositions?.[targetHandleIndex] ?? 50;

        // Get node dimensions
        const sourceWidth = (sourceNode.style?.width as number) ?? (sourceNode.width ?? 200);
        const sourceHeight = (sourceNode.style?.height as number) ?? (sourceNode.height ?? 100);
        const targetHeight = (targetNode.style?.height as number) ?? (targetNode.height ?? 100);

        // Calculate handle positions in flow coordinates
        const sourceFlowX = sourceNode.position.x + sourceWidth; // Right side
        const sourceFlowY = sourceNode.position.y + (sourceHeight * sourceHandlePercent) / 100;
        const targetFlowX = targetNode.position.x; // Left side
        const targetFlowY = targetNode.position.y + (targetHeight * targetHandlePercent) / 100;

        // Transform flow coordinates to screen coordinates relative to container
        const sourceX = sourceFlowX * zoom + panX;
        const sourceY = sourceFlowY * zoom + panY;
        const targetX = targetFlowX * zoom + panX;
        const targetY = targetFlowY * zoom + panY;

        const [d] = getSmoothStepPath({
          sourceX,
          sourceY,
          targetX,
          targetY,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        });

        return { id: edge.id, d };
      })
      .filter((path): path is BeamPath => Boolean(path));

    setBeamPaths(nextPaths);
  }, [edges, nodes, getViewport]);

  const handleMove = useCallback(() => {
    updatePaths();
    if (allowPanOnly && isInitializedRef.current) {
      // Only show reset button if viewport has changed significantly from default
      const currentViewport = getViewport();
      const hasChanged = 
        Math.abs(currentViewport.x - DEFAULT_VIEWPORT.x) > 5 ||
        Math.abs(currentViewport.y - DEFAULT_VIEWPORT.y) > 5;
      setHasBeenPanned(hasChanged);
    }
  }, [updatePaths, allowPanOnly, getViewport, DEFAULT_VIEWPORT]);

  const handleInit = useCallback(() => {
    updatePaths();
    // Mark as initialized after a short delay to ignore initial fitView movements
    setTimeout(() => {
      isInitializedRef.current = true;
    }, 100);
  }, [updatePaths]);

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
        link.download = "passage-agents-diagram.png";
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
        link.download = "passage-agents-diagram.svg";
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
      className="relative w-full bg-[#141414] h-[70vh] min-h-[560px]"
      ref={reactFlowRef}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onMove={handleMove}
        onInit={handleInit}
        nodeTypes={nodeTypes}
        fitView={!allowPanOnly}
        fitViewOptions={{ padding: 0.2 }}
        defaultViewport={allowPanOnly ? DEFAULT_VIEWPORT : undefined}
        className="workflow-diagram"
        proOptions={{ hideAttribution: true }}
        zoomOnScroll={!disableInteraction && !allowPanOnly}
        zoomOnPinch={!disableInteraction && !allowPanOnly}
        zoomOnDoubleClick={!disableInteraction && !allowPanOnly}
        panOnDrag={!disableInteraction || allowPanOnly}
        panOnScroll={!disableInteraction && !allowPanOnly}
        nodesDraggable={!disableInteraction && !allowPanOnly}
        nodesConnectable={!disableInteraction && !allowPanOnly}
        elementsSelectable={!disableInteraction && !allowPanOnly}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.5}
          color="#3a3a3a"
        />
        {!hideControls && (
          <Controls
            position="top-left"
            className="!bg-[#181818] !border-white/[0.08] !rounded-[6px] !top-4 !left-4 [&>button]:!bg-transparent [&>button]:!border-transparent [&>button]:!text-white/50 [&>button:hover]:!bg-white/5 [&>button]:!w-7 [&>button]:!h-7 [&>button:nth-child(4)]:!hidden"
          />
        )}
      </ReactFlow>

      {/* Reset View Button */}
      {allowPanOnly && hasBeenPanned && (
        <button
          onClick={handleResetView}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-[#181818] border border-white/[0.08] rounded-full text-white/60 text-xs hover:bg-white/5 hover:text-white/80 transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset View</span>
        </button>
      )}

      <svg
        className="pointer-events-none absolute inset-0 z-[1]"
        width={beamDimensions.width}
        height={beamDimensions.height}
        viewBox={`0 0 ${beamDimensions.width} ${beamDimensions.height}`}
      >
        {beamPaths.map((path, index) => (
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
                  duration: 14,
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

      {!hideCopyButtons && (
        <div className="copy-buttons-container absolute top-4 right-4 flex items-center gap-2 z-10">
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
      )}
    </div>
  );
}

export function PassageAgentsDiagram({
  hideControls = false,
  hideCopyButtons = false,
  disableInteraction = false,
  allowPanOnly = false,
}: PassageAgentsDiagramProps = {}) {
  return (
    <ReactFlowProvider>
      <PassageAgentsDiagramInner
        hideControls={hideControls}
        hideCopyButtons={hideCopyButtons}
        disableInteraction={disableInteraction}
        allowPanOnly={allowPanOnly}
      />
    </ReactFlowProvider>
  );
}
