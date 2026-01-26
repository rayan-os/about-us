"use client";

import { Transition } from "motion/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { tabs } from "../constants";
import { useChatAgents } from "../hooks/use-chat-agents";
import { AgentType, SectionProps, TabsEnum, TabType } from "../types";

// Create a unique identifier for agents
export const createAgentId = (agentName: AgentType, index: number): string => {
  return `${agentName}-${index}`;
};

// Parse agent ID back to name and index
export const parseAgentId = (
  agentId: string
): { name: AgentType; index: number } => {
  const lastDashIndex = agentId.lastIndexOf("-");
  const name = agentId.substring(0, lastDashIndex) as AgentType;
  const index = parseInt(agentId.substring(lastDashIndex + 1), 10);
  return { name, index };
};

interface MobileContextType {
  activeAgentId: string;
  setActiveAgentId: (agentId: string, pauseAutoCycle?: boolean) => void;
  springConfig: Transition;
  smoothSpringConfig: Transition;
  getNextAgentId: (currentAgentId: string) => string;
  startAutoCycle: () => void;
  stopAutoCycle: () => void;
  isAutoCycling: boolean;
  currentAgent?: SectionProps;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentSections: SectionProps[];
  handleManualAgentSelection: (agentId: string) => void;
  isManuallySelected: boolean;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const MobileProvider = ({ children }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>(TabsEnum.SCHOOLS);
  const [isManuallySelected, setIsManuallySelected] = useState(false);
  const manualSelectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get current sections based on active tab
  const currentTab = tabs.find((tab) => tab.name === activeTab);
  const currentSections = currentTab?.sections || [];

  const {
    activeAgentId,
    setActiveAgentId,
    springConfig,
    smoothSpringConfig,
    getNextAgentId,
    startAutoCycle,
    stopAutoCycle,
    isAutoCycling,
  } = useChatAgents(currentSections);

  const currentAgent = (() => {
    if (!activeAgentId) return undefined;
    const { index } = parseAgentId(activeAgentId);
    return currentSections[index];
  })();

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsManuallySelected(false);
    // Reset to first agent when switching tabs
    const newSections = tabs.find((t) => t.name === tab)?.sections || [];
    if (newSections.length > 0) {
      const firstAgentId = createAgentId(newSections[0].name, 0);
      setActiveAgentId(firstAgentId, true);
    }
  };

  const handleManualAgentSelection = (agentId: string) => {
    setIsManuallySelected(true);
    setActiveAgentId(agentId, true);

    if (manualSelectionTimeoutRef.current) {
      clearTimeout(manualSelectionTimeoutRef.current);
    }

    manualSelectionTimeoutRef.current = setTimeout(() => {
      setIsManuallySelected(false);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (manualSelectionTimeoutRef.current) {
        clearTimeout(manualSelectionTimeoutRef.current);
      }
    };
  }, []);

  const value: MobileContextType = {
    activeAgentId,
    setActiveAgentId,
    springConfig,
    smoothSpringConfig,
    getNextAgentId,
    startAutoCycle,
    stopAutoCycle,
    isAutoCycling,
    currentAgent,
    activeTab,
    setActiveTab: handleTabChange,
    currentSections,
    handleManualAgentSelection,
    isManuallySelected,
  };

  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
};

export const useMobileContext = (): MobileContextType => {
  const context = useContext(MobileContext);

  if (context === undefined) {
    throw new Error("useMobileContext must be used within a MobileProvider");
  }

  return context;
};
