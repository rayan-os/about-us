"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// Passport icon SVG component
function PassportIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Passport book outline */}
      <rect x="3" y="2" width="18" height="20" rx="2" />
      {/* Inner binding line */}
      <path d="M7 2v20" />
      {/* Circle emblem */}
      <circle cx="14" cy="10" r="3" />
      {/* Lines below circle */}
      <path d="M11 15h6" />
      <path d="M11 17h6" />
    </svg>
  );
}

// Globe/World icon for passports
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Biometric chip icon
function BiometricIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// E-passport chip icon
function EPassportChip({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
    >
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 6v4M16 22v4M6 16h4M22 16h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="10" y="10" width="12" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="6" height="6" rx="0.5" />
    </svg>
  );
}

interface PassportData {
  id: string;
  variant: "navy" | "burgundy" | "green" | "black" | "red";
  country: string;
  countryCode: string;
  passportNumber: string;
  name: string;
  nationality: string;
  issueDate?: string;
  expiryDate?: string;
}

const passports: PassportData[] = [
  {
    id: "1",
    variant: "navy",
    country: "CANADA",
    countryCode: "CAN",
    passportNumber: "GA 123456",
    name: "Sarah Williams",
    nationality: "Canadian",
    issueDate: "15 Jan 2022",
    expiryDate: "15 Jan 2032",
  },
  {
    id: "2",
    variant: "burgundy",
    country: "UNITED KINGDOM",
    countryCode: "GBR",
    passportNumber: "502135326",
    name: "James Anderson",
    nationality: "British",
    expiryDate: "22 Mar 2029",
  },
  {
    id: "3",
    variant: "green",
    country: "IRELAND",
    countryCode: "IRL",
    passportNumber: "PA1234567",
    name: "Emily O'Brien",
    nationality: "Irish",
    issueDate: "08 Sep 2023",
    expiryDate: "08 Sep 2033",
  },
  {
    id: "4",
    variant: "navy",
    country: "UNITED STATES",
    countryCode: "USA",
    passportNumber: "C01234567",
    name: "Michael Chen",
    nationality: "American",
    expiryDate: "10 Dec 2028",
  },
  {
    id: "5",
    variant: "black",
    country: "NEW ZEALAND",
    countryCode: "NZL",
    passportNumber: "LB123456",
    name: "Sophie Taylor",
    nationality: "New Zealander",
    issueDate: "01 May 2024",
    expiryDate: "01 May 2034",
  },
  {
    id: "6",
    variant: "red",
    country: "SWITZERLAND",
    countryCode: "CHE",
    passportNumber: "X1234567",
    name: "Lucas Mueller",
    nationality: "Swiss",
    expiryDate: "30 Jun 2031",
  },
  {
    id: "7",
    variant: "burgundy",
    country: "GERMANY",
    countryCode: "DEU",
    passportNumber: "C01234567",
    name: "Anna Schmidt",
    nationality: "German",
    issueDate: "12 Feb 2023",
    expiryDate: "12 Feb 2033",
  },
  {
    id: "8",
    variant: "green",
    country: "AUSTRALIA",
    countryCode: "AUS",
    passportNumber: "PA1234567",
    name: "Oliver Brown",
    nationality: "Australian",
    expiryDate: "18 Nov 2030",
  },
];

// Variant styles for different passport colors
const variantStyles: Record<
  PassportData["variant"],
  { bg: string; text: string; accent: string; glow: string }
> = {
  navy: {
    bg: "bg-gradient-to-br from-[#1a365d] via-[#1e3a5f] to-[#0f2744]",
    text: "text-amber-100/90",
    accent: "text-amber-200/80",
    glow: "shadow-[0_0_60px_-12px_rgba(26,54,93,0.8)]",
  },
  burgundy: {
    bg: "bg-gradient-to-br from-[#7b2d3b] via-[#6b2433] to-[#4a1a25]",
    text: "text-amber-100/90",
    accent: "text-amber-200/80",
    glow: "shadow-[0_0_60px_-12px_rgba(123,45,59,0.8)]",
  },
  green: {
    bg: "bg-gradient-to-br from-[#1e5631] via-[#1a4d2c] to-[#0f3319]",
    text: "text-amber-100/90",
    accent: "text-amber-200/80",
    glow: "shadow-[0_0_60px_-12px_rgba(30,86,49,0.8)]",
  },
  black: {
    bg: "bg-gradient-to-br from-[#2d2d2d] via-[#1f1f1f] to-[#0d0d0d]",
    text: "text-neutral-100/90",
    accent: "text-neutral-300/80",
    glow: "shadow-[0_0_60px_-12px_rgba(45,45,45,0.8)]",
  },
  red: {
    bg: "bg-gradient-to-br from-[#c41e3a] via-[#a01830] to-[#7a1225]",
    text: "text-white/95",
    accent: "text-white/75",
    glow: "shadow-[0_0_60px_-12px_rgba(196,30,58,0.8)]",
  },
};

