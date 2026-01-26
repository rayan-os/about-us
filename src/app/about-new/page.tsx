"use client";

import StaticPassageLogo from "@/assets/icons/static-passage-logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function GridLines({ isDark }: { isDark: boolean }) {
  const lineColor = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[20, 40, 60, 80].map((pos, i) => (
        <motion.div 
          key={i}
          className="absolute top-0 bottom-0 w-px"
          style={{ left: `${pos}%`, backgroundColor: lineColor }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/70">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/70">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </motion.button>
  );
}

function ValueCard({
  icon,
  title,
  description,
  delay,
  isDark,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isDark: boolean;
}) {
  return (
    <motion.div
      className={`p-8 border-t transition-colors duration-500 ${
        isDark ? "border-white/5" : "border-black/5"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`mb-5 ${isDark ? "text-white/30" : "text-black/30"}`}>
        {icon}
      </div>
      <h3 className={`text-base font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${isDark ? "text-white/40" : "text-black/40"}`}>
        {description}
      </p>
    </motion.div>
  );
}

function InvestorLogo({ name, delay, isDark }: { name: string; delay: number; isDark: boolean }) {
  return (
    <motion.div
      className={`flex items-center justify-center py-6 border-t border-l transition-colors duration-300 ${
        isDark ? "border-white/5 hover:bg-white/[0.02]" : "border-black/5 hover:bg-black/[0.02]"
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <span className={`text-sm ${isDark ? "text-white/50" : "text-black/50"}`}>{name}</span>
    </motion.div>
  );
}

function TeamPhoto({ index, isDark }: { index: number; isDark: boolean }) {
  const rotations = [-5, 3, -2, 4, -3];
  const photos = ["/team/1.jpg", "/team/2.jpg", "/team/3.jpg", "/team/5.jpg", "/team/6.jpg"];
  
  return (
    <motion.div
      className={`relative w-28 h-36 sm:w-32 sm:h-40 rounded-lg overflow-hidden shadow-lg flex-shrink-0 ${
        isDark ? "bg-white/5" : "bg-black/5"
      }`}
      style={{ rotate: rotations[index], marginLeft: index > 0 ? -16 : 0 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
    >
      <Image
        src={photos[index]}
        alt="Team member"
        fill
        className="object-cover"
      />
    </motion.div>
  );
}

export default function AboutNew() {
  const [isDark, setIsDark] = useState(true);

  return (
    <main className={`min-h-screen transition-colors duration-500 ${
      isDark ? "bg-black text-white" : "bg-white text-black"
    }`}>
      <GridLines isDark={isDark} />
      
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <Image 
            src={StaticPassageLogo} 
            alt="Passage" 
            className={`h-5 w-auto transition-all duration-500 ${isDark ? "" : "invert"}`} 
          />
        </Link>
        <nav className={`hidden md:flex items-center gap-8 text-sm ${
          isDark ? "text-white/50" : "text-black/50"
        }`}>
          <Link href="/students" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-black"}`}>Students</Link>
          <Link href="/ai" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-black"}`}>Institutions</Link>
          <Link href="/about-new" className={isDark ? "text-white" : "text-black"}>About</Link>
        </nav>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </motion.header>

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Passage enables the world to
            <br />
            <span className={isDark ? "text-white/40" : "text-black/40"}>access education.</span>
          </motion.h1>
          
          <motion.p
            className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
              isDark ? "text-white/40" : "text-black/40"
            }`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We provide financing and AI-powered tools to{" "}
            <span className={isDark ? "text-white/70" : "text-black/70"}>study</span>,{" "}
            <span className={isDark ? "text-white/70" : "text-black/70"}>succeed</span>, and{" "}
            <span className={isDark ? "text-white/70" : "text-black/70"}>thrive</span> at world-class institutions.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className={`border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <ValueCard
              isDark={isDark}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              }
              title="Fast"
              description="We move quickly to help students access opportunities before they pass."
              delay={0.1}
            />
            <ValueCard
              isDark={isDark}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              }
              title="Global"
              description="We serve students from every corner of the world, regardless of where they're from."
              delay={0.15}
            />
            <ValueCard
              isDark={isDark}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              }
              title="Transformative"
              description="Every student we help represents a life transformed and a future unlocked."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={`py-24 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={`text-base leading-relaxed ${isDark ? "text-white/60" : "text-black/60"}`}>
              Passage is a fintech company building financial infrastructure for international education. 
              We help ambitious students from around the world access higher education in Canada by 
              providing financing when traditional banks won't.
            </p>
            <p className={`text-base leading-relaxed ${isDark ? "text-white/60" : "text-black/60"}`}>
              We started with a simple observation: brilliant students were being denied opportunities 
              not because of their potential, but because of where they were born.
            </p>
            <p className={`text-base leading-relaxed ${isDark ? "text-white/60" : "text-black/60"}`}>
              Today, we combine AI-powered underwriting with deep partnerships with institutions to make 
              education financing fast, fair, and accessible. Our platform serves students, while our 
              AI tools help universities deliver better experiences at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Investors */}
      <section className={`py-20 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl font-medium text-center mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Backed by incredible investors.
          </motion.h2>
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-r border-b ${
            isDark ? "border-white/5" : "border-black/5"
          }`}>
            <InvestorLogo name="Plug and Play" delay={0.1} isDark={isDark} />
            <InvestorLogo name="Drive Capital" delay={0.12} isDark={isDark} />
            <InvestorLogo name="Think + Ventures" delay={0.14} isDark={isDark} />
            <InvestorLogo name="2048 Ventures" delay={0.16} isDark={isDark} />
            <InvestorLogo name="Ali Tamaseb" delay={0.18} isDark={isDark} />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`py-24 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium mb-4">
                Join us to shape the future of education.
              </h2>
              <p className={`text-base leading-relaxed mb-6 ${isDark ? "text-white/40" : "text-black/40"}`}>
                We're always looking for talented and driven minds from diverse 
                backgrounds to join our team.
              </p>
              <Link
                href="https://www.passage.com/about#about-career"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isDark 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "bg-black text-white hover:bg-black/90"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                View Open Positions
              </Link>
            </motion.div>
            
            <div className="flex items-center justify-center lg:justify-end">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((i) => (
                  <TeamPhoto key={i} index={i} isDark={isDark} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-10 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-5xl mx-auto">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${
            isDark ? "text-white/30" : "text-black/30"
          }`}>
            <span>©{new Date().getFullYear()} Passage. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <Link href="https://www.passage.com/about#about-career" className={`transition-colors ${isDark ? "hover:text-white/50" : "hover:text-black/50"}`}>Careers</Link>
              <Link href="https://www.passage.com/privacy" className={`transition-colors ${isDark ? "hover:text-white/50" : "hover:text-black/50"}`}>Privacy Policy</Link>
              <Link href="https://www.passage.com/terms" className={`transition-colors ${isDark ? "hover:text-white/50" : "hover:text-black/50"}`}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
