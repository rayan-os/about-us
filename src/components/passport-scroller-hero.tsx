"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import "./passport-scroller-hero.css";

// Globe icon for passport - detailed version matching the reference
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 73.768 73.768"
      className={className}
      fill="currentColor"
    >
      <path d="M117.606,385.2a36.884,36.884,0,1,0,36.884,36.884A36.926,36.926,0,0,0,117.606,385.2Zm33.846,35.383H136.366a48.681,48.681,0,0,0-3.047-16.068,36.786,36.786,0,0,0,8.781-5.808A33.752,33.752,0,0,1,151.452,420.586Zm-32.346-31.072a36.534,36.534,0,0,1,6.069,6.387,39.467,39.467,0,0,1,4.176,7.028,33.843,33.843,0,0,1-10.245,2.061Zm3.534-.935a33.762,33.762,0,0,1,17.292,8.051,33.809,33.809,0,0,1-7.772,5.116A41.252,41.252,0,0,0,122.64,388.579ZM110.19,395.9a36.615,36.615,0,0,1,5.916-6.261v15.35a33.789,33.789,0,0,1-10.116-2.013A39.5,39.5,0,0,1,110.19,395.9Zm-7.013,5.906a33.8,33.8,0,0,1-7.9-5.177,33.757,33.757,0,0,1,17.469-8.074A41.244,41.244,0,0,0,103.177,401.807Zm12.929,6.183v12.6H102a45.607,45.607,0,0,1,2.835-14.838A36.83,36.83,0,0,0,116.106,407.99Zm0,15.6v12.386a36.8,36.8,0,0,0-11.018,2.146A42.373,42.373,0,0,1,102,423.587Zm0,15.386v15.252a47.106,47.106,0,0,1-9.792-13.361A33.819,33.819,0,0,1,116.106,438.973Zm-2.86,16.708a33.755,33.755,0,0,1-18.084-8.24,33.786,33.786,0,0,1,8.306-5.426A48.955,48.955,0,0,0,113.246,455.681Zm5.86-1.313v-15.4a33.8,33.8,0,0,1,9.922,1.94A47.081,47.081,0,0,1,119.106,454.368Zm12.762-12.294a33.846,33.846,0,0,1,8.182,5.367,33.759,33.759,0,0,1-17.909,8.217A48.888,48.888,0,0,0,131.868,442.074Zm-12.762-6.1V423.587h14.257a42.352,42.352,0,0,1-3.106,14.582A36.818,36.818,0,0,0,119.106,435.973Zm0-15.386v-12.6a36.806,36.806,0,0,0,11.4-2.291,45.562,45.562,0,0,1,2.854,14.888ZM93.112,398.711a36.8,36.8,0,0,0,8.91,5.871A48.7,48.7,0,0,0,99,420.587H83.76A33.757,33.757,0,0,1,93.112,398.711ZM83.76,423.587H99a45.675,45.675,0,0,0,3.256,15.683A36.807,36.807,0,0,0,93,445.35,33.755,33.755,0,0,1,83.76,423.587Zm58.447,21.764a36.8,36.8,0,0,0-9.122-6.022,45.69,45.69,0,0,0,3.279-15.742h15.088A33.759,33.759,0,0,1,142.207,445.351Z" transform="translate(-80.722 -385.203)" />
    </svg>
  );
}

// Biometric/Chip icon for passport bottom
function BiometricIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 209 137"
      className={className}
      fill="currentColor"
    >
      <path d="M0 75H64.4385C67.342 94.7993 84.3946 110 105 110C125.605 110 142.658 94.7993 145.562 75H209V129C209 133.418 205.418 137 201 137H8C3.58172 137 0 133.418 0 129V75ZM201 0C205.418 0 209 3.58172 209 8V63H145.562C142.658 43.2007 125.605 28 105 28C84.3946 28 67.342 43.2007 64.4385 63H0V8C0 3.58172 3.58172 0 8 0H201Z" />
    </svg>
  );
}

