"use client";

import { NoiseFilter } from "@/components/ui/noise-filter";
import { cn } from "@/lib/utils";
import { motion, useTransform } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNurses } from "../hooks/use-nurses";
import { SectionCard } from "./section-card";
import { useMediaQuery } from "@/hooks/use-media-query";

export const AfghanProgram = () => {
  const router = useRouter();
  const {
    containerRef,
    isHovered,
    backgroundX,
    backgroundY,
    textParallaxX,
    textParallaxY,
  } = useNurses();
  // console.log(aspectRatio);

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      className="h-full cursor-pointer select-none *:select-none @container"
      ref={containerRef}
    >
      <SectionCard
        title="Afghan program"
        description="Unlocking opportunities. Transforming lives"
        onClick={() => {
          router.push("https://www.passage.com/afghan-program");
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
          <motion.div
            className="absolute w-3/4 h-3/4 opacity-100 blur-[150px] rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              x: useTransform(backgroundX, (x) => `${x}px`),
              y: useTransform(backgroundY, (y) => `${y}px`),
              background: useTransform(
                [backgroundX, backgroundY],
                () =>
                  `linear-gradient(to right, #FF4D00 0%, #FF4D00 15%, #3C2B1C 35%, #FF4D00 60%, #3C2B1C 90%)`,
              ),
            }}
          />

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
                  "-mb-5 @md:-mb-10 @lg:-mb-14",
                  "text-[4rem] @md:text-[6rem] @lg:text-[8rem] font-black tracking-tighter text-left leading-none ",
                )}
              >
                AFGHAN
              </span>
              <span className="text-[3rem] @md:text-[5rem] @lg:text-[7rem] font-black tracking-tighter text-left">
                PROGRAM
              </span>
            </div>
          </motion.div>

          <motion.div
            className={cn(
              "absolute right-0 top-0 h-full z-10 select-none",
              isMobile && "opacity-20",
            )}
          >
            <Image
              src="/assets_ai/images/afghan-program.png"
              alt="afghan program"
              width={1000}
              height={1000}
              className={cn(
                "h-full w-full object-cover transition-all duration-1000 ease-in-out",
                isHovered && "scale-105 ",
              )}
              priority
            />
          </motion.div>

          {/* Text with enhanced parallax */}
        </motion.div>
      </SectionCard>
    </div>
  );
};
