import { PixelatedImage } from "@/components/ui/pixelated-image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const DocumentAnalysis = () => {
  const [blockSize, setBlockSize] = useState(16); // Start with large blocks
  const animationRef = useRef<number | undefined>(undefined);

  // Gradual animation cycle synced with scanner
  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 7000; // 7 seconds total to match scanner

    const animate = () => {
      const elapsed = (Date.now() - startTime) % totalDuration;
      const progress = elapsed / totalDuration;

      let currentBlockSize: number;

      if (progress <= 0.36) {
        // First phase (0 to 36%): Gradually reduce from 16 to 1
        const phaseProgress = progress / 0.36;
        currentBlockSize = Math.round(16 - 15 * phaseProgress);
      } else if (progress <= 0.64) {
        // Second phase (36% to 64%): Stay at block size 1 (clear image)
        currentBlockSize = 1;
      } else {
        // Third phase (64% to 100%): Gradually increase from 1 back to 16
        const phaseProgress = (progress - 0.64) / 0.36;
        currentBlockSize = Math.round(1 + 15 * phaseProgress);
      }

      setBlockSize(currentBlockSize);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-46 p-10 overflow-hidden relative">
      <motion.div
        className="absolute top-0 right-0 h-100 bg-gradient-to-tl from-transparent to-emerald-900/80 z-10 border-l-3 
        border-emerald-500 before:content-[''] before:absolute before:top-0 before:-left-1 before:shadow-lg
         before:shadow-emerald-200 before:w-2 before:h-full before:z-10"
        initial={{ width: "10%" }}
        animate={{ width: ["10%", "90%", "90%", "10%"] }}
        transition={{
          duration: 7, // 5s animation + 2s pause
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.36, 0.64, 1], // Scan to 90%, pause, return
        }}
      />

      <div className="w-full flex flex-col gap-2 bg-white/5 rounded-lg p-5">
        {/* avatar */}
        <div className="flex gap-2 flex-1 items-end">
          <div className="w-16 h-16 rounded-lg bg-white/10 overflow-clip">
            <PixelatedImage
              src="/assets_ai/images/document-avatar.png"
              alt="document avatar"
              pixelationLevel={blockSize}
              className="w-full h-full"
              canvasSize={256}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-12 h-4 rounded-lg bg-white/5" />
            <div className="w-24 h-4 rounded-lg bg-white/5" />
          </div>
        </div>

        {/* skeleton texts */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="w-full h-4 rounded-lg bg-white/5" />
          <div className="w-full h-4 rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
};
