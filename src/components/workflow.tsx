"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import PixelCard from "./ui/pixel-card";
import Folder from "./ui/folder";

const cards = [
  {
    id: 1,
    title: "Higher throughput",
    description:
      "Handle more applicants without adding headcount.",
    pixelColors: "#3b82f6,#06b6d4,#0ea5e9",
  },
  {
    id: 2,
    title: "Lower error rate",
    description:
      "Catch gaps and inconsistencies before they reach reviewers.",
    pixelColors: "#8b5cf6,#a855f7,#ec4899",
  },
  {
    id: 3,
    title: "Full accountability",
    description:
      "Every action is logged, replayable, and audit ready.",
    pixelColors: "#22c55e,#10b981,#34d399",
  },
];

function WorkflowCard({
  card,
  index,
}: {
  card: (typeof cards)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="h-full"
    >
      {/* Card container */}
      <div 
        className="group h-full rounded-[16px] bg-[#181818] p-6 flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Visual area with PixelCard effect */}
        <PixelCard
          colors={card.pixelColors}
          gap={6}
          speed={40}
          noFocus
          isActive={isHovered}
          className="h-52 mb-6 rounded-[12px] bg-[#141414]"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern
                  id={`grid-${card.id}`}
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="0.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect
                width="100"
                height="100"
                fill={`url(#grid-${card.id})`}
                className="text-white/20"
              />
            </svg>
          </div>
        </PixelCard>

        {/* Text content */}
        <div className="space-y-3 flex-1">
          <h3 className="text-2xl font-body text-white">
            {card.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isFolderInView = useInView(folderRef, { margin: "-100px" });
  const [folderOpen, setFolderOpen] = useState(false);

  // Auto-cycle folder open/close when in viewport
  useEffect(() => {
    if (!isFolderInView) {
      setFolderOpen(false);
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];
    let interval: NodeJS.Timeout | null = null;

    // First time: open quickly after 0.5 seconds
    timeouts.push(setTimeout(() => {
      setFolderOpen(true);
    }, 500));

    // First time: close after 4.5 seconds (0.5s delay + 4s open)
    timeouts.push(setTimeout(() => {
      setFolderOpen(false);
    }, 4500));

    // Start the 8-second loop after first animation completes (4s closed + 4s open)
    timeouts.push(setTimeout(() => {
      interval = setInterval(() => {
        setFolderOpen(true);
        setTimeout(() => {
          setFolderOpen(false);
        }, 4000);
      }, 8000);
    }, 4500));

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      if (interval) clearInterval(interval);
    };
  }, [isFolderInView]);

  return (
    <section id="workflow" ref={ref} className="py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Interactive Folder */}
          <div ref={folderRef} className="flex justify-center mb-6" style={{ height: '90px', position: 'relative' }}>
            <Folder
              color="#2a2a2a"
              size={1.02}
              isOpen={folderOpen}
            />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Decision grade admissions, at scale
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Passage standardizes every application into a review ready case file, so your team focuses on judgment, not process.
          </p>
        </motion.div>

        {/* Workflow cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <WorkflowCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
