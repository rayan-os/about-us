"use client";

import { motion } from "motion/react";
import { useRequirementCheck } from "./hooks/use-requirement-check";

export const RequirementChecker = () => {
  const {
    visibleCards,
    isAnimating,
    getCardAnimation,
    getStatusText,
    getStatusIcon,
  } = useRequirementCheck();

  return (
    <div className="w-full h-55 flex flex-col items-center justify-center p-10 md:p-20">
      <div className="w-full relative">
        {visibleCards.map((requirement, index) => {
          const animProps = getCardAnimation(index);
          const statusInfo = getStatusText(requirement.status);
          const isTopCard = index === 0;

          return (
            <motion.div
              key={requirement.id}
              className={`w-full p-5 ${animProps.background} rounded-lg flex justify-between items-center absolute`}
              animate={{
                y: animProps.y,
                scale: animProps.scale,
                opacity: animProps.opacity,
                left: animProps.left,
                right: animProps.right,
              }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "tween",
              }}
              style={{
                zIndex: animProps.zIndex,
              }}
            >
              <motion.p
                className="text-lg text-white"
                animate={{
                  opacity: isAnimating && isTopCard ? 0 : 1,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {requirement.name}
              </motion.p>

              <motion.div
                className="flex items-center gap-1"
                animate={{
                  opacity: isAnimating && isTopCard ? 0 : 1,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {getStatusIcon(requirement.status)}
                <p className={`text-sm font-medium ${statusInfo.color}`}>
                  {statusInfo.text}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
