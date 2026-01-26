"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

import { PassportScrollerHero } from "./passport-scroller-hero";
import { AgentMarkDemo } from "./agent-mark-demo";
import { AgentEllaDemo } from "./agent-ella-demo";

const Warp = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.Warp),
  { ssr: false }
);

interface TabContent {
  id: string;
  tabLabel: string;
  agentName: string;
  agentRole: string;
  agentImage: string;
  agentColor: string;
  description: string;
  subDescription: string;
  chatImage: string;
  previewImage: string;
  titleColor: string;
  shader: {
    colors: string[];
    proportion: number;
    softness: number;
    distortion: number;
    swirl: number;
    swirlIterations: number;
    shape: "checks" | "edge" | "stripes";
    shapeScale: number;
    speed: number;
    scale?: number;
    rotation?: number;
  };
}

const tabs: TabContent[] = [
  {
    id: "flow",
    tabLabel: "Jackie",
    agentName: "Jackie",
    agentRole: "AI Counselor",
    agentImage: "/assets_ai/Jackie.png",
    agentColor: "#f76a1c",
    description: "Routes applicants, answers FAQs, and captures initial eligibility signals automatically.",
    subDescription: "Jackie guides talent to the right opportunity, answers questions, and walks them through the application.",
    chatImage: "/assets_ai/chat interface.png",
    previewImage: "/assets_ai/admin panel.png",
    titleColor: "#d4a574",
    shader: {
      colors: ["#14120f", "#af8141", "#000000", "#8b6914"],
      proportion: 0.45,
      softness: 1,
      distortion: 0.3,
      swirl: 0.7,
      swirlIterations: 8,
      shape: "edge" as const,
      shapeScale: 0.6,
      speed: 1.8,
      scale: 1.2,
    },
  },
  {
    id: "lens",
    tabLabel: "David",
    agentName: "David",
    agentRole: "AI Processor",
    agentImage: "/assets_ai/David.png",
    agentColor: "#f76a1c",
    description: "Validates documents, detects inconsistencies, and flags items for human review.",
    subDescription: "David verifies each submission, flags gaps and mismatches, and escalates only what needs a human decision.",
    chatImage: "/assets_ai/chat interface.png",
    previewImage: "/assets_ai/admin panel.png",
    titleColor: "#7a9fd4",
    shader: {
      colors: ["#0a0a14", "#3b4f7a", "#0d1117", "#1e3a5f"],
      proportion: 0.5,
      softness: 1,
      distortion: 0.25,
      swirl: 0.6,
      swirlIterations: 10,
      shape: "edge" as const,
      shapeScale: 0.5,
      speed: 2.0,
    },
  },
  {
    id: "pulse",
    tabLabel: "Mark",
    agentName: "Mark",
    agentRole: "AI Support Agent",
    agentImage: "/assets_ai/Mark.png",
    agentColor: "#f76a1c",
    description: "Packages applications, generates summaries, and prepares decision-ready files.",
    subDescription: "Mark turns submissions into clean case packets, drafts the summary, and gets everything ready for final review.",
    chatImage: "/assets_ai/chat interface.png",
    previewImage: "/assets_ai/decision-making-dashboard.png",
    titleColor: "#6abfa0",
    shader: {
      colors: ["#0a110f", "#2d5a4a", "#0d1410", "#1a4035"],
      proportion: 0.4,
      softness: 1,
      distortion: 0.2,
      swirl: 0.5,
      swirlIterations: 7,
      shape: "edge" as const,
      shapeScale: 0.7,
      speed: 1.5,
    },
  },
  {
    id: "care",
    tabLabel: "Ella",
    agentName: "Ella",
    agentRole: "AI Assessment",
    agentImage: "/assets_ai/Ella.png",
    agentColor: "#f76a1c",
    description: "Runs AI video interviews, assesses skills and qualifications, and produces a structured evaluation.",
    subDescription: "Ella conducts structured interviews, scores responses against your rubric, and delivers a clear evaluation for fast review.",
    chatImage: "/assets_ai/chat interface.png",
    previewImage: "/assets_ai/admin panel lg.png",
    titleColor: "#a08bc4",
    shader: {
      colors: ["#0f0a14", "#4a3b6a", "#110d17", "#3d2e5f"],
      proportion: 0.55,
      softness: 1,
      distortion: 0.22,
      swirl: 0.65,
      swirlIterations: 9,
      shape: "edge" as const,
      shapeScale: 0.55,
      speed: 1.6,
    },
  },
];

