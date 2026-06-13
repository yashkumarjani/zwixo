// FILE: components/SmoothScroll.tsx
"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

import type { SmoothScrollProps } from "../types";

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // UPDATED: Sync ScrollTrigger/Framer Motion scroll states on Lenis scroll
    const ScrollTrigger = {
      update: () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("scroll"));
        }
      }
    };
    lenis.on('scroll', ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
