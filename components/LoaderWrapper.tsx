"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./Loader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoaderVisible(false);
    if (typeof window !== "undefined") {
      (window as unknown as { __zwixo_loader_done?: boolean }).__zwixo_loader_done = true;
      window.dispatchEvent(new Event("zwixo_loader_completed"));
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoaderVisible && (
          <Loader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>
      <div inert={isLoaderVisible}>
        {children}
      </div>
    </>
  );
}
