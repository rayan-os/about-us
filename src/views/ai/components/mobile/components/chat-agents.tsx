"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { createAgentId, useMobileContext } from "../context";

export const ChatAgents = () => {
  const {
    activeAgentId,
    springConfig,
    smoothSpringConfig,
    currentSections,
    handleManualAgentSelection,
  } = useMobileContext();

  return (
    <motion.div
      className="flex gap-1 items-center h-16 w-full justify-center px-4"
      layout
    >
      {currentSections.map((agent, index) => {
        const agentId = createAgentId(agent.name, index);
        const isActive = activeAgentId === agentId;
        const textWidth = agent.name.length * 12;
        const key = agentId;

        return (
          <motion.div
            key={key}
            className="relative flex items-center justify-center"
            layout
          >
            <motion.div
              className={cn(
                "relative rounded-full flex items-center cursor-pointer",
                `${agent.color} backdrop-blur-sm`,
                "transition-colors duration-300",
              )}
              onClick={() => handleManualAgentSelection(agentId)}
              animate={{
                width: isActive ? 36 + textWidth + 16 : 26,
                height: isActive ? 38 : 26,
                paddingLeft: 4,
              }}
              transition={springConfig}
              whileTap={{
                scale: 0.8,
              }}
            >
              <motion.img
                className={cn(
                  "relative z-10  rounded-full flex items-center justify-center flex-shrink-0 object-cover",
                  isActive ? "opacity-100" : "opacity-90",
                )}
                animate={{
                  width: isActive ? 32 : 18,
                  height: isActive ? 32 : 18,
                  scale: 1,
                }}
                transition={springConfig}
                src={agent.avatar ?? ""}
                alt={agent.name}
                width={24}
                height={24}
              />

              <motion.div
                className="relative ml-2 flex items-center"
                animate={{
                  width: isActive ? textWidth : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{
                  ...smoothSpringConfig,
                  duration: 0.4,
                }}
              >
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.p
                      className="text-sm whitespace-nowrap capitalize text-gray-100 absolute left-0 font-major"
                      initial={{
                        x: -15,
                        opacity: 0,
                        filter: "blur(3px)",
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        x: 15,
                        opacity: 0,
                        filter: "blur(3px)",
                      }}
                      transition={{
                        delay: 0.1,
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {agent.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
