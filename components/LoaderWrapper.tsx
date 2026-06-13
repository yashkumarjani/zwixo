"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./Loader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isMounted && isLoaderVisible && (
          <Loader onComplete={() => setIsLoaderVisible(false)} />
        )}
      </AnimatePresence>
      <div inert={isLoaderVisible}>
        {children}
      </div>
    </>
  );
}
