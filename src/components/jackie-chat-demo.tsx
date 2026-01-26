"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────────────────

interface Program {
  name: string;
  credential: string;
  color: string;
  iconColor: string;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  programs?: Program[];
  showReadyToApply?: boolean;
}

const foundPrograms: Program[] = [
  { name: "IT Support", credential: "Diploma", color: "from-blue-500/20 to-cyan-500/20", iconColor: "#3b82f6" },
  { name: "Software Development", credential: "Diploma", color: "from-purple-500/20 to-pink-500/20", iconColor: "#a855f7" },
  { name: "Data Analytics", credential: "Diploma", color: "from-amber-500/20 to-orange-500/20", iconColor: "#f59e0b" },
];

const chatFlow: ChatMessage[] = [
  { id: "1", role: "assistant", content: "Hi, I'm Jackie! Tell me a bit about yourself and what you'd like to study." },
  { id: "2", role: "user", content: "I'm from Cameroon, looking for tech programs in Canada" },
  { id: "3", role: "assistant", content: "Great! Here are some programs that match your profile:" },
  { id: "4", role: "assistant", content: "", programs: foundPrograms, showReadyToApply: true },
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
            className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[#007AFF]/50"
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

export function JackieChatDemo() {
  const [mounted, setMounted] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoopFading, setIsLoopFading] = useState(false);

  const [cursorPosition, setCursorPosition] = useState({ x: 200, y: 150 });
  const [cursorClicking, setCursorClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) elementRefs.current.set(id, el);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Demo
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    const getPos = (id: string) => {
      const el = elementRefs.current.get(id);
      if (el && containerRef.current) {
        const rect = el.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        // Default: center the cursor on the element
        let x = rect.left - containerRect.left + rect.width / 2 - 12;
        let y = rect.top - containerRect.top + rect.height / 2 - 12;

        // Special case: keep cursor out of the way while typing in input
        // Position it near the bottom-right inside the input box.
        if (id === "chat-input") {
          x = rect.right - containerRect.left - 24 - 8; // cursor width + padding
          y = rect.bottom - containerRect.top - 24 - 6; // cursor height + padding
        }

        return { x, y };
      }
      return null;
    };

    const typeAndSend = async (text: string, messageIndex: number) => {
      // Type
      const perCharDelay = text.length > 28 ? 18 : 32;
      for (const char of text.split("")) {
        if (cancelled) break;
        setChatInput(p => p + char);
        await new Promise(r => setTimeout(r, perCharDelay));
      }
      await new Promise(r => setTimeout(r, 180));

      // Send
      const sendPos = getPos("send-btn");
      if (sendPos) setCursorPosition(sendPos);
      await new Promise(r => setTimeout(r, 230));
      setCursorClicking(true);
      await new Promise(r => setTimeout(r, 92));
      setCursorClicking(false);

      setChatMessages(prev => [...prev, chatFlow[messageIndex]]);
      setChatInput("");
      
      // Slightly move cursor after clicking send
      if (sendPos) setCursorPosition({ x: sendPos.x + 15, y: sendPos.y + 10 });
      await new Promise(r => setTimeout(r, 345));

      // Jackie responds
      if (chatFlow[messageIndex + 1]) {
        setIsTyping(true);
        // Keep typing indicator visible a bit longer after long user messages
        const typingWait = text.length > 35 ? 1250 : 650;
        await new Promise(r => setTimeout(r, typingWait));
        setIsTyping(false);
        setChatMessages(prev => [...prev, chatFlow[messageIndex + 1]]);

        // If the next message is a programs payload, delay it slightly so users can read the text first.
        const next = chatFlow[messageIndex + 2];
        if (next?.role === "assistant" && next.programs) {
          await new Promise(r => setTimeout(r, 550));
          setChatMessages(prev => [...prev, next]);
        }
      }
    };

    const runDemo = async () => {
      while (!cancelled) {
        // Reset (start from a clean slate)
        setIsLoopFading(false);
        setChatMessages([]);
        setChatInput("");
        setCursorVisible(false);
        setIsTyping(false);

        await new Promise(r => setTimeout(r, 460));

        // Jackie greeting
        setChatMessages([chatFlow[0]]);
        await new Promise(r => setTimeout(r, 920));

        // Show cursor and move to input
        setCursorVisible(true);
        const inputPos = getPos("chat-input");
        if (inputPos) setCursorPosition(inputPos);
        await new Promise(r => setTimeout(r, 345));

        // Exchange 1: intro (matches screenshot)
        await typeAndSend("I'm from Cameroon, looking for tech programs in Canada", 1);
        await new Promise(r => setTimeout(r, 900));

        // Hide cursor
        setCursorVisible(false);

        // Hold so users can read the programs
        await new Promise(r => setTimeout(r, 4200));

        // Smooth loop back to first frame (fade out, reset, fade in)
        setIsLoopFading(true);
        await new Promise(r => setTimeout(r, 260));
        setChatMessages([]);
        setChatInput("");
        setCursorVisible(false);
        setIsTyping(false);
        await new Promise(r => setTimeout(r, 140));
      }
    };

    runDemo();
    return () => { cancelled = true; };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main Window - scaled for mobile */}
      <motion.div
        ref={containerRef}
        className="relative z-20 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[380px] transform scale-[0.9] sm:scale-[0.95] lg:scale-100 origin-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoopFading ? 0 : 1, y: 0 }}
        transition={{
          opacity: { duration: isLoopFading ? 0.26 : 0.5 },
          y: { duration: 0.5 },
        }}
      >
        <VirtualCursor position={cursorPosition} clicking={cursorClicking} visible={cursorVisible} />

        <div className="rounded-[12px] overflow-hidden bg-[#1a1a1a] border border-white/[0.1]">
          
          {/* Header */}
          <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#252525] border-b border-white/[0.06]">
            <span className="text-[13px] font-semibold text-white">Jackie</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
            <span className="text-[10px] text-white/40">AI Counselor</span>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col h-[200px] sm:h-[240px] md:h-[280px] lg:h-[340px]">
            <div ref={messagesRef} className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-hide pointer-events-none">
              <AnimatePresence mode="popLayout">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }}
                  >
                    <div className={`max-w-[85%]`}>
                      {msg.content.trim().length > 0 && (
                        <div
                          className={`px-2.5 py-1.5 text-[12px] leading-relaxed ${
                            msg.role === "user"
                              ? "bg-[#007AFF] text-white rounded-[6px] rounded-br-[2px]"
                              : "bg-[#3a3a3c] text-white/90 rounded-[6px] rounded-bl-[2px]"
                          }`}
                        >
                          {msg.content}
                        </div>
                      )}
                      
                      {/* Programs found */}
                      {msg.programs && (
                        <motion.div 
                          className={`${msg.content.trim().length > 0 ? "mt-1.5" : "mt-0.5"} space-y-1`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.05 }}
                        >
                          {msg.programs.map((prog, idx) => (
                            <motion.div
                              key={prog.name}
                              className={`flex items-center gap-2 p-2 rounded-[5px] bg-gradient-to-r ${prog.color} border border-white/[0.08]`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.08 + idx * 0.1 }}
                            >
                              <div className="w-6 h-6 rounded-[4px] bg-white/10 flex items-center justify-center flex-shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={prog.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>
                                </svg>
                              </div>
                              <div className="min-w-0">
                                <div className="text-[10px] font-medium text-white truncate">{prog.name}</div>
                                <div className="text-[9px] text-white/50">{prog.credential}</div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {/* Ready to apply */}
                      {msg.showReadyToApply && (
                        <motion.div
                          className="mt-2 p-2.5 rounded-[6px] bg-[#30D158]/15 border border-[#30D158]/25"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-[6px] bg-[#30D158]/20 flex items-center justify-center">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#30D158]">
                                <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <span className="text-[12px] font-medium text-[#30D158]">Ready to apply</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="px-2.5 py-1.5 rounded-[6px] rounded-bl-[2px] bg-[#3a3a3c]">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 rounded-full bg-white/40"
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-2.5 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div
                  ref={registerRef("chat-input")}
                  className="flex-1 px-3 py-1.5 rounded-[6px] bg-[#3a3a3c] text-[12px]"
                >
                  <span className={chatInput ? "text-white" : "text-white/35"}>
                    {chatInput || "Message"}
                    {chatInput && (
                      <motion.span
                        className="inline-block w-0.5 h-3 bg-[#007AFF] ml-0.5 align-middle"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.4, repeat: Infinity }}
                      />
                    )}
                  </span>
                </div>
                <motion.button
                  ref={registerRef("send-btn")}
                  className="w-7 h-7 rounded-full bg-[#007AFF] flex items-center justify-center flex-shrink-0"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
