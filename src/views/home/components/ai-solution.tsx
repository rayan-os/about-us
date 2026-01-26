"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { useNurses } from "../hooks/use-nurses";
import { SectionCard } from "./section-card";

export const AiSolution = () => {
  const router = useRouter();
  const { containerRef, isHovered, textParallaxX, textParallaxY } = useNurses();

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className="h-full cursor-pointer select-none *:select-none @container"
      ref={containerRef}
    >
      <SectionCard
        title="Passage AI"
        description="AI-powered application processing for schools, lenders, and employers"
        onClick={() => {
          router.push("/ai");
        }}
      >
        <motion.div
          className="relative w-full h-full transition-all duration-500 cursor-pointer bg-black/90 rounded-2xl overflow-hidden"
          initial={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Parallax text overlay */}
          <motion.div
            className="absolute inset-0 z-50 select-none opacity-10"
            animate={{
              opacity: isMobile ? 0.6 : isHovered ? 0.2 : 0.1,
            }}
            transition={{ opacity: { duration: 0.4 }, ease: "linear" }}
            style={{
              x: useTransform(textParallaxX, (x) => `${x}px`),
              y: useTransform(textParallaxY, (y) => `${y}px`),
            }}
          >
            <div className="flex flex-col w-3/4 h-1/2 absolute bottom-0 left-4 text-left justify-end">
              <span
                className={cn(
                  "-mb-5 @md:-mb-10 @lg:-mb-14",
                  "text-[3.5rem] @md:text-[5rem] @lg:text-[7rem] font-black tracking-tighter text-left leading-none",
                )}
              >
                PASSAGE
              </span>
              <span className="text-[3rem] @md:text-[5rem] @lg:text-[7rem] font-black tracking-tighter text-left">
                AI
              </span>
            </div>
          </motion.div>

          {/* Background */}
          <div className="inset-0 absolute z-0 bg-[#141414]" />
        </motion.div>
      </SectionCard>
    </div>
  );
};
