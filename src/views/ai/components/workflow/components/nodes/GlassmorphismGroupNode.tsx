import { Handle, NodeProps, Position } from "@xyflow/react";
import React from "react";

interface GlassmorphismGroupNodeData {
  label?: string;
  connectedHandles?: {
    sources: string[];
    targets: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlassmorphismGroupNode: React.FC<NodeProps<any>> = ({ data }) => {
  const nodeData = data as GlassmorphismGroupNodeData;
  const connectedHandles = nodeData.connectedHandles || {
    sources: [],
    targets: [],
  };

  const handleStyle = {
    background: "#555",
    border: "2px solid #fff",
    width: "8px",
    height: "8px",
  };

  return (
    <>
      {/* Left target handle - show only if connected */}
      {connectedHandles.targets.includes("left") && (
        <Handle
          id="left-target"
          type="target"
          position={Position.Left}
          style={{ ...handleStyle, left: "-4px" }}
        />
      )}

      {/* Right source handle - show only if connected */}
      {connectedHandles.sources.includes("right") && (
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          style={{ ...handleStyle, right: "-4px" }}
        />
      )}

      {/* Top target handle - show only if connected */}
      {connectedHandles.targets.includes("top") && (
        <Handle
          id="top-target"
          type="target"
          position={Position.Top}
          style={{ ...handleStyle, top: "-4px" }}
        />
      )}

      {/* Bottom source handle - show only if connected */}
      {connectedHandles.sources.includes("bottom") && (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          style={{ ...handleStyle, bottom: "-4px" }}
        />
      )}

      <div className="relative w-full h-full">
        <div
          className="
            absolute inset-0 
            bg-gradient-to-br from-white/6 via-white/1 to-white/6
            backdrop-blur-md
            rounded-2xl
            before:absolute before:inset-0
            before:rounded-2xl
            before:blur-sm
            overflow-hidden
            border border-white/10
          "
        ></div>

        {nodeData.label && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white/70 font-medium">
            {nodeData.label}
          </div>
        )}
      </div>
    </>
  );
};
