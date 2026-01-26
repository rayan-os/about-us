"use client";

import { motion } from "motion/react";

export const AgentCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 text-white">
      <motion.div
        className="w-[80px] h-[80px] flex items-center justify-center rounded-full"
        initial={{
          boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.2)",
        }}
        animate={{
          boxShadow: [
            "0 0 0 2px rgba(255, 255, 255, 0.2)",
            "0 0 0 8px rgba(255, 255, 255, 0.3)",
            "0 0 0 2px rgba(255, 255, 255, 0.2)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      >
        {icon}
      </motion.div>
      <div>
        <div className="text-sm font-medium text-center">{title}</div>
        <div className="text-sm text-center text-gray-400">{description}</div>
      </div>
    </div>
  );
};
