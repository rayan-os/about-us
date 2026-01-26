"use client";

import { Button } from "@/components/ui/button";
import Orb from "@/components/ui/orb";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useContactForm } from "./contact-form-provider";

// Word animation component - Linear style
function AnimatedWord({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(10px)", y: "100%" }}
      animate={{ opacity: 1, filter: "blur(0px)", y: "0%" }}
      transition={{
        delay,
        duration: 0.52,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openContactForm } = useContactForm();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Title words for animation (split into 2 lines)
  const titleLine1 = ["AI", "application"];
  const titleLine2 = ["processing"];

  const fadeUpVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: 0.52 + i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0D0B0C]"
    >
      {/* Orb Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: "min(100vw, 85svh)",
            height: "min(100vw, 85svh)",
            transform: "translateY(-35px)",
          }}
        >
          <Orb
            hoverIntensity={0.25}
            rotateOnHover={false}
            hue={0}
            forceHoverState={false}
            backgroundColor="#0D0B0C"
          />
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 max-w-[1400px] mx-auto px-6 py-8 text-center -mt-8 sm:mt-0"
      >
        {/* Main Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[85px] text-white leading-[1.1] tracking-tight drop-shadow-2xl mb-6">
          <span className="block">
            {titleLine1.map((word, i) => (
              <span key={i}>
                <AnimatedWord delay={0.065 + i * 0.052}>{word}</AnimatedWord>
                {i < titleLine1.length - 1 && " "}
              </span>
            ))}
          </span>
          <span className="block">
            {titleLine2.map((word, i) => (
              <span key={i}>
                <AnimatedWord delay={0.065 + (titleLine1.length + i) * 0.052}>
                  {word}
                </AnimatedWord>
                {i < titleLine2.length - 1 && " "}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[70%] md:max-w-[430px] mx-auto text-base sm:text-lg md:text-xl text-white/80 mb-12 sm:mb-12 font-body drop-shadow-lg"
        >
          Deliver a faster, smoother application experience with 24/7
          multilingual AI counseling and real-time document and eligibility
          screening.
        </motion.p>

        {/* CTA Buttons - hidden on mobile, shown on desktop */}
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex flex-col lg:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={openContactForm}
            className="group relative overflow-hidden bg-white text-black hover:bg-white/90 px-8 py-6 text-lg font-medium rounded-xl shadow-2xl ring-1 ring-white/10"
          >
            <span className="relative z-10 flex items-center gap-2">
              Request Demo
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Mobile CTA Button - fixed at bottom for thumb accessibility */}
      <motion.div
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="lg:hidden absolute bottom-8 left-0 right-0 z-20 flex justify-center px-6"
      >
        <Button
          size="lg"
          onClick={openContactForm}
          className="group relative overflow-hidden bg-white text-black hover:bg-white/90 px-8 py-6 text-lg font-medium rounded-xl shadow-2xl ring-1 ring-white/10 w-full max-w-sm"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Request Demo
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </motion.div>
    </section>
  );
}
