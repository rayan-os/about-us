import { Handle, NodeProps, Position } from "@xyflow/react";
import Image from "next/image";
import React from "react";
import { VerticalCard } from "../node-card/vertical-card";

interface VerticalServiceNodeData {
  title: string;
  icon: string;
  id: string;
  connectedHandles?: {
    sources: string[];
    targets: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const VerticalServiceNode: React.FC<NodeProps<any>> = ({ data }) => {
  const nodeData = data as VerticalServiceNodeData;
  const connectedHandles = nodeData.connectedHandles || {
    sources: [],
    targets: [],
  };

  const handleStyle = {
    background: "#555",
    border: "2px solid #fff",
    width: "5px",
    height: "5px",
  };

  const sideHandleStyle = {
    ...handleStyle,
    top: "40px", // Move handles up to align with icon area
  };

  return (
    <>
      {/* Top handles - show only if connected */}
      {connectedHandles.sources.includes("top") && (
        <Handle
          id="top"
          type="source"
          position={Position.Top}
          style={handleStyle}
        />
      )}
      {connectedHandles.targets.includes("top-target") && (
        <Handle
          id="top-target"
          type="target"
          position={Position.Top}
          style={handleStyle}
        />
      )}

      {/* Bottom handles - show only if connected */}
      {connectedHandles.targets.includes("bottom") && (
        <Handle
          id="bottom"
          type="target"
          position={Position.Bottom}
          style={handleStyle}
        />
      )}
      {connectedHandles.sources.includes("bottom-source") && (
        <Handle
          id="bottom-source"
          type="source"
          position={Position.Bottom}
          style={handleStyle}
        />
      )}

      {/* Left handles - show only if connected */}
      {connectedHandles.sources.includes("left") && (
        <Handle
          id="left"
          type="source"
          position={Position.Left}
          style={sideHandleStyle}
        />
      )}
      {connectedHandles.targets.includes("left-target") && (
        <Handle
          id="left-target"
          type="target"
          position={Position.Left}
          style={sideHandleStyle}
        />
      )}

      {/* Right handles - show only if connected */}
      {connectedHandles.sources.includes("right") && (
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          style={sideHandleStyle}
        />
      )}
      {connectedHandles.targets.includes("right-target") && (
        <Handle
          id="right-target"
          type="target"
          position={Position.Right}
          style={sideHandleStyle}
        />
      )}

      <VerticalCard
        icon={
          <Image
            src={`/assets_ai/icons/${nodeData.icon}`}
            alt={nodeData.title}
            width={40}
            height={40}
          />
        }
        title={nodeData.title}
      />
    </>
  );
};
