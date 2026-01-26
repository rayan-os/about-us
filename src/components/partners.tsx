"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Fleming College", logo: "/assets_ai/Fleming Logo.png" },
  { name: "George Brown College", logo: "/assets_ai/GBC Logo.png" },
  { name: "Humber College", logo: "/assets_ai/Humber logo.png" },
  { name: "NorQuest College", logo: "/assets_ai/Norquest College Logo.png" },
  { name: "Seneca College", logo: "/assets_ai/Seneca Logo.png" },
  { name: "Thompson Rivers University", logo: "/assets_ai/TRU Logo.png" },
];

function LogoItem({ partner }: { partner: typeof partners[0] }) {
  return (
    <div className="flex items-center justify-center h-20 px-8 shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
      <Image
        src={partner.logo}
        alt={partner.name}
        width={140}
        height={60}
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}

export function Partners() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Duplicate partners array multiple times to ensure seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Section Title */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center text-white/50 text-lg mb-12 max-w-7xl mx-auto px-6"
      >
        Used by institutions across Canada and beyond
      </motion.p>

      {/* Logo Marquee - constrained to max-w-7xl like the cards below */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative group overflow-hidden"
        >
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0E0C0D] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0E0C0D] to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <div className="flex shrink-0 marquee-seamless group-hover:[animation-play-state:paused]">
              {duplicatedPartners.map((partner, index) => (
                <LogoItem key={`${partner.name}-${index}`} partner={partner} />
              ))}
            </div>
            <div className="flex shrink-0 marquee-seamless group-hover:[animation-play-state:paused]" aria-hidden="true">
              {duplicatedPartners.map((partner, index) => (
                <LogoItem key={`${partner.name}-dup-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
