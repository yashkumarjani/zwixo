"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./Loader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoaderVisible && (
          <Loader onComplete={() => setIsLoaderVisible(false)} />
        )}
      </AnimatePresence>
      <div inert={isLoaderVisible}>
        {children}
      </div>
    </>
  );
}
