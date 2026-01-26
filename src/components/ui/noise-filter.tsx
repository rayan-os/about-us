"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback, useRef } from "react";

interface NoiseFilterProps {
  showControls?: boolean;
  className?: string;
  customContainer?: boolean;
  customBaseFrequency?: number;
}

export function NoiseFilter({
  showControls = false,
  className,
  customContainer = false,
  customBaseFrequency,
}: NoiseFilterProps) {
  // Track if component is mounted on client side
  const [isMounted, setIsMounted] = useState(false);
  const mediaQueryRef = useRef<MediaQueryList[]>([]);

  const [noiseParams, setNoiseParams] = useState({
    baseFrequency: customBaseFrequency || 1.35,
    numOctaves: 1,
    saturation: 1,
    alphaStart: 1,
    alphaEnd: 0,
    opacity: 100,
  });

  // Calculate dynamic base frequency based on viewport width
  const calculateBaseFrequency = useCallback(() => {
    if (typeof window === "undefined") return customBaseFrequency || 1.35;

    const width = window.innerWidth;

    // Linear interpolation between:
    // width 1920px -> freq 0.9
    // width 2056px -> freq 0.65
    const width1 = 1920;
    const width2 = 2056;
    const freq1 = 0.9 * (customContainer ? 6 : 1.3);
    const freq2 = 0.65 * (customContainer ? 6 : 1.3);

    if (width <= width1) return freq1;
    if (width >= width2) return freq2;

    // Linear interpolation for values between 1920-2056px
    const frequency =
      freq1 + ((width - width1) * (freq2 - freq1)) / (width2 - width1);
    return frequency;
  }, [customContainer, customBaseFrequency]);

  // Consolidated media query handler
  const handleMediaQueryChange = useCallback(() => {
    const newFreq = customBaseFrequency || calculateBaseFrequency();
    setNoiseParams((prev) => ({
      ...prev,
      baseFrequency: newFreq,
    }));
  }, [calculateBaseFrequency, customBaseFrequency]);

  // Set up media queries and frequency calculation
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    // Clean up existing listeners
    mediaQueryRef.current.forEach((mq) => {
      mq.removeEventListener("change", handleMediaQueryChange);
    });

    // Set up new media queries
    const queries = [
      "(max-width: 1919px)",
      "(min-width: 1920px) and (max-width: 2055px)",
      "(min-width: 2056px)",
    ];

    mediaQueryRef.current = queries.map((query) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", handleMediaQueryChange);
      return mq;
    });

    // Set initial frequency
    handleMediaQueryChange();

    return () => {
      mediaQueryRef.current.forEach((mq) => {
        mq.removeEventListener("change", handleMediaQueryChange);
      });
    };
  }, [isMounted, handleMediaQueryChange]);

  // Set mounted state to true once component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleParamChange =
    (param: keyof typeof noiseParams) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNoiseParams((prev) => ({
        ...prev,
        [param]: parseFloat(e.target.value),
      }));
    };

  // Get current viewport description for debugging
  const getViewportInfo = () => {
    if (typeof window === "undefined") return "SSR";
    const width = window.innerWidth;
    if (width <= 1919) return `Small (${width}px)`;
    if (width >= 1920 && width <= 2055) return `Medium (${width}px)`;
    if (width >= 2056) return `Large (${width}px)`;
    return `${width}px`;
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {showControls && (
        <div
          className="absolute top-4 left-4 bg-black/80 p-4 rounded-lg z-50 text-white"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <h3 className="text-lg font-bold mb-4">Noise Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm">
                Base Frequency: {noiseParams.baseFrequency.toFixed(3)} (
                {getViewportInfo()})
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.05"
                value={noiseParams.baseFrequency}
                onChange={handleParamChange("baseFrequency")}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm">
                Num Octaves: {noiseParams.numOctaves}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={noiseParams.numOctaves}
                onChange={handleParamChange("numOctaves")}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm">
                Saturation: {noiseParams.saturation}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={noiseParams.saturation}
                onChange={handleParamChange("saturation")}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm">
                Alpha Start: {noiseParams.alphaStart}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={noiseParams.alphaStart}
                onChange={handleParamChange("alphaStart")}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm">
                Alpha End: {noiseParams.alphaEnd}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={noiseParams.alphaEnd}
                onChange={handleParamChange("alphaEnd")}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm">
                Opacity: {noiseParams.opacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={noiseParams.opacity}
                onChange={handleParamChange("opacity")}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      <svg
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none -z-10",
          className,
        )}
        style={{
          mixBlendMode: "overlay",
          opacity: noiseParams.opacity / 100,
        }}
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={noiseParams.baseFrequency}
            numOctaves={noiseParams.numOctaves}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values={noiseParams.saturation.toString()}
            in="noise"
            result="grayscaleNoise"
          />
          <feComponentTransfer in="grayscaleNoise" result="adjustedNoise">
            <feFuncA
              type="table"
              tableValues={`${noiseParams.alphaStart} ${noiseParams.alphaEnd}`}
            />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </>
  );
}