// Transcript document design - table-like grid
function TranscriptDesign({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 165 240"
      className={className}
      fill="none"
    >
      {/* Background */}
      <rect width="165" height="240" rx="6" fill="#F4ECD5"/>
      
      {/* "TRANSCRIPT" text - matching PASSPORT style */}
      <text x="82" y="26" textAnchor="middle" fill="#6B6860" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="700" letterSpacing="0.15em">TRANSCRIPT</text>
      
      {/* Header text bars */}
      <rect x="12" y="42" width="54" height="5" rx="2.5" fill="#BDBAAF"/>
      <rect x="12" y="51" width="85" height="5" rx="2.5" fill="#BDBAAF"/>
      
      {/* Table structure */}
      <rect x="12" y="72" width="141" height="120" stroke="#AFAB9D" strokeWidth="2" fill="none"/>
      
      {/* Vertical lines */}
      <line x1="35" y1="72" x2="35" y2="192" stroke="#AFAB9D" strokeWidth="2"/>
      <line x1="65" y1="72" x2="65" y2="192" stroke="#AFAB9D" strokeWidth="2"/>
      <line x1="95" y1="72" x2="95" y2="192" stroke="#AFAB9D" strokeWidth="2"/>
      <line x1="125" y1="72" x2="125" y2="192" stroke="#AFAB9D" strokeWidth="2"/>
      
      {/* Horizontal lines */}
      <line x1="12" y1="84" x2="153" y2="84" stroke="#AFAB9D" strokeWidth="2"/>
      <line x1="12" y1="108" x2="153" y2="108" stroke="#AFAB9D" strokeWidth="2"/>
      <line x1="12" y1="132" x2="153" y2="132" stroke="#AFAB9D" strokeWidth="2"/>
      <line x1="12" y1="156" x2="153" y2="156" stroke="#AFAB9D" strokeWidth="2"/>
      <line x1="12" y1="180" x2="153" y2="180" stroke="#AFAB9D" strokeWidth="2"/>
      
      {/* Signature line at bottom */}
      <rect x="100" y="210" width="48" height="5" rx="2.5" fill="#BDBAAF"/>
    </svg>
  );
}

// IELTS Test Report Form design - simple white paper
function IELTSDesign({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 165 240"
      className={className}
      fill="none"
    >
      {/* Background - white paper */}
      <rect width="165" height="240" rx="6" fill="#FAFAF8"/>
      
      {/* "IELTS" text - matching PASSPORT style */}
      <text x="82" y="26" textAnchor="middle" fill="#505050" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="700" letterSpacing="0.15em">IELTS</text>
      
      {/* Subheader text bar */}
      <rect x="40" y="38" width="85" height="4" rx="2" fill="#E0E0E0"/>
      
      {/* Overall Band Score circle */}
      <circle cx="82" cy="90" r="26" stroke="#D0D0D0" strokeWidth="2.5" fill="none"/>
      <text x="82" y="96" textAnchor="middle" fill="#404040" fontSize="18" fontFamily="system-ui, sans-serif" fontWeight="700">7.5</text>
      <text x="82" y="128" textAnchor="middle" fill="#909090" fontSize="7" fontFamily="system-ui, sans-serif">Overall Band Score</text>
      
      {/* Score breakdown section */}
      {/* Listening */}
      <rect x="16" y="148" width="40" height="4" rx="2" fill="#E0E0E0"/>
      <rect x="60" y="148" width="16" height="4" rx="2" fill="#C0C0C0"/>
      
      {/* Reading */}
      <rect x="16" y="162" width="32" height="4" rx="2" fill="#E0E0E0"/>
      <rect x="52" y="162" width="16" height="4" rx="2" fill="#C0C0C0"/>
      
      {/* Writing */}
      <rect x="16" y="176" width="28" height="4" rx="2" fill="#E0E0E0"/>
      <rect x="48" y="176" width="16" height="4" rx="2" fill="#C0C0C0"/>
      
      {/* Speaking */}
      <rect x="16" y="190" width="36" height="4" rx="2" fill="#E0E0E0"/>
      <rect x="56" y="190" width="16" height="4" rx="2" fill="#C0C0C0"/>
      
      {/* Right column - dates/details */}
      <rect x="90" y="148" width="58" height="4" rx="2" fill="#EBEBEB"/>
      <rect x="90" y="162" width="48" height="4" rx="2" fill="#EBEBEB"/>
      <rect x="90" y="176" width="52" height="4" rx="2" fill="#EBEBEB"/>
      <rect x="90" y="190" width="44" height="4" rx="2" fill="#EBEBEB"/>
      
      {/* Signature/stamp area */}
      <rect x="100" y="218" width="48" height="4" rx="2" fill="#D8D8D8"/>
    </svg>
  );
}

