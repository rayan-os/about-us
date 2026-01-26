"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

export function HeroGradient({
  customContainer = false,
}: {
  customContainer?: boolean;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const gradientContainerRef = useRef<HTMLDivElement>(null);
  const movingGradRef = useRef<HTMLDivElement>(null);
  const isActive = useRef(false);

  // State for responsive values
  const [responsiveValues, setResponsiveValues] = useState({
    blur: 130,
    radius: 250,
    widthRatio: 1,
    heightRatio: 1,
  });

  // Calculate responsive values based on 1920x1080 reference
  const getResponsiveBlur = useCallback(() => {
    if (typeof window === "undefined") return 130;
    const baseBlur = customContainer ? 180 : 130; // Original blur for 1920px width
    const currentWidth = window.innerWidth;
    const widthRatio = currentWidth / 1920;

    // Apply exponential scaling for more blur on larger screens
    const scaledBlur =
      baseBlur * Math.pow(widthRatio, 0.7) * (1 + widthRatio * 0.5);
    return Math.round(Math.max(scaledBlur, 80)); // Minimum blur of 80px
  }, []);

  const getResponsiveRadius = useCallback(() => {
    if (typeof window === "undefined") return 250;
    const baseRadius = 250; // Original radius for 1920px width
    const currentWidth = window.innerWidth;
    return Math.round((baseRadius * currentWidth) / 1920);
  }, []);

  const updateResponsiveValues = useCallback(() => {
    if (typeof window !== "undefined") {
      setResponsiveValues({
        blur: getResponsiveBlur(),
        radius: getResponsiveRadius(),
        widthRatio: window.innerWidth / 1920,
        heightRatio: window.innerHeight / 1080,
      });
    }
  }, [getResponsiveBlur, getResponsiveRadius]);

  const manageMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.current = {
      x: clientX,
      y: clientY,
    };

    // Check if mouse is within the hero section bounds
    if (gradientContainerRef.current) {
      const rect = gradientContainerRef.current.getBoundingClientRect();
      const isWithinBounds =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isWithinBounds) {
        isActive.current = true;
        moveGradient(clientX - rect.left, clientY - rect.top);
      } else if (isActive.current) {
        // Mouse left the bounds
        isActive.current = false;
        resetGradientPosition();
      }
    }
  }, []);

  const moveGradient = useCallback(
    (x: number, y: number, duration?: number) => {
      // Calculate responsive transform percentages based on 1920x1080
      const xPercent = -50; // This can stay the same as it centers horizontally
      const yPercent = -70 * responsiveValues.heightRatio;

      gsap.to(movingGradRef.current, {
        x,
        y,
        xPercent,
        yPercent,
        opacity: 0.6,
        duration: duration || 2,
        ease: "power2.out",
      });
    },
    [],
  );

  const resetGradientPosition = useCallback(() => {
    if (gradientContainerRef.current) {
      moveGradient(
        gradientContainerRef.current.clientWidth / 2,
        gradientContainerRef.current.clientHeight / 2,
        3,
      );
    }
  }, [moveGradient]);

  useEffect(() => {
    // Initialize responsive values on mount
    updateResponsiveValues();

    document.addEventListener("mousemove", manageMouseMove);

    // Add resize listener to update responsive values
    const handleResize = () => {
      updateResponsiveValues();
    };

    window.addEventListener("resize", handleResize);

    // Initial fade in animation
    gsap.to(movingGradRef.current, {
      opacity: 0.6,
      duration: 4,
      ease: "power2.out",
      delay: 1,
    });

    resetGradientPosition();

    return () => {
      document.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [manageMouseMove, updateResponsiveValues, resetGradientPosition]);

  return (
    <div
      ref={gradientContainerRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        willChange: "transform, filter",
        filter: `blur(${responsiveValues.blur}px)`,
        borderRadius: `${responsiveValues.radius}px`,
      }}
    >
      {/* STATIC GRADIENT */}
      <div
        className={cn(
          "hero-gradient absolute rotate-[45deg] opacity-40 rounded-[200px]",
          customContainer && !isMobile && " opacity-0",
        )}
        style={{
          width: "110vw", // 1200px / 1920px = 62.5% of viewport width
          height: "110vh", // 800px / 1080px ≈ 74% of viewport height
          bottom: 0,
          right: 0, // right-1/4 = 25% of viewport width
          transform: `translateX(${
            40 * responsiveValues.widthRatio
          }%) translateY(${20 * responsiveValues.heightRatio}%) rotate(45deg)`,
        }}
      />

      {/* MOVING GRADIENT */}
      {!isMobile && (
        <div
          ref={movingGradRef}
          className={cn(
            "hero-gradient-moving absolute rotate-[60deg] opacity-0",
            customContainer && " opacity-0",
            isMobile && " opacity-0",
          )}
          style={{
            willChange: "transform, opacity",
            width: "62.5vw",
            height: "74vh",
          }}
        />
      )}
    </div>
  );
}
