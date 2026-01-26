"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────────────────

interface Agent {
  id: string;
  name: string;
  role: string;
  color: string;
  description: string;
  image: string;
}

interface Integration {
  id: string;
  name: string;
  category: string;
}

const availableAgents: Agent[] = [
  { id: "mark", name: "Mark", role: "AI Support", color: "#3B82F6", description: "Handle support tickets & emails", image: "/assets_ai/Mark.png" },
  { id: "jackie", name: "Jackie", role: "AI Counselor", color: "#F97316", description: "Guide students to programs", image: "/assets_ai/Jackie.png" },
  { id: "david", name: "David", role: "AI Processor", color: "#10B981", description: "Process documents & KYC", image: "/assets_ai/David.png" },
  { id: "ella", name: "Ella", role: "AI Interviewer", color: "#EAB308", description: "Conduct interviews & assess", image: "/assets_ai/Ella.png" },
];

const integrations: Integration[] = [
  { id: "ellucian", name: "Ellucian Banner", category: "SIS" },
  { id: "colleague", name: "Ellucian Colleague", category: "SIS" },
  { id: "peoplesoft", name: "Oracle PeopleSoft", category: "ERP" },
  { id: "oaks", name: "Oracle OAKS", category: "ERP" },
  { id: "slate", name: "Slate by Technolutions", category: "CRM" },
  { id: "salesforce", name: "Salesforce", category: "CRM" },
];

// ─────────────────────────────────────────────────────────────
// Virtual Cursor
// ─────────────────────────────────────────────────────────────

