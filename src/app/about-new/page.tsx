"use client";

import StaticPassageLogo from "@/assets/icons/static-passage-logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ASHBY_CAREERS_URL = "https://jobs.ashbyhq.com/passage";

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

function WhyJoinCard({
  number,
  title,
  description,
  delay,
  isDark,
}: {
  number: string;
  title: string;
  description: string;
  delay: number;
  isDark: boolean;
}) {
  return (
    <motion.div
      className={`p-6 sm:p-8 rounded-2xl transition-colors duration-500 ${
        isDark ? "bg-white/[0.02] hover:bg-white/[0.04]" : "bg-black/[0.02] hover:bg-black/[0.04]"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <span className={`text-xs font-mono ${isDark ? "text-white/20" : "text-black/20"}`}>{number}</span>
      <h3 className={`text-lg font-medium mt-3 mb-2 ${isDark ? "text-white" : "text-black"}`}>
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
      className={`flex items-center justify-center py-5 border-t border-l transition-colors duration-300 ${
        isDark ? "border-white/5 hover:bg-white/[0.02]" : "border-black/5 hover:bg-black/[0.02]"
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <span className={`text-xs sm:text-sm ${isDark ? "text-white/50" : "text-black/50"}`}>{name}</span>
    </motion.div>
  );
}

function LeaderCard({ 
  name, 
  role, 
  isDark, 
  delay 
}: { 
  name: string; 
  role: string; 
  isDark: boolean; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className={`relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-3 ${
        isDark ? "bg-white/[0.03]" : "bg-black/[0.03]"
      }`}>
        {/* Empty placeholder for headshot */}
      </div>
      <p className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>{name}</p>
      <p className={`text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>{role}</p>
    </motion.div>
  );
}

function TeamGallery({ isDark }: { isDark: boolean }) {
  const photos = ["/team/1.jpg", "/team/2.jpg", "/team/3.jpg", "/team/5.jpg", "/team/6.jpg"];
  
  return (
    <div className="w-full max-w-md">
      {/* iPhone-style gallery grid */}
      <div className="grid grid-cols-3 gap-0.5 rounded-2xl overflow-hidden">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className={`relative aspect-square overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Image src={photo} alt="Team" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </motion.div>
        ))}
        
        {/* "Could this be you?" cell */}
        <Link
          href={ASHBY_CAREERS_URL}
          className={`relative aspect-square overflow-hidden flex items-center justify-center transition-colors ${
            isDark ? "bg-white/[0.03] hover:bg-white/[0.06]" : "bg-black/[0.03] hover:bg-black/[0.06]"
          }`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="text-center px-2"
          >
            <p className={`text-xs sm:text-sm font-medium ${isDark ? "text-white/80" : "text-black/80"}`}>
              Could this be you?
            </p>
            <p className={`text-[10px] sm:text-xs mt-1 ${isDark ? "text-white/40" : "text-black/40"}`}>
              Join us →
            </p>
          </motion.div>
        </Link>
        
        {photos.slice(0, 2).map((photo, i) => (
          <motion.div
            key={i + 10}
            className={`relative aspect-square overflow-hidden ${isDark ? "bg-white/5" : "bg-black/5"}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
          >
            <Image src={photo} alt="Team" fill className="object-cover hover:scale-105 transition-transform duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatBlock({ value, label, isDark }: { value: string; label: string; isDark: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-3xl sm:text-4xl font-light ${isDark ? "text-white" : "text-black"}`}>{value}</div>
      <div className={`text-xs mt-1 ${isDark ? "text-white/30" : "text-black/30"}`}>{label}</div>
    </div>
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
        <div className="flex items-center gap-4">
          <Link
            href={ASHBY_CAREERS_URL}
            className={`hidden sm:inline-flex text-sm transition-colors ${
              isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
            }`}
          >
            We're hiring
          </Link>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            className={`inline-block px-3 py-1 rounded-full text-xs mb-8 ${
              isDark ? "bg-white/5 text-white/50" : "bg-black/5 text-black/50"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            We're building something big
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The future of education
            <br />
            <span className={isDark ? "text-white/40" : "text-black/40"}>starts here.</span>
          </motion.h1>
          
          <motion.p
            className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 ${
              isDark ? "text-white/40" : "text-black/40"
            }`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Passage is removing financial barriers to education for millions of international students. 
            We're a small team solving a massive problem—and we're just getting started.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href={ASHBY_CAREERS_URL}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                isDark 
                  ? "bg-white text-black hover:bg-white/90" 
                  : "bg-black text-white hover:bg-black/90"
              }`}
            >
              View open roles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Traction */}
      <section className={`py-16 px-6 border-y ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBlock value="$65K" label="Max student financing" isDark={isDark} />
            <StatBlock value="150+" label="Partner institutions" isDark={isDark} />
            <StatBlock value="100+" label="Countries served" isDark={isDark} />
            <StatBlock value="10x" label="Growth YoY" isDark={isDark} />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={`py-24 px-6`}>
        <div className="max-w-2xl mx-auto">
          <motion.p
            className={`text-xl sm:text-2xl leading-relaxed font-light ${isDark ? "text-white/70" : "text-black/70"}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            "Brilliant students are denied opportunities every day—not because of their potential, 
            but because of where they were born. We're changing that."
          </motion.p>
        </div>
      </section>

      {/* Why Join */}
      <section className={`py-20 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl font-medium text-center mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why join Passage?
          </motion.h2>
          <motion.p
            className={`text-center mb-12 max-w-xl mx-auto ${isDark ? "text-white/40" : "text-black/40"}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We're not just building a company—we're building a movement.
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <WhyJoinCard
              number="01"
              title="Real impact, every day"
              description="Every feature you ship helps a student access education they couldn't before. Your work changes lives."
              delay={0.1}
              isDark={isDark}
            />
            <WhyJoinCard
              number="02"
              title="Ground floor opportunity"
              description="We're early. The decisions you make today will shape the company for years. High ownership, high upside."
              delay={0.15}
              isDark={isDark}
            />
            <WhyJoinCard
              number="03"
              title="World-class investors"
              description="Backed by top-tier VCs who've built billion-dollar companies. We have the resources to win."
              delay={0.2}
              isDark={isDark}
            />
            <WhyJoinCard
              number="04"
              title="Small team, big problems"
              description="No bureaucracy. No politics. Just talented people solving hard problems together."
              delay={0.25}
              isDark={isDark}
            />
            <WhyJoinCard
              number="05"
              title="AI-first company"
              description="We're building with the latest in AI/ML. If you want to work on cutting-edge tech, this is it."
              delay={0.3}
              isDark={isDark}
            />
            <WhyJoinCard
              number="06"
              title="Global by default"
              description="Our users span 100+ countries. Build products for a truly global audience from day one."
              delay={0.35}
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className={`py-16 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-3xl mx-auto">
          <motion.p
            className={`text-center text-sm mb-8 ${isDark ? "text-white/30" : "text-black/30"}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Backed by
          </motion.p>
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

      {/* Leadership */}
      <section className={`py-20 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl font-medium text-center mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Leadership
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            <LeaderCard name="Name" role="CEO & Co-Founder" isDark={isDark} delay={0.1} />
            <LeaderCard name="Name" role="CTO & Co-Founder" isDark={isDark} delay={0.15} />
            <LeaderCard name="Name" role="COO & Co-Founder" isDark={isDark} delay={0.2} />
            <LeaderCard name="Name" role="Head of Product" isDark={isDark} delay={0.25} />
            <LeaderCard name="Name" role="Head of Engineering" isDark={isDark} delay={0.3} />
            <LeaderCard name="Name" role="Head of Growth" isDark={isDark} delay={0.35} />
          </div>
        </div>
      </section>

      {/* Team / CTA */}
      <section className={`py-20 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex items-center justify-center lg:justify-start order-2 lg:order-1">
              <TeamGallery isDark={isDark} />
            </div>
            
            <motion.div
              className="order-1 lg:order-2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium mb-4">
                Come build with us.
              </h2>
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-white/40" : "text-black/40"}`}>
                We're looking for exceptional people who want to do the best work of their careers. 
                Remote-friendly. Competitive comp. Meaningful equity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href={ASHBY_CAREERS_URL}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isDark 
                      ? "bg-white text-black hover:bg-white/90" 
                      : "bg-black text-white hover:bg-black/90"
                  }`}
                >
                  View open positions
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="mailto:careers@passage.com"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm transition-colors ${
                    isDark 
                      ? "border border-white/10 text-white/60 hover:bg-white/5" 
                      : "border border-black/10 text-black/60 hover:bg-black/5"
                  }`}
                >
                  Get in touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-20 px-6 border-t ${isDark ? "border-white/5 bg-white/[0.01]" : "border-black/5 bg-black/[0.01]"}`}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.h3
            className="text-xl sm:text-2xl font-medium mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to change lives?
          </motion.h3>
          <motion.p
            className={`mb-8 ${isDark ? "text-white/40" : "text-black/40"}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join us in building the future of international education.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href={ASHBY_CAREERS_URL}
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                isDark ? "text-white hover:text-white/70" : "text-black hover:text-black/70"
              }`}
            >
              See all open roles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-5xl mx-auto">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? "text-white/30" : "text-black/30"
          }`}>
            <span>©{new Date().getFullYear()} Passage</span>
            <div className="flex items-center gap-6">
              <Link href={ASHBY_CAREERS_URL} className={`transition-colors ${isDark ? "hover:text-white/50" : "hover:text-black/50"}`}>Careers</Link>
              <Link href="https://www.passage.com/privacy" className={`transition-colors ${isDark ? "hover:text-white/50" : "hover:text-black/50"}`}>Privacy</Link>
              <Link href="https://www.passage.com/terms" className={`transition-colors ${isDark ? "hover:text-white/50" : "hover:text-black/50"}`}>Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
