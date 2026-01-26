import { Handle, NodeProps, Position } from "@xyflow/react";
import Image from "next/image";
import React from "react";
import { AgentCard } from "../node-card/agent-card";

interface AgentNodeData {
  title: string;
  icon: string;
  id: string;
  description: string;
  connectedHandles?: {
    sources: string[];
    targets: string[];
    arrowSources: string[];
    arrowTargets: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AgentNode: React.FC<NodeProps<any>> = ({ data }) => {
  const nodeData = data as AgentNodeData;
  const connectedHandles = nodeData.connectedHandles || {
    sources: [],
    targets: [],
    arrowSources: [],
    arrowTargets: [],
  };

  const handleStyle = {
    background: "#555",
    border: "2px solid #fff",
    width: "5px",
    height: "5px",
  };

  const hiddenHandleStyle = {
    background: "transparent",
    border: "none",
    width: "5px",
    height: "5px",
  };

  const sideHandleStyle = {
    ...handleStyle,
    top: "40px", // Move handles up to align with icon area
  };

  const hiddenSideHandleStyle = {
    ...hiddenHandleStyle,
    top: "40px", // Move handles up to align with icon area
  };

  const getHandleStyle = (handleId: string, isSource: boolean) => {
    const isArrow = isSource
      ? connectedHandles.arrowSources.includes(handleId)
      : connectedHandles.arrowTargets.includes(handleId);

    const isSideHandle =
      handleId.includes("left") || handleId.includes("right");

    if (isArrow) {
      return isSideHandle ? hiddenSideHandleStyle : hiddenHandleStyle;
    }
    return isSideHandle ? sideHandleStyle : handleStyle;
  };

  return (
    <>
      {/* Top handle - show only if connected */}
      {connectedHandles.sources.includes("top") && (
        <Handle
          id="top"
          type="source"
          position={Position.Top}
          style={getHandleStyle("top", true)}
        />
      )}

      {/* Bottom target handle - show only if connected */}
      {connectedHandles.targets.includes("bottom") && (
        <Handle
          id="bottom-target"
          type="target"
          position={Position.Bottom}
          style={getHandleStyle("bottom", false)}
        />
      )}

      {/* Bottom source handle - show only if connected */}
      {connectedHandles.sources.includes("bottom") && (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          style={getHandleStyle("bottom", true)}
        />
      )}

      {/* Left source handle - show only if connected */}
      {connectedHandles.sources.includes("left-source") && (
        <Handle
          id="left-source"
          type="source"
          position={Position.Left}
          style={getHandleStyle("left-source", true)}
        />
      )}

      {/* Left target handle - show only if connected */}
      {connectedHandles.targets.includes("left") && (
        <Handle
          id="left"
          type="target"
          position={Position.Left}
          style={getHandleStyle("left", false)}
        />
      )}

      {/* Right handle - show only if connected */}
      {connectedHandles.sources.includes("right") && (
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          style={getHandleStyle("right", true)}
        />
      )}

      <AgentCard
        icon={
          <Image
            src={`/assets_ai/icons/${nodeData.icon}`}
            alt={nodeData.title}
            width={200}
            height={200}
          />
        }
        title={nodeData.title}
        description={nodeData.description}
      />
    </>
  );
};
