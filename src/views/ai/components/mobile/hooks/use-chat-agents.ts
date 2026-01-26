"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { studentSections } from "../constants";
import { AgentEnum, AgentType, SectionProps } from "../types";

// Create a unique identifier for agents
const createAgentId = (agentName: AgentType, index: number): string => {
  return `${agentName}-${index}`;
};

// Parse agent ID back to name and index
const parseAgentId = (agentId: string): { name: AgentType; index: number } => {
  const lastDashIndex = agentId.lastIndexOf("-");
  const name = agentId.substring(0, lastDashIndex) as AgentType;
  const index = parseInt(agentId.substring(lastDashIndex + 1), 10);
  return { name, index };
};

// Constants for better maintainability
const AUTO_CYCLE_INTERVAL = 3000; // 3 seconds
export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
  mass: 1,
} as const;

export const SMOOTH_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 500,
  damping: 25,
  mass: 1,
} as const;

export const useChatAgents = (
  currentSections: SectionProps[] = studentSections
) => {
  // Initialize with first agent's ID
  const initialAgentId =
    currentSections.length > 0
      ? createAgentId(currentSections[0].name, 0)
      : createAgentId(AgentEnum.JACKIE, 0);

  const [activeAgentId, setActiveAgentId] = useState<string>(initialAgentId);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get next agent in the cycle
  const getNextAgentId = useCallback(
    (currentAgentId: string): string => {
      if (currentSections.length === 0)
        return createAgentId(AgentEnum.JACKIE, 0);

      const { index } = parseAgentId(currentAgentId);

      // Handle case where current index is out of bounds
      if (index < 0 || index >= currentSections.length) {
        return createAgentId(currentSections[0].name, 0);
      }

      const nextIndex = (index + 1) % currentSections.length;
      return createAgentId(currentSections[nextIndex].name, nextIndex);
    },
    [currentSections]
  );

  // Auto-cycle through agents
  const startAutoCycle = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setActiveAgentId((currentAgentId) => getNextAgentId(currentAgentId));
    }, AUTO_CYCLE_INTERVAL);
  }, [getNextAgentId]);

  // Stop auto-cycling
  const stopAutoCycle = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Simple setActiveAgentId - no automatic cycling management
  const setActiveAgentIdWithControl = useCallback(
    (agentId: string, pauseAutoCycle = false) => {
      setActiveAgentId(agentId);

      // Always stop any existing auto-cycle when manually changing agents
      if (pauseAutoCycle) {
        stopAutoCycle();
        // No longer restart auto-cycle - let ChatMessages component handle all timing
      }
    },
    [stopAutoCycle]
  );

  // Update activeAgentId when currentSections changes
  useEffect(() => {
    if (currentSections.length > 0) {
      // Try to find the current agent in the new sections
      const { index } = parseAgentId(activeAgentId);

      // If the current index is out of bounds, reset to first agent
      if (index >= currentSections.length) {
        setActiveAgentId(createAgentId(currentSections[0].name, 0));
      } else {
        // Update the activeAgentId to match the current sections
        setActiveAgentId(createAgentId(currentSections[index].name, index));
      }
    }
  }, [currentSections, activeAgentId]);

  // No automatic cycling on mount - all timing controlled by ChatMessages
  useEffect(() => {
    return () => {
      stopAutoCycle();
    };
  }, [stopAutoCycle]);

  return {
    activeAgentId,
    setActiveAgentId: setActiveAgentIdWithControl,
    springConfig: SPRING_CONFIG,
    smoothSpringConfig: SMOOTH_SPRING_CONFIG,
    // Additional utility methods
    getNextAgentId,
    startAutoCycle,
    stopAutoCycle,
    isAutoCycling: intervalRef.current !== null,
  };
};
