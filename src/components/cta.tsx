"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ShinyText from "./ui/shiny-text";
import { DotScreenShader } from "./ui/dot-shader-background";
import { useContactForm } from "./contact-form-provider";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openContactForm } = useContactForm();

  return (
    <section id="demo" ref={ref} className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-[16px] sm:rounded-[20px] md:rounded-[24px] py-10 sm:py-14 md:py-20 lg:py-24 px-5 sm:px-8 md:px-12 overflow-hidden">
          {/* Dot Shader Background */}
          <DotScreenShader 
            dotColor="#a8a8a8"
            bgColor="#181818"
            dotOpacity={0.35}
            gridSize={150}
            className="absolute inset-0"
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="font-body font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white max-w-xs sm:max-w-sm md:max-w-md text-center md:text-left"
            >
              Modernize admissions with{" "}
              <ShinyText
                text="Passage AI"
                color="#FF6F00"
                shineColor="#FFB366"
                speed={3}
                className="font-body font-semibold"
              />
            </motion.h2>

            <motion.button
              onClick={openContactForm}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-black/80 hover:bg-black rounded-lg text-white text-sm sm:text-base font-medium transition-colors shrink-0"
            >
              Request Demo
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
