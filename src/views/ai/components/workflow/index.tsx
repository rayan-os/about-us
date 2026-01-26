import {
  Background,
  NodeTypes,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

import { PanTiltIndicator } from "@/components/ui/pan-tilt-indicator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { initialEdges, initialNodes, nodeTypes } from "./constants";

export const WorkFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const [showPanTiltIndicator, setShowPanTiltIndicator] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleIndicatorHide = useCallback(() => {
    setShowPanTiltIndicator(false);
  }, []);

  const handleWorkflowMove = useCallback(() => {
    if (isMobile && showPanTiltIndicator) {
      setShowPanTiltIndicator(false);
    }
  }, [isMobile, showPanTiltIndicator]);

  console.log(nodes);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI-powered application workflow
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Complete end-to-end workflow from talent sourcing through
            AI-assisted counseling, application processing, and document
            verification to final placement.
          </p>
        </div>

        <div
          className={cn(
            isMobile ? "h-[450px]" : "h-[650px]",
            "w-full bg-stone-950 rounded-3xl overflow-hidden relative"
          )}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onMoveStart={handleWorkflowMove}
            nodeTypes={nodeTypes as NodeTypes}
            deleteKeyCode="Delete"
            fitView={!isMobile}
            className="bg-gray-900"
            zoomOnScroll={isMobile}
            zoomOnPinch={isMobile}
            preventScrolling={false}
            defaultViewport={{ x: -20, y: -20, zoom: 1 }}
            nodesConnectable={false}
          >
            <Background gap={20} size={1} color="#555" />
          </ReactFlow>

          {isMobile && (
            <PanTiltIndicator
              show={showPanTiltIndicator}
              onHide={handleIndicatorHide}
            />
          )}
        </div>
      </div>
    </section>
  );
};
