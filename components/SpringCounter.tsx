// FILE: components/SpringCounter.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { SpringCounterProps } from "../types";

export default function SpringCounter({ value }: SpringCounterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springVal = useSpring(motionValue, { stiffness: 60, damping: 18 });
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!isMounted || shouldReduceMotion) return;
    motionValue.set(value);
  }, [value, motionValue, isMounted, shouldReduceMotion]);

  useEffect(() => {
    if (!isMounted || shouldReduceMotion) return;
    return springVal.on("change", (latest) => {
      setCurrentVal(Math.round(latest));
    });
  }, [springVal, isMounted, shouldReduceMotion]);

  const displayVal = shouldReduceMotion ? value : currentVal;

  return <span>{isMounted ? displayVal.toLocaleString() : "0"}</span>;
}
