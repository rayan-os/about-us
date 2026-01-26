import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  // Default to false during SSR
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Create media query list
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // Define callback
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Add event listener
    mediaQuery.addEventListener("change", handler);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  // Return false if not mounted (during SSR)
  if (!mounted) return false;

  return matches;
};
