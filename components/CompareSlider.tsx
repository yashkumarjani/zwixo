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
  const foregroundRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const handleButtonRef = useRef<HTMLButtonElement>(null);

  const isDraggingRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const sliderPositionRef = useRef(50);

  const shouldReduceMotion = useReducedMotion();

  // Helper function to update the DOM elements directly (60fps/120fps smooth)
  const updatePositions = (percentage: number) => {
    const rounded = Math.max(0, Math.min(100, percentage));
    sliderPositionRef.current = rounded;

    if (foregroundRef.current) {
      foregroundRef.current.style.clipPath = `polygon(0 0, ${rounded}% 0, ${rounded}% 100%, 0 100%)`;
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = `${rounded}%`;
    }
    if (handleButtonRef.current) {
      handleButtonRef.current.setAttribute("aria-valuenow", Math.round(rounded).toString());
    }
  };

  // Animate drag handle on mount to show it is interactive (50 -> 35 -> 50)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const t1 = setTimeout(() => {
      updatePositions(35);
      setSliderPosition(35);
    }, 400);
    const t2 = setTimeout(() => {
      updatePositions(50);
      setSliderPosition(50);
    }, 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [shouldReduceMotion]);

  // Imperative touch handler separating page scroll from slider drag
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !touchStartRef.current) return;
      if (e.touches[0]) {
        const deltaX = e.touches[0].clientX - touchStartRef.current.x;
        const deltaY = e.touches[0].clientY - touchStartRef.current.y;
        
        // Horizontal gesture lock (only prevent scrolling if swiping horizontally)
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (e.cancelable) {
            e.preventDefault();
          }
          const rect = container.getBoundingClientRect();
          const x = e.touches[0].clientX - rect.left;
          const percentage = (x / rect.width) * 100;
          updatePositions(percentage);
        }
      }
    };

    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Listen for mousemove/mouseup/touchend on window while dragging is active
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      updatePositions(percentage);
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        // Snaps to nearest 10% on release
        const currentPos = sliderPositionRef.current;
        const snapped = Math.round(currentPos / 10) * 10;
        updatePositions(snapped);
        setSliderPosition(snapped);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const onDragStart = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
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
    >
      {/* Background Image: AFTER */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImg}
          alt="After"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover select-none pointer-events-none"
        />
        <div className="absolute bottom-5 right-5 px-3 py-1 rounded-full bg-[#F5A623] text-white text-xs font-black uppercase tracking-wider select-none shadow-sm">
          {afterLabel}
        </div>
      </div>

      {/* Foreground Image: BEFORE */}
      <div
        ref={foregroundRef}
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
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover select-none pointer-events-none"
        />
        <div className="absolute bottom-5 left-5 px-3 py-1 rounded-full bg-neutral-900/80 text-white text-xs font-black uppercase tracking-wider select-none shadow-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Divider line */}
      <div
        ref={dividerRef}
        className="absolute top-0 bottom-0 w-0.5 bg-[#F5A623] pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle: 44px circle, white bg, saffron border */}
        <button
          ref={handleButtonRef}
          tabIndex={0}
          role="slider"
          aria-label="Before and after comparison slider"
          aria-valuenow={sliderPosition}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              const next = Math.max(0, sliderPositionRef.current - 5);
              updatePositions(next);
              setSliderPosition(next);
            } else if (e.key === "ArrowRight") {
              const next = Math.min(100, sliderPositionRef.current + 5);
              updatePositions(next);
              setSliderPosition(next);
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
