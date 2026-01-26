"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const Warp = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.Warp),
  { ssr: false }
);

// Feather icon component (Nucleo Arcade style)
const FeatherIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8L2 22M17.5 15H9" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Shield check icon (Nucleo Arcade style)
const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 12l2 2 4-4" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Clipboard check icon (for enrollment/completion)
const ClipboardCheckIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <rect 
      x="8" 
      y="2" 
      width="8" 
      height="4" 
      rx="1" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 12l2 2 4-4" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const solutions = [
  {
    id: "counseling",
    title: "Intake",
    description:
      "Answer questions, guide applicants through the process, and follow up when they stall. So more applications actually get finished.",
    Icon: FeatherIcon,
    image: "/assets_ai/chat interface.png",
    imageScale: 0.9,
    shader: {
      colors: ["#121212", "#a9a7ae", "#121212", "#6a6774"],
      proportion: 0.45,
      softness: 1,
      distortion: 0.25,
      swirl: 0.8,
      swirlIterations: 10,
      shape: "checks" as const,
      shapeScale: 0.1,
      speed: 1.5,
    },
  },
  {
    id: "verification",
    title: "Verify",
    description:
      "Automatic checks for identity and documents. Anything unusual gets flagged for review, and everything is tracked.",
    Icon: ShieldCheckIcon,
    image: "/assets_ai/admin panel.png?v=2",
    shader: {
      colors: ["#040103e8", "#483271", "#030303"],
      proportion: 0.64,
      softness: 1,
      distortion: 0.2,
      swirl: 0.86,
      swirlIterations: 7,
      shape: "edge" as const,
      shapeScale: 0.6,
      speed: 3.4,
      scale: 0.9,
      rotation: 160,
    },
  },
  {
    id: "processing",
    title: "Human Decision",
    description:
      "Every decision is recorded, including overrides and exceptions.",
    Icon: ClipboardCheckIcon,
    image: "/assets_ai/decision-making-dashboard.png",
    imageScale: 0.95,
    shader: {
      colors: ["#14120f", "#af8141", "#000000"],
      proportion: 0.24,
      softness: 1,
      distortion: 0.21,
      swirl: 0.57,
      swirlIterations: 10,
      shape: "edge" as const,
      shapeScale: 0.75,
      speed: 2.1,
      scale: 2,
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
};

export function Solutions() {
  const [activeId, setActiveId] = useState("counseling");
  const [accordionHeight, setAccordionHeight] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate through solutions every 6 seconds
  useEffect(() => {
    if (isPaused) return;

    const solutionIds = solutions.map((s) => s.id);
    const interval = setInterval(() => {
      setActiveId((current) => {
        const currentIndex = solutionIds.indexOf(current);
        const nextIndex = (currentIndex + 1) % solutionIds.length;
        return solutionIds[nextIndex];
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle manual selection - pause temporarily then resume
  const handleSelect = (id: string) => {
    setActiveId(id);
    setIsPaused(true);

    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    // Resume auto-rotation after 18 seconds of inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 18000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Measure accordion height and sync with image container
  useEffect(() => {
    const updateHeight = () => {
      if (accordionRef.current) {
        setAccordionHeight(accordionRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    
    const timeout = setTimeout(updateHeight, 350);

    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timeout);
    };
  }, [activeId]);

  return (
    <section id="solutions" ref={ref} className="py-32 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Turn admissions into a decision pipeline
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Accordion */}
          <motion.div
            ref={accordionRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-3"
          >
            {solutions.map((solution) => {
              const isActive = activeId === solution.id;
              const Icon = solution.Icon;

              return (
                <motion.div
                  key={solution.id}
                  variants={itemVariants}
                  onClick={() => handleSelect(solution.id)}
                  className="relative cursor-pointer overflow-hidden rounded-[16px] bg-[#181818] transition-all duration-300 ease-out"
                  style={{
                    height: isActive ? "340px" : "100px",
                  }}
                >
                  <div className="p-8 h-full flex flex-col">
                    {/* Icon - uses CSS grid for smooth height */}
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-12">
                          <Icon className="w-6 h-6 text-white/60" />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-display text-white leading-tight transition-all duration-300 ease-out ${
                        isActive ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
                      }`}
                    >
                      {solution.title}
                    </h3>

                    {/* Description - uses CSS grid for smooth height */}
                    <div
                      className="grid transition-all duration-300 ease-out flex-1"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-white/50 text-base leading-relaxed max-w-md pt-16">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Preview Panel - Dynamic Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="relative rounded-[16px] overflow-hidden bg-[#181818] transition-all duration-300 ease-out"
            style={{
              height: accordionHeight > 0 ? accordionHeight : "auto",
              minHeight: "500px",
            }}
          >
            {/* Warp shader background - crossfade */}
            {solutions.map((solution) => (
              <div
                key={`shader-${solution.id}`}
                className="absolute inset-0 overflow-hidden rounded-[16px] transition-opacity duration-500 ease-out"
                style={{
                  opacity: solution.id === activeId ? 1 : 0,
                  pointerEvents: solution.id === activeId ? "auto" : "none",
                }}
              >
                <Warp
                  style={{ width: "100%", height: "100%" }}
                  {...solution.shader}
                />
              </div>
            ))}

            {/* Dynamic image based on active solution - crossfade */}
            {solutions.map((solution) => {
              if (!solution.image) return null;
              const scale = solution.imageScale || 1;
              return (
                <div
                  key={solution.id}
                  className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-400 ease-out"
                  style={{
                    opacity: solution.id === activeId ? 1 : 0,
                    transform: solution.id === activeId ? "scale(1)" : "scale(0.97)",
                    pointerEvents: solution.id === activeId ? "auto" : "none",
                  }}
                >
                  <div 
                    className="relative"
                    style={{
                      width: `${scale * 100}%`,
                      height: `${scale * 100}%`,
                    }}
                  >
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