// WAEC Certificate design - West African Examinations Council
function WAECDesign({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 165 240"
      className={className}
      fill="none"
    >
      {/* Background - light cream/ivory paper */}
      <rect width="165" height="240" rx="6" fill="#FDF8F0"/>
      
      {/* "WAEC" text - matching PASSPORT style */}
      <text x="82" y="26" textAnchor="middle" fill="#5C4A3D" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="700" letterSpacing="0.15em">WAEC</text>
      
      {/* Certificate seal/emblem circle */}
      <circle cx="82" cy="72" r="18" stroke="#D4C4B0" strokeWidth="2" fill="none"/>
      <circle cx="82" cy="72" r="12" stroke="#D4C4B0" strokeWidth="1.5" fill="none"/>
      
      {/* Subject results table */}
      <rect x="12" y="100" width="141" height="100" stroke="#D4C4B0" strokeWidth="1.5" fill="none"/>
      
      {/* Table header */}
      <line x1="12" y1="114" x2="153" y2="114" stroke="#D4C4B0" strokeWidth="1.5"/>
      
      {/* Vertical divider */}
      <line x1="110" y1="100" x2="110" y2="200" stroke="#D4C4B0" strokeWidth="1.5"/>
      
      {/* Subject rows */}
      <line x1="12" y1="130" x2="153" y2="130" stroke="#D4C4B0" strokeWidth="1"/>
      <line x1="12" y1="146" x2="153" y2="146" stroke="#D4C4B0" strokeWidth="1"/>
      <line x1="12" y1="162" x2="153" y2="162" stroke="#D4C4B0" strokeWidth="1"/>
      <line x1="12" y1="178" x2="153" y2="178" stroke="#D4C4B0" strokeWidth="1"/>
      
      {/* Subject name placeholders */}
      <rect x="16" y="120" width="50" height="4" rx="2" fill="#E8DFD4"/>
      <rect x="16" y="136" width="60" height="4" rx="2" fill="#E8DFD4"/>
      <rect x="16" y="152" width="45" height="4" rx="2" fill="#E8DFD4"/>
      <rect x="16" y="168" width="55" height="4" rx="2" fill="#E8DFD4"/>
      <rect x="16" y="184" width="48" height="4" rx="2" fill="#E8DFD4"/>
      
      {/* Grade placeholders */}
      <rect x="118" y="120" width="24" height="4" rx="2" fill="#C9B8A8"/>
      <rect x="118" y="136" width="24" height="4" rx="2" fill="#C9B8A8"/>
      <rect x="118" y="152" width="24" height="4" rx="2" fill="#C9B8A8"/>
      <rect x="118" y="168" width="24" height="4" rx="2" fill="#C9B8A8"/>
      <rect x="118" y="184" width="24" height="4" rx="2" fill="#C9B8A8"/>
      
      {/* Signature area */}
      <rect x="100" y="218" width="48" height="4" rx="2" fill="#D4C4B0"/>
    </svg>
  );
}

