"use client";

import { useMemo, useCallback, useRef } from "react";
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
  useReactFlow,
  ReactFlowProvider,
  getNodesBounds,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Target, Copy, Check, Image } from "lucide-react";
import { useState } from "react";
import { toPng, toSvg } from "html-to-image";

// Wrench icon component
const WrenchIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
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
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>
  </svg>
);

// Custom Conditional Node Component (Start node - no input handle)
function ConditionalNode({ data, selected }: NodeProps) {
  const label = (data as { label: string }).label;
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <NodeResizer
        minWidth={200}
        minHeight={75}
        isVisible={selected}
        lineClassName="!border-white/20"
        handleClassName="!w-2 !h-2 !bg-white/40 !border-0"
      />

      {/* Node card */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: '#181818',
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0
        }}>
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '4px',
            backgroundColor: '#141414',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <WrenchIcon style={{ width: '10px', height: '10px', color: 'rgba(255,255,255,0.4)' }} />
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Turn your rules into agents</span>
        </div>

        {/* Content */}
        <div style={{ padding: '10px 12px 14px 12px', flex: 1, display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', lineHeight: '1.4' }}>{label}</span>
        </div>
      </div>

      {/* Right handles only (no input) - 3 handles for 3 connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="top"
        style={{ top: "25%" }}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="middle"
        style={{ top: "50%" }}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="bottom"
        style={{ top: "75%" }}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
    </div>
  );
}

// Gradient orb component
const GradientOrb = ({ colors }: { colors: string[] }) => (
  <div style={{ 
    width: '18px', 
    height: '18px', 
    borderRadius: '50%', 
    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2] || colors[1]} 100%)`,
    opacity: 0.85,
    flexShrink: 0,
    boxShadow: `0 0 10px ${colors[0]}40`
  }} />
);

// Small gradient orb for header
const SmallGradientOrb = ({ colors }: { colors: string[] }) => (
  <div style={{ 
    width: '14px', 
    height: '14px', 
    borderRadius: '50%', 
    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2] || colors[1]} 100%)`,
    opacity: 0.9,
    flexShrink: 0,
    boxShadow: `0 0 8px ${colors[0]}50`
  }} />
);

// Custom Action Node Component
function ActionNode({ data, selected }: NodeProps) {
  const { label, gradient, agentNumber } = data as { label: string; gradient?: string[]; agentNumber?: string };
  const defaultGradient = ['#3b82f6', '#8b5cf6', '#06b6d4'];
  const colors = gradient || defaultGradient;
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <NodeResizer
        minWidth={200}
        minHeight={90}
        isVisible={selected}
        lineClassName="!border-white/20"
        handleClassName="!w-2 !h-2 !bg-white/40 !border-0"
      />

      {/* Left handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />

      {/* Node card */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: '#181818',
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0
        }}>
          <SmallGradientOrb colors={colors} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Action Node</span>
        </div>

        {/* Content */}
        <div style={{ padding: '8px 12px 14px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          <span style={{ color: '#FF6A00', fontSize: '8px', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: '"IBM Plex Mono", monospace', whiteSpace: 'nowrap' }}>
            {agentNumber ? `Custom Agent ${agentNumber}` : 'Custom Agent 01'}
          </span>
          <div style={{ 
            backgroundColor: '#141414', 
            borderRadius: '4px', 
            padding: '6px 10px', 
            marginTop: '6px',
            minWidth: 0
          }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', display: 'block', lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{label}</span>
          </div>
        </div>
      </div>

      {/* Right handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !bg-[#141414] !border !border-white/20"
      />
    </div>
  );
}

// Initial nodes
const initialNodes: Node[] = [
  {
    id: "conditional-1",
    type: "conditional",
    position: { x: 80, y: 220 },
    data: { label: "If Missing Transcript" },
    style: { width: 200, height: 90 },
  },
  {
    id: "action-1",
    type: "action",
    position: { x: 400, y: 50 },
    data: { label: "Request Document", gradient: ['#f97316', '#ef4444', '#fbbf24'], agentNumber: '01' },
    style: { width: 200, height: 100 },
  },
  {
    id: "action-2",
    type: "action",
    position: { x: 400, y: 200 },
    data: { label: "Send Reminder Email", gradient: ['#8b5cf6', '#ec4899', '#a855f7'], agentNumber: '02' },
    style: { width: 200, height: 100 },
  },
  {
    id: "action-3",
    type: "action",
    position: { x: 400, y: 350 },
    data: { label: "Generate Decision Ready Summary", gradient: ['#10b981', '#06b6d4', '#22c55e'], agentNumber: '03' },
    style: { width: 240, height: 110 },
  },
];

// Initial edges
const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "conditional-1",
    sourceHandle: "top",
    target: "action-1",
    type: "smoothstep",
    style: { stroke: "rgba(255,255,255,0.15)", strokeWidth: 1.5 },
    animated: false,
  },
  {
    id: "e1-3",
    source: "conditional-1",
    sourceHandle: "middle",
    target: "action-2",
    type: "smoothstep",
    style: { stroke: "rgba(255,255,255,0.15)", strokeWidth: 1.5 },
    animated: false,
  },
  {
    id: "e1-4",
    source: "conditional-1",
    sourceHandle: "bottom",
    target: "action-3",
    type: "smoothstep",
    style: { stroke: "rgba(255,255,255,0.15)", strokeWidth: 1.5 },
    animated: false,
  },
];

function WorkflowDiagramInner() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [copiedPng, setCopiedPng] = useState(false);
  const reactFlowRef = useRef<HTMLDivElement>(null);
  const { getNodes, getEdges } = useReactFlow();

  const nodeTypes = useMemo(
    () => ({
      conditional: ConditionalNode,
      action: ActionNode,
    }),
    []
  );

  const copyAsSvg = useCallback(async () => {
    // Use the react flow instance to get nodes and edges data
    const currentNodes = getNodes();
    const currentEdges = getEdges();
    
    if (currentNodes.length === 0) return;

    try {
      // Calculate bounds
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      
      currentNodes.forEach((node) => {
        const x = node.position.x;
        const y = node.position.y;
        const w = node.measured?.width || (node.style?.width as number) || 200;
        const h = node.measured?.height || (node.style?.height as number) || 100;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + w);
        maxY = Math.max(maxY, y + h);
      });

      const padding = 50;
      const width = maxX - minX + padding * 2;
      const height = maxY - minY + padding * 2;
      const offsetX = -minX + padding;
      const offsetY = -minY + padding;

      // Build SVG manually
      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
      svg += `<defs>`;
      // Add gradient definitions for each action node
      currentNodes.forEach((node) => {
        if (node.type === 'action' && node.data.gradient) {
          const colors = node.data.gradient as string[];
          svg += `<linearGradient id="grad-${node.id}" x1="0%" y1="0%" x2="100%" y2="100%">`;
          svg += `<stop offset="0%" stop-color="${colors[0]}"/>`;
          svg += `<stop offset="50%" stop-color="${colors[1]}"/>`;
          svg += `<stop offset="100%" stop-color="${colors[2] || colors[1]}"/>`;
          svg += `</linearGradient>`;
        }
      });
      svg += `</defs>`;
      svg += `<style>text { font-family: system-ui, -apple-system, sans-serif; }</style>`;
      
      // Add edges
      currentEdges.forEach((edge) => {
        const sourceNode = currentNodes.find(n => n.id === edge.source);
        const targetNode = currentNodes.find(n => n.id === edge.target);
        if (!sourceNode || !targetNode) return;

        const sw = sourceNode.measured?.width || (sourceNode.style?.width as number) || 200;
        const sh = sourceNode.measured?.height || (sourceNode.style?.height as number) || 100;
        const th = targetNode.measured?.height || (targetNode.style?.height as number) || 100;
        
        const sx = sourceNode.position.x + sw + offsetX;
        const sy = sourceNode.position.y + sh / 2 + offsetY;
        const tx = targetNode.position.x + offsetX;
        const ty = targetNode.position.y + th / 2 + offsetY;
        
        const midX = (sx + tx) / 2;
        svg += `<path d="M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ty}, ${tx} ${ty}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>`;
      });

      // Add nodes
      currentNodes.forEach((node) => {
        const x = node.position.x + offsetX;
        const y = node.position.y + offsetY;
        const w = node.measured?.width || (node.style?.width as number) || 200;
        const h = node.measured?.height || (node.style?.height as number) || 100;
        const isConditional = node.type === 'conditional';
        
        // Node background
        svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#181818" stroke="rgba(255,255,255,0.08)"/>`;
        
        // Header background
        svg += `<rect x="${x}" y="${y}" width="${w}" height="34" rx="6" fill="#181818"/>`;
        
        // Header line
        svg += `<line x1="${x}" y1="${y + 34}" x2="${x + w}" y2="${y + 34}" stroke="rgba(255,255,255,0.06)"/>`;
        
        // Gradient orb for action nodes
        if (!isConditional && node.data.gradient) {
          svg += `<circle cx="${x + 19}" cy="${y + 17}" r="7" fill="url(#grad-${node.id})" opacity="0.9"/>`;
        }
        
        // Wrench icon for conditional node
        if (isConditional) {
          svg += `<rect x="${x + 10}" y="${y + 8}" width="18" height="18" rx="4" fill="#141414"/>`;
        }
        
        // Header text
        const headerText = isConditional ? 'TURN YOUR RULES INTO AGENTS' : 'ACTION NODE';
        svg += `<text x="${x + (isConditional ? 36 : 32)}" y="${y + 21}" fill="rgba(255,255,255,0.4)" font-size="9" letter-spacing="0.05em">${headerText}</text>`;
        
        // Custom Agent label for action nodes
        if (!isConditional) {
          const agentNum = (node.data.agentNumber as string) || '01';
          svg += `<text x="${x + 12}" y="${y + 52}" fill="#FF6A00" font-size="8" letter-spacing="0.05em" font-family="'IBM Plex Mono', monospace">CUSTOM AGENT ${agentNum}</text>`;
        }
        
        // Content background for action nodes
        if (!isConditional) {
          svg += `<rect x="${x + 12}" y="${y + 58}" width="${w - 24}" height="${h - 72}" rx="4" fill="#141414"/>`;
        }
        
        // Label text
        const label = node.data.label as string;
        const labelY = isConditional ? y + h - 25 : y + h - 22;
        const labelX = isConditional ? x + 12 : x + 20;
        svg += `<text x="${labelX}" y="${labelY}" fill="rgba(255,255,255,0.7)" font-size="${isConditional ? 12 : 10}">${label}</text>`;
        
        // Add handles (input/output nodes)
        if (isConditional) {
          // Conditional node has 3 output handles on the right (no input)
          svg += `<circle cx="${x + w}" cy="${y + h * 0.25}" r="4" fill="#141414" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>`;
          svg += `<circle cx="${x + w}" cy="${y + h * 0.5}" r="4" fill="#141414" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>`;
          svg += `<circle cx="${x + w}" cy="${y + h * 0.75}" r="4" fill="#141414" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>`;
        } else {
          // Action nodes have input handle on left and output handle on right
          svg += `<circle cx="${x}" cy="${y + h / 2}" r="4" fill="#141414" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>`;
          svg += `<circle cx="${x + w}" cy="${y + h / 2}" r="4" fill="#141414" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>`;
        }
      });

      svg += '</svg>';
      
      // Copy using textarea
      const textarea = document.createElement('textarea');
      textarea.value = svg;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (success) {
        setCopiedSvg(true);
        setTimeout(() => setCopiedSvg(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy SVG:', err);
    }
  }, [getNodes, getEdges]);

  const copyAsPng = useCallback(async () => {
    const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!viewport) return;

    try {
      // Get the actual dimensions of the viewport content
      const rect = viewport.getBoundingClientRect();
      
      const dataUrl = await toPng(viewport, {
        backgroundColor: 'transparent',
        pixelRatio: 2,
        width: rect.width,
        height: rect.height,
        style: {
          // Preserve all styles
          transform: viewport.style.transform,
        },
        filter: (node) => {
          const classList = node.classList;
          if (!classList) return true;
          // Only exclude UI controls, not visual elements like handles
          if (classList.contains('react-flow__controls')) return false;
          if (classList.contains('react-flow__background')) return false;
          if (classList.contains('react-flow__minimap')) return false;
          if (classList.contains('react-flow__panel')) return false;
          if (classList.contains('react-flow__resize-control')) return false;
          // Keep handles - they are the input/output connection points
          return true;
        },
      });
      
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      setCopiedPng(true);
      setTimeout(() => setCopiedPng(false), 2000);
    } catch (err) {
      console.error('Failed to copy PNG:', err);
    }
  }, []);

  return (
    <div
      className="relative w-full bg-[#0a0a0a] h-[70vh] min-h-[520px]"
      ref={reactFlowRef}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.4 }}
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
          className="!bg-[#181818] !border-white/[0.08] !rounded-[6px] !top-4 !left-4 [&>button]:!bg-transparent [&>button]:!border-transparent [&>button]:!text-white/50 [&>button:hover]:!bg-white/5 [&>button]:!w-7 [&>button]:!h-7 [&>button:nth-child(4)]:!hidden"
        />
      </ReactFlow>
      
      {/* Export buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {/* Copy PNG Button */}
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
        
        {/* Copy SVG Button */}
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

export function WorkflowDiagram() {
  return (
    <ReactFlowProvider>
      <WorkflowDiagramInner />
    </ReactFlowProvider>
  );
}
