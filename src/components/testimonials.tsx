"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PixelCard from "./ui/pixel-card";

const caseStudies = [
  {
    id: 1,
    quote: "What if everyone could afford education?",
    author: "Martin Basiri",
    role: "CEO of Passage",
    pixelColors: "#f59e0b,#d97706,#b45309",
  },
  {
    id: 2,
    quote: "AI is transforming how we connect students with opportunities.",
    author: "Sarah Chen",
    role: "Director of Admissions",
    pixelColors: "#8b5cf6,#7c3aed,#6d28d9",
  },
];

// Animation variants - fast and snappy
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
};

function CaseStudyCard({
  caseStudy,
  index,
}: {
  caseStudy: (typeof caseStudies)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div 
        className="rounded-[16px] bg-[#181818] overflow-hidden flex flex-row"
        style={{
          padding: "32px",
          gap: "24px",
          minHeight: "300px",
        }}
      >
        {/* Quote content - Left side */}
        <div className="flex-1 flex flex-col justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.2, delay: index * 0.1 + 0.05 }}
            className="font-display text-2xl md:text-3xl text-white leading-tight italic"
          >
            {`"${caseStudy.quote}"`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.2, delay: index * 0.1 + 0.1 }}
            className="mt-6"
          >
            <p className="text-white/70 font-medium italic">{caseStudy.author} - {caseStudy.role}</p>
          </motion.div>
        </div>

        {/* Image - Right side with PixelCard hover effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.2, delay: index * 0.1 }}
          className="w-48 md:w-56 min-h-[250px] flex-shrink-0 self-stretch"
        >
          <PixelCard
            colors={caseStudy.pixelColors}
            gap={5}
            speed={35}
            noFocus
            className="w-full h-full rounded-[8px] bg-[#141414]"
          >
            <div className="w-full h-full" />
          </PixelCard>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Shipped. Measured. Trusted
          </h2>
        </motion.div>

        {/* Case study grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {caseStudies.map((caseStudy, i) => (
            <CaseStudyCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