// TOEFL Test Score Report design
function TOEFLDesign({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 165 240"
      className={className}
      fill="none"
    >
      {/* Background - white paper */}
      <rect width="165" height="240" rx="6" fill="#FAFAFA"/>
      
      {/* "TOEFL" text - matching PASSPORT style */}
      <text x="82" y="26" textAnchor="middle" fill="#404040" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="700" letterSpacing="0.15em">TOEFL</text>
      
      {/* Subheader */}
      <rect x="35" y="38" width="95" height="4" rx="2" fill="#E5E5E5"/>
      
      {/* Total Score box - prominent */}
      <rect x="47" y="54" width="70" height="54" rx="5" stroke="#D0D0D0" strokeWidth="2" fill="none"/>
      <text x="82" y="86" textAnchor="middle" fill="#303030" fontSize="24" fontFamily="system-ui, sans-serif" fontWeight="700">107</text>
      <text x="82" y="100" textAnchor="middle" fill="#909090" fontSize="6" fontFamily="system-ui, sans-serif">Total Score</text>
      
      {/* Section scores - 2x2 grid, subtle */}
      {/* Row 1 */}
      {/* Reading */}
      <rect x="20" y="124" width="56" height="32" rx="3" stroke="#EBEBEB" strokeWidth="1" fill="#FCFCFC"/>
      <rect x="28" y="132" width="40" height="3" rx="1.5" fill="#E0E0E0"/>
      <rect x="28" y="140" width="28" height="3" rx="1.5" fill="#EBEBEB"/>
      <rect x="28" y="148" width="20" height="3" rx="1.5" fill="#F0F0F0"/>
      
      {/* Listening */}
      <rect x="88" y="124" width="56" height="32" rx="3" stroke="#EBEBEB" strokeWidth="1" fill="#FCFCFC"/>
      <rect x="96" y="132" width="40" height="3" rx="1.5" fill="#E0E0E0"/>
      <rect x="96" y="140" width="32" height="3" rx="1.5" fill="#EBEBEB"/>
      <rect x="96" y="148" width="24" height="3" rx="1.5" fill="#F0F0F0"/>
      
      {/* Row 2 */}
      {/* Speaking */}
      <rect x="20" y="166" width="56" height="32" rx="3" stroke="#EBEBEB" strokeWidth="1" fill="#FCFCFC"/>
      <rect x="28" y="174" width="40" height="3" rx="1.5" fill="#E0E0E0"/>
      <rect x="28" y="182" width="36" height="3" rx="1.5" fill="#EBEBEB"/>
      <rect x="28" y="190" width="18" height="3" rx="1.5" fill="#F0F0F0"/>
      
      {/* Writing */}
      <rect x="88" y="166" width="56" height="32" rx="3" stroke="#EBEBEB" strokeWidth="1" fill="#FCFCFC"/>
      <rect x="96" y="174" width="40" height="3" rx="1.5" fill="#E0E0E0"/>
      <rect x="96" y="182" width="30" height="3" rx="1.5" fill="#EBEBEB"/>
      <rect x="96" y="190" width="22" height="3" rx="1.5" fill="#F0F0F0"/>
      
      {/* Signature area */}
      <rect x="100" y="218" width="48" height="4" rx="2" fill="#D8D8D8"/>
    </svg>
  );
}

// Checkmark icon for verified status
function CheckmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      <path
        d="M7 12.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface DocumentData {
  id: string;
  type: "passport" | "transcript" | "ielts" | "waec" | "toefl";
  variant: "navy" | "burgundy" | "green" | "black" | "red";
}

const documents: DocumentData[] = [
  { id: "1", type: "passport", variant: "navy" },
  { id: "2", type: "transcript", variant: "navy" },
  { id: "3", type: "waec", variant: "navy" },
  { id: "4", type: "passport", variant: "burgundy" },
  { id: "5", type: "ielts", variant: "green" },
  { id: "6", type: "passport", variant: "green" },
  { id: "7", type: "toefl", variant: "navy" },
  { id: "8", type: "transcript", variant: "burgundy" },
  { id: "9", type: "passport", variant: "black" },
  { id: "10", type: "waec", variant: "green" },
  { id: "11", type: "passport", variant: "red" },
  { id: "12", type: "toefl", variant: "burgundy" },
];

