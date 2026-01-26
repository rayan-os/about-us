"use client";

import { PASSAGE_INTERNATIONAL_STUDENTS_URL } from "@/constants";
import { useRouter } from "next/navigation";
import { AiSolution } from "./ai-solution";
import { InternationalStudentsV2 } from "./international-students-v2";

// Focusable wrapper component for keyboard navigation
const FocusableSection = ({
  children,
  onActivate,
  className = "",
  tabIndex = 0,
  ariaLabel,
}: {
  children: React.ReactNode;
  onActivate: () => void;
  className?: string;
  tabIndex?: number;
  ariaLabel: string;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <div
      className={`${className} focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-60 focus:ring-offset-2 focus:ring-offset-black rounded-2xl transition-all duration-200`}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};

export const Sections = () => {
  const router = useRouter();

  // Navigation functions for each section
  const handleAiSolutionNavigate = () => {
    router.push("/ai");
  };

  const handleInternationalStudentsNavigate = () => {
    router.push(PASSAGE_INTERNATIONAL_STUDENTS_URL);
  };

  return (
    <div className="h-[calc(115dvh-83px)] grid grid-cols-1 md:grid-cols-2 gap-2">
      <FocusableSection
        className="h-full min-h-[50vh] md:min-h-0"
        onActivate={handleAiSolutionNavigate}
        tabIndex={1}
        ariaLabel="Navigate to AI solutions page - AI-powered talent assessment and application processing"
      >
        <AiSolution />
      </FocusableSection>
      <FocusableSection
        className="h-full min-h-[50vh] md:min-h-0"
        onActivate={handleInternationalStudentsNavigate}
        tabIndex={2}
        ariaLabel="Navigate to international students page - Opportunity and financing for ambitious international students"
      >
        <InternationalStudentsV2 />
      </FocusableSection>
    </div>
  );
};
