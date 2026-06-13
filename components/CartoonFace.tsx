// FILE: components/CartoonFace.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export interface CartoonFaceProps {
  state: "neutral" | "happy" | "grin" | "celebrate";
}

const paths = {
  leftEye: {
    neutral: "M 14,21 C 14,18.2 16.2,16 19,16 L 27,16 C 29.8,16 32,18.2 32,21 C 32,23.8 29.8,26 27,26 L 19,26 C 16.2,26 14,23.8 14,21 Z",
    happy: "M 14,24 C 14,20 18,15 23,15 C 28,15 32,20 32,24 C 32,25.5 29.5,22.5 27,20.5 C 24.5,18.5 21.5,18.5 19,20.5 C 16.5,22.5 14,25.5 14,24 Z",
    grin: "M 14,16 L 28,21 L 14,26 C 14,26 15,22.5 17,21 C 15,19.5 14,16 14,16 Z",
    celebrate: "M 23,17.2 C 20.2,13.2 15,13.2 15,17.2 C 15,22.2 23,27.2 23,27.2 C 23,27.2 31,22.2 31,17.2 C 31,13.2 25.8,13.2 23,17.2 Z" // Heart (33% larger!)
  },
  rightEye: {
    neutral: "M 44,21 C 44,18.2 46.2,16 49,16 L 57,16 C 59.8,16 62,18.2 62,21 C 62,23.8 59.8,26 57,26 L 49,26 C 46.2,26 44,23.8 44,21 Z",
    happy: "M 44,24 C 44,20 48,15 53,15 C 58,15 62,20 62,24 C 62,25.5 59.5,22.5 57,20.5 C 54.5,18.5 51.5,18.5 49,20.5 C 46.5,22.5 44,25.5 44,24 Z",
    grin: "M 62,16 L 48,21 L 62,26 C 62,26 61,22.5 59,21 C 61,19.5 62,16 62,16 Z",
    celebrate: "M 53,17.2 C 50.2,13.2 45,13.2 45,17.2 C 45,22.2 53,27.2 53,27.2 C 53,27.2 61,22.2 61,17.2 C 61,13.2 55.8,13.2 53,17.2 Z" // Heart (33% larger!)
  },
  mouth: {
    neutral: "M 19,50 L 57,50 C 59.8,50 62,52.2 62,55 C 62,57.8 59.8,60 57,60 L 19,60 C 16.2,60 14,57.8 14,55 C 14,52.2 16.2,50 19,50 Z",
    happy: "M 19,45 Q 38,57 57,45 C 59.5,47 61.5,50 60,53 Q 38,65 16,53 C 14.5,50 16.5,47 19,45 Z",
    grin: "M 16,46 Q 38,52 60,46 C 61,50 59,62 38,62 C 17,62 15,50 16,46 Z", // New grinning lips outline
    celebrate: "M 16,46 Q 38,52 60,46 C 61,50 59,62 38,62 C 17,62 15,50 16,46 Z" // Laughing smile
  },
  diagonal: {
    neutral: "52,26 62,26 24,50 14,50",
    happy: "38,33 39,33 41,39 35,39",
    grin: "38,33 39,33 41,39 35,39",
    celebrate: "38,33 39,33 41,39 35,39"
  }
} as const;

export default function CartoonFace({ state }: CartoonFaceProps) {
  const bodyVariants = {
    neutral: {
      y: [0, -1.5, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const }
    },
    happy: {
      scale: [1, 1.04, 1],
      y: [0, -2.5, 0],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }
    },
    grin: {
      rotate: [0, -2, 2, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" as const }
    },
    celebrate: {
      y: [0, -3.5, 0],
      rotate: [0, -3, 3, 0],
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" as const }
    }
  };

  return (
    <svg viewBox="0 0 76 76" className="w-full h-full select-none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Speech bubble tail of the logo - stationary background */}
      <rect x="50" y="54" width="12" height="8" rx="2" fill="#1C1C1E"/>
      <polygon points="50,56 68,58 50,60" fill="#1C1C1E"/>
      {/* Master speech bubble square background of the logo */}
      <rect width="76" height="76" rx="18" fill="#1C1C1E"/>

      {/* Animated Z-Mascot Body & Face */}
      <motion.g
        variants={bodyVariants}
        animate={state}
        style={{ transformOrigin: "38px 38px" }}
      >
        {/* Dynamic Morphing Diagonal Bar / Nose */}
        <motion.polygon
          fill="#F5A623"
          animate={{ points: paths.diagonal[state] }}
          transition={{ duration: 0.45, ease: "easeInOut" as const }}
        />

        {/* Dynamic Morphing Left Eye Path */}
        <motion.path
          animate={{
            d: paths.leftEye[state],
            scaleY: state === "neutral" ? [1, 1, 0.1, 1] : 1,
            fill: state === "celebrate" ? "#FF5252" : "#F5A623" // Hearts turn red in celebrate!
          }}
          transition={{
            d: { duration: 0.45, ease: "easeInOut" as const },
            fill: { duration: 0.3 },
            scaleY: state === "neutral" ? {
              repeat: Infinity,
              duration: 3.5,
              times: [0, 0.9, 0.93, 1],
              ease: "easeInOut" as const,
            } : { duration: 0.3 }
          }}
          style={{ transformOrigin: "23px 21px" }}
        />

        {/* Dynamic Morphing Right Eye Path */}
        <motion.path
          animate={{
            d: paths.rightEye[state],
            scaleY: state === "neutral" ? [1, 1, 0.1, 1] : 1,
            fill: state === "celebrate" ? "#FF5252" : "#F5A623" // Hearts turn red in celebrate!
          }}
          transition={{
            d: { duration: 0.45, ease: "easeInOut" as const },
            fill: { duration: 0.3 },
            scaleY: state === "neutral" ? {
              repeat: Infinity,
              duration: 3.5,
              times: [0, 0.9, 0.93, 1],
              ease: "easeInOut" as const,
            } : { duration: 0.3 }
          }}
          style={{ transformOrigin: "53px 21px" }}
        />

        {/* Dynamic Morphing Mouth Path */}
        <motion.path
          fill="#F5A623"
          animate={{ d: paths.mouth[state] }}
          transition={{ duration: 0.45, ease: "easeInOut" as const }}
        />

        {/* Inner throat opening for open laughing mouth in grin and celebrate (fades in) */}
        <motion.path
          d="M 18,48 Q 38,53 58,48 C 57,51 55,59 38,59 C 21,59 19,51 18,48 Z"
          fill="#1C1C1E"
          animate={{ opacity: (state === "grin" || state === "celebrate") ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Pink tongue inside open mouth for grin and celebrate (fades in) */}
        <motion.path
          d="M 30,59 C 32,54 44,54 46,59 Z"
          fill="#FF8A80"
          animate={{ opacity: (state === "grin" || state === "celebrate") ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Teeth specifically for grin state */}
        <motion.rect
          x="34.5"
          y="49"
          width="7"
          height="1.8"
          fill="#FFFFFF"
          rx="0.5"
          animate={{ opacity: state === "grin" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

      </motion.g>
    </svg>
  );
}
