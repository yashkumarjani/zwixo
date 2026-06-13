// FILE: components/Loader.tsx
"use client";

import React, { useEffect } from "react";
import { m, useReducedMotion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Animation timeline configuration (3.5s animation sequence with a 1.0s static hold, total 4.5s screen time)
  const logoVariants = {
    initial: { scale: shouldReduceMotion ? 1 : 0.85, opacity: 0, x: shouldReduceMotion ? "var(--logo-x)" : 0 },
    animate: {
      scale: 1,
      opacity: 1,
      x: "var(--logo-x)",
    },
  };

  const logoTransition = shouldReduceMotion
    ? { duration: 0.7, ease: "easeOut" as const }
    : {
        scale: { duration: 0.8, ease: "easeOut" as const },
        opacity: { duration: 0.8, ease: "easeOut" as const },
        x: { duration: 1.0, delay: 1.2, ease: "easeInOut" as const },
      };

  const textContainerVariants = {
    initial: { width: shouldReduceMotion ? "var(--text-width)" : 0, opacity: 0 },
    animate: {
      width: "var(--text-width)",
      opacity: 1,
    },
  };

  const textContainerTransition = shouldReduceMotion
    ? { duration: 0.7, delay: 0.15, ease: "easeOut" as const }
    : {
        width: { duration: 1.0, delay: 1.2, ease: "easeInOut" as const },
        opacity: { duration: 1.0, delay: 1.2, ease: "easeInOut" as const },
      };

  const textSpanVariants = {
    initial: { x: shouldReduceMotion ? 0 : -15 },
    animate: {
      x: 0,
    },
  };

  const textSpanTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 1.0,
        delay: 1.2,
        ease: "easeOut" as const,
      };

  // Tagline starts after logo and wordmark are fully static at t = 2.2s
  // Animation takes 2.3s total (1.3s transition + 1.0s static hold to reach 4.5s total screen time)
  const taglineVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : -18 },
    animate: {
      opacity: shouldReduceMotion ? 0.6 : [0, 0.6, 0.6],
      y: shouldReduceMotion ? 0 : [-18, 0, 0],
    },
  };

  const taglineTransition = shouldReduceMotion
    ? {
        times: [0, 0.41, 1],
        duration: 1.7,
        delay: 0.5,
        ease: "easeOut" as const,
      }
    : {
        times: [0, 0.565, 1],
        duration: 2.3,
        delay: 2.2,
        ease: "easeOut" as const,
      };

  return (
    <m.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      data-lenis-prevent
      role="status"
      aria-busy="true"
      aria-label="Loading ZWIXO Memory Studio"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)] select-none pointer-events-auto"
    >
      {/* Scoped CSS variables for responsive offsets to prevent SSR/Hydration mismatches */}
      <style>{`
        :root {
          --logo-x: -96px;
          --text-width: 250px;
          --text-left: calc(50% - 46px);
        }
        @media (max-width: 767px) {
          :root {
            --logo-x: -64px;
            --text-width: 160px;
            --text-left: calc(50% - 24px);
          }
        }
      `}</style>

      {/* Premium background radial glow matching logo_preview.svg */}
      <div 
        className="absolute w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full bg-[#F5A623] opacity-[0.06] dark:opacity-[0.09] blur-[80px] md:blur-[100px] pointer-events-none" 
        style={{ opacity: shouldReduceMotion ? 0 : undefined }}
      />

      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Logo + ZWIXO Row */}
        <div className="relative flex items-center justify-center h-[76px] w-[320px] md:w-[480px] z-20">
          <m.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            transition={logoTransition}
            className="z-30 flex items-center justify-center w-[60px] h-[60px] md:w-[76px] md:h-[76px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Inline SVG Z Icon matching the brand system */}
            <svg
              viewBox="0 0 76 76"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="76" height="76" rx="18" fill="#1C1C1E" />
              <rect x="14" y="16" width="48" height="10" rx="5" fill="#F5A623" />
              <polygon points="52,26 62,26 24,50 14,50" fill="#F5A623" />
              <rect x="14" y="50" width="48" height="10" rx="5" fill="#F5A623" />
              <rect x="50" y="54" width="12" height="8" rx="2" fill="#1C1C1E" />
              <polygon points="50,56 68,58 50,60" fill="#1C1C1E" />
            </svg>
          </m.div>

          <m.div
            variants={textContainerVariants}
            initial="initial"
            animate="animate"
            transition={textContainerTransition}
            className="absolute overflow-hidden whitespace-nowrap z-20 flex items-center"
            style={{ height: "100%", opacity: 0, left: "var(--text-left)", willChange: "width, opacity" }}
          >
            <m.span
              variants={textSpanVariants}
              initial="initial"
              animate="animate"
              transition={textSpanTransition}
              className="font-sans font-black text-4xl md:text-5xl -tracking-[0.04em] text-[var(--foreground)] drop-shadow-[0_0_12px_rgba(245,166,35,0.25)] block whitespace-nowrap"
              style={{ fontFamily: "var(--font-sans)", willChange: "transform" }}
            >
              ZWI<span className="text-[#F5A623]">X</span>O
            </m.span>
          </m.div>
        </div>

        {/* Tagline container with overflow-hidden to clip it while behind the logo row */}
        <div className="overflow-hidden mt-2 z-10 py-1">
          <m.div
            variants={taglineVariants}
            initial="initial"
            animate="animate"
            transition={taglineTransition}
            onAnimationComplete={onComplete}
            className="text-center text-xs md:text-sm tracking-[0.2em] font-light text-[var(--foreground)] uppercase"
            style={{ fontFamily: "var(--font-sans)", opacity: 0, willChange: "transform, opacity" }}
          >
            snap it · glow it · deliver it
          </m.div>
        </div>
      </div>
    </m.div>
  );
}
