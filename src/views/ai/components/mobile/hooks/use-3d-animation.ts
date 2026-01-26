import { debounce, throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CachedRect, MessageElement, PrecomputedValues } from "../types";

export const ANIMATION_CONFIG = {
  TRANSFORM_THROTTLE_MS: 6, // ~165fps for smoother animation
  INITIALIZATION_DELAY_MS: 100,
  RETRY_DELAY_MS: 50,
  MAX_ROTATION: 15,
  LAYER_Z_SPACING: 25,
  BASE_Z_OFFSET: 20,
  HOVER_Z_OFFSET: 40,
  PARALLAX_BASE_MULTIPLIER: 0.8,
  PARALLAX_MOVEMENT_FACTOR: 8,
  ANIMATION_DELAY_STEP: 0.08,
  MAX_RETRY_ATTEMPTS: 10,
  VISIBILITY_THRESHOLD: 0.1, // Start animating when 10% visible
};

export const use3dAnimation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Cache refs for performance
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messageElementsRef = useRef<MessageElement[]>([]);
  const cachedRectRef = useRef<CachedRect | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const isInitializedRef = useRef(false);
  const retryCountRef = useRef(0);

  // Performance optimization: cache precomputed values
  const precomputedValuesRef = useRef<PrecomputedValues | null>(null);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });

  // Memoized transform calculation helper
  const calculateTransforms = useMemo(() => {
    return (mouseX: number, mouseY: number, cachedRect: CachedRect) => {
      const normalizedX = mouseX / cachedRect.width;
      const normalizedY = mouseY / cachedRect.height;

      // Use Math.max/min for clamping is faster than custom functions
      const rotateX = Math.max(
        -ANIMATION_CONFIG.MAX_ROTATION,
        Math.min(
          ANIMATION_CONFIG.MAX_ROTATION,
          normalizedY * -ANIMATION_CONFIG.MAX_ROTATION
        )
      );
      const rotateY = Math.max(
        -ANIMATION_CONFIG.MAX_ROTATION,
        Math.min(
          ANIMATION_CONFIG.MAX_ROTATION,
          normalizedX * ANIMATION_CONFIG.MAX_ROTATION
        )
      );

      return { normalizedX, normalizedY, rotateX, rotateY };
    };
  }, []);

  // Cache bounding rect calculation with debounce for resize events
  const updateCachedRect = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    try {
      const rect = section.getBoundingClientRect();
      cachedRectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };
    } catch (error) {
      // Silently handle getBoundingClientRect errors
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to update cached rect:", error);
      }
    }
  }, []);

  // Debounced version for scroll/resize events
  const debouncedUpdateRect = useMemo(
    () => debounce(updateCachedRect, 16), // ~60fps max
    [updateCachedRect]
  );

  // Initialize and cache DOM elements
  const initializeElements = useCallback(() => {
    const section = sectionRef.current;
    if (!section || isInitializedRef.current) return;

    const chatContainer = section.querySelector(
      "#chat-container"
    ) as HTMLDivElement;
    if (!chatContainer) return;

    chatContainerRef.current = chatContainer;

    const tryInitialize = () => {
      const messages = Array.from(
        chatContainer.querySelectorAll(".chat-message-3d")
      ) as MessageElement[];

      if (messages.length === 0) {
        retryCountRef.current++;
        if (retryCountRef.current < ANIMATION_CONFIG.MAX_RETRY_ATTEMPTS) {
          setTimeout(tryInitialize, ANIMATION_CONFIG.RETRY_DELAY_MS);
        }
        return;
      }

      messageElementsRef.current = messages.map((element, index) => {
        const layerIndex = index % 5;
        element._layerIndex = layerIndex;
        element._baseZ =
          ANIMATION_CONFIG.BASE_Z_OFFSET +
          layerIndex * ANIMATION_CONFIG.LAYER_Z_SPACING;
        element._hoverZ = element._baseZ + ANIMATION_CONFIG.HOVER_Z_OFFSET;
        element._parallaxMultiplier =
          (layerIndex + 1) * ANIMATION_CONFIG.PARALLAX_BASE_MULTIPLIER;

        // Find and cache the message bubble
        const bubble = element.querySelector(
          ".message-bubble-3d"
        ) as HTMLElement;

        if (bubble) {
          element._bubble = bubble;
          // Enable hardware acceleration and prepare for transforms
          bubble.style.willChange = "transform";
          bubble.style.transform = "translateZ(0)"; // Force layer creation
        }
        element.style.willChange = "transform";

        return element;
      });

      updateCachedRect();
      isInitializedRef.current = true;
      retryCountRef.current = 0;
    };

    setTimeout(tryInitialize, ANIMATION_CONFIG.INITIALIZATION_DELAY_MS);
  }, [updateCachedRect]);

  const updateAnimation = useCallback(
    (mouseX: number, mouseY: number) => {
      const chatContainer = chatContainerRef.current;
      const cachedRect = cachedRectRef.current;
      const messages = messageElementsRef.current;

      // Early exit if not visible or no elements
      if (!isVisible || !chatContainer || !cachedRect || messages.length === 0)
        return;

      // Skip if mouse position hasn't changed significantly
      const lastPos = lastMousePositionRef.current;
      if (
        Math.abs(mouseX - lastPos.x) < 1 &&
        Math.abs(mouseY - lastPos.y) < 1
      ) {
        return;
      }
      lastMousePositionRef.current = { x: mouseX, y: mouseY };

      // Cancel previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        // Use memoized calculation
        const transforms = calculateTransforms(mouseX, mouseY, cachedRect);
        precomputedValuesRef.current = transforms;

        // Single batch update for container using direct property assignment (faster than setProperty)
        const containerStyle = chatContainer.style;
        containerStyle.setProperty("--rotate-x", `${transforms.rotateX}deg`);
        containerStyle.setProperty("--rotate-y", `${transforms.rotateY}deg`);

        // Batch all message updates in a single loop with optimized calculations
        for (let i = 0; i < messages.length; i++) {
          const element = messages[i];
          const bubble = element._bubble;

          if (!bubble) continue;

          const layerIndex = element._layerIndex!;
          const hoverZ = element._hoverZ!;
          const parallaxMultiplier = element._parallaxMultiplier!;

          // Pre-calculate all values
          const parallaxX =
            transforms.normalizedX *
            parallaxMultiplier *
            ANIMATION_CONFIG.PARALLAX_MOVEMENT_FACTOR;
          const parallaxY =
            transforms.normalizedY *
            parallaxMultiplier *
            ANIMATION_CONFIG.PARALLAX_MOVEMENT_FACTOR;
          const layerRotation = transforms.normalizedX * (layerIndex + 1) * 2;
          const scale = 1 + layerIndex * 0.02;

          // Use transform matrix for better performance (single transform property)
          const transform = `translate3d(${parallaxX}px, ${parallaxY}px, ${hoverZ}px) rotateY(${layerRotation}deg) scale(${scale})`;

          // Cache and compare transform to avoid unnecessary updates
          if (element._transformCache !== transform) {
            bubble.style.transform = transform;
            element._transformCache = transform;
          }
        }
      });
    },
    [calculateTransforms, isVisible]
  );

  // Throttled mouse move handler with better performance
  const handleMouseMove = throttle((e: MouseEvent) => {
    const cachedRect = cachedRectRef.current;
    if (!cachedRect || !isVisible) return;

    const mouseX = e.clientX - cachedRect.centerX;
    const mouseY = e.clientY - cachedRect.centerY;

    updateAnimation(mouseX, mouseY);
  }, ANIMATION_CONFIG.TRANSFORM_THROTTLE_MS);

  const handleMouseEnter = useCallback(() => {
    if (!isVisible) return;

    setIsHovered(true);
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    // Re-initialize elements if they weren't cached properly
    if (messageElementsRef.current.length === 0) {
      initializeElements();
    }

    chatContainer.classList.add("floating-active");

    // Use cached elements for better performance
    const messages = messageElementsRef.current;
    for (let i = 0; i < messages.length; i++) {
      const element = messages[i];
      element.classList.add("message-3d-active");
      element.style.setProperty(
        "--animation-delay",
        `${i * ANIMATION_CONFIG.ANIMATION_DELAY_STEP}s`
      );
    }
  }, [initializeElements, isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);

    // Cancel any pending animations
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    // Reset transforms smoothly using requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      chatContainer.classList.remove("floating-active");
      chatContainer.style.setProperty("--rotate-x", "0deg");
      chatContainer.style.setProperty("--rotate-y", "0deg");

      const messages = messageElementsRef.current;
      for (let i = 0; i < messages.length; i++) {
        const element = messages[i];
        const bubble = element._bubble;

        element.classList.remove("message-3d-active");

        if (bubble) {
          // Use direct transform for better performance
          bubble.style.transform =
            "translate3d(0px, 0px, 0px) rotateY(0deg) scale(1)";
          element._transformCache = undefined; // Clear cache
        }
      }
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    try {
      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setIsVisible(entry.isIntersecting);
        },
        {
          threshold: ANIMATION_CONFIG.VISIBILITY_THRESHOLD,
          rootMargin: "50px", // Start loading 50px before element is visible
        }
      );

      intersectionObserverRef.current.observe(section);
    } catch (error) {
      // Fallback: assume always visible if IntersectionObserver not supported
      setIsVisible(true);
      if (process.env.NODE_ENV === "development") {
        console.warn("IntersectionObserver not supported:", error);
      }
    }

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Initialize elements and setup ResizeObserver
    initializeElements();

    // Setup ResizeObserver to update cached rect when section resizes
    try {
      resizeObserverRef.current = new ResizeObserver(debouncedUpdateRect);
      resizeObserverRef.current.observe(section);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("ResizeObserver not supported:", error);
      }
    }

    // Add event listeners with passive option for better performance
    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    // Listen for scroll/resize events with debounced handler
    window.addEventListener("scroll", debouncedUpdateRect, { passive: true });
    window.addEventListener("resize", debouncedUpdateRect, { passive: true });

    return () => {
      // Cleanup animations
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Cleanup observers
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      // Cleanup event listeners
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", debouncedUpdateRect);
      window.removeEventListener("resize", debouncedUpdateRect);

      // Cancel debounced functions
      debouncedUpdateRect.cancel();
      handleMouseMove.cancel();

      // Reset will-change for memory optimization
      const messages = messageElementsRef.current;
      for (let i = 0; i < messages.length; i++) {
        const element = messages[i];
        const bubble = element._bubble;

        element.style.willChange = "auto";
        if (bubble) {
          bubble.style.willChange = "auto";
        }
      }

      // Reset refs
      isInitializedRef.current = false;
      chatContainerRef.current = null;
      messageElementsRef.current = [];
      cachedRectRef.current = null;
      retryCountRef.current = 0;
      precomputedValuesRef.current = null;
    };
  }, [
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    initializeElements,
    debouncedUpdateRect,
  ]);

  return {
    sectionRef,
    isHovered,
    isVisible, // Expose visibility state for potential use by parent components
  };
};
