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

function InvestorLogo({ 
  name, 
  logo, 
  delay, 
  isDark 
}: { 
  name: string; 
  logo: string;
  delay: number; 
  isDark: boolean;
}) {
  // 2048 is square, others are wide - adjust sizing
  const is2048 = name === "2048 Ventures";
  
  return (
    <motion.div
      className={`group flex items-center justify-center py-8 px-4 border-t border-l transition-all duration-300 ${
        isDark ? "border-white/10 hover:bg-white/[0.03]" : "border-black/10 hover:bg-black/[0.03]"
      }`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className={`relative flex items-center justify-center ${
        is2048 
          ? "w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]" 
          : "w-[160px] h-[50px] sm:w-[180px] sm:h-[60px]"
      }`}>
        <Image 
          src={logo} 
          alt={name} 
          fill
          className={`object-contain transition-all duration-300 ${
            isDark 
              ? "brightness-0 invert opacity-60 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100" 
              : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
          }`}
        />
      </div>
    </motion.div>
  );
}

const investors = [
  { name: "Drive Capital", logo: "/investors/drive.png" },
  { name: "Plug and Play", logo: "/investors/pp.png" },
  { name: "Think + Ventures", logo: "/investors/think_logo.svg" },
  { name: "2048 Ventures", logo: "/investors/2048.png" },
];

const investorCompanies = [
  { name: "Dropbox", logo: "/companies/dropbox.svg" },
  { name: "PayPal", logo: "/companies/paypal.png" },
  { name: "Notion", logo: "/companies/notion.png" },
  { name: "Duolingo", logo: "/companies/duo.png" },
];

function CompanyLogo({ name, logo, isDark }: { name: string; logo: string; isDark: boolean }) {
  return (
    <motion.div
      className={`group flex items-center justify-center transition-all duration-300`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative w-[130px] h-[52px] sm:w-[160px] sm:h-[64px] flex items-center justify-center">
        <Image 
          src={logo} 
          alt={name} 
          fill
          className={`object-contain transition-all duration-300 ${
            isDark 
              ? "brightness-0 invert opacity-50 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100" 
              : "grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
          }`}
        />
      </div>
    </motion.div>
  );
}

function LeaderCard({ 
  name, 
  role, 
  image,
  linkedin,
  isDark, 
  delay 
}: { 
  name: string; 
  role: string; 
  image: string;
  linkedin?: string;
  isDark: boolean; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className={`relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-4 ${
        isDark ? "bg-gradient-to-b from-indigo-900/40 to-purple-900/60" : "bg-gradient-to-b from-slate-100 to-slate-200"
      }`}>
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Subtle gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDark ? "from-black/60 via-transparent to-transparent" : "from-white/40 via-transparent to-transparent"
        }`} />
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-black"}`}>{name}</p>
          <p className={`text-xs mt-0.5 ${isDark ? "text-white/50" : "text-black/50"}`}>{role}</p>
        </div>
        {linkedin && (
          <Link 
            href={linkedin} 
            target="_blank"
            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              isDark 
                ? "bg-white/10 hover:bg-white/20 text-white/70" 
                : "bg-black/10 hover:bg-black/20 text-black/70"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

const founders = [
  { name: "Martin Basiri", role: "Founder & CEO", image: "/team/martin.jpg", linkedin: "https://linkedin.com/in/martinbasiri" },
  { name: "Jonah Finkelberg", role: "Chief of Staff", image: "/team/jonah.jpg", linkedin: "https://linkedin.com/in/jonahfinkelberg" },
  { name: "Iman Hassani", role: "Chief Operating Officer", image: "/team/iman.jpg", linkedin: "https://linkedin.com/in/imanhassani" },
  { name: "Siavash Mahmoudian", role: "Chief Technology Officer", image: "/team/siavash.jpg", linkedin: "https://linkedin.com/in/siavashm" },
  { name: "Saif Iqbal", role: "Chief Business Officer", image: "/team/saif.jpg", linkedin: "https://linkedin.com/in/saifiqbal" },
  { name: "Mark Steinman", role: "Chief Legal Officer", image: "/team/mark.jpg", linkedin: "https://linkedin.com/in/marksteinman" },
];

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
            className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 ${
              isDark 
                ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400/50" 
                : "bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-600 border border-emerald-500/30 hover:border-emerald-500/50"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
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
      <section className={`py-20 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-4xl mx-auto">
          <motion.p
            className={`text-center text-xs uppercase tracking-widest mb-10 ${isDark ? "text-white/30" : "text-black/30"}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Supported by leading investors
          </motion.p>
          
          {/* Main Investors */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 border-r border-b rounded-xl overflow-hidden ${
            isDark ? "border-white/10" : "border-black/10"
          }`}>
            {investors.map((investor, i) => (
              <InvestorLogo 
                key={investor.name}
                name={investor.name} 
                logo={investor.logo}
                delay={0.1 + i * 0.05} 
                isDark={isDark} 
              />
            ))}
          </div>
          
          {/* Investor Companies */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className={`text-center text-sm mb-10 ${isDark ? "text-white/50" : "text-black/50"}`}>
              Backed by investors from
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
              {investorCompanies.map((company) => (
                <CompanyLogo key={company.name} name={company.name} logo={company.logo} isDark={isDark} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className={`py-24 px-6 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-medium mb-3">
              Leadership
            </h2>
            <p className={`text-sm max-w-md mx-auto ${isDark ? "text-white/40" : "text-black/40"}`}>
              The team building the future of international student mobility
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {founders.map((founder, i) => (
              <LeaderCard 
                key={founder.name}
                name={founder.name} 
                role={founder.role} 
                image={founder.image}
                linkedin={founder.linkedin}
                isDark={isDark} 
                delay={0.1 + i * 0.05} 
              />
            ))}
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

      {/* Join The Movement - Big CTA */}
      <section className={`relative py-28 sm:py-36 px-6 overflow-hidden ${
        isDark 
          ? "bg-gradient-to-br from-indigo-950 via-purple-950 to-black" 
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-50"
      }`}>
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className={`absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${
              isDark ? "bg-indigo-500/20" : "bg-indigo-300/40"
            }`}
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className={`absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${
              isDark ? "bg-purple-500/20" : "bg-purple-300/40"
            }`}
            animate={{ 
              x: [0, -50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl ${
              isDark ? "bg-orange-500/10" : "bg-orange-200/50"
            }`}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Main headline with inline elements */}
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6 ${
              isDark ? "text-white" : "text-black"
            }`}>
              Join{" "}
              <span className="inline-flex items-center mx-2 align-middle">
                <span className={`inline-flex items-center gap-0 px-2 py-1 rounded-full ${
                  isDark ? "bg-white/10" : "bg-black/5"
                }`}>
                  {/* Team faces */}
                  <span className="flex -space-x-2">
                    {["/team/1.jpg", "/team/2.jpg", "/team/3.jpg", "/team/5.jpg"].map((img, i) => (
                      <span key={i} className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                        <Image src={img} alt="Team" fill className="object-cover" />
                      </span>
                    ))}
                  </span>
                  {/* Arrow pill */}
                  <span className="ml-1 w-10 h-8 sm:w-12 sm:h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              </span>
              {" "}the
              <br />
              movement
            </h2>

            <motion.p
              className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 ${
                isDark ? "text-white/60" : "text-black/60"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A new generation of community and technology to mobilize top global talent.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href={ASHBY_CAREERS_URL}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all transform hover:scale-105 ${
                  isDark 
                    ? "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/20" 
                    : "bg-black text-white hover:bg-black/90 shadow-lg shadow-black/20"
                }`}
              >
                Explore Open Roles
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="mailto:careers@passage.com"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all ${
                  isDark 
                    ? "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" 
                    : "bg-black/5 text-black hover:bg-black/10"
                }`}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Toronto HQ */}
          <motion.div
            className={`mt-16 pt-10 border-t ${isDark ? "border-white/10" : "border-black/10"}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center gap-3">
              {/* Location pin */}
              <span className={`flex items-center justify-center w-10 h-10 rounded-full ${
                isDark ? "bg-white/10" : "bg-black/5"
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isDark ? "text-white/70" : "text-black/70"}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div className="text-left">
                <p className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
                  Headquartered in Toronto
                </p>
                <p className={`text-xs ${isDark ? "text-white/50" : "text-black/50"}`}>
                  Building from one of the world's most diverse cities 🇨🇦
                </p>
              </div>
            </div>
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
