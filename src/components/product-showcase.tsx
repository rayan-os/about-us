"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            See every applicant. Miss nothing.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Every file becomes a tracked case. Passage extracts the facts, routes edge cases, and logs every decision.
          </p>
        </motion.div>

        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="relative overflow-hidden bg-[#181818] border border-white/5 mx-auto"
          style={{ borderRadius: "12px", width: "70%" }}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.02] pointer-events-none z-10" style={{ borderRadius: "12px" }} />
          
          <Image
            src="/assets_ai/admin panel lg.png"
            alt="Passage admin dashboard showing applicant management interface"
            width={1920}
            height={1080}
            className="w-full h-auto"
            style={{ borderRadius: "12px" }}
            priority
          />
          
          {/* Bottom fade for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0E0C0D] to-transparent pointer-events-none z-10" />
        </motion.div>
      </div>
    </section>
  );
}
