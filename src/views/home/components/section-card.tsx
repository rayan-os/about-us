"use client";

import { cn } from "@/lib/utils";
import { useRouteTransition } from "@/providers/route-transition-provider";
import { HeroSection } from "@/views/ai/components";
import { useMediaQuery } from "@/hooks/use-media-query";
import { easeInOut, motion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Section } from "../types";

export const SectionCard = ({
  title,
  description,
  className,
  children,
  onClick,
  navigateTo,
}: Section) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { startTransition, isTransitioning } = useRouteTransition();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    if (cardRef.current) {
      cardRef.current.addEventListener("mouseenter", handleMouseEnter);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mouseenter", handleMouseEnter);
        cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [cardRef]);

  const handleClick = () => {
    // Prevent multiple clicks during transition
    if (isTransitioning) return;

    if (onClick) {
      onClick();
    }

    if (navigateTo && cardRef.current) {
      // Create the original section content for the overlay
      const originalContent = (
        <div className="relative h-full w-full">
          <div className="h-full w-full">{children}</div>
          <div className="p-6 absolute top-0 left-0 z-10">
            <h3 className="text-white text-lg font-semibold">{title}</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <div className="absolute top-6 right-6 z-10">
            <SquareArrowOutUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      );

      // Start the slide transition
      startTransition(
        cardRef.current,
        navigateTo,
        originalContent,
        <HeroSection />,
        "slide",
      );
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={cn(
        "relative h-full w-full transition-all duration-300",
        " border-foreground/5 overflow-hidden rounded-2xl",
        isTransitioning ? "cursor-default" : "cursor-pointer",
        className,
      )}
      transition={{ duration: 0.5, ease: "linear" }}
      ref={cardRef}
    >
      <div className="h-full w-full">{children}</div>

      <div className="p-6 absolute top-0 left-0 z-10 *:select-none">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered || isMobile ? 1 : 0 }}
        transition={{ duration: 0.2, ease: easeInOut }}
        className="absolute top-6 right-6 z-50 cursor-pointer"
      >
        <SquareArrowOutUpRight className="size-6 text-white" />
      </motion.div>
    </motion.div>
  );
};
