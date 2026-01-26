"use client";

import StaticPassageLogo from "@/assets/icons/static-passage-logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Theme F: Teal Black + Plum, Soft Gold Accent
const THEME = {
  left: {
    bg: "radial-gradient(1200px 900px at 20% 35%, #062A2B 0%, #060A0A 60%, #040404 100%)",
  },
  right: {
    bg: "radial-gradient(1200px 900px at 75% 35%, #24101F 0%, #09060A 65%, #040304 100%)",
  },
  accent: "#D7B36A",
};

function FloatingDots({ color }: { color: string }) {
  const dots = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    size: 2 + Math.random() * 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            backgroundColor: `${color}30`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

function SplitPanel({
  side,
  title,
  subtitle,
  description,
  href,
  ctaText,
}: {
  side: "left" | "right";
  title: string;
  subtitle: string;
  description: string;
  href: string;
  ctaText: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-center min-h-[50vh] lg:min-h-full transition-all duration-700"
      style={{ background: side === "left" ? THEME.left.bg : THEME.right.bg }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FloatingDots color={THEME.accent} />
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: side === "left" 
            ? `linear-gradient(to right, ${THEME.accent}08, transparent)` 
            : `linear-gradient(to left, ${THEME.accent}08, transparent)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className={`relative z-10 px-6 sm:px-10 lg:px-14 ${side === "left" ? "lg:pr-10" : "lg:pl-10"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: side === "left" ? 0.2 : 0.4 }}
        >
          <motion.span
            className="inline-block text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: THEME.accent }}
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {subtitle}
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-white leading-[1.1] mb-5"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h2>

          <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-md mb-8">
            {description}
          </p>

          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border transition-colors duration-300"
            style={{ 
              borderColor: isHovered ? `${THEME.accent}60` : `${THEME.accent}30`,
            }}
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">
              {ctaText}
            </span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={THEME.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={`absolute ${side === "left" ? "bottom-6 left-6" : "bottom-6 right-6"} h-[1px]`}
        style={{ backgroundColor: `${THEME.accent}50` }}
        animate={{ width: isHovered ? 48 : 32, opacity: isHovered ? 0.8 : 0.4 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

export default function HomeV3F() {
  return (
    <main className="min-h-[100dvh] bg-[#040304] text-white relative overflow-hidden flex flex-col">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-start px-6 sm:px-8 py-5 sm:py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image src={StaticPassageLogo} alt="Passage" className="h-[20px] sm:h-[24px] w-auto" />
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
        <SplitPanel
          side="left"
          subtitle="For Students"
          title="Admission and Financing for International Students"
          description="Financing up to $65,000 for the most ambitious international students to study in Canada."
          href="https://www.passage.com/students"
          ctaText="Learn more"
        />
        <SplitPanel
          side="right"
          subtitle="For Institutions"
          title="Passage AI for Universities & Colleges"
          description="Deliver a faster, smoother application experience with 24/7 multilingual AI counseling and real-time document and eligibility screening."
          href="/ai"
          ctaText="Learn more"
        />
      </div>

      <motion.footer
        className="relative z-50 px-6 sm:px-8 py-4 sm:py-6 mt-auto"
        style={{ background: THEME.right.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-3 text-[11px] sm:text-sm text-white/40">
          <span>©{new Date().getFullYear()} Passage. All rights reserved.</span>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="https://www.passage.com/about#about-career" className="hover:text-white/60 transition-colors">Careers</Link>
            <Link href="https://www.passage.com/privacy" className="hover:text-white/60 transition-colors">Privacy policy</Link>
            <Link href="https://www.passage.com/terms" className="hover:text-white/60 transition-colors">Terms of service</Link>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
