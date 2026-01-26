"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AgentEllaDemo } from "./agent-ella-demo";
import { AgentMarkDemo } from "./agent-mark-demo";
import { DavidDocumentDemo } from "./david-document-demo";
import { JackieChatDemo } from "./jackie-chat-demo";
import { OrbitDemo } from "./orbit-demo";

interface TabContent {
  id: string;
  tabLabel: string;
  tabSubtitle: string;
  dotColor: string;
  title: string;
  agentName?: string;
  agentImage?: string;
  feature1Title: string;
  feature1Description: string;
  feature2Title: string;
  feature2Description: string;
  feature3Title?: string;
  feature3Description?: string;
}

const tabs: TabContent[] = [
  {
    id: "orbit",
    tabLabel: "Platform",
    tabSubtitle: "AI Orchestration",
    dotColor: "#a78bfa", // Purple
    title: "Passage Platform",
    agentImage: "/assets_ai/Orb Agent.png",
    feature1Title: "Select and customize your AI workforce",
    feature1Description:
      "Choose from Passage's deployment-ready AI agents, or design your own, to create a solution tailored to your school.",
    feature2Title: "Your policies, applied - consistently",
    feature2Description:
      "Integrate with your systems, define eligibility criteria, document requirements, and escalation paths. Passage enforces them across each application.",
  },
  {
    id: "flow",
    tabLabel: "Jackie",
    tabSubtitle: "AI Counselor",
    dotColor: "#f76a1c", // Orange
    title: "Jackie",
    agentName: "Jackie",
    agentImage: "/assets_ai/Jackie.png",
    feature1Title: "AI Counselor",
    feature1Description:
      "Jackie guides prospective students to the right program, answers questions, and walks them through their application. Convert leads to application submissions.",
    feature2Title: "24/7 multilingual support",
    feature2Description:
      "Guides applicants through the process and responds in their preferred language.",
  },
  {
    id: "lens",
    tabLabel: "David",
    tabSubtitle: "AI Processor",
    dotColor: "#34d399", // Green
    title: "David",
    agentName: "David",
    agentImage: "/assets_ai/David.png",
    feature1Title: "Smart verification",
    feature1Description:
      "David verifies applications, validates documents, evaluates eligibility, flags gaps and mismatches, and follows up with students when needed. Creating decision-ready applications.",
    feature2Title: "Fraud detection",
    feature2Description:
      "Identifies suspicious patterns, document fraud, and inconsistencies.",
  },
  {
    id: "care",
    tabLabel: "Ella",
    tabSubtitle: "AI Interviewer",
    dotColor: "#EAB308", // Yellow
    title: "Ella",
    agentName: "Ella",
    agentImage: "/assets_ai/Ella.png",
    feature1Title: "AI Assessment",
    feature1Description:
      "Ella conducts AI video interviews, assesses skills and qualifications, and produces a structured evaluation for fast review.",
    feature2Title: "Configurable criteria",
    feature2Description:
      "Scores responses against your school's rubric and delivers clear, comparable evaluations.",
  },
  {
    id: "pulse",
    tabLabel: "Mark",
    tabSubtitle: "AI Support",
    dotColor: "#3b82f6", // Blue
    title: "Mark",
    agentName: "Mark",
    agentImage: "/assets_ai/Mark.png",
    feature1Title: "Active student support",
    feature1Description:
      "Mark provides 24/7 multilingual support to enrolled students - answering questions, resolving issues, and supporting student success.",
    feature2Title: "Your school's expert",
    feature2Description:
      "A personalized AI agent trained on your school's policies, calendar, and procedures.",
  },
];

const TAB_DURATION = 18; // 18 seconds
const PAUSED_DURATION = 60; // Slow progress when paused (60 seconds to complete)

// Calculate visible count based on window width
const getVisibleCount = () => {
  if (typeof window === "undefined") return 5;
  const width = window.innerWidth;
  if (width >= 768) return 5; // md breakpoint - show all tabs
  if (width >= 480) return 2; // wider mobile - show 2 tabs
  return 1; // narrow mobile - show 1 tab
};

