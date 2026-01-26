"use client";

import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";
import { motion } from "motion/react";
import { useFraudDetection } from "./hooks/use-fraud-detection";

interface FraudDetectionVisualProps {
  className?: string;
  isActive?: boolean;
}

export const threats = [
  { x: 20, y: 20, risk: "high" },
  { x: 80, y: 30, risk: "medium" },
  { x: 30, y: 70, risk: "low" },
  { x: 75, y: 80, risk: "high" },
  { x: 60, y: 15, risk: "medium" },
];

export const FraudDetectionVisual = ({
  className,
  isActive = false,
}: FraudDetectionVisualProps) => {
  const { scanningAngle } = useFraudDetection(isActive);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-red-500/20 bg-red-500/5" />
          ))}
        </div>
      </div>

      {/* Central radar circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-32 h-32">
          {/* Radar circles */}
          {[1, 2, 3, 4].map((ring) => (
            <motion.div
              key={ring}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-red-500/30 rounded-full"
              style={{
                width: `${ring * 32}px`,
                height: `${ring * 32}px`,
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: ring * 0.2,
              }}
            />
          ))}

          {/* Scanning line */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-red-500 to-transparent origin-left"
            style={{
              transform: `translate(-50%, -50%) rotate(${scanningAngle}deg)`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Shield icon in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0 0 rgba(239, 68, 68, 0.4)",
                  "0 0 0 8px rgba(239, 68, 68, 0.1)",
                  "0 0 0 0 rgba(239, 68, 68, 0.4)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Shield />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Threat indicators */}
      <div className="absolute inset-0">
        {threats.map((threat, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${threat.x}%`,
              top: `${threat.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0,
            }}
            transition={{
              delay: index * 0.5,
              duration: 0.3,
            }}
          >
            <motion.div
              className={cn(
                "w-3 h-3 rounded-full",
                threat.risk === "high" && "bg-red-500",
                threat.risk === "medium" && "bg-yellow-500",
                threat.risk === "low" && "bg-green-500"
              )}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Alert counter */}
      {/* <div className="absolute top-4 right-4">
        <motion.div
          className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-mono"
          animate={{
            scale: alertCount > 0 ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          ALERTS: {alertCount}
        </motion.div>
      </div> */}

      {/* Status indicator */}
      <div className="absolute bottom-4 left-4">
        <motion.div
          className="flex items-center space-x-2"
          animate={{
            opacity: isActive ? 1 : 0.5,
          }}
        >
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
          <span className="text-xs font-mono text-green-500">
            {isActive ? "MONITORING" : "STANDBY"}
          </span>
        </motion.div>
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Animated connection lines between threats */}
        {[
          { x1: "20%", y1: "20%", x2: "80%", y2: "30%" },
          { x1: "30%", y1: "70%", x2: "75%", y2: "80%" },
          { x1: "60%", y1: "15%", x2: "50%", y2: "50%" },
        ].map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(239, 68, 68, 0.3)"
            strokeWidth="1"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: isActive ? 1 : 0,
              strokeDashoffset: [0, -8],
            }}
            transition={{
              pathLength: { delay: index * 0.3, duration: 0.8 },
              strokeDashoffset: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
};
