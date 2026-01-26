"use client";

import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { requirements } from "../constants";
import { Requirement } from "../types";

export const useRequirementCheck = () => {
  const [visibleCards, setVisibleCards] = useState(requirements.slice(0, 4));
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setVisibleCards((prev) => {
          const [first, ...rest] = prev;
          return [...rest, first];
        });
        setIsAnimating(false);
      }, 3700); // Match animation duration
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: Requirement["status"]) => {
    switch (status) {
      case "eligible":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "ineligible":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusText = (status: Requirement["status"]) => {
    switch (status) {
      case "eligible":
        return { text: "ELIGIBLE", color: "text-green-500" };
      case "ineligible":
        return { text: "INELIGIBLE", color: "text-red-500" };
      case "pending":
        return { text: "CHECKING", color: "text-yellow-500" };
    }
  };

  const getCardAnimation = (currentIndex: number) => {
    if (!isAnimating) {
      // Static positions when not animating
      switch (currentIndex) {
        case 0:
          return {
            y: -48,
            scale: 1,
            opacity: 1,
            zIndex: 30,
            background: "bg-[#2e2e2e]",
            left: 0,
            right: "auto",
          };
        case 1:
          return {
            y: -32,
            scale: 0.9,
            opacity: 1,
            zIndex: 20,
            background: "bg-[#1a1a1a]",
            left: "auto",
            right: 0,
          };
        case 2:
          return {
            y: -16,
            scale: 0.8,
            opacity: 1,
            zIndex: 10,
            background: "bg-[#151515]",
            left: "auto",
            right: 0,
          };
        case 3:
          return {
            y: 0,
            scale: 0.7,
            opacity: 0.8,
            zIndex: 5,
            background: "bg-[#151515]",
            left: "auto",
            right: 0,
          };
      }
    } else {
      // Animation targets - all cards move to their next position
      switch (currentIndex) {
        case 0: // Top card exits
          return {
            y: -48,
            scale: 1.05,
            opacity: 0,
            zIndex: 30,
            background: "bg-[#2e2e2e]",
            left: 0,
            right: "auto",
          };
        case 1: // Second card moves to top
          return {
            y: -48,
            scale: 1,
            opacity: 1,
            zIndex: 30,
            background: "bg-[#2e2e2e]",
            left: 0,
            right: "auto",
          };
        case 2: // Third card moves to middle
          return {
            y: -32,
            scale: 0.9,
            opacity: 1,
            zIndex: 20,
            background: "bg-[#1a1a1a]",
            left: "auto",
            right: 0,
          };
        case 3: // Fourth card moves to bottom
          return {
            y: -16,
            scale: 0.8,
            opacity: 1,
            zIndex: 10,
            background: "bg-[#151515]",
            left: "auto",
            right: 0,
          };
      }
    }

    return {
      y: 0,
      scale: 0.6,
      opacity: 0,
      zIndex: 0,
      background: "bg-[#151515]",
      left: "auto",
      right: 0,
    };
  };

  return {
    visibleCards,
    isAnimating,
    getStatusIcon,
    getStatusText,
    getCardAnimation,
  };
};
