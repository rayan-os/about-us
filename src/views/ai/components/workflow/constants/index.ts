import { Edge, MarkerType, Node } from "@xyflow/react";
import {
  AgentNode,
  GlassmorphismGroupNode,
  HorizontalProcessNode,
  VerticalServiceNode,
} from "../components/nodes";

export const nodeTypes = {
  horizontal: HorizontalProcessNode,
  vertical: VerticalServiceNode,
  agent: AgentNode,
  glassmorphismGroup: GlassmorphismGroupNode,
};

// const animationStyle = {
//   style: { strokeDasharray: "5,5" },
//   animated: true,
// };

const arrowStyle = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#ffffff",
    width: 20,
    height: 20,
  },
  style: { stroke: "#ffffff", strokeWidth: 1 },
};

export const getConnectedHandles = (edges: Edge[]) => {
  const connectedHandles: Record<
    string,
    {
      sources: string[];
      targets: string[];
      arrowSources: string[];
      arrowTargets: string[];
    }
  > = {};

  edges.forEach((edge) => {
    const hasArrow = edge.markerEnd !== undefined;

    // Initialize if not exists
    if (!connectedHandles[edge.source]) {
      connectedHandles[edge.source] = {
        sources: [],
        targets: [],
        arrowSources: [],
        arrowTargets: [],
      };
    }
    if (!connectedHandles[edge.target]) {
      connectedHandles[edge.target] = {
        sources: [],
        targets: [],
        arrowSources: [],
        arrowTargets: [],
      };
    }

    // Add source handle
    if (
      edge.sourceHandle &&
      !connectedHandles[edge.source].sources.includes(edge.sourceHandle)
    ) {
      connectedHandles[edge.source].sources.push(edge.sourceHandle);
      if (hasArrow) {
        connectedHandles[edge.source].arrowSources.push(edge.sourceHandle);
      }
    }

    // Add target handle
    if (
      edge.targetHandle &&
      !connectedHandles[edge.target].targets.includes(edge.targetHandle)
    ) {
      connectedHandles[edge.target].targets.push(edge.targetHandle);
      if (hasArrow) {
        connectedHandles[edge.target].arrowTargets.push(edge.targetHandle);
      }
    }
  });

  return connectedHandles;
};

export const Nodes = {
  counselling: {
    icon: "counselling.svg",
    title: "Counseling",
    type: "horizontal",
  },
  create_application: {
    icon: "create_application.svg",
    title: "Create application",
    type: "horizontal",
  },
  credit_check: {
    icon: "credit_check.svg",
    title: "Credit check",
    type: "horizontal",
  },
  diligence_screening: {
    icon: "diligence_screening.svg",
    title: "Diligence screening",
    type: "horizontal",
  },
  document_analysis: {
    icon: "document_analysis.svg",
    title: "Document analysis",
    type: "horizontal",
  },
  kyc: {
    icon: "kyc.svg",
    title: "KYC",
    type: "horizontal",
  },
  org_approval: {
    icon: "org_approval.svg",
    title: "Org approval",
    type: "horizontal",
  },
  study_permit: {
    icon: "study_permit.svg",
    title: "Study permit",
    type: "horizontal",
  },
  david: {
    icon: "david.png",
    title: "David",
    description: "AI processor",
    type: "agent",
  },
  human_input: {
    icon: "human_input.svg",
    title: "Human input",
    type: "vertical",
  },
  jackie: {
    icon: "jackie.png",
    title: "Jackie",
    description: "AI counselor",
    type: "agent",
  },
  talent: {
    icon: "talent.svg",
    title: "Talent",
    type: "vertical",
  },
  talent_plus: {
    icon: "talent_plus.svg",
    title: "10x Talent",
    type: "vertical",
  },
  ella: {
    icon: "ella.png",
    title: "Ella",
    description: "AI interviewer",
    type: "agent",
  },
  live_interview: {
    icon: "live_interview.svg",
    title: "Live interview",
    type: "vertical",
  },
  find_opportunities: {
    icon: "find_opportunities.svg",
    title: "Find opportunities",
    type: "horizontal",
  },
  assess_talent: {
    icon: "assess_talent.svg",
    title: "Assess talent",
    type: "horizontal",
  },
  submit_application: {
    icon: "submit_application.svg",
    title: "Submit application",
    type: "horizontal",
  },
  incoming_call: {
    icon: "incoming_call.svg",
    title: "Answer calls",
    type: "horizontal",
  },
  incoming_email: {
    icon: "incoming_email.svg",
    title: "Answer emails",
    type: "horizontal",
  },
  connect_to_human: {
    icon: "connect_to_human.svg",
    title: "Connect to human",
    type: "horizontal",
  },
  mark: {
    icon: "mark.png",
    title: "Mark",
    description: "AI support",
    type: "agent",
  },
};

const nodePositions: Record<
  string,
  { x: number; y: number; type: string; parentId?: string }
