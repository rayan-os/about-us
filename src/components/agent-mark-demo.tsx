"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────────────────

interface SupportAction {
  label: string;
  status: "pending" | "done";
  icon: "doc" | "check" | "send" | "clock";
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  actions?: SupportAction[];
  showResolved?: boolean;
  showStatus?: { school: string; status: string; date: string };
}

const supportActions: SupportAction[] = [
  { label: "Checking application status", status: "done", icon: "doc" },
  { label: "Retrieving submission details", status: "done", icon: "check" },
  { label: "Contacting admissions office", status: "done", icon: "send" },
];

const chatFlow: ChatMessage[] = [
  { id: "1", role: "assistant", content: "Hi! I'm Mark, your support agent at Passage. How can I help you today?" },
  { id: "2", role: "user", content: "I need help with my application" },
  { id: "3", role: "assistant", content: "Of course! What's the issue you're facing?" },
  { id: "4", role: "user", content: "I submitted but haven't heard back" },
  { id: "5", role: "assistant", content: "Let me check that for you...", actions: supportActions },
  { id: "6", role: "assistant", content: "Found it! Here's your application status:", showStatus: { school: "George Brown College", status: "Under Review", date: "Submitted Jan 15" } },
  { id: "7", role: "user", content: "When will I hear back?" },
  { id: "8", role: "assistant", content: "Typically 2-3 weeks. I've flagged your file for priority review!", showResolved: true },
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
// Action Icon Component
// ─────────────────────────────────────────────────────────────

const ActionIcon = ({ type }: { type: "doc" | "check" | "send" | "clock" }) => {
  const icons = {
    doc: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/70">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    check: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/70">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    send: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/70">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    clock: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/70">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type];
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export function AgentMarkDemo() {
  const [mounted, setMounted] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [actionProgress, setActionProgress] = useState(0);

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
        return { x: rect.left - containerRect.left + rect.width / 2 - 12, y: rect.top - containerRect.top + rect.height / 2 - 12 };
      }
      return null;
    };

    const typeAndSend = async (text: string, messageIndex: number) => {
      // Type
      for (const char of text.split("")) {
        if (cancelled) break;
        setChatInput(p => p + char);
        await new Promise(r => setTimeout(r, 35));
      }
      await new Promise(r => setTimeout(r, 200));

      // Send
      const sendPos = getPos("send-btn");
      if (sendPos) setCursorPosition(sendPos);
      await new Promise(r => setTimeout(r, 200));
      setCursorClicking(true);
      await new Promise(r => setTimeout(r, 80));
      setCursorClicking(false);

      setChatMessages(prev => [...prev, chatFlow[messageIndex]]);
      setChatInput("");
      await new Promise(r => setTimeout(r, 300));

      // Mark responds
      if (chatFlow[messageIndex + 1]) {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 500));
        setIsTyping(false);
        setChatMessages(prev => [...prev, chatFlow[messageIndex + 1]]);
      }
    };

    const runDemo = async () => {
      while (!cancelled) {
        // Reset
        setChatMessages([]);
        setChatInput("");
        setCursorVisible(false);
        setIsTyping(false);
        setActionProgress(0);

        await new Promise(r => setTimeout(r, 400));

        // Mark greeting
        setChatMessages([chatFlow[0]]);
        await new Promise(r => setTimeout(r, 800));

        // Show cursor
        setCursorVisible(true);
        const inputPos = getPos("chat-input");
        if (inputPos) setCursorPosition(inputPos);
        await new Promise(r => setTimeout(r, 300));

        // Exchange 1: Need help
        await typeAndSend("I need help with my application", 1);
        await new Promise(r => setTimeout(r, 400));

        // Exchange 2: Describe issue
        const inputPos2 = getPos("chat-input");
        if (inputPos2) setCursorPosition(inputPos2);
        await new Promise(r => setTimeout(r, 200));
        await typeAndSend("I submitted but haven't heard back", 3);
        
        // Animate actions progress
        await new Promise(r => setTimeout(r, 400));
        for (let i = 1; i <= 3; i++) {
          if (cancelled) break;
          setActionProgress(i);
          await new Promise(r => setTimeout(r, 400));
        }
        
        // Show status
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 400));
        setIsTyping(false);
        setChatMessages(prev => [...prev, chatFlow[5]]);
        await new Promise(r => setTimeout(r, 600));

        // Exchange 3: Follow-up
        const inputPos3 = getPos("chat-input");
        if (inputPos3) setCursorPosition(inputPos3);
        await new Promise(r => setTimeout(r, 200));
        await typeAndSend("When will I hear back?", 6);

        // Hide cursor
        setCursorVisible(false);

        // Hold on resolved
        await new Promise(r => setTimeout(r, 3500));
      }
    };

    runDemo();
    return () => { cancelled = true; };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-white">
      {/* Purple Glow Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top left,
              rgba(173, 109, 244, 0.5),
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
        className="relative z-20 w-[280px] sm:w-[320px] md:w-[340px] lg:w-[360px] transform scale-[0.85] sm:scale-[0.9] lg:scale-100 origin-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VirtualCursor position={cursorPosition} clicking={cursorClicking} visible={cursorVisible} />

        <div className="rounded-[12px] overflow-hidden bg-[#1a1a1a] border border-white/[0.1]">
          
          {/* Header */}
          <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#252525] border-b border-white/[0.06]">
            <span className="text-[13px] font-semibold text-white">Mark</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />
            <span className="text-[10px] text-white/40">AI Support</span>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px]">
            <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className={`max-w-[85%]`}>
                      <div
                        className={`px-3 py-1.5 text-[13px] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[#007AFF] text-white rounded-[6px] rounded-br-[2px]"
                            : "bg-[#3a3a3c] text-white/90 rounded-[6px] rounded-bl-[2px]"
                        }`}
                      >
                        {msg.content}
                      </div>
                      
                      {/* Support Actions */}
                      {msg.actions && (
                        <motion.div 
                          className="mt-2 space-y-1.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {msg.actions.map((action, idx) => (
                            <motion.div
                              key={action.label}
                              className={`flex items-center gap-2.5 p-2 rounded-[6px] border border-white/[0.08] ${
                                actionProgress > idx 
                                  ? "bg-[#FF9500]/10" 
                                  : "bg-white/[0.03]"
                              }`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 + idx * 0.08 }}
                            >
                              <div className={`w-6 h-6 rounded-[4px] flex items-center justify-center flex-shrink-0 ${
                                actionProgress > idx 
                                  ? "bg-[#FF9500]/20" 
                                  : "bg-white/10"
                              }`}>
                                {actionProgress > idx ? (
                                  <motion.svg 
                                    width="12" height="12" viewBox="0 0 24 24" fill="none" 
                                    className="text-[#FF9500]"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </motion.svg>
                                ) : (
                                  <ActionIcon type={action.icon} />
                                )}
                              </div>
                              <span className={`text-[11px] ${
                                actionProgress > idx 
                                  ? "text-[#FF9500]" 
                                  : "text-white/50"
                              }`}>
                                {action.label}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {/* Application Status Card */}
                      {msg.showStatus && (
                        <motion.div
                          className="mt-2 p-3 rounded-[6px] bg-gradient-to-r from-[#FF9500]/15 to-[#FF6B00]/15 border border-[#FF9500]/25"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-[4px] bg-[#FF9500]/20 flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#FF9500]">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </div>
                            <span className="text-[12px] font-medium text-[#FF9500]">{msg.showStatus.school}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-[#FFCC00]/20 text-[10px] font-medium text-[#FFCC00]">
                              {msg.showStatus.status}
                            </span>
                            <span className="text-[10px] text-white/40">{msg.showStatus.date}</span>
                          </div>
                        </motion.div>
                      )}

                      {/* Resolved confirmation */}
                      {msg.showResolved && (
                        <motion.div
                          className="mt-2 p-3 rounded-[6px] bg-[#30D158]/15 border border-[#30D158]/25"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-[4px] bg-[#30D158]/20 flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#30D158]">
                                <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <span className="text-[12px] font-medium text-[#30D158]">Priority review requested</span>
                          </div>
                          <p className="text-[10px] text-white/40 mt-1.5 ml-7">
                            You&apos;ll receive an email update within 5-7 business days
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="px-3 py-2 rounded-[6px] rounded-bl-[2px] bg-[#3a3a3c]">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div
                  ref={registerRef("chat-input")}
                  className="flex-1 px-4 py-2 rounded-[6px] bg-[#3a3a3c] text-[13px]"
                >
                  <span className={chatInput ? "text-white" : "text-white/35"}>
                    {chatInput || "Describe your issue..."}
                    {chatInput && (
                      <motion.span
                        className="inline-block w-0.5 h-3.5 bg-[#007AFF] ml-0.5 align-middle"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.4, repeat: Infinity }}
                      />
                    )}
                  </span>
                </div>
                <motion.button
                  ref={registerRef("send-btn")}
                  className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center flex-shrink-0"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
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
