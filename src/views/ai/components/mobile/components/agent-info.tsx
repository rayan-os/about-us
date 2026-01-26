"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useMobileContext } from "../context";

export const AgentInfo = () => {
  const { activeAgentId, springConfig, currentAgent } = useMobileContext();

  return (
    <motion.div
      key={activeAgentId}
      initial={{
        opacity: 0,
        x: -50,
        skewX: -2,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        x: 0,
        skewX: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: -50,
        skewX: 2,
        scale: 0.98,
        transition: { duration: 0.3, ease: "easeIn" },
      }}
      transition={springConfig}
      className="flex flex-col justify-center gap-4 max-w-sm"
    >
      {currentAgent?.avatar ? (
        <motion.div
          className="w-16 h-16 rounded-lg"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...springConfig, delay: 0.1 }}
        >
          <Image
            src={currentAgent.avatar}
            alt={currentAgent.name}
            width={64}
            height={64}
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>
      ) : (
        <motion.div
          className={`w-16 h-16 rounded-lg ${currentAgent?.color} flex items-center justify-center text-4xl font-bold`}
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...springConfig, delay: 0.1 }}
        >
          {currentAgent?.name?.[0]}
        </motion.div>
      )}

      <motion.div
        className="flex flex-col gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.15 }}
      >
        <div>
          <p className="text-lg font-bold capitalize">
            {currentAgent?.name?.toLocaleLowerCase()} Agent
          </p>

          <p className="text-sm text-gray-500">{currentAgent?.subTitle}</p>
        </div>

        <p className="text-gray-300">{currentAgent?.description}</p>
      </motion.div>
    </motion.div>
  );
};