> = {
  talent: { x: 50, y: 162, type: "vertical" },

  // Jackie's workflow group container
  jackie_group: { x: 265, y: 155, type: "glassmorphismGroup" },
  jackie: { x: 130, y: 40, type: "agent", parentId: "jackie_group" },
  counselling: {
    x: 67.5,
    y: 210,
    type: "horizontal",
    parentId: "jackie_group",
  },
  find_opportunities: {
    x: 38.5,
    y: 310,
    type: "horizontal",
    parentId: "jackie_group",
  },
  create_application: {
    x: 38.5,
    y: 415,
    type: "horizontal",
    parentId: "jackie_group",
  },

  // Mark's workflow group container
  mark_group: { x: 210, y: -260, type: "glassmorphismGroup" },
  mark: { x: 40, y: 125, type: "agent", parentId: "mark_group" },
  incoming_call: { x: 198, y: 216, type: "horizontal", parentId: "mark_group" },
  incoming_email: {
    x: 198,
    y: 136,
    type: "horizontal",
    parentId: "mark_group",
  },
  connect_to_human: {
    x: 198,
    y: 53,
    type: "horizontal",
    parentId: "mark_group",
  },

  // David's workflow group container
  david_group: { x: 755, y: -105, type: "glassmorphismGroup" },
  david: { x: 50, y: 105, type: "agent", parentId: "david_group" },
  kyc: { x: 260, y: 25, type: "horizontal", parentId: "david_group" },
  document_analysis: {
    x: 260,
    y: 95,
    type: "horizontal",
    parentId: "david_group",
  },
  diligence_screening: {
    x: 260,
    y: 165,
    type: "horizontal",
    parentId: "david_group",
  },
  credit_check: { x: 260, y: 235, type: "horizontal", parentId: "david_group" },

  // Ella's workflow group container
  ella_group: { x: 755, y: 280, type: "glassmorphismGroup" },
  ella: { x: 50, y: 50, type: "agent", parentId: "ella_group" },
  live_interview: { x: 260, y: 32, type: "horizontal", parentId: "ella_group" },
  assess_talent: { x: 260, y: 132, type: "horizontal", parentId: "ella_group" },

  submit_application: { x: 1450, y: 187, type: "horizontal" },

  talent_plus: { x: 1800, y: 175, type: "vertical" },
};

export const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "talent",
    target: "jackie",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e2",
    source: "jackie",
    target: "counselling",
    sourceHandle: "bottom",
    targetHandle: "top",
    ...arrowStyle,
  },
  {
    id: "e3",
    source: "counselling",
    target: "find_opportunities",
    sourceHandle: "bottom",
    targetHandle: "top",
    ...arrowStyle,
  },
  {
    id: "e4",
    source: "find_opportunities",
    target: "create_application",
    sourceHandle: "bottom",
    targetHandle: "top",
    ...arrowStyle,
  },
  {
    id: "e5",
    source: "create_application",
    target: "david",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e6",
    source: "create_application",
    target: "ella",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e7",
    source: "david",
    target: "kyc",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e8",
    source: "david",
    target: "document_analysis",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e9",
    source: "david",
    target: "diligence_screening",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e10",
    source: "david",
    target: "credit_check",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e11",
    source: "ella",
    target: "live_interview",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e12",
    source: "ella",
    target: "assess_talent",
    sourceHandle: "right",
    targetHandle: "left",
  },

  {
    id: "e13",
    source: "david_group",
    target: "submit_application",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e17",
    source: "submit_application",
    target: "talent_plus",
    sourceHandle: "right",
    targetHandle: "left-target",
  },
  {
    id: "e18",
    source: "ella_group",
    target: "submit_application",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e19",
    source: "talent",
    target: "mark",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e20",
    source: "mark",
    target: "incoming_call",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e21",
    source: "mark",
    target: "incoming_email",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "e22",
    source: "mark",
    target: "connect_to_human",
    sourceHandle: "right",
    targetHandle: "left",
  },
];

export const initialNodes: Node[] = (() => {
  const connectedHandles = getConnectedHandles(initialEdges);

  return Object.entries(nodePositions).map(([nodeKey, config]) => {
    const handles = connectedHandles[nodeKey] || { sources: [], targets: [] };

    // Handle group node specially
    if (nodeKey === "jackie_group") {
      return {
        id: nodeKey,
        type: "glassmorphismGroup",
        position: { x: config.x, y: config.y },
        style: {
          width: 340,
          height: 510,
        },
        data: {
          label: "Jackie's workflow",
          connectedHandles: handles,
        },
      };
    }

    if (nodeKey === "ella_group") {
      return {
        id: nodeKey,
        type: "glassmorphismGroup",
        position: { x: config.x, y: config.y },
        style: {
          width: 520,
          height: 220,
        },
        data: {
          label: "Ella's workflow",
          connectedHandles: handles,
        },
      };
    }

    if (nodeKey === "david_group") {
      return {
        id: nodeKey,
        type: "glassmorphismGroup",
        position: { x: config.x, y: config.y },
        style: {
          width: 560,
          height: 320,
        },
        data: {
          label: "David's workflow",
          connectedHandles: handles,
        },
      };
    }

    if (nodeKey === "mark_group") {
      return {
        id: nodeKey,
        type: "glassmorphismGroup",
        position: { x: config.x, y: config.y },
        style: {
          width: 500,
          height: 330,
        },
        data: {
          label: "Mark's workflow",
          connectedHandles: handles,
        },
      };
    }

    // Handle regular nodes
    const nodeData = Nodes[nodeKey as keyof typeof Nodes];
    const nodeConfig: Node = {
      id: nodeKey,
      type: config.type,
      position: { x: config.x, y: config.y },
      data: {
        title: nodeData.title,
        icon: nodeData.icon,
        id: nodeKey,
        description: (nodeData as { description?: string }).description || "",
        connectedHandles: handles,
      },
      ...(config.parentId && {
        parentId: config.parentId,
        extent: "parent",
      }),
    };

    return nodeConfig;
  });
})();
