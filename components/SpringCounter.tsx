// FILE: components/SpringCounter.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export interface SpringCounterProps {
  value: number;
}

export default function SpringCounter({ value }: SpringCounterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const motionValue = useMotionValue(0);
  const springVal = useSpring(motionValue, { stiffness: 60, damping: 18 });
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    motionValue.set(value);
  }, [value, motionValue, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    return springVal.on("change", (latest) => {
      setCurrentVal(Math.round(latest));
    });
  }, [springVal, isMounted]);

  return <span>{isMounted ? currentVal.toLocaleString() : "0"}</span>;
}
