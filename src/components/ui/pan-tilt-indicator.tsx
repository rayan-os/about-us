"use client";

import Lottie from "lottie-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import swipeAnimationData from "@/assets/lottie/swipe-left-right.json";
import zoomAnimationData from "@/assets/lottie/zoom-in.json";

interface PanTiltIndicatorProps {
  show?: boolean;
  onHide?: () => void;
  autoHideDelay?: number;
}

export const PanTiltIndicator = ({
  show = true,
  onHide,
  autoHideDelay = 0, // Disabled by default - hide on interaction instead
}: PanTiltIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onHide?.();
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [show, autoHideDelay, onHide]);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-6 right-1/2 translate-x-1/2 z-10 backdrop-blur-sm rounded-lg px-4 py-1 scale-110"
        >
          <div className="flex flex-col text-xs ">
            {/* Pan gesture */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Lottie
                  animationData={swipeAnimationData}
                  loop={true}
                  autoplay={true}
                  className="w-6 h-6 invert brightness-0 contrast-100"
                />
              </div>
              <p className="text-sm">Drag to pan</p>
            </div>

            {/* Pinch/zoom gesture */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Lottie
                  animationData={zoomAnimationData}
                  loop={true}
                  autoplay={true}
                  className="w-6 h-6 invert"
                />
              </div>
              <p className="text-sm">Pinch to zoom</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