// Seeded random number generator for consistent results
function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Generate random encrypted characters with a seed for consistency
const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%+=!";
function generateEncryptedChars(length: number, seed: number): string {
  const random = seededRandom(seed);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHAR_SET[Math.floor(random() * CHAR_SET.length)];
  }
  return result;
}

// Pre-generate encrypted strings for each passport with a consistent seed
function generateEncryptedStringsForPassport(index: number): string {
  return generateEncryptedChars(2200, index * 12345 + 67890);
}

// Particle Scanner Canvas Component
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  originalAlpha: number;
  decay: number;
  life: number;
  time: number;
  twinkleSpeed: number;
  twinkleAmount: number;
}

function ParticleScannerCanvas({ height = 340 }: { height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const gradientCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const config = useMemo(() => ({
    maxParticles: 600,
    intensity: 0.85,
    lightBarWidth: 1.8,
    fadeZone: 50,
    transitionSpeed: 0.05,
  }), []);

  const createGradientCache = useCallback(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = 16;
    canvas.height = 16;

    const half = canvas.width / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
    gradient.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(half, half, half, 0, Math.PI * 2);
    ctx.fill();

    return canvas;
  }, []);

  const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

  const createParticle = useCallback((w: number, h: number, lightBarX: number): Particle => {
    return {
      x: lightBarX + randomFloat(-config.lightBarWidth / 2, config.lightBarWidth / 2),
      y: randomFloat(0, h),
      vx: randomFloat(0.3, 1.2),
      vy: randomFloat(-0.15, 0.15),
      radius: randomFloat(0.5, 1.2),
      alpha: randomFloat(0.6, 1),
      originalAlpha: 0,
      decay: randomFloat(0.008, 0.03),
      life: 1.0,
      time: 0,
      twinkleSpeed: randomFloat(0.02, 0.08),
      twinkleAmount: randomFloat(0.1, 0.25),
    };
  }, [config.lightBarWidth]);

  const drawLightBar = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, lightBarX: number) => {
    const { lightBarWidth, fadeZone } = config;

    // Vertical fade gradient
    const verticalGradient = ctx.createLinearGradient(0, 0, 0, h);
    verticalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    verticalGradient.addColorStop(fadeZone / h, "rgba(255, 255, 255, 1)");
    verticalGradient.addColorStop(1 - fadeZone / h, "rgba(255, 255, 255, 1)");
    verticalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.globalCompositeOperation = "lighter";

    const glowIntensity = 1.2;

    // Core line gradient - more subtle
    const coreGradient = ctx.createLinearGradient(
      lightBarX - lightBarWidth / 2, 0,
      lightBarX + lightBarWidth / 2, 0
    );
    coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
    coreGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.6 * glowIntensity})`);
    coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.8 * glowIntensity})`);
    coreGradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.6 * glowIntensity})`);
    coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.roundRect(lightBarX - lightBarWidth / 2, 0, lightBarWidth, h, 10);
    ctx.fill();

    // First glow layer - reduced
    const glow1Gradient = ctx.createLinearGradient(
      lightBarX - lightBarWidth * 2, 0,
      lightBarX + lightBarWidth * 2, 0
    );
    glow1Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
    glow1Gradient.addColorStop(0.5, `rgba(196, 181, 253, ${0.4 * glowIntensity})`);
    glow1Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = glow1Gradient;
    ctx.beginPath();
    ctx.roundRect(lightBarX - lightBarWidth * 2, 0, lightBarWidth * 4, h, 15);
    ctx.fill();

    // Second glow layer - reduced
    const glow2Gradient = ctx.createLinearGradient(
      lightBarX - lightBarWidth * 3, 0,
      lightBarX + lightBarWidth * 3, 0
    );
    glow2Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
    glow2Gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.25 * glowIntensity})`);
    glow2Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

    ctx.globalAlpha = 0.4;
    ctx.fillStyle = glow2Gradient;
    ctx.beginPath();
    ctx.roundRect(lightBarX - lightBarWidth * 3, 0, lightBarWidth * 6, h, 20);
    ctx.fill();

    // Third glow layer (outer) - very subtle
    const glow3Gradient = ctx.createLinearGradient(
      lightBarX - lightBarWidth * 5, 0,
      lightBarX + lightBarWidth * 5, 0
    );
    glow3Gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
    glow3Gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.1)");
    glow3Gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = glow3Gradient;
    ctx.beginPath();
    ctx.roundRect(lightBarX - lightBarWidth * 5, 0, lightBarWidth * 10, h, 25);
    ctx.fill();

    // Apply vertical fade mask
    ctx.globalCompositeOperation = "destination-in";
    ctx.globalAlpha = 1;
    ctx.fillStyle = verticalGradient;
    ctx.fillRect(0, 0, w, h);
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create gradient cache
    gradientCanvasRef.current = createGradientCache();

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = height;
      }
    };
    updateSize();

    const w = canvas.width;
    const h = canvas.height;
    const lightBarX = w / 2;

    // Initialize particles
    for (let i = 0; i < config.maxParticles; i++) {
      const particle = createParticle(w, h, lightBarX);
      particle.originalAlpha = particle.alpha;
      particlesRef.current.push(particle);
    }

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const lightBarX = w / 2;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      // Draw the light bar
      drawLightBar(ctx, w, h, lightBarX);

      // Draw and update particles
      ctx.globalCompositeOperation = "lighter";

      const gradientCanvas = gradientCanvasRef.current;

      particlesRef.current.forEach((particle) => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.time++;

        particle.alpha = particle.originalAlpha * particle.life +
          Math.sin(particle.time * particle.twinkleSpeed) * particle.twinkleAmount;

        particle.life -= particle.decay;

        // Reset particle if it's out of bounds or dead
        if (particle.x > w + 10 || particle.life <= 0) {
          particle.x = lightBarX + (Math.random() - 0.5) * config.lightBarWidth;
          particle.y = Math.random() * h;
          particle.vx = 0.3 + Math.random() * 0.9;
          particle.vy = (Math.random() - 0.5) * 0.3;
          particle.alpha = 0.6 + Math.random() * 0.4;
          particle.originalAlpha = particle.alpha;
          particle.life = 1.0;
          particle.time = 0;
        }

        // Draw particle
        if (particle.life > 0 && gradientCanvas) {
          let fadeAlpha = 1;
          if (particle.y < config.fadeZone) {
            fadeAlpha = particle.y / config.fadeZone;
          } else if (particle.y > h - config.fadeZone) {
            fadeAlpha = (h - particle.y) / config.fadeZone;
          }
          fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

          ctx.globalAlpha = particle.alpha * fadeAlpha;
          ctx.drawImage(
            gradientCanvas,
            particle.x - particle.radius,
            particle.y - particle.radius,
            particle.radius * 2,
            particle.radius * 2
          );
        }
      });

      // Spawn new particles occasionally
      if (Math.random() < config.intensity && particlesRef.current.length < config.maxParticles + 100) {
        const particle = createParticle(w, h, lightBarX);
        particle.originalAlpha = particle.alpha;
        particlesRef.current.push(particle);
      }

      // Limit particle count
      if (particlesRef.current.length > config.maxParticles + 200) {
        particlesRef.current = particlesRef.current.slice(-config.maxParticles);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      particlesRef.current = [];
    };
  }, [height, config, createGradientCache, createParticle, drawLightBar]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-scanner-canvas"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: `${height}px`,
        zIndex: 25,
        pointerEvents: "none",
      }}
    />
  );
}

