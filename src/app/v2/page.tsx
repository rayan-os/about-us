"use client";

import StaticPassageLogo from "@/assets/icons/static-passage-logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Minimal split panel
function SplitPanel({
  side,
  label,
  title,
  description,
  href,
  cta,
}: {
  side: "left" | "right";
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-center min-h-[50vh] lg:min-h-screen bg-white hover:bg-gray-50/50 transition-colors duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content */}
      <div className={`relative z-10 px-8 sm:px-12 lg:px-20 ${side === "right" ? "lg:pl-16" : "lg:pr-16"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: side === "left" ? 0.2 : 0.3 }}
        >
          {/* Label */}
          <motion.span
            className="inline-block text-xs tracking-[0.2em] uppercase text-gray-400 mb-6"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.span>

          {/* Title */}
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-display text-gray-900 leading-[1.1] mb-5"
            animate={{ x: isHovered ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-sm mb-8">
            {description}
          </p>

          {/* CTA */}
          <motion.div
            className="inline-flex items-center gap-2 text-sm text-gray-900 font-medium"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>{cta}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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

      {/* Subtle line on hover */}
      <motion.div
        className={`absolute bottom-12 ${side === "left" ? "left-8 sm:left-12 lg:left-20" : "right-8 sm:right-12 lg:right-20"} h-px bg-gray-200`}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? 60 : 40 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

export default function HomeV2() {
  return (
    <main className="min-h-[100dvh] bg-white text-gray-900">
      {/* Fixed header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-12 lg:px-20 py-6 bg-white/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={StaticPassageLogo}
          alt="Passage"
          className="h-[20px] sm:h-[24px] w-auto"
        />
        <nav className="hidden md:flex items-center gap-8">
          <Link href="https://www.passage.com/students" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Students
          </Link>
          <Link href="/ai" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Institutions
          </Link>
          <Link href="https://www.passage.com/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            About
          </Link>
        </nav>
      </motion.header>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100dvh]">
        <SplitPanel
          side="left"
          label="For Students"
          title="Study in Canada"
          description="Up to $65,000 in financing for ambitious international students."
          href="https://www.passage.com/students"
          cta="Apply now"
        />

        {/* Center divider */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 z-10" />

        <SplitPanel
          side="right"
          label="For Institutions"
          title="AI-powered admissions"
          description="24/7 multilingual counseling and intelligent document screening."
          href="/ai"
          cta="Learn more"
        />
      </div>

      {/* Fixed footer */}
      <motion.footer
        className="fixed bottom-0 left-0 right-0 z-50 px-8 sm:px-12 lg:px-20 py-6 flex items-center justify-between bg-white/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs text-gray-400">
          ©{new Date().getFullYear()} Passage
        </span>
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <Link href="https://www.passage.com/privacy" className="hover:text-gray-600 transition-colors">
            Privacy
          </Link>
          <Link href="https://www.passage.com/terms" className="hover:text-gray-600 transition-colors">
            Terms
          </Link>
        </div>
      </motion.footer>
    </main>
  );
}
