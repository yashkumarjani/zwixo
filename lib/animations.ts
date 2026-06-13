// FILE: lib/animations.ts
import type { Variants } from "framer-motion";

export const getBodyVariants = (shouldReduceMotion: boolean): Variants => {
  if (shouldReduceMotion) {
    return {
      neutral: { y: 0 },
      happy: { scale: 1, y: 0 },
      grin: { rotate: 0 },
      celebrate: { y: 0, rotate: 0, scale: 1 }
    };
  }
  return {
    neutral: {
      y: [0, -1.5, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
    },
    happy: {
      scale: [1, 1.04, 1],
      y: [0, -2.5, 0],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
    },
    grin: {
      rotate: [0, -2, 2, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    },
    celebrate: {
      y: [0, -3.5, 0],
      rotate: [0, -3, 3, 0],
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
    }
  };
};

export const getDrawerVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: { x: shouldReduceMotion ? 0 : "100%" },
  visible: { 
    x: 0,
    transition: shouldReduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 300, damping: 30 }
  },
  exit: { 
    x: "100%",
    transition: shouldReduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 300, damping: 30 }
  }
});

export const getMobileCTAVariants = (shouldReduceMotion: boolean): Variants => ({
  visible: { y: 0, opacity: 1 },
  hidden: { y: shouldReduceMotion ? 0 : 100, opacity: 0 }
});