function DocumentCard({ document }: { document: DocumentData }) {
  // For transcript, render the full SVG design
  if (document.type === "transcript") {
    return (
      <div className="document-card document-card--transcript">
        <TranscriptDesign className="document-card__paper-design" />
      </div>
    );
  }

  // For IELTS, render the IELTS paper design
  if (document.type === "ielts") {
    return (
      <div className="document-card document-card--ielts">
        <IELTSDesign className="document-card__paper-design" />
      </div>
    );
  }

  // For WAEC, render the WAEC certificate design
  if (document.type === "waec") {
    return (
      <div className="document-card document-card--waec">
        <WAECDesign className="document-card__paper-design" />
      </div>
    );
  }

  // For TOEFL, render the TOEFL score report design
  if (document.type === "toefl") {
    return (
      <div className="document-card document-card--toefl">
        <TOEFLDesign className="document-card__paper-design" />
      </div>
    );
  }

  // For passport, keep the original design
  return (
    <div className={`document-card document-card--${document.variant} document-card--passport`}>
      {/* Texture overlay */}
      <div className="document-card__texture" />
      
      {/* Border emboss effect */}
      <div className="document-card__border" />
      
      {/* Content */}
      <div className="document-card__content">
        <span className="document-card__label">PASSPORT</span>
        <div className="document-card__icon-wrapper">
          <GlobeIcon className="document-card__main-icon" />
        </div>
        <div className="document-card__bottom-icon-wrapper">
          <BiometricIcon className="document-card__bottom-icon document-card__bottom-icon--biometric" />
        </div>
      </div>
      
      {/* Spine effect */}
      <div className="document-card__spine" />
    </div>
  );
}

