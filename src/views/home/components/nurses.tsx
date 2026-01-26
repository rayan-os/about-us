"use client";

import { NoiseFilter } from "@/components/ui/noise-filter";
import { cn } from "@/lib/utils";
import { motion, useTransform } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNurses } from "../hooks/use-nurses";
import { SectionCard } from "./section-card";
import { useMediaQuery } from "@/hooks/use-media-query";

export const Nurses = () => {
  const router = useRouter();
  const { containerRef, isHovered, textParallaxX, textParallaxY } = useNurses();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className="h-full cursor-pointer select-none *:select-none @container"
      ref={containerRef}
    >
      <SectionCard
        title="Nursing career pathway"
        description="Work as a Registered Nurse in the USA 🇺🇸"
        onClick={() => {
          router.push("https://www.passage.com/opportunities/us-nursing");
        }}
      >
        <motion.div
          className={`relative h-full transition-all duration-500 cursor-pointer bg-black/90 rounded-2xl overflow-hidden`}
          initial={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <NoiseFilter className="z-20" customContainer={true} />

          {/* Dynamic background that smoothly follows cursor */}
          <motion.div className="absolute w-3/4 h-3/4 opacity-100 blur-[150px] rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#3B3C80] to-[#01ABDF]" />

          <motion.div
            className="absolute inset-0 z-20 select-none opacity-10"
            style={{
              x: useTransform(textParallaxX, (x) => `${x}px`),
              y: useTransform(textParallaxY, (y) => `${y}px`),
            }}
            animate={{
              opacity: isMobile ? 0.6 : isHovered ? 0.2 : 0.1,
            }}
            transition={{ opacity: { duration: 0.4 }, ease: "linear" }}
          >
            <div className="flex flex-col w-3/4 h-1/2 absolute bottom-0 left-4 text-left justify-end">
              <span
                className={cn(
                  "-mb-5 @md:-mb-10 @lg:-mb-14 ps-1",
                  "text-[2.5rem] @md:text-[4rem] @lg:text-[4.5rem] font-black tracking-tighter text-left leading-none ",
                )}
              >
                REGISTERED
              </span>
              <span className="text-[3.5rem] @md:text-[6rem] @lg:text-[8rem] font-black tracking-tighter text-left">
                NURSE
              </span>
            </div>
          </motion.div>
          {/* Image with parallax effect */}
          <motion.div
            className={cn(
              "absolute right-0 top-0 h-full z-10 select-none",
              isMobile && "opacity-40",
            )}
          >
            <Image
              src="/assets_ai/images/nurse.png"
              alt="nurse"
              width={1000}
              height={1000}
              className={cn(
                "h-full w-full object-cover transition-all duration-1000 ease-in-out",
                isHovered && "scale-105 ",
              )}
              priority
            />
          </motion.div>
        </motion.div>
      </SectionCard>
    </div>
  );
};