export function ProductTabsVertical() {
  const [activeId, setActiveId] = useState("flow");
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  // Auto-rotate through tabs every 18 seconds
  useEffect(() => {
    if (isPaused) return;

    const tabIds = tabs.map((t) => t.id);
    const interval = setInterval(() => {
      setActiveId((current) => {
        const currentIndex = tabIds.indexOf(current);
        const nextIndex = (currentIndex + 1) % tabIds.length;
        return tabIds[nextIndex];
      });
    }, 18000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle manual selection
  const handleSelect = (id: string) => {
    setActiveId(id);
    setIsPaused(true);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 25000);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
            Meet your AI enrollment team
          </h2>
        </motion.div>

        {/* Main Layout - Two columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="flex gap-6"
        >
          {/* Left Column: Vertical Tabs */}
          <div className="flex flex-col gap-3 w-[320px] shrink-0">
            {tabs.map((tab) => {
              const isActive = tab.id === activeId;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleSelect(tab.id)}
                  className={`relative rounded-[16px] overflow-hidden transition-all duration-200 ease-linear text-left ${
                    isActive
                      ? "flex-[2]"
                      : "flex-1 bg-[#171717]"
                  }`}
                  style={{ minHeight: isActive ? "200px" : "90px" }}
                  whileHover={{ scale: isActive ? 1 : 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Shader background for active tab */}
                  {isActive && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div
                        className="absolute"
                        style={{
                          top: "-100px",
                          left: "-100px",
                          right: "-100px",
                          bottom: "-100px",
                        }}
                      >
                        <Warp
                          style={{ width: "200%", height: "200%" }}
                          {...tab.shader}
                        />
                      </div>
                    </div>
                  )}

                  {/* Small label - shown when inactive */}
                  <div
                    className={`absolute text-white/60 text-xl tracking-[-0.2px] whitespace-nowrap left-6 top-1/2 -translate-y-1/2 transition-opacity duration-150 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {tab.tabLabel}
                  </div>

                  {/* Large label - shown when active */}
                  <div
                    className={`absolute text-white/90 mix-blend-difference text-[2.4rem] md:text-[3rem] leading-[0.95] left-6 top-1/2 -translate-y-1/2 font-medium tracking-tight transition-opacity duration-150 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span className="flex flex-col items-start">
                      {tab.tabLabel.split(' ').map((word, i) => (
                        <span key={i}>{word}</span>
                      ))}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Content Panel */}
          <div 
            className="flex-1 bg-[#171717] rounded-[16px] p-6 flex gap-8"
            style={{ minHeight: "520px" }}
            role="tabpanel" 
            aria-label={`${activeTab.tabLabel} content`}
          >
            {/* Left: Image Container - Static */}
            <div
              className="bg-[#141414] rounded-xl overflow-hidden flex items-center justify-center flex-1 relative"
              aria-label="Preview container"
            >
              {activeId === "lens" && (
                <div className="absolute inset-0 passport-scroller-container">
                  <PassportScrollerHero />
                </div>
              )}
              {activeId === "pulse" && (
                <div className="absolute inset-0">
                  <AgentMarkDemo />
                </div>
              )}
              {activeId === "care" && (
                <div className="absolute inset-0">
                  <AgentEllaDemo />
                </div>
              )}
            </div>

            {/* Right: Agent Info - Animated */}
            <div className="w-[300px] shrink-0 flex flex-col pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  className="flex flex-col h-full"
                >
                  {/* Agent Header */}
                  <div className="flex items-center gap-5 mb-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                      <Image
                        src={activeTab.agentImage}
                        alt={activeTab.agentName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span
                      className="text-xl tracking-[-0.4px]"
                      style={{ color: activeTab.agentColor }}
                    >
                      {activeTab.agentName}
                    </span>
                  </div>

                  {/* Role & Description */}
                  <div className="flex flex-col gap-[18px] mt-auto pb-2">
                    <h3 className="text-xl text-[#e7e7e7] tracking-[-0.4px] leading-[22px]">
                      {activeTab.agentRole}
                    </h3>
                    <p className="text-base text-[#e7e7e7]/60 leading-[1.3] tracking-[-0.16px]">
                      {activeTab.description}
                    </p>
                    <p className="text-base text-[#e7e7e7]/60 leading-[1.3] tracking-[-0.16px]">
                      {activeTab.subDescription}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
