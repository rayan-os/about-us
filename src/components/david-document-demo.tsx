"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// Types & Data
// ─────────────────────────────────────────────────────────────

type DocumentStatus = "pending" | "validating" | "validated" | "flagged";

interface Document {
  id: string;
  name: string;
  fileType: "pdf" | "image";
  status?: DocumentStatus;
  issueDate?: string;
  expiryDate?: string;
}

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  documents?: Document[];
}

const userDocuments: Document[] = [
  { id: "passport", name: "Passport.pdf", fileType: "pdf" },
  { id: "ielts", name: "IELTS_Score.pdf", fileType: "pdf", issueDate: "Mar 10, 2023", expiryDate: "Mar 10, 2025" },
  { id: "transcript", name: "Transcript.png", fileType: "image" },
];

// ─────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────

const PdfIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#FF6B6B]">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#4ECDC4]">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
// Document Card Component
// ─────────────────────────────────────────────────────────────

const DocumentCard = ({ doc, showStatus = false }: { doc: Document; showStatus?: boolean }) => {
  const isValidated = doc.status === "validated";
  const isFlagged = doc.status === "flagged";
  
  return (
    <motion.div
      className={`flex items-center gap-2 p-2 rounded-[5px] border ${
        showStatus && isFlagged
          ? "bg-[#FF3B30]/10 border-[#FF3B30]/30"
          : "bg-white/5 border-white/[0.08]"
      }`}
      initial={{ opacity: 0, x: showStatus ? -8 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      layout
    >
      <div className="w-6 h-6 rounded-[4px] bg-white/10 flex items-center justify-center flex-shrink-0">
        {doc.fileType === "pdf" ? <PdfIcon /> : <ImageIcon />}
      </div>
        <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-white/80 truncate">{doc.name}</span>
          {showStatus && isValidated && (
            <span className="text-[8px] text-[#30D158] font-medium shrink-0 bg-[#30D158]/20 px-1.5 py-0.5 rounded-[3px]">
              {doc.id === "passport" ? "Verified" : "Verified by source"}
            </span>
          )}
          {showStatus && isFlagged && (
            <span className="text-[8px] text-[#FF6B6B] font-medium shrink-0 bg-[#FF3B30]/20 px-1.5 py-0.5 rounded-[3px]">Expired</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Verifying Indicator Component
// ─────────────────────────────────────────────────────────────

const VerifyingIndicator = ({ progress, done }: { progress: number; done: boolean }) => {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {done ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#30D158]">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] text-white/60">Verification complete</span>
        </>
      ) : (
        <>
          <motion.div
            className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-[10px] text-white/60">Verifying documents...</span>
          <span className="text-[10px] text-white/40">{progress}/3</span>
        </>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export function DavidDocumentDemo() {
  const [mounted, setMounted] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyingDoc, setVerifyingDoc] = useState("");
  const [verifyProgress, setVerifyProgress] = useState(0);
  const [verificationResults, setVerificationResults] = useState<Document[]>([]);
  const [showResults, setShowResults] = useState(false);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorClicking, setCursorClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [chatInput, setChatInput] = useState("");
  const [uploadedCount, setUploadedCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) elementRefs.current.set(id, el);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatMessages, isTyping, showVerification, verifyProgress, showResults]);

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

    const runDemo = async () => {
      let isFirstRun = true;
      
      while (!cancelled) {
        // Fade out before reset (skip on first run)
        if (!isFirstRun) {
          setContentOpacity(0);
          await new Promise(r => setTimeout(r, 400));
        }
        
        // Reset
        setChatMessages([]);
        setIsTyping(false);
        setCursorVisible(false);
        setShowVerification(false);
        setIsVerifying(false);
        setVerifyingDoc("");
        setVerifyProgress(0);
        setVerificationResults([]);
        setShowResults(false);
        setChatInput("");
        setUploadedCount(0);
        setIsUploading(false);

        // Fade in
        await new Promise(r => setTimeout(r, 100));
        setContentOpacity(1);
        
        isFirstRun = false;
        await new Promise(r => setTimeout(r, 460));

        // David greeting
        setChatMessages([{ id: "1", role: "assistant", content: "Hey! Upload your documents and I'll verify them." }]);
        await new Promise(r => setTimeout(r, 1000));

        // Step 1: Show cursor and move to right side of input area to type
        const inputPos = getPos("chat-input");
        if (inputPos) setCursorPosition({ x: inputPos.x + 60, y: inputPos.y + 15 });
        setCursorVisible(true);
        await new Promise(r => setTimeout(r, 250));
        
        // Move to right side of input (so it doesn't overlap typed text)
        if (inputPos) setCursorPosition({ x: inputPos.x + 50, y: inputPos.y });
        await new Promise(r => setTimeout(r, 250));

        // Click on input
        setCursorClicking(true);
        await new Promise(r => setTimeout(r, 80));
        setCursorClicking(false);
        await new Promise(r => setTimeout(r, 200));

        // Step 2: Type "Here are my documents"
        const messageText = "Here are my documents";
        for (const char of messageText.split("")) {
          if (cancelled) break;
          setChatInput(p => p + char);
          await new Promise(r => setTimeout(r, 40));
        }
        await new Promise(r => setTimeout(r, 500));

        // Step 3: Move cursor to upload button (position at bottom right border to avoid content overlap)
        const uploadBtn = elementRefs.current.get("upload-btn");
        const containerRect = containerRef.current?.getBoundingClientRect();
        let uploadBtnPos = { x: 0, y: 0 };
        if (uploadBtn && containerRect) {
          const rect = uploadBtn.getBoundingClientRect();
          // Position at bottom right corner of the button
          uploadBtnPos = { 
            x: rect.right - containerRect.left - 14, 
            y: rect.bottom - containerRect.top - 10 
          };
          setCursorPosition(uploadBtnPos);
        }
        await new Promise(r => setTimeout(r, 350));

        // Click upload - show uploading progress then uploaded
        setCursorClicking(true);
        await new Promise(r => setTimeout(r, 80));
        setCursorClicking(false);
        
        // Quick upload progress
        setIsUploading(true);
        await new Promise(r => setTimeout(r, 500));
        setIsUploading(false);
        setUploadedCount(3);
        await new Promise(r => setTimeout(r, 500));

        // Step 4: Move cursor to send button
        const sendPos = getPos("send-btn");
        if (sendPos) setCursorPosition(sendPos);
        await new Promise(r => setTimeout(r, 350));

        // Click send
        setCursorClicking(true);
        await new Promise(r => setTimeout(r, 80));
        setCursorClicking(false);
        await new Promise(r => setTimeout(r, 100));

        // Step 5: Send message with documents
        setChatInput("");
        setUploadedCount(0);
        setIsUploading(false);
        setChatMessages(prev => [...prev, { id: "2", role: "user", content: "Here are my documents", documents: userDocuments }]);
        
        // Move cursor slightly away
        if (sendPos) setCursorPosition({ x: sendPos.x + 10, y: sendPos.y + 8 });
        await new Promise(r => setTimeout(r, 800));

        // David responds
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 460));
        setIsTyping(false);
        setChatMessages(prev => [...prev, { id: "3", role: "assistant", content: "Got it! Let me check these..." }]);
        await new Promise(r => setTimeout(r, 575));

        // Show verification card
        setShowVerification(true);
        setIsVerifying(true);

        // Verify documents one by one
        const docs = ["Passport", "IELTS Score", "Transcript"];
        for (let i = 0; i < docs.length; i++) {
          if (cancelled) break;
          setVerifyingDoc(docs[i]);
          setVerifyProgress(i + 1);
          await new Promise(r => setTimeout(r, 690));
        }

        // Show results
        setIsVerifying(false);
        setShowResults(true);
        
        const results: Document[] = [
          { ...userDocuments[0], status: "validated" },
          { ...userDocuments[1], status: "flagged" },
          { ...userDocuments[2], status: "validated" },
        ];
        setVerificationResults(results);

        // Hide cursor
        setCursorVisible(false);

        // Hold on final state
        await new Promise(r => setTimeout(r, 5500));
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5 } }}
      >
        <VirtualCursor position={cursorPosition} clicking={cursorClicking} visible={cursorVisible} />

        <div className="rounded-[12px] overflow-hidden bg-[#1a1a1a] border border-white/[0.1]">
          
          {/* Header */}
          <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#252525] border-b border-white/[0.06]">
            <span className="text-[13px] font-semibold text-white">David</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
            <span className="text-[10px] text-white/40">AI Processor</span>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col h-[200px] sm:h-[240px] md:h-[280px] lg:h-[340px]">
            <div 
              ref={messagesRef} 
              className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide pointer-events-none transition-opacity duration-300"
              style={{ opacity: contentOpacity }}
            >
              <AnimatePresence mode="popLayout">
                {chatMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="max-w-[85%]">
                      <div
                        className={`px-2.5 py-1.5 text-[12px] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[#007AFF] text-white rounded-[6px] rounded-br-[2px]"
                            : "bg-[#3a3a3c] text-white/90 rounded-[6px] rounded-bl-[2px]"
                        }`}
                      >
                        {msg.content}
                      </div>

                      {/* User's documents */}
                      {msg.documents && (
                        <motion.div
                          className="mt-1.5 space-y-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {msg.documents.map((doc, idx) => (
                            <motion.div
                              key={doc.id}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 + idx * 0.08 }}
                            >
                              <DocumentCard doc={doc} />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Verifying Indicator - stays visible after completion */}
              {showVerification && (
                <motion.div className="flex justify-start">
                  <VerifyingIndicator progress={verifyProgress} done={showResults} />
                </motion.div>
              )}

              {/* Verification Results - Document cards directly */}
              {showResults && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="max-w-[85%] space-y-1.5">
                    {verificationResults.map((doc, idx) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <DocumentCard doc={doc} showStatus={true} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

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

            {/* Footer with Input and Buttons */}
            <div className="p-2.5 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-[#3a3a3c]">
                  {/* Message input area */}
                  <div 
                    ref={registerRef("chat-input")}
                    className="flex-1 text-[12px]"
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
                  
                  {/* Upload Document Button - rectangular, on right side */}
                  <motion.button
                    ref={registerRef("upload-btn")}
                    className="h-6 px-2 rounded-[4px] bg-white/10 hover:bg-white/15 flex items-center gap-1.5 flex-shrink-0 transition-colors overflow-hidden"
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {isUploading ? (
                        <motion.div
                          key="spinner"
                          className="w-3 h-3 border-[1.5px] border-white/30 border-t-white/70 rounded-full"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1, rotate: 360 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ 
                            opacity: { duration: 0.15 },
                            scale: { duration: 0.15 },
                            rotate: { duration: 0.6, repeat: Infinity, ease: "linear" }
                          }}
                        />
                      ) : (
                        <motion.svg 
                          key="icon"
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          className="text-white/70"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 2v5a1 1 0 0 0 1 1h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 12v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="m15 15-3-3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      {isUploading ? (
                        <motion.span 
                          key="uploading"
                          className="text-[10px] text-white/60"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                        >
                          Uploading...
                        </motion.span>
                      ) : uploadedCount > 0 ? (
                        <motion.span 
                          key="files"
                          className="text-[10px] text-white/80"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                        >
                          {uploadedCount} files
                        </motion.span>
                      ) : (
                        <motion.span 
                          key="upload"
                          className="text-[10px] text-white/60"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                        >
                          Upload
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                
                {/* Send Button - circular like Jackie chat */}
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