export function ProductSection() {
  const [activeId, setActiveId] = useState("orbit");
  const [isPaused, setIsPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5); // Will be updated on mount
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1); // 1 = right, -1 = left
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tabTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  // Update visible count on mount and resize
  useEffect(() => {
    // Set initial value immediately on mount
    setVisibleCount(getVisibleCount());

    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation handlers for mobile arrows - move to prev/next tab with wrap-around
  const handlePrevTab = () => {
    setSlideDirection(-1); // Sliding from left
    const currentIndex = tabs.findIndex((t) => t.id === activeId);
    const prevIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
    handleSelect(tabs[prevIndex].id);
  };

  const handleNextTab = () => {
    setSlideDirection(1); // Sliding from right
    const currentIndex = tabs.findIndex((t) => t.id === activeId);
    const nextIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;
    handleSelect(tabs[nextIndex].id);
  };

  // Get the tabs that should be visible in the current window
  const visibleTabs =
    visibleCount >= tabs.length
      ? tabs
      : tabs.slice(visibleStartIndex, visibleStartIndex + visibleCount);

  // Sync visible window with active tab - active tab should always be first in the visible window
  useEffect(() => {
    if (visibleCount >= tabs.length) return; // No need to sync when all tabs are visible

    const activeIndex = tabs.findIndex((t) => t.id === activeId);
    if (activeIndex === -1) return;

    // Always position the active tab as the first visible tab
    setVisibleStartIndex(activeIndex);
  }, [activeId, visibleCount]);

  // Auto-rotate to next tab
  useEffect(() => {
    if (isPaused) return;

    tabTimeoutRef.current = setTimeout(() => {
      setSlideDirection(1); // Auto-rotate always goes forward (right)
      const tabIds = tabs.map((t) => t.id);
      setActiveId((current) => {
        const currentIndex = tabIds.indexOf(current);
        const nextIndex = (currentIndex + 1) % tabIds.length;
        return tabIds[nextIndex];
      });
      setAnimationKey((k) => k + 1);
    }, TAB_DURATION * 1000);

    return () => {
      if (tabTimeoutRef.current) {
        clearTimeout(tabTimeoutRef.current);
      }
    };
  }, [activeId, isPaused, animationKey]);

  // Handle manual selection
  const handleSelect = (id: string) => {
    setActiveId(id);
    setAnimationKey((k) => k + 1);
    setIsPaused(true);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      setAnimationKey((k) => k + 1); // Restart animation at normal speed
    }, 25000);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      if (tabTimeoutRef.current) {
        clearTimeout(tabTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="solutions"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white px-2">
            Select the best students, faster
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-center text-base sm:text-lg text-white/60 mb-8 sm:mb-12 max-w-3xl mx-auto px-2"
        >
          The best students don't wait. Passage automates counseling, eligibility, and screening.
        </motion.p>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="mb-6 sm:mb-8"
        >
          {/* Mobile navigation arrows - only show when not all tabs are visible */}
          {visibleCount < tabs.length && (
            <div className="flex justify-end gap-2 mb-3 md:hidden">
              <button
                onClick={handlePrevTab}
                className="p-1.5 rounded-md transition-colors text-white/70 hover:text-white hover:bg-white/10"
                aria-label="Previous tab"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextTab}
                className="p-1.5 rounded-md transition-colors text-white/70 hover:text-white hover:bg-white/10"
                aria-label="Next tab"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Tab buttons */}
          <div className="relative">
            <div className="flex gap-4">
              {/* Mobile: Show only visible tabs with slide animation */}
              <div className="relative w-full md:hidden overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`tabs-${activeId}`}
                    className="flex gap-4 w-full"
                    initial={{ x: slideDirection * 50 + "%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: slideDirection * -50 + "%", opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {visibleTabs.map((tab) => {
                      const isActive = tab.id === activeId;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleSelect(tab.id)}
                          className="relative flex-1 text-left transition-colors outline-none focus:outline-none"
                        >
                          {/* Progress bar at top of tab */}
                          <div className="h-[3px] rounded-sm mb-3 bg-white/10">
                            {isActive && (
                              <motion.div
                                key={`progress-${tab.id}-${animationKey}`}
                                className="h-full rounded-sm bg-white"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                  duration: isPaused
                                    ? PAUSED_DURATION
                                    : TAB_DURATION,
                                  ease: "linear",
                                }}
                              />
                            )}
                          </div>

                          {/* Tab content */}
                          <div className="flex flex-col gap-0.5">
                            <span
                              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                                isActive ? "text-white" : "text-white/50"
                              }`}
                            >
                              {tab.tabLabel}
                            </span>
                            <span
                              className={`text-xs transition-colors whitespace-nowrap ${
                                isActive ? "text-white/50" : "text-white/30"
                              }`}
                            >
                              {tab.tabSubtitle}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop: Show all tabs */}
              <div className="hidden md:flex gap-4 w-full">
                {tabs.map((tab) => {
                  const isActive = tab.id === activeId;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleSelect(tab.id)}
                      className="relative flex-1 text-left transition-colors outline-none focus:outline-none"
                    >
                      {/* Progress bar at top of tab */}
                      <div className="h-[3px] rounded-sm mb-4 bg-white/10">
                        {isActive && (
                          <motion.div
                            key={`progress-${tab.id}-${animationKey}`}
                            className="h-full rounded-sm bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: isPaused
                                ? PAUSED_DURATION
                                : TAB_DURATION,
                              ease: "linear",
                            }}
                          />
                        )}
                      </div>

                      {/* Tab content */}
                      <div className="flex flex-col gap-1">
                        <span
                          className={`text-base font-medium transition-colors whitespace-nowrap ${
                            isActive ? "text-white" : "text-white/50"
                          }`}
                        >
                          {tab.tabLabel}
                        </span>
                        <span
                          className={`text-sm transition-colors whitespace-nowrap ${
                            isActive ? "text-white/50" : "text-white/30"
                          }`}
                        >
                          {tab.tabSubtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="bg-[#171717] rounded-[4px] sm:rounded-[12px] md:rounded-[16px] overflow-hidden -mx-4 sm:mx-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col lg:flex-row"
            >
              {/* Left: Text Content */}
              <div className="lg:w-[35%] p-5 sm:p-6 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
                {/* Agent Photo + Title - Top */}
                <div className="flex items-center gap-3 sm:gap-4 mb-5 lg:mb-0">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={activeTab.agentImage || ""}
                      alt={activeTab.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span
                    className="text-lg sm:text-xl tracking-[-0.4px]"
                    style={{ color: "#f76a1c" }}
                  >
                    {activeTab.title}
                  </span>
                </div>

                {/* Features - Bottom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6 lg:gap-0 mt-5 sm:mt-6">
                  {/* Feature 1 */}
                  <div className="flex flex-col gap-2 sm:gap-3 lg:mb-8">
                    <h3 className="text-base sm:text-lg lg:text-xl text-[#e7e7e7] tracking-[-0.4px] leading-[1.2]">
                      {activeTab.feature1Title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#e7e7e7]/60 leading-[1.4] tracking-[-0.16px] max-w-[322px]">
                      {activeTab.feature1Description}
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div
                    className={`flex flex-col gap-2 sm:gap-3 ${activeTab.feature3Title ? "lg:mb-8" : ""}`}
                  >
                    <h3 className="text-base sm:text-lg lg:text-xl text-[#e7e7e7] tracking-[-0.4px] leading-[1.2]">
                      {activeTab.feature2Title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#e7e7e7]/60 leading-[1.4] tracking-[-0.16px] max-w-[322px]">
                      {activeTab.feature2Description}
                    </p>
                  </div>

                  {/* Feature 3 (optional) */}
                  {activeTab.feature3Title && activeTab.feature3Description && (
                    <div className="flex flex-col gap-2 sm:gap-3 pt-4 sm:pt-2 lg:pt-0">
                      <h3 className="text-base sm:text-lg lg:text-xl text-[#e7e7e7] tracking-[-0.4px] leading-[1.2]">
                        {activeTab.feature3Title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#e7e7e7]/60 leading-[1.4] tracking-[-0.16px] max-w-[322px]">
                        {activeTab.feature3Description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Canvas */}
              <div className="lg:w-[65%] p-0 sm:p-5 lg:p-8 order-1 lg:order-2">
                <div className="relative w-full h-[390px] sm:h-[320px] md:h-[360px] lg:h-[450px] rounded-[4px] sm:rounded-lg lg:rounded-xl overflow-hidden bg-[#141414]">
                  {/* Dot pattern background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #252525 1.5px, transparent 1.5px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Canvas content */}
                  {activeId === "orbit" ? (
                    <div className="absolute inset-0">
                      <OrbitDemo />
                    </div>
                  ) : activeId === "flow" ? (
                    <div className="absolute inset-0 bg-white">
                      {/* Soft Blue Radial Background */}
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          background: "#ffffff",
                          backgroundImage: `radial-gradient(circle at top center, rgba(59, 130, 246, 0.5), transparent 70%)`,
                        }}
                      />
                      <div className="relative z-10 w-full h-full">
                        <JackieChatDemo />
                      </div>
                    </div>
                  ) : activeId === "lens" ? (
                    <div className="absolute inset-0 bg-white">
                      {/* Purple Glow Left Background */}
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          background: "#ffffff",
                          backgroundImage: `radial-gradient(circle at top left, rgba(173, 109, 244, 0.5), transparent 70%)`,
                        }}
                      />
                      <div className="relative z-10 w-full h-full">
                        <DavidDocumentDemo />
                      </div>
                    </div>
                  ) : activeId === "pulse" ? (
                    <div className="absolute inset-0">
                      <AgentMarkDemo />
                    </div>
                  ) : activeId === "care" ? (
                    <div className="absolute inset-0">
                      <AgentEllaDemo />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/30 text-lg">
                        Coming soon...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
