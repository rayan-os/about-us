"use client";

import { cn } from "@/lib/utils";
import { LayoutGroup, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const TEXT_STYLES = {
  heading: "lowercase tracking-[-0.05em]",
  light: "text-2xl lg:text-3xl font-light",
  bold: "text-5xl sm:text-[3rem] md:text-[4rem] lg:text-[4rem] xl:text-[5rem] 2xl:text-[7rem] 3xl:text-8xl font-black",
  muted: "text-muted-foreground",
} as const;

const ArrowRightIcon = ({
  className,
  animateKey,
  duration = 0.5,
  delay = 0,
}: {
  className?: string;
  animateKey?: string;
  duration?: number;
  delay?: number;
}) => (
  <motion.svg
    width="162"
    height="56"
    viewBox="0 0 162 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(
      "w-16 h-6 sm:w-20 sm:h-7 md:w-24 md:h-8 lg:w-32 lg:h-10 xl:w-40 xl:h-14",
      className
    )}
    role="img"
    aria-label="Right arrow"
    key={animateKey}
    initial={{ x: "-100%", width: 0 }}
    animate={{ x: 0, width: "auto" }}
    exit={{ x: "100%", width: 0 }}
    transition={{ duration, ease: "easeOut", delay }}
  >
    <path
      d="M162 30.1241V25.8759C145.149 21.2414 132.511 6.69425 128.298 0H121.787C123.626 8.0331 131.745 19.0529 135.574 23.5586H1C0.447715 23.5586 0 24.0063 0 24.5586V31.4414C0 31.9937 0.447715 32.4414 0.999999 32.4414H135.574C128.528 40.4745 123.447 51.4943 121.787 56H128.298C139.328 40.2428 155.362 32.1839 162 30.1241Z"
      fill="white"
      fillOpacity="0.6"
    />
  </motion.svg>
);

function StaggeredText({
  text,
  className,
  animateKey,
  isVisible = true,
  totalDuration = 0.25,
}: {
  text: string;
  className?: string;
  animateKey: string;
  isVisible?: boolean;
  totalDuration?: number;
}) {
  // Use Array.from to properly handle emojis and Unicode characters
  const characters = Array.from(text);
  const staggerDelay = totalDuration / characters.length;

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={`${animateKey}-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 10,
          }}
          transition={{
            duration: staggerDelay * 2,
            delay: index * staggerDelay,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function MutedText({ text }: { text: string }) {
  return (
    <motion.span
      className={cn(
        TEXT_STYLES.light,
        TEXT_STYLES.heading,
        TEXT_STYLES.muted,
        "lg:mb-1 xl:mb-2 2xl:mb-3 -mb-2 lg:py-2 w-16 "
      )}
    >
      {text}
    </motion.span>
  );
}

function ResponsiveLabel({
  text,
  children,
  customContainer,
}: {
  text: string;
  children: React.ReactNode;
  customContainer?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0 lg:flex-row lg:items-end",
        !customContainer && "lg:gap-6",
        customContainer && "lg:gap-4"
      )}
    >
      <MutedText text={text} />
      {children}
    </div>
  );
}

export function HeroTextMotion({
  customContainer,
}: {
  customContainer?: boolean;
}) {
  const OPTIONS = [
    {
      from: "hello 👋",
      to: "admission",
      for: "schools",
    },
    {
      from: "hello 👋",
      to: "job offer",
      for: "employers",
    },
    {
      from: "hello 👋",
      to: "loan approval",
      for: "lenders",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showText, setShowText] = useState(true);

  const animateSequence = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Exit animation: hide text with stagger (only for "to" and "for" parts)
    setShowText(false);

    // Wait for text exit animation to complete
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Update to next option
    const nextIndex = (currentIndex + 1) % OPTIONS.length;
    setCurrentIndex(nextIndex);

    // Small delay before enter animation
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Show new text with stagger
    setShowText(true);

    setIsAnimating(false);
  }, [currentIndex, isAnimating, OPTIONS.length]);

  // Auto-cycle through options
  useEffect(() => {
    const interval = setInterval(() => {
      animateSequence();
    }, 3000); // 3 seconds per cycle
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, animateSequence]);

  const currentValues = OPTIONS[currentIndex];

  return (
    <LayoutGroup>
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "flex flex-col gap-6 ",
            !customContainer && "lg:flex-row lg:items-end"
          )}
        >
          <ResponsiveLabel text="from" customContainer={customContainer}>
            <div
              className="bold-from relative overflow-y-clip py-2"
              style={{ minHeight: "1.5em" }}
            >
              <StaggeredText
                text={currentValues.from}
                className={cn(TEXT_STYLES.bold, TEXT_STYLES.heading, "block")}
                animateKey="from-fixed" // Fixed key since it doesn't change
                isVisible={true} // Always visible
                totalDuration={0.25}
              />
            </div>
          </ResponsiveLabel>
          <motion.div
            className={cn(
              "arrow-right py-2",
              customContainer && "hidden",
              !customContainer && "lg:block"
            )}
            initial={{ opacity: 1 }}
          >
            <ArrowRightIcon />
          </motion.div>
          <ResponsiveLabel text="to" customContainer={customContainer}>
            <motion.div
              className="bold-to relative overflow-y-clip py-2"
              style={{ minHeight: "1.5em" }}
              initial={{ opacity: 1, y: 0 }}
            >
              <StaggeredText
                text={currentValues.to}
                className={cn(TEXT_STYLES.bold, TEXT_STYLES.heading, "block")}
                animateKey={`to-${currentIndex}`}
                isVisible={showText}
                totalDuration={0.25}
              />
            </motion.div>
          </ResponsiveLabel>
        </div>
        {!customContainer && (
          <ResponsiveLabel text="for" customContainer={customContainer}>
            <motion.div
              className="bold-for relative overflow-y-clip py-2"
              style={{ minHeight: "1.5em" }}
              initial={{ opacity: 1, y: 0 }}
            >
              <StaggeredText
                text={currentValues.for}
                className={cn(TEXT_STYLES.bold, TEXT_STYLES.heading, "block")}
                animateKey={`for-${currentIndex}`}
                isVisible={showText}
                totalDuration={0.25}
              />
            </motion.div>
          </ResponsiveLabel>
        )}
      </div>
    </LayoutGroup>
  );
}