const VirtualCursor = ({ position, clicking, visible }: { position: { x: number; y: number }; clicking: boolean; visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute pointer-events-none z-[200]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: clicking ? 0.85 : 1, x: position.x, y: position.y }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ x: { type: "spring", stiffness: 180, damping: 20 }, y: { type: "spring", stiffness: 180, damping: 20 }, scale: { duration: 0.06 } }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="#fff" stroke="#000" strokeWidth="1.5" />
        </svg>
        {clicking && (
          <motion.div
            className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[#F97316]/50"
            initial={{ scale: 0.3, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: "translate(-25%, -25%)" }}
          />
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export function OrbitDemo() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const [cursorPosition, setCursorPosition] = useState({ x: 300, y: 200 });
  const [cursorClicking, setCursorClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) elementRefs.current.set(id, el);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the current scale factor based on window width
  const getScaleFactor = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 1;      // lg: scale-100
    if (width >= 640) return 0.9;     // sm: scale-[0.9]
    return 0.85;                       // default: scale-[0.85]
  };

  const getPos = (id: string) => {
    const el = elementRefs.current.get(id);
    if (el && containerRef.current) {
      const rect = el.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const scale = getScaleFactor();
      // Divide by scale to convert from screen coordinates to pre-transform coordinates
      return { 
        x: (rect.left - containerRect.left + rect.width / 2 - 12) / scale, 
        y: (rect.top - containerRect.top + rect.height / 2 - 12) / scale 
      };
    }
    return null;
  };

  // Demo automation
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    const click = async () => {
      setCursorClicking(true);
      await new Promise(r => setTimeout(r, 80));
      setCursorClicking(false);
    };

    const runDemo = async () => {
      while (!cancelled) {
        // Reset
        setCurrentStep(1);
        setSelectedAgents([]);
        setConnectedIntegrations([]);
        setIsDeploying(false);
        setIsDeployed(false);
        setCursorVisible(false);

        await new Promise(r => setTimeout(r, 800));

        // Show cursor
        setCursorVisible(true);
        await new Promise(r => setTimeout(r, 400));

        // STEP 1: Create Agents
        // Click on Mark
        const markPos = getPos("agent-mark");
        if (markPos) setCursorPosition(markPos);
        await new Promise(r => setTimeout(r, 400));
        await click();
        setSelectedAgents(["mark"]);
        await new Promise(r => setTimeout(r, 300));

        // Click on Jackie
        const jackiePos = getPos("agent-jackie");
        if (jackiePos) setCursorPosition(jackiePos);
        await new Promise(r => setTimeout(r, 350));
        await click();
        setSelectedAgents(["mark", "jackie"]);
        await new Promise(r => setTimeout(r, 300));

        // Click on David
        const davidPos = getPos("agent-david");
        if (davidPos) setCursorPosition(davidPos);
        await new Promise(r => setTimeout(r, 350));
        await click();
        setSelectedAgents(["mark", "jackie", "david"]);
        await new Promise(r => setTimeout(r, 300));

        // Click on Ella
        const ellaPos = getPos("agent-ella");
        if (ellaPos) setCursorPosition(ellaPos);
        await new Promise(r => setTimeout(r, 350));
        await click();
        setSelectedAgents(["mark", "jackie", "david", "ella"]);
        await new Promise(r => setTimeout(r, 500));

        // Click Next to go to Step 2
        const nextPos = getPos("next-btn");
        if (nextPos) setCursorPosition(nextPos);
        await new Promise(r => setTimeout(r, 400));
        await click();
        setCurrentStep(2);
        await new Promise(r => setTimeout(r, 600));

        // STEP 2: Connect Systems
        // Click on Ellucian Banner
        const ellucianPos = getPos("int-ellucian");
        if (ellucianPos) setCursorPosition(ellucianPos);
        await new Promise(r => setTimeout(r, 400));
        await click();
        setConnectedIntegrations(["ellucian"]);
        await new Promise(r => setTimeout(r, 300));

        // Click on Ellucian Colleague
        const colleaguePos = getPos("int-colleague");
        if (colleaguePos) setCursorPosition(colleaguePos);
        await new Promise(r => setTimeout(r, 350));
        await click();
        setConnectedIntegrations(["ellucian", "colleague"]);
        await new Promise(r => setTimeout(r, 300));

        // Click on Slate
        const slatePos = getPos("int-slate");
        if (slatePos) setCursorPosition(slatePos);
        await new Promise(r => setTimeout(r, 350));
        await click();
        setConnectedIntegrations(["ellucian", "colleague", "slate"]);
        await new Promise(r => setTimeout(r, 300));

        // Click on Oracle OAKS
        const oaksPos = getPos("int-oaks");
        if (oaksPos) setCursorPosition(oaksPos);
        await new Promise(r => setTimeout(r, 350));
        await click();
        setConnectedIntegrations(["ellucian", "colleague", "slate", "oaks"]);
        await new Promise(r => setTimeout(r, 500));

        // Click Deploy - position cursor at bottom right of button
        const deployBtn = elementRefs.current.get("deploy-btn");
        if (deployBtn && containerRef.current) {
          const rect = deployBtn.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const scale = getScaleFactor();
          setCursorPosition({ 
            x: (rect.right - containerRect.left - 20) / scale, 
            y: (rect.bottom - containerRect.top - 8) / scale 
          });
        }
        await new Promise(r => setTimeout(r, 400));
        await click();
        setIsDeploying(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsDeploying(false);
        setCurrentStep(3);
        setIsDeployed(true);

        // Hide cursor
        setCursorVisible(false);

        // Hold on deployed screen
        await new Promise(r => setTimeout(r, 7000));
      }
    };

    runDemo();
    return () => { cancelled = true; };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-white">
      {/* Teal Glow Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top left,
              rgba(56, 193, 182, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Main Window - scaled for mobile */}
      <motion.div
        ref={containerRef}
        className="relative z-20 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[442px] transform scale-[0.85] sm:scale-[0.9] lg:scale-100 origin-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VirtualCursor position={cursorPosition} clicking={cursorClicking} visible={cursorVisible} />

        <div className="rounded-[12px] overflow-hidden bg-[#1a1a1a] border border-white/[0.08]">
          
          {/* Header */}
          <div className="flex items-center px-3 py-2 sm:px-4 sm:py-3 bg-[#252525] border-b border-white/[0.06]">
            {/* Traffic light dots - smaller on mobile */}
            <div className="flex items-center gap-[4px] sm:gap-[6px]">
              <span className="w-[7px] h-[7px] sm:w-[10px] sm:h-[10px] rounded-full bg-[#FF5F56]" />
              <span className="w-[7px] h-[7px] sm:w-[10px] sm:h-[10px] rounded-full bg-[#FFBD2E]" />
              <span className="w-[7px] h-[7px] sm:w-[10px] sm:h-[10px] rounded-full bg-[#27CA40]" />
            </div>
            {/* Title - centered, compact on mobile */}
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-[11px] sm:text-[14px] font-semibold text-white whitespace-nowrap">Passage Platform</span>
              {/* Blue dot and subtitle - hidden on mobile */}
              <span className="hidden sm:block w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span className="hidden sm:block text-[11px] text-white/40">Deploy AI Agents</span>
            </div>
            {/* Spacer to balance the traffic lights - smaller on mobile */}
            <div className="w-[33px] sm:w-[54px]" />
          </div>

          {/* Stepper - Compact, even more compact on mobile */}
          <div className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 bg-[#1a1a1a] border-b border-white/[0.06]">
            {/* Step 1 */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-medium transition-colors ${
                currentStep >= 1 ? "bg-[#3B82F6] text-white" : "bg-white/10 text-white/40"
              }`}>
                1
              </div>
              <span className={`text-[8px] sm:text-[10px] whitespace-nowrap transition-colors ${
                currentStep >= 1 ? "text-white" : "text-white/40"
              }`}>Create Agents</span>
            </div>
            
            {/* Line */}
            <div className="w-3 sm:w-5 h-[1px] bg-white/15 mx-1 sm:mx-1.5" />
            
            {/* Step 2 */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-medium transition-colors ${
                currentStep >= 2 ? "bg-[#3B82F6] text-white" : "bg-white/10 text-white/40"
              }`}>
                2
              </div>
              <span className={`text-[8px] sm:text-[10px] whitespace-nowrap transition-colors ${
                currentStep >= 2 ? "text-white" : "text-white/40"
              }`}>Connect</span>
            </div>
            
            {/* Line */}
            <div className="w-3 sm:w-5 h-[1px] bg-white/15 mx-1 sm:mx-1.5" />
            
            {/* Step 3 */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-medium transition-colors ${
                currentStep >= 3 ? "bg-[#3B82F6] text-white" : "bg-white/10 text-white/40"
              }`}>
                3
              </div>
              <span className={`text-[8px] sm:text-[10px] whitespace-nowrap transition-colors ${
                currentStep >= 3 ? "text-white" : "text-white/40"
              }`}>Deploy</span>
            </div>
          </div>

          {/* Content - Fixed Height */}
          <div className="p-3 h-[310px] overflow-hidden">
            <AnimatePresence mode="wait">
              {/* STEP 1: Create Agents */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  <div className="mb-2">
                    <h3 className="text-[12px] font-medium text-white">Create your AI workforce</h3>
                    <p className="text-[9px] text-white/40">Select agents to deploy for your institution</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-1.5">
                    {availableAgents.map((agent) => {
                      const isSelected = selectedAgents.includes(agent.id);
                      return (
                        <motion.div
                          key={agent.id}
                          ref={registerRef(`agent-${agent.id}`)}
                          className={`relative p-2.5 sm:p-2 rounded-[6px] sm:rounded-[5px] border cursor-pointer transition-all ${
                            isSelected 
                              ? "border-[#3B82F6]/50 bg-[#3B82F6]/10" 
                              : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-2 sm:gap-1.5">
                            <div className="w-9 h-9 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0">
                              <Image 
                                src={agent.image} 
                                alt={agent.name}
                                width={36}
                                height={36}
                                sizes="36px"
                                quality={100}
                                className="w-full h-full object-cover"
                                style={{ imageRendering: "auto" }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] sm:text-[10px] font-medium text-white">{agent.name}</div>
                              <div className="text-[9px] sm:text-[8px] text-white/50">{agent.role}</div>
                              <div className="text-[9px] sm:text-[8px] text-white/30 truncate">{agent.description}</div>
                            </div>
                          </div>
                          {isSelected && (
                            <motion.div
                              className="absolute top-2 right-2 sm:top-1.5 sm:right-1.5 w-4 h-4 sm:w-3.5 sm:h-3.5 rounded-full bg-[#3B82F6] flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <svg className="w-2 h-2 sm:w-[7px] sm:h-[7px]" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex-1" />
                  <div className="flex justify-end items-end">
                    <motion.button
                      ref={registerRef("next-btn")}
                      className={`px-4 py-2 rounded-[5px] text-[10px] font-medium transition-all ${
                        selectedAgents.length > 0 
                          ? "bg-[#3B82F6] text-white" 
                          : "bg-white/10 text-white/30"
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      Next →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Connect Systems */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  <div className="mb-2">
                    <h3 className="text-[12px] font-medium text-white">Connect your systems</h3>
                    <p className="text-[9px] text-white/40">Integrate with your existing school infrastructure</p>
                  </div>

                  {/* Selected Agents - Stacked photos */}
                  <div className="flex items-center mb-2.5">
                    <div className="flex items-center">
                      {selectedAgents.map((agentId, idx) => {
                        const agent = availableAgents.find(a => a.id === agentId);
                        if (!agent) return null;
                        return (
                          <div 
                            key={agent.id}
                            className="w-6 h-6 rounded-full overflow-hidden border-2 border-[#1a1a1a]"
                            style={{ marginLeft: idx === 0 ? 0 : -8 }}
                          >
                            <Image 
                              src={agent.image} 
                              alt={agent.name}
                              width={24}
                              height={24}
                              sizes="24px"
                              quality={100}
                              className="w-full h-full object-cover"
                              style={{ imageRendering: "auto" }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-[9px] text-white/40 ml-2">{selectedAgents.length} agents</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 sm:gap-1">
                    {integrations.map((integration) => {
                      const isConnected = connectedIntegrations.includes(integration.id);
                      return (
                        <motion.div
                          key={integration.id}
                          ref={registerRef(`int-${integration.id}`)}
                          className={`flex items-center px-2 py-2 sm:px-1.5 sm:py-1 rounded-[5px] sm:rounded-[4px] border cursor-pointer transition-all overflow-hidden ${
                            isConnected 
                              ? "bg-[#10B981]/10 border-[#10B981]/30" 
                              : "bg-white/[0.02] border-white/[0.06]"
                          }`}
                        >
                          <div className={`w-6 h-6 sm:w-5 sm:h-5 rounded-[3px] sm:rounded-[2px] flex items-center justify-center text-[10px] sm:text-[8px] font-bold shrink-0 ${
                            isConnected ? "bg-[#10B981]/20 text-[#10B981]" : "bg-white/10 text-white/50"
                          }`}>
                            {integration.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0 ml-1.5 sm:ml-1">
                            <div className="text-[10px] sm:text-[9px] font-medium text-white truncate">{integration.name}</div>
                            <div className="text-[8px] sm:text-[7px] text-white/40">{integration.category}</div>
                          </div>
                          {isConnected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-[#10B981] flex items-center justify-center shrink-0 ml-1"
                            >
                              <svg className="w-2 h-2 sm:w-1.5 sm:h-1.5" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="flex-1" />
                  <div className="flex justify-between items-end">
                    {/* Connected systems count */}
                    <div className="flex items-center">
                      {connectedIntegrations.length > 0 && (
                        <span className="text-[9px] text-white/40">{connectedIntegrations.length} systems connected</span>
                      )}
                    </div>
                    <motion.button
                      ref={registerRef("deploy-btn")}
                      className={`px-4 py-2 rounded-[5px] text-[10px] font-medium transition-all ${
                        connectedIntegrations.length > 0 
                          ? "bg-[#3B82F6] text-white" 
                          : "bg-white/10 text-white/30"
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isDeploying ? (
                        <span className="flex items-center gap-1">
                          <motion.div 
                            className="w-2 h-2 border-[1.5px] border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Deploying...
                        </span>
                      ) : (
                        "Deploy Agents →"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Deployed */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-center py-2">
                    <motion.div
                      className="w-10 h-10 mx-auto mb-1.5 rounded-full bg-[#10B981]/20 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#10B981]">
                        <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                    <h3 className="text-[13px] font-semibold text-white mb-0.5">Agents Deployed!</h3>
                    <p className="text-[9px] text-white/50">Your AI workforce is now active and ready</p>
                  </div>

                  {/* Active Agents - Single row with profile photos */}
                  <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                    {selectedAgents.map((agentId, idx) => {
                      const agent = availableAgents.find(a => a.id === agentId);
                      if (!agent) return null;
                      return (
                        <motion.div
                          key={agent.id}
                          className="flex flex-col items-center p-2 rounded-[5px] border border-white/[0.08] bg-white/[0.02]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden mb-1.5">
                            <Image 
                              src={agent.image} 
                              alt={agent.name}
                              width={32}
                              height={32}
                              sizes="32px"
                              quality={100}
                              className="w-full h-full object-cover"
                              style={{ imageRendering: "auto" }}
                            />
                          </div>
                          <div className="text-[9px] font-medium text-white mb-0.5">{agent.name}</div>
                          <div className="flex items-center gap-1">
                            <motion.span 
                              className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-[8px] text-[#10B981]">Active</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Connected Systems */}
                  <div className="p-2.5 sm:p-2 rounded-[5px] sm:rounded-[4px] bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] sm:text-[8px] text-white/40 mb-1.5 sm:mb-1">Connected Systems</div>
                    <div className="flex gap-1.5 sm:gap-1 flex-wrap">
                      {connectedIntegrations.map((intId) => {
                        const integration = integrations.find(i => i.id === intId);
                        if (!integration) return null;
                        return (
                          <div key={intId} className="flex items-center gap-1 sm:gap-0.5 px-2 py-1 sm:px-1.5 sm:py-0.5 rounded-[4px] sm:rounded bg-white/[0.05] text-[10px] sm:text-[8px] text-white/60">
                            <span className="w-1.5 h-1.5 sm:w-1 sm:h-1 rounded-full bg-[#10B981]" />
                            <span>{integration.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
