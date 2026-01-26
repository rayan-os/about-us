"use client";

import { TransitionType } from "@/providers/route-transition-provider";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface RouteTransitionOverlayProps {
  isActive: boolean;
  startPosition: { x: number; y: number; width: number; height: number } | null;
  targetRoute: string;
  originalContent: React.ReactNode | null;
  targetContent: React.ReactNode | null;
  transitionType: TransitionType;
  onComplete: () => void;
}

export const RouteTransitionOverlay = ({
  isActive,
  startPosition,
  targetRoute,
  originalContent,
  targetContent,
  transitionType,
  onComplete,
}: RouteTransitionOverlayProps) => {
  const [mounted, setMounted] = useState(false);
  const [showTargetContent, setShowTargetContent] = useState(false);
  const [slidePhase, setSlidePhase] = useState<
    "slideLeft" | "slideRight" | "complete"
  >("slideLeft");
  const [hasNavigated, setHasNavigated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isActive) {
      setShowTargetContent(false);
      setSlidePhase("slideLeft");
      setHasNavigated(false);
    } else {
      // Reset state when transition becomes inactive to ensure clean state for next transition
      setShowTargetContent(false);
      setSlidePhase("slideLeft");
      setHasNavigated(false);
    }
  }, [isActive]);

  const handleScaleComplete = () => {
    setShowTargetContent(true);
  };

  const handleSlideRightComplete = () => {
    setTimeout(() => {
      setSlidePhase("slideRight");
      setShowTargetContent(true);
    }, 150);
  };

  const handleSlideLeftComplete = () => {
    // Transition complete, clean up
    setSlidePhase("complete");
    setTimeout(() => {
      onComplete();
    }, 50);
  };

  const handleContentTransitionComplete = () => {
    // Navigate to target route after content transition
    router.push(targetRoute);
    // Clean up after a brief delay to ensure navigation is complete
    setTimeout(() => {
      onComplete();
    }, 100);
  };

  if (!mounted) return null;

  // Slide transition
  if (transitionType === "slide") {
    return createPortal(
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ x: "100vw" }}
            animate={{
              x:
                slidePhase === "slideLeft"
                  ? "0vw"
                  : slidePhase === "slideRight"
                  ? "-100vw"
                  : "-100vh",
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onAnimationComplete={() => {
              if (slidePhase === "slideLeft") {
                handleSlideRightComplete();
              } else if (slidePhase === "slideRight") {
                handleSlideLeftComplete();
              }
            }}
            onUpdate={(latest) => {
              // Navigate to target route when slide is halfway up (50%)
              if (
                slidePhase === "slideLeft" &&
                typeof latest.x === "string" &&
                !hasNavigated
              ) {
                const xValue = parseFloat(latest.x.replace("vw", ""));
                if (xValue <= 50 && xValue > 45) {
                  router.push(targetRoute);
                  setHasNavigated(true);
                }
              }
            }}
            className="fixed inset-0 z-[9999] bg-black overflow-hidden"
          />
        )}
      </AnimatePresence>,
      document.body
    );
  }

  // Original scale transition
  return createPortal(
    <AnimatePresence>
      {isActive && startPosition && (
        <motion.div
          initial={{
            position: "fixed",
            top: startPosition.y,
            left: startPosition.x,
            width: startPosition.width,
            height: startPosition.height,
            zIndex: 9999,
            borderRadius: "1rem",
            overflow: "hidden",
          }}
          animate={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: "0rem",
          }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onAnimationComplete={handleScaleComplete}
          className="bg-stone-900"
        >
          {/* Original content - shows during scaling */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: showTargetContent ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {originalContent}
          </motion.div>

          {/* Target content - fades in after scaling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showTargetContent ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            onAnimationComplete={
              showTargetContent ? handleContentTransitionComplete : undefined
            }
            className="absolute inset-0"
          >
            {targetContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
