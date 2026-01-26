"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "react-fast-marquee";

interface Signal {
  text: string;
  color: string;
}

const signalsRow1: Signal[] = [
  { text: "New application submitted", color: "#81e4ba" },
  { text: "Document verification completed", color: "#95d1fd" },
  { text: "Eligibility confirmed automatically", color: "#fbc768" },
  { text: "Follow-up sent", color: "#ff91be" },
  { text: "New inquiry from prospective student", color: "#9999fe" },
  { text: "Identity check passed", color: "#81e4ba" },
  { text: "Deadline reminder sent", color: "#ffaa8e" },
  { text: "Transcript uploaded", color: "#ace6d7" },
];

const signalsRow2: Signal[] = [
  { text: "Application moved to review queue", color: "#ecc07f" },
  { text: "Missing transcript flagged", color: "#e16540" },
  { text: "Enrollment packet ready for decision", color: "#81e4ba" },
  { text: "Identity verified", color: "#95d1fd" },
  { text: "Compliance check passed", color: "#cace04" },
  { text: "Exception escalated", color: "#ff885c" },
  { text: "Eligibility criteria met", color: "#9999fe" },
  { text: "Automated response sent", color: "#f0bcd4" },
];

const signalsRow3: Signal[] = [
  { text: "Waitlist candidate reached out", color: "#aca2e1" },
  { text: "Financial aid documents uploaded", color: "#fbc768" },
  { text: "Question answered", color: "#328efa" },
  { text: "Decision letter generated", color: "#81e4ba" },
  { text: "Application status updated", color: "#95d1fd" },
  { text: "Verification complete for 12 applicants", color: "#7fa392" },
  { text: "Reminder queued", color: "#ffaa8e" },
  { text: "Enrollment confirmed", color: "#659b5e" },
];

function SignalCard({ signal }: { signal: Signal }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-[#1a1a1a] rounded sm:rounded-md border border-white/5 mx-1 sm:mx-2 whitespace-nowrap transition-all duration-200 hover:bg-[#252525] hover:border-white/10 hover:scale-[1.02] cursor-default">
      <div
        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: signal.color }}
      />
      <span className="text-white/80 text-xs sm:text-sm hover:text-white/90">{signal.text}</span>
    </div>
  );
}

export function Signals() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section ref={ref} className="pt-6 sm:pt-8 pb-16 sm:pb-24 relative overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="text-center mb-8 sm:mb-12 px-4"
      >
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
          Nothing gets missed
        </h2>
      </motion.div>

      {/* Marquee Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Left fade gradient - smaller on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-[#0E0C0D] to-transparent z-10 pointer-events-none" />
          {/* Right fade gradient - smaller on mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-[#0E0C0D] to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Left */}
          <div className="mb-2 sm:mb-3">
            <Marquee speed={15} gradient={false} direction="left" play={isPlaying}>
              {signalsRow1.map((signal, index) => (
                <SignalCard key={`row1-${index}`} signal={signal} />
              ))}
            </Marquee>
          </div>

          {/* Row 2 - Right */}
          <div className="mb-2 sm:mb-3">
            <Marquee speed={12} gradient={false} direction="right" play={isPlaying}>
              {signalsRow2.map((signal, index) => (
                <SignalCard key={`row2-${index}`} signal={signal} />
              ))}
            </Marquee>
          </div>

          {/* Row 3 - Left */}
          <div>
            <Marquee speed={17} gradient={false} direction="left" play={isPlaying}>
              {signalsRow3.map((signal, index) => (
                <SignalCard key={`row3-${index}`} signal={signal} />
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
