"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function ShiningText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.h1
      className={cn(
        "bg-[linear-gradient(110deg,#777,35%,#888,50%,#fff,75%,#777)] bg-[length:200%_100%] bg-clip-text text-base font-regular text-transparent",
        className
      )}
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: 8,
        ease: "linear",
      }}
    >
      {text}
    </motion.h1>
  );
}
