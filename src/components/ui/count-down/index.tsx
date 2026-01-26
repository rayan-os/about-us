"use client";

import { FlipCard } from "./components/flip-card";
import { useCountDown } from "./hooks/use-count-down";

interface CountDownProps {
  targetDate: Date;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const CountDown = ({ targetDate, size = "md" }: CountDownProps) => {
  const { timeLeft } = useCountDown(targetDate);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 md:gap-8">
      {timeLeft.map((unit) => (
        <FlipCard
          key={unit.label}
          value={unit.value}
          label={unit.label}
          size={size}
        />
      ))}
    </div>
  );
};
