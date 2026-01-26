import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export const useNurses = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Use motion values for smooth interpolation
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  // Spring animations for smooth magnetic movement
  const springX = useSpring(mouseX, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.01,
  });
  const springY = useSpring(mouseY, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.01,
  });

  // Transform spring values for different elements
  const backgroundX = useTransform(springX, (x) => x);
  const backgroundY = useTransform(springY, (y) => y);

  const textParallaxX = useTransform(springX, (x) => (x - 50) * 0.15);
  const textParallaxY = useTransform(springY, (y) => (y - 50) * 0.1);

  // Transform for cursor follower
  const cursorX = useTransform(backgroundX, (x) => `${x}%`);
  const cursorY = useTransform(backgroundY, (y) => `${y}%`);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Cancel previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Throttle with requestAnimationFrame for smooth 60fps updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Clamp values to ensure gradient stays within bounds
        const clampedX = Math.max(0, Math.min(100, x));
        const clampedY = Math.max(0, Math.min(100, y));

        // Set motion values - these will smoothly animate via springs
        mouseX.set(clampedX);
        mouseY.set(clampedY);
      });
    },
    [mouseX, mouseY],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Keep the light at the last position instead of resetting to center
    // mouseX.set(50); mouseY.set(50); // Commented out to maintain last position
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add event listeners with passive option for better performance
    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      // Cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return {
    containerRef,
    isHovered,
    backgroundX,
    backgroundY,
    textParallaxX,
    textParallaxY,
    cursorX,
    cursorY,
  };
};
