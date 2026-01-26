"use client";

import { motion } from "motion/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { RANDOM_NUMBERS } from "./constant";

interface NumberProps {
  index: number;
  mouseX: number;
  mouseY: number;
  value: number;
}

const Number = memo(({ index, mouseX, mouseY, value }: NumberProps) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const positionCacheRef = useRef<{ x: number; y: number } | null>(null);
  const radius = 80; // Detection radius in pixels

  const isNearCursor = useCallback(() => {
    if (!elementRef.current) return false;

    // Cache position to avoid frequent DOM calculations
    if (!positionCacheRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      positionCacheRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }

    const distance = Math.sqrt(
      (mouseX - positionCacheRef.current.x) ** 2 +
        (mouseY - positionCacheRef.current.y) ** 2
    );

    return distance < radius;
  }, [mouseX, mouseY]);

  // Clear position cache on window resize
  useEffect(() => {
    const handleResize = () => {
      positionCacheRef.current = null;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nearCursor = isNearCursor();

  return (
    <span
      ref={elementRef}
      id={`number-${index}`}
      className={`text-xs lowercase tracking-[-0.04em] transition-all duration-300 inline-flex items-center justify-center size-4`}
      style={{
        opacity: nearCursor ? 1 : 0.2,
      }}
    >
      {nearCursor ? (
        <div className="inline-flex flex-col">
          <span className="text-[5px] opacity-50">•</span>
          <span className="text-[5px]">•</span>
        </div>
      ) : (
        value
      )}
    </span>
  );
});

Number.displayName = "Number";

// Hook to detect screen size
function useScreenSize() {
  const [screenSize, setScreenSize] = useState<
    "sm" | "md" | "lg" | "xl" | "2xl"
  >("xl");

  useEffect(() => {
    const getScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) return "sm";
      if (width < 768) return "md";
      if (width < 1024) return "lg";
      if (width < 1280) return "xl";
      return "2xl";
    };

    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    // Set initial size
    setScreenSize(getScreenSize());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export function NumbersAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const animationFrameRef = useRef<number>(0);
  const screenSize = useScreenSize();

  // Generate numbers only on client side after mount
  useEffect(() => {
    const getNumbersCount = () => {
      switch (screenSize) {
        case "sm":
          return 0; // Will return null anyway
        case "md":
          return Math.floor(RANDOM_NUMBERS.length * 0.2);
        case "lg":
          return Math.floor(RANDOM_NUMBERS.length * 0.3);
        case "xl":
          return Math.floor(RANDOM_NUMBERS.length * 0.4);
        default:
          return RANDOM_NUMBERS.length * 0.5;
      }
    };

    const count = getNumbersCount();
    setNumbers(RANDOM_NUMBERS.slice(0, count));
    setIsMounted(true);
  }, [screenSize]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Cancel previous animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Throttle with requestAnimationFrame for smooth 60fps updates
    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  // Don't render on small screens and below
  if (screenSize === "sm") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        delay: 1,
        ease: "easeInOut",
      }}
      className="absolute top-1/4 right-0 max-w-sm 2xl:max-w-xl flex flex-wrap gap-1 overflow-clip z-30 select-none"
    >
      {numbers.map((value, index) => (
        <Number
          key={index}
          index={index}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          value={value}
        />
      ))}
    </motion.div>
  );
}
//
