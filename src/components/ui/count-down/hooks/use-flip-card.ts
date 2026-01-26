import { useEffect, useRef, useState } from "react";

export const useFlipCard = (value: number) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setIsFlipping(true);

      // Update current value halfway through animation
      const halfwayTimer = setTimeout(() => {
        setCurrentValue(value);
      }, 300);

      // End animation
      const endTimer = setTimeout(() => {
        setIsFlipping(false);
      }, 600);

      prevValueRef.current = value;
      return () => {
        clearTimeout(halfwayTimer);
        clearTimeout(endTimer);
      };
    }
  }, [value]);

  const formatValue = (val: number) => val.toString().padStart(2, "0");

  return {
    currentValue,
    isFlipping,
    formatValue,
    prevValueRef,
  };
};
