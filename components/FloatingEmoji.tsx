// FILE: components/FloatingEmoji.tsx
"use client";

import React, { useState } from "react";
import { m, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import CartoonFace from "./CartoonFace";

export default function FloatingEmoji() {
  const { scrollYProgress } = useScroll();
  const [faceState, setFaceState] = useState<"neutral" | "happy" | "grin" | "celebrate">("neutral");
  const [message, setMessage] = useState("Let's explore!");
  const [hasInteracted, setHasInteracted] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  // Smooth drift path in viewport coordinates to float in empty side margins
  const y = useTransform(scrollYProgress, [0, 1], ["20vh", "80vh"]);
  const x = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], ["0px", "-16px", "8px", "0px"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setFaceState("neutral");
      setMessage("Let's explore!");
    } else if (latest < 0.55) {
      setFaceState("happy");
      setMessage("Looking good!");
    } else if (latest < 0.85) {
      setFaceState("grin");
      setMessage("Love the work!");
    } else {
      setFaceState("celebrate");
      setMessage("Let's celebrate!");
    }
  });

  return (
    <m.div
      style={{
        y: shouldReduceMotion ? "50vh" : y,
        x: shouldReduceMotion ? "0px" : x,
        rotate: shouldReduceMotion ? 0 : rotate,
        position: "fixed",
        top: 0,
      }}
      // Visible on all viewports, positioned at right-3 on mobile to stay within page padding gutter
      className="fixed right-3 md:right-8 lg:right-12 z-40 flex pointer-events-auto select-none"
    >
      <div 
        onMouseEnter={() => setHasInteracted(true)}
        onClick={() => setHasInteracted(!hasInteracted)}
        // Responsive dimensions w-12 h-12 on mobile and w-16 h-16 on desktop
        className="relative group cursor-pointer flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/80 dark:bg-ink/80 supports-[backdrop-filter]:bg-white/40 supports-[backdrop-filter]:dark:bg-ink/40 backdrop-blur-md border border-gray-200/50 dark:border-white/10 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-saffron/10 dark:bg-saffron/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Branded Cartoon Mascot - Scales inside container */}
        <div className="w-8 h-8 md:w-11 md:h-11 filter drop-shadow-md select-none transform transition-transform duration-300 hover:rotate-12 flex items-center justify-center">
          <CartoonFace state={faceState} />
        </div>

        {/* Message Bubble Popover - Rendered above the emoji on mobile and to the left on desktop */}
        <div className={`absolute bottom-full mb-3.5 right-0 md:bottom-auto md:mb-0 md:right-16 md:top-1/2 md:-translate-y-1/2 bg-white dark:bg-ink border border-gray-200/50 dark:border-gray-800 text-ink dark:text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-2 rounded-2xl shadow-xl transition-all duration-300 whitespace-nowrap ${
          hasInteracted ? "opacity-0 group-hover:opacity-100" : "opacity-90 group-hover:opacity-100"
        }`}>
          {message}
          {/* Responsive Speech Indicator Triangle */}
          <div className="absolute bottom-[-4px] right-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-[-4px] w-2 h-2 rotate-45 bg-white dark:bg-ink border-b border-r border-gray-200/50 dark:border-gray-800 md:border-b-0 md:border-l-0 md:border-t md:border-r" />
        </div>
      </div>
    </m.div>
  );
}
