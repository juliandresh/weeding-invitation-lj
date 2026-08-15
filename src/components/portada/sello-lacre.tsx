"use client";

import { motion } from "framer-motion";

const BASE = "#8a6a2f";
const HIGHLIGHT = "#e0c072";
const SHADOW = "#5e4720";

/**
 * Sello de lacre — cera con borde ondulado y textura de dos anillos
 * concéntricos grabados (efecto cuerda/relieve), en un único tono
 * dorado/bronce. 100% SVG original, sin assets externos.
 */
export function SelloLacre({ cracked = false }: { cracked?: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[52%] z-20 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, rotate: -20, opacity: 0 }}
      animate={
        cracked
          ? { scale: 0.85, rotate: 10, opacity: 0, y: -8 }
          : { scale: [1, 1.04, 1], rotate: 0, opacity: 1 }
      }
      transition={
        cracked
          ? { duration: 0.35, ease: "easeIn" }
          : {
              scale: {
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              },
              rotate: { type: "spring", stiffness: 260, damping: 14, delay: 0.5 },
              opacity: { duration: 0.4, delay: 0.5 },
            }
      }
    >
      <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
        <defs>
          <radialGradient id="lacre-fondo" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={HIGHLIGHT} />
            <stop offset="60%" stopColor={BASE} />
            <stop offset="100%" stopColor={SHADOW} />
          </radialGradient>
        </defs>

        {/* borde ondulado, tipo cera derramada */}
        <path
          d="M30 3
             C36 2 40 6 44 5
             C50 4 55 10 54 16
             C58 20 58 27 55 31
             C58 36 56 43 51 45
             C52 51 46 56 40 54
             C36 58 29 58 25 54
             C19 56 13 51 14 45
             C9 43 7 36 10 31
             C6 27 6 20 10 16
             C9 10 14 4 20 5
             C24 6 27 2 30 3 Z"
          fill="url(#lacre-fondo)"
          stroke={SHADOW}
          strokeWidth="0.5"
        />

        {/* anillo exterior grabado */}
        <circle
          cx="30"
          cy="30"
          r="19"
          fill="none"
          stroke={SHADOW}
          strokeWidth="1.4"
          opacity="0.55"
        />
        <circle
          cx="30"
          cy="30"
          r="19"
          fill="none"
          stroke={HIGHLIGHT}
          strokeWidth="0.6"
          opacity="0.5"
          transform="translate(-0.6 -0.6)"
        />

        {/* anillo interior grabado */}
        <circle
          cx="30"
          cy="30"
          r="12"
          fill="none"
          stroke={SHADOW}
          strokeWidth="1.2"
          opacity="0.5"
        />
        <circle
          cx="30"
          cy="30"
          r="12"
          fill="none"
          stroke={HIGHLIGHT}
          strokeWidth="0.6"
          opacity="0.45"
          transform="translate(-0.5 -0.5)"
        />

        {/* centro */}
        <circle cx="30" cy="30" r="3" fill={HIGHLIGHT} opacity="0.55" />
      </svg>
    </motion.div>
  );
}
