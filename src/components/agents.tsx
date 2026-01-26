"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function Agents() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="workflow" ref={ref} className="py-16 sm:py-20 lg:py-24 relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white px-2">
            Design your own agents
          </h2>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="bg-[#171717] rounded-[12px] md:rounded-[16px] overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left: Text Content */}
            <div className="lg:w-[35%] p-5 sm:p-6 lg:p-12 flex flex-col justify-end order-2 lg:order-1">
              {/* Features grid on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6 lg:gap-0">
                {/* Feature 1 */}
                <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[18px] lg:mb-10">
                  <h3 className="text-base sm:text-lg lg:text-xl text-[#e7e7e7] tracking-[-0.4px] leading-[1.2]">
                    Build agents that match your process
                  </h3>
                  <p className="text-sm sm:text-base text-[#e7e7e7]/60 leading-[1.3] tracking-[-0.16px] max-w-[322px]">
                    Create AI agents tailored to your school's needs. Connect your systems and policies to deploy in days.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[18px]">
                  <h3 className="text-base sm:text-lg lg:text-xl text-[#e7e7e7] tracking-[-0.4px] leading-[1.2]">
                    Configure your workflow
                  </h3>
                  <p className="text-sm sm:text-base text-[#e7e7e7]/60 leading-[1.3] tracking-[-0.16px] max-w-[322px]">
                    Define your school's unique process, eligibility criteria, document requirements, and escalation paths in a drag-and-drop environment. Passage enforces them across every application.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="lg:w-[65%] p-4 sm:p-5 lg:p-8 order-1 lg:order-2">
              <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[450px] rounded-lg lg:rounded-xl overflow-hidden bg-[#141414]">
                {/* Dot pattern background */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #252525 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <Image
                  src="/assets_ai/buildyouragent.png"
                  alt="Turn your rules into agents interface"
                  fill
                  className="object-contain object-center scale-[0.85] sm:scale-90 relative z-10"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
