"use client";

import StaticPassageLogo from "@/assets/icons/static-passage-logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Subtle floating dots animation (OpenAI style)
function FloatingDots({ side }: { side: "left" | "right" }) {
  const dots = Array.from({ length: 12 }, (_, i) => ({
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
          className={`absolute rounded-full ${side === "left" ? "bg-orange-400/20" : "bg-violet-400/20"}`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
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

// Split panel component
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

  const bgColor = side === "left" ? "bg-[#0c0c0c]" : "bg-[#0a0a0a]";
  const accentColor = side === "left" ? "text-orange-400" : "text-violet-400";
  const borderColor = side === "left" ? "border-orange-400/20" : "border-violet-400/20";
  const hoverBg = side === "left" ? "hover:bg-orange-400/5" : "hover:bg-violet-400/5";

  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-center min-h-[50vh] lg:min-h-screen ${bgColor} ${hoverBg} transition-colors duration-700`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FloatingDots side={side} />
      
      {/* Subtle gradient on hover */}
      <motion.div
        className={`absolute inset-0 pointer-events-none ${side === "left" ? "bg-gradient-to-r from-orange-500/5 to-transparent" : "bg-gradient-to-l from-violet-500/5 to-transparent"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className={`relative z-10 px-8 sm:px-12 lg:px-16 ${side === "left" ? "lg:pl-16 lg:pr-12" : "lg:pr-16 lg:pl-12"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: side === "left" ? 0.2 : 0.4 }}
        >
          {/* Subtitle */}
          <motion.span
            className={`inline-block text-xs tracking-[0.25em] uppercase ${accentColor} mb-6`}
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {subtitle}
          </motion.span>

          {/* Title */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display text-white leading-[1.05] mb-6"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-md mb-10">
            {description}
          </p>

          {/* CTA */}
          <motion.div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${borderColor} group-hover:border-white/20 transition-colors duration-300`}
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
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/50 group-hover:text-white transition-colors"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner accent line */}
      <motion.div
        className={`absolute ${side === "left" ? "bottom-8 left-8" : "bottom-8 right-8"} w-12 h-[1px] ${side === "left" ? "bg-orange-400/30" : "bg-violet-400/30"}`}
        animate={{ width: isHovered ? 48 : 32, opacity: isHovered ? 0.6 : 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

export default function HomeV3() {
  return (
    <main className="min-h-[100dvh] bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col">
      {/* Fixed header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-start px-6 sm:px-8 py-5 sm:py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={StaticPassageLogo}
          alt="Passage"
          className="h-[20px] sm:h-[24px] w-auto"
        />
      </motion.header>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
        <SplitPanel
          side="left"
          subtitle="For Students"
          title="Study in Canada"
          description="Up to $65,000 in financing for ambitious international students ready to change their future."
          href="https://www.passage.com/students"
          ctaText="Apply now"
        />
        

        <SplitPanel
          side="right"
          subtitle="For Institutions"
          title="AI-powered admissions"
          description="24/7 multilingual counseling, intelligent screening, and seamless enrollment automation."
          href="/ai"
          ctaText="Request demo"
        />
      </div>

      {/* Footer */}
      <motion.footer
        className="relative z-50 px-6 sm:px-8 py-4 sm:py-6 bg-[#0a0a0a] mt-auto"
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
