"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SliderData } from "./types";

interface SliderProps {
  data: SliderData[];
  autoSlide?: boolean;
  slideInterval?: number;
}

export const Slider = ({
  data,
  autoSlide = true,
  slideInterval = 4000,
}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  }, [data.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  }, [data.length]);

  useEffect(() => {
    if (!autoSlide || isHovered) return;

    const interval = setInterval(nextSlide, slideInterval);
    return () => clearInterval(interval);
  }, [autoSlide, slideInterval, nextSlide, isHovered]);

  if (data.length === 0) return null;

  const currentItem = data[currentIndex];

  return (
    <div
      className="relative w-full h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main slide area */}
      <div className="relative flex-1 overflow-hidden rounded-xl">
        <div className="absolute inset-0">
          <Image
            src={currentItem.imageUrl}
            alt={currentItem.title}
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={cn(
                "w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center",
                currentItem.iconColor || "bg-white"
              )}
            >
              <Image
                src={currentItem.logoUrl}
                alt={currentItem.institution}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-sm text-white/80">
              {currentItem.institution}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{currentItem.title}</h3>
          {currentItem.loanAvailable && (
            <span className="inline-block px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
              Loan Available
            </span>
          )}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export type { SliderData } from "./types";