function EncryptedCard({ encryptedString, cardIndex }: { encryptedString: string; cardIndex: number }) {
  // Split string and highlight some characters using seeded random for consistency
  const chars = useMemo(() => {
    const highlightRandom = seededRandom(cardIndex * 54321 + 98765);
    return encryptedString.split("").map((char) => ({
      char,
      highlighted: highlightRandom() < 0.03, // 3% chance of being highlighted
    }));
  }, [encryptedString, cardIndex]);

  return (
    <div className="encrypted-card">
      <div className="encrypted-card__chars">
        {chars.map((item, i) => (
          <span
            key={i}
            className={item.highlighted ? "encrypted-card__char--highlight" : ""}
          >
            {item.char}
          </span>
        ))}
      </div>
      {/* Verified checkmark overlay */}
      <div className="encrypted-card__verified">
        <CheckmarkIcon className="encrypted-card__checkmark" />
        <span className="encrypted-card__verified-text">DOCUMENT VERIFIED</span>
      </div>
    </div>
  );
}

export function PassportScrollerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Triple the documents for seamless infinite scroll
  const tripleDocuments = [...documents, ...documents, ...documents];
  
  // Generate encrypted strings for each document with consistent seeds
  const encryptedStrings = useMemo(() => {
    return tripleDocuments.map((_, index) => generateEncryptedStringsForPassport(index));
  }, [tripleDocuments.length]);

  return (
    <section ref={ref} className="passport-scroller-hero">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="passport-scroller-hero__header"
      >
        <h2 className="passport-scroller-hero__title">
          Secure Identity Verification
        </h2>
        <p className="passport-scroller-hero__subtitle">
          AI-powered document recognition processes passports from 190+ countries
        </p>
      </motion.div>

      {/* File Stream Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="file-stream"
      >
        {/* Particle Scanner Canvas - replaces the old horizon line */}
        <ParticleScannerCanvas height={290} />

        {/* Left Mask - Shows encrypted content */}
        <div className="file-stream__mask" data-position="left">
          <div className="file-stream__scroller">
            {tripleDocuments.map((document, index) => (
              <div key={`encrypted-${document.id}-${index}`} className="file-stream__item">
                <div className="file-stream__encrypted">
                  <EncryptedCard encryptedString={encryptedStrings[index]} cardIndex={index} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Mask - Shows decrypted content (actual document cards) */}
        <div className="file-stream__mask" data-position="right">
          <div className="file-stream__scroller">
            {tripleDocuments.map((document, index) => (
              <div key={`decrypted-${document.id}-${index}`} className="file-stream__item">
                <div className="file-stream__decrypted">
                  <DocumentCard document={document} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fade gradients */}
        <div className="file-stream__fade file-stream__fade--left" />
        <div className="file-stream__fade file-stream__fade--right" />
      </motion.div>
    </section>
  );
}