function PassportCard({ passport }: { passport: PassportData }) {
  const style = variantStyles[passport.variant];

  return (
    <div
      className={`relative w-[280px] h-[400px] rounded-lg ${style.bg} ${style.glow} flex-shrink-0 mx-4 overflow-hidden`}
      style={{
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.2),
          0 25px 50px -12px rgba(0,0,0,0.4)
        `,
      }}
    >
      {/* Leather texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Embossed border */}
      <div className="absolute inset-3 border border-white/10 rounded pointer-events-none" />
      <div className="absolute inset-4 border border-white/5 rounded pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Top: Country name and passport icon */}
        <div className="text-center mb-4">
          <PassportIcon className={`w-8 h-8 mx-auto mb-2 ${style.accent}`} />
          <p className={`text-[10px] tracking-[0.3em] font-medium ${style.accent}`}>
            PASSPORT
          </p>
          <h3 className={`text-sm font-semibold tracking-[0.2em] mt-1 ${style.text}`}>
            {passport.country}
          </h3>
        </div>

        {/* Center: Globe/Coat of arms placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <GlobeIcon className={`w-24 h-24 ${style.accent} opacity-60`} />
            {/* E-passport symbol */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
              <EPassportChip className={`w-6 h-6 ${style.accent} opacity-70`} />
            </div>
          </div>
        </div>

        {/* Bottom: Passport details */}
        <div className="mt-auto space-y-3">
          {/* Passport number */}
          <div>
            <p className={`text-[9px] tracking-widest ${style.accent} mb-0.5`}>
              PASSPORT NO.
            </p>
            <p className={`font-mono text-sm tracking-wider ${style.text}`}>
              {passport.passportNumber}
            </p>
          </div>

          {/* Name */}
          <div>
            <p className={`text-[9px] tracking-widest ${style.accent} mb-0.5`}>
              SURNAME / GIVEN NAMES
            </p>
            <p className={`text-sm font-medium ${style.text}`}>{passport.name}</p>
          </div>

          {/* Dates row */}
          <div className="flex gap-4">
            {passport.issueDate && (
              <div className="flex-1">
                <p className={`text-[9px] tracking-widest ${style.accent} mb-0.5`}>
                  DATE OF ISSUE
                </p>
                <p className={`font-mono text-xs ${style.text}`}>{passport.issueDate}</p>
              </div>
            )}
            {passport.expiryDate && (
              <div className="flex-1">
                <p className={`text-[9px] tracking-widest ${style.accent} mb-0.5`}>
                  DATE OF EXPIRY
                </p>
                <p className={`font-mono text-xs ${style.text}`}>{passport.expiryDate}</p>
              </div>
            )}
          </div>

          {/* Country code badge */}
          <div className="flex justify-end">
            <span
              className={`text-[10px] font-mono tracking-wider px-2 py-1 rounded ${style.accent} bg-white/5`}
            >
              {passport.countryCode}
            </span>
          </div>
        </div>
      </div>

      {/* Spine effect on left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}

export function PassportScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate passports for seamless loop
  const duplicatedPassports = [...passports, ...passports, ...passports];

  // Auto-scroll animation
  useEffect(() => {
    if (!isInView || isPaused) return;

    const speed = 0.5; // pixels per frame
    let animationId: number;

    const animate = () => {
      setScrollPosition((prev) => {
        const singleSetWidth = passports.length * 312; // card width + margin
        const newPosition = prev + speed;
        // Reset when we've scrolled one full set
        if (newPosition >= singleSetWidth) {
          return 0;
        }
        return newPosition;
      });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isInView, isPaused]);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="text-center mb-12 px-6"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
          Secure Identity Verification
        </h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">
          Process passport data with AI-powered document recognition and verification
        </p>
      </motion.div>

      {/* Scroller Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#0E0C0D] to-transparent z-10 pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#0E0C0D] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          ref={scrollerRef}
          className="flex py-8"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {duplicatedPassports.map((passport, index) => (
            <PassportCard key={`${passport.id}-${index}`} passport={passport} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
