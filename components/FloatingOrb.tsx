// FILE: components/FloatingOrb.tsx
"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import iphoneOrangeMockup from "../public/images/iphone_orange_mockup.png";

export default function FloatingOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // UPDATED: Added state and ref to track interaction for dynamic will-change performance optimizations
  const [isInteracting, setIsInteracting] = useState(false);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // UPDATED: Checked prefers-reduced-motion
  const shouldReduceMotion = useReducedMotion();

  const triggerInteraction = useCallback(() => {
    if (shouldReduceMotion) return;
    setIsInteracting(true);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 500);
  }, [shouldReduceMotion]);
  
  // Motion values for mouse tilt coordinates
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // UPDATED: Smooth springs config (stiffness: 150, damping: 30)
  const springConfig = { stiffness: 150, damping: 30 };
  const smoothX = useSpring(rotateX, springConfig);
  const smoothY = useSpring(rotateY, springConfig);

  // Request gyroscope orientation permissions for iOS 13+
  const requestGyroPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<"granted" | "denied"> }).requestPermission === "function"
    ) {
      try {
        const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<"granted" | "denied"> }).requestPermission();
        if (permission === "granted") {
          console.log("Gyroscope permission granted.");
        }
      } catch (error) {
        console.error("Gyroscope permission denied or failed:", error);
      }
    }
  };

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Gyroscope orientation listener for mobile viewports
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // UPDATED: Set will-change on interaction
        triggerInteraction();

        // UPDATED: Map left-right tilt (gamma, max 8deg) and front-back (beta, max 8deg)
        const tiltY = (Math.max(-15, Math.min(15, e.gamma)) / 15) * 8;
        const tiltX = (Math.max(-15, Math.min(15, e.beta - 45)) / 15) * 8;
        
        rotateX.set(-tiltX);
        rotateY.set(tiltY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentContainer = containerRef.current;
      if (!currentContainer) return;
      
      // UPDATED: Set will-change on interaction
      triggerInteraction();

      const rect = currentContainer.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      
      // UPDATED: Map coordinates to max 8 deg of Y rotation and 8 deg of X rotation
      const rY = (mouseX / (width / 2)) * 8;
      const rX = -(mouseY / (height / 2)) * 8;
      
      rotateX.set(rX);
      rotateY.set(rY);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const parentContainer = currentContainer.parentElement;
    if (parentContainer) {
      parentContainer.addEventListener("mousemove", handleMouseMove, { passive: true });
      parentContainer.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }
    
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    
    return () => {
      if (parentContainer) {
        parentContainer.removeEventListener("mousemove", handleMouseMove);
        parentContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("deviceorientation", handleOrientation);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [rotateX, rotateY, shouldReduceMotion, triggerInteraction]);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      <m.div
        ref={containerRef}
        onClick={requestGyroPermission}
        role="img"
        aria-label="Interactive iPhone mockup"
        style={{
          rotateX: shouldReduceMotion ? 0 : smoothX,
          rotateY: shouldReduceMotion ? 0 : smoothY,
          transformStyle: shouldReduceMotion ? "flat" : "preserve-3d",
          perspective: shouldReduceMotion ? undefined : 1000,
          // UPDATED: Set will-change: transform only during active tilting and remove when idle
          willChange: isInteracting ? "transform" : "auto",
        }}
        initial={{ y: 0 }}
        animate={shouldReduceMotion ? {} : {
          y: [0, -16, 0],
        }}
        transition={shouldReduceMotion ? { duration: 0 } : {
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-full aspect-[460/843] flex items-center justify-center cursor-pointer select-none active:scale-[0.98] transition-transform duration-200 w-full"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800/40 rounded-[38px] animate-pulse z-10" />
        )}
        <Image
          src={iphoneOrangeMockup}
          // UPDATED: Added descriptive alt text, priority loading, placeholder="blur", and loading state fade
          alt="Before and after demo of Zwixo studio countdown poster shown inside an iPhone mockup"
          priority
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 460px"
          onLoad={() => setIsLoading(false)}
          className={`w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </m.div>
    </div>
  );
}
