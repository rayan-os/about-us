import { Handle, NodeProps, Position } from "@xyflow/react";
import Image from "next/image";
import React from "react";
import { HorizontalCard } from "../node-card/horizontal-card";

interface HorizontalProcessNodeData {
  title: string;
  icon: string;
  id: string;
  connectedHandles?: {
    sources: string[];
    targets: string[];
    arrowSources: string[];
    arrowTargets: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HorizontalProcessNode: React.FC<NodeProps<any>> = ({ data }) => {
  const nodeData = data as HorizontalProcessNodeData;
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

  const getHandleStyle = (handleId: string, isSource: boolean) => {
    const isArrow = isSource
      ? connectedHandles.arrowSources.includes(handleId)
      : connectedHandles.arrowTargets.includes(handleId);

    return isArrow ? hiddenHandleStyle : handleStyle;
  };

  return (
    <>
      {/* Input handle (left side) - show only if connected */}
      {connectedHandles.targets.includes("left") && (
        <Handle
          id="left"
          type="target"
          position={Position.Left}
          style={getHandleStyle("left", false)}
        />
      )}

      {/* Top target handle - show only if connected */}
      {connectedHandles.targets.includes("top") && (
        <Handle
          id="top"
          type="target"
          position={Position.Top}
          style={getHandleStyle("top", false)}
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

      <HorizontalCard
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

      {/* Output handle (right side) - show only if connected */}
      {connectedHandles.sources.includes("right") && (
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          style={getHandleStyle("right", true)}
        />
      )}

      {/* Output handle (top side) - show only if connected */}
      {connectedHandles.sources.includes("top") && (
        <Handle
          id="top-source"
          type="source"
          position={Position.Top}
          style={getHandleStyle("top", true)}
        />
      )}

      {/* Output handle (bottom side) - show only if connected */}
      {connectedHandles.sources.includes("bottom") && (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          style={getHandleStyle("bottom", true)}
        />
      )}
    </>
  );
};
