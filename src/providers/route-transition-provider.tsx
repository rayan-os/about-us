"use client";

import { RouteTransitionOverlay } from "@/components/ui/route-transition-overlay";
import { createContext, ReactNode, useContext, useState } from "react";

export type TransitionType = "scale" | "slide";

interface TransitionState {
  isActive: boolean;
  startPosition: { x: number; y: number; width: number; height: number } | null;
  targetRoute: string;
  originalContent: ReactNode | null;
  targetContent: ReactNode | null;
  transitionType: TransitionType;
}

interface RouteTransitionContextType {
  startTransition: (
    element: HTMLElement,
    targetRoute: string,
    originalContent: ReactNode,
    targetContent: ReactNode,
    transitionType?: TransitionType
  ) => void;
  isTransitioning: boolean;
}

const RouteTransitionContext = createContext<RouteTransitionContextType>({
  startTransition: () => {},
  isTransitioning: false,
});

export const useRouteTransition = () => {
  const context = useContext(RouteTransitionContext);
  if (!context) {
    throw new Error(
      "useRouteTransition must be used within RouteTransitionProvider"
    );
  }
  return context;
};

export const RouteTransitionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isActive: false,
    startPosition: null,
    targetRoute: "",
    originalContent: null,
    targetContent: null,
    transitionType: "scale",
  });

  const startTransition = (
    element: HTMLElement,
    targetRoute: string,
    originalContent: ReactNode,
    targetContent: ReactNode,
    transitionType: TransitionType = "scale"
  ) => {
    const rect = element.getBoundingClientRect();

    setTransitionState({
      isActive: true,
      startPosition: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      },
      targetRoute,
      originalContent,
      targetContent,
      transitionType,
    });
  };

  const handleTransitionComplete = () => {
    setTransitionState({
      isActive: false,
      startPosition: null,
      targetRoute: "",
      originalContent: null,
      targetContent: null,
      transitionType: "scale",
    });
  };

  return (
    <RouteTransitionContext.Provider
      value={{
        startTransition,
        isTransitioning: transitionState.isActive,
      }}
    >
      {children}
      <RouteTransitionOverlay
        isActive={transitionState.isActive}
        startPosition={transitionState.startPosition}
        targetRoute={transitionState.targetRoute}
        originalContent={transitionState.originalContent}
        targetContent={transitionState.targetContent}
        transitionType={transitionState.transitionType}
        onComplete={handleTransitionComplete}
      />
    </RouteTransitionContext.Provider>
  );
};
