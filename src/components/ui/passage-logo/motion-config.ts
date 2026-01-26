import { easeInOut } from "motion/react";

const DURATION = 0.25;
const STAGGER = 0.025;

export const pathVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
  },
  hovered: {
    y: 0,
  },
};

export const flipPathVariants = {
  initial: {
    y: 0,
    opacity: 1,
  },
  hovered: (custom: number) => ({
    y: "-100%",
    opacity: 0,
    transition: {
      duration: DURATION,
      delay: custom * STAGGER,
      ease: easeInOut,
    },
  }),
};

export const flipPathVariantsBottom = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  hovered: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      y: {
        duration: DURATION,
        delay: custom * STAGGER,
        ease: easeInOut,
      },
      opacity: {
        duration: 0,
        delay: custom * STAGGER,
        ease: easeInOut,
      },
    },
  }),
};
