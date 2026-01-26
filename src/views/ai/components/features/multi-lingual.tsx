"use client";
import { motion } from "motion/react";
import Image from "next/image";

const topFlags = [
  { emoji: "🇩🇪", country: "Germany", iso2: "de" },
  { emoji: "🇧🇷", country: "Brazil", iso2: "br" },
  { emoji: "🇨🇦", country: "Canada", iso2: "ca" },
  { emoji: "🇮🇪", country: "Ireland", iso2: "ie" },
  { emoji: "🇦🇺", country: "Australia", iso2: "au" },
  { emoji: "🇨🇳", country: "China", iso2: "cn" },
  { emoji: "🇯🇵", country: "Japan", iso2: "jp" },
  { emoji: "🇰🇷", country: "South Korea", iso2: "kr" },
  { emoji: "🇲🇽", country: "Mexico", iso2: "mx" },
  { emoji: "🇳🇱", country: "Netherlands", iso2: "nl" },
];

const bottomFlags = [
  { emoji: "🇳🇿", country: "New Zealand", iso2: "nz" },
  { emoji: "🇵🇭", country: "Philippines", iso2: "ph" },
  { emoji: "🇸🇦", country: "Saudi Arabia", iso2: "sa" },
  { emoji: "🇸🇬", country: "Singapore", iso2: "sg" },
  { emoji: "🇸🇪", country: "Sweden", iso2: "se" },
  { emoji: "🇸🇩", country: "Sudan", iso2: "sd" },
  { emoji: "🇸🇷", country: "Suriname", iso2: "sr" },
  { emoji: "🇸🇸", country: "South Sudan", iso2: "ss" },
  { emoji: "🇸🇹", country: "Sao Tome and Principe", iso2: "st" },
  { emoji: "🇸🇻", country: "El Salvador", iso2: "sv" },
];

const FlagCircle = ({ iso2, index }: { iso2: string; index: number }) => {
  // Use index-based staggered animation instead of random values
  const delay = (index % 5) * 0.5; // Stagger every 5th element

  return (
    <motion.div
      className="relative rounded-full border-[2px] border-white/20"
      initial={{ opacity: 0.4 }}
      animate={{
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {/* Blur background effect */}
      <div className="absolute opacity-60 top-1/2 left-1/2 blur-[20px] -translate-x-1/2 -translate-y-1/2 size-24 rounded-full flex items-center justify-center">
        <Image
          src={`https://hatscripts.github.io/circle-flags/flags/${iso2}.svg`}
          alt={iso2}
          width={40}
          height={40}
          loading="lazy"
        />
      </div>

      <div className="relative size-16 rounded-full border-2 border-white/5 flex items-center justify-center overflow-hidden">
        <Image
          src={`https://hatscripts.github.io/circle-flags/flags/${iso2}.svg`}
          alt={iso2}
          width={40}
          height={40}
          className="rounded-full"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export const MultiLingual = () => {
  return (
    <div className="relative w-full h-46 justify-center overflow-hidden flex flex-col gap-4">
      {/* First row - moving right */}
      <motion.div
        className="flex gap-2"
        animate={{
          x: ["-50%", "0%"],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Triple flags for seamless loop */}
        {[...topFlags, ...topFlags, ...topFlags].map((flag, index) => (
          <FlagCircle key={`top-${index}`} iso2={flag.iso2} index={index} />
        ))}
      </motion.div>

      {/* Second row - moving left */}
      <motion.div
        className="flex gap-2"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...bottomFlags, ...bottomFlags, ...bottomFlags].map((flag, index) => (
          <FlagCircle key={`bottom-${index}`} iso2={flag.iso2} index={index} />
        ))}
      </motion.div>

      {/* Left fade gradient */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />

      {/* Right fade gradient */}
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
};
