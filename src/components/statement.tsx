"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Folder from "./ui/folder";

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const isFolderInView = useInView(folderRef, { margin: "-100px" });
  const [folderOpen, setFolderOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll-driven animations matching the Palantir style
  const opacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [100, 0, 0, -50]);
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [1.4, 1.1, 1.1, 1.0]);
  const scale = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0.95, 1, 1, 0.98]);

  // Words for hover effect (excluding "Passage AI" which stays highlighted)
  const textParts = [
    { text: "Passage AI", highlight: true },
    { text: "turns scattered documents, emails, and edge cases into structured, decision-ready applications - so your team can move faster with confidence.", highlight: false },
  ];

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
    <section
      ref={ref}
      className="min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center py-16 sm:py-24 lg:py-32 relative overflow-hidden"
    >

      <motion.div
        style={{ scale }}
        className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10"
      >
        {/* Folder component - scaled down on mobile */}
        <motion.div
          ref={folderRef}
          style={{ opacity, y }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="transform scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 origin-center">
            <Folder
              color="#2a2a2a"
              size={1.02}
              isOpen={folderOpen}
            />
          </div>
        </motion.div>

        <motion.p
          style={{
            opacity,
            y,
            lineHeight,
          }}
          className="font-body text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight"
        >
          <span className="text-white">Passage AI</span>{" "}
          {textParts[1].text.split(" ").map((word, i) => (
            <span
              key={i}
              className="text-white/50 hover:text-white transition-colors duration-300 cursor-default"
            >
              {word}{" "}
            </span>
          ))}
        </motion.p>
      </motion.div>

    </section>
  );
}
