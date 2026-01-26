"use client";

import { NoiseFilter } from "@/components/ui/noise-filter";
import { PASSAGE_INTERNATIONAL_STUDENTS_URL } from "@/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion, useTransform } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNurses } from "../hooks/use-nurses";
import { SectionCard } from "./section-card";

export const InternationalStudentsV2 = () => {
  const router = useRouter();
  const { containerRef, isHovered, textParallaxX, textParallaxY } = useNurses();

  // console.log(aspectRatio);

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      className="h-full cursor-pointer select-none *:select-none @container"
      ref={containerRef}
    >
      <SectionCard
        title="International students"
        description="Financing up to $75,000 for the most ambitious international students to study in Canada"
        onClick={() => {
          router.push(PASSAGE_INTERNATIONAL_STUDENTS_URL);
        }}
      >
        <motion.div
          className={`relative w-full h-full transition-all duration-500 cursor-pointer bg-black/90 rounded-2xl overflow-hidden`}
          initial={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <NoiseFilter className="z-20" customContainer={true} />

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
                  "text-[3.5rem] @md:text-[5rem] @lg:text-[7rem] font-black tracking-tighter text-left leading-none ",
                )}
              >
                ADMISSION
              </span>
              <span className="text-[3rem] @md:text-[5rem] @lg:text-[7rem] font-black tracking-tighter text-left">
                &FINANCING
              </span>
            </div>
          </motion.div>
          {/* Dynamic background that smoothly follows cursor */}
          <div className="inset-0 absolute z-0 bg-black" />

          <motion.div
            className={cn("absolute inset-0 z-10 select-none opacity-60")}
            animate={{
              opacity: isHovered ? 0.8 : 0.6,
            }}
            transition={{ opacity: { duration: 0.4 }, ease: "linear" }}
          >
            <Image
              src="/assets_ai/images/college-2.png"
              alt="international students"
              width={1000}
              height={1000}
              className={cn(
                "h-full w-full object-cover transition-all duration-1000 ease-in-out",
                isHovered && "scale-105 ",
              )}
              priority
            />
          </motion.div>
          <div className="inset-0 absolute z-10 bg-gradient-to-t from-black/90 to-transparent" />

          {/* Text with enhanced parallax */}
        </motion.div>
      </SectionCard>
    </div>
  );
};
