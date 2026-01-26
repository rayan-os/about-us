import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { createAgentId, useMobileContext } from "../context";

export const Agents = () => {
  const { currentSections, activeAgentId, setActiveAgentId } =
    useMobileContext();

  return (
    <div className="flex flex-col gap-8 items-center">
      {currentSections.map((agent, index) => {
        const agentId = createAgentId(agent.name, index);
        const isActive = activeAgentId === agentId;

        return (
          <motion.div
            key={agentId}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: isActive ? 1 : 0.2,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={cn(
              "flex flex-col justify-center gap-4 max-w-sm transition-opacity duration-300 cursor-pointer"
            )}
            onClick={() => setActiveAgentId(agentId)}
          >
            <div className="flex items-end gap-4">
              {agent?.avatar ? (
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={64}
                    height={64}
                    className="object-cover rounded-lg w-full h-full object-top "
                    priority
                  />
                </div>
              ) : (
                <div
                  className={`w-16 h-16 rounded-lg ${agent?.color} flex items-center justify-center text-4xl font-bold`}
                >
                  {agent?.name?.[0]}
                </div>
              )}

              <div>
                <p className="text-lg font-bold capitalize">
                  {agent?.name?.toLocaleLowerCase()}
                </p>

                <p className="text-sm text-gray-300">{agent?.subTitle}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-300">{agent?.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
