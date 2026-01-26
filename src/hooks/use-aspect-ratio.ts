import { useEffect, useState } from "react";

export const useAspectRatio = () => {
  // Default to a reasonable desktop aspect ratio during SSR
  const [aspectRatio, setAspectRatio] = useState(1.6);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") return;

    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    // Initial calculation
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return consistent value during SSR
  if (!mounted) return 1.6;

  return aspectRatio;
};
