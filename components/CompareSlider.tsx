// FILE: components/CompareSlider.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { ShowcaseExample } from "../types";

export default function CompareSlider({ beforeImg, afterImg, beforeLabel, afterLabel }: ShowcaseExample) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const shouldReduceMotion = useReducedMotion();

  // 2026 Fix: Animate drag handle on mount to show it is interactive (50 -> 35 -> 50)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const t1 = setTimeout(() => setSliderPosition(35), 400);
    const t2 = setTimeout(() => setSliderPosition(50), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [shouldReduceMotion]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  // 2026 Fix: Imperative touch handler separating page scroll from slider drag
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !touchStartRef.current) return;
      if (e.touches[0]) {
        const deltaX = e.touches[0].clientX - touchStartRef.current.x;
        const deltaY = e.touches[0].clientY - touchStartRef.current.y;
        
        // Horizontal gesture lock
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (e.cancelable) {
            e.preventDefault();
          }
          const rect = container.getBoundingClientRect();
          const x = e.touches[0].clientX - rect.left;
          const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
          setSliderPosition(percentage);
        }
      }
    };

    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      // Snaps to nearest 10% on release
      setSliderPosition((prev) => Math.round(prev / 10) * 10);
    };
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const onDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    touchStartRef.current = { x: clientX, y: clientY };
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[9/16] w-full max-h-[520px] rounded-[32px] overflow-hidden border border-neutral-100 dark:border-neutral-900 shadow-xl cursor-ew-resize touch-none select-none bg-neutral-100 dark:bg-neutral-900"
      onMouseDown={(e) => {
        e.preventDefault();
        onDragStart(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        if (e.touches[0]) {
          onDragStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image: AFTER */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImg}
          alt="After"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover select-none pointer-events-none"
        />
        <div className="absolute bottom-5 right-5 px-3 py-1 rounded-full bg-[#F5A623] text-white text-xs font-black uppercase tracking-wider select-none shadow-sm">
          {afterLabel}
        </div>
      </div>

      {/* Foreground Image: BEFORE */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <Image
          src={beforeImg}
          alt="Before"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover select-none pointer-events-none"
        />
        <div className="absolute bottom-5 left-5 px-3 py-1 rounded-full bg-neutral-900/80 text-white text-xs font-black uppercase tracking-wider select-none shadow-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#F5A623] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle: 44px circle, white bg, saffron border */}
        <button
          tabIndex={0}
          role="slider"
          aria-label="Comparison slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              setSliderPosition((prev) => Math.max(0, prev - 5));
            } else if (e.key === "ArrowRight") {
              setSliderPosition((prev) => Math.min(100, prev + 5));
            }
          }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white border-2 border-[#F5A623] text-[#F5A623] flex items-center justify-center shadow-lg cursor-ew-resize pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9l-3 3m0 0l3 3m-3-3h14m-3-3l3 3m-3 3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
