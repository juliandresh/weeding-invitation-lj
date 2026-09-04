"use client";

import { motion } from "framer-motion";

/**
 * Indicador didáctico para el botón de confirmar asistencia: un cursor que
 * salta hacia él, acompañado del texto "Toca el botón". Se agregó porque
 * varios invitados —sobre todo los de más edad— no identificaban el botón
 * como algo que hubiera que presionar (2026-09-04).
 *
 * Se probó primero con una mano de dedo índice extendido, pero dibujada así
 * (dedo saliendo del puño, con pulgar y nudillos a los lados) se leía como
 * un gesto ofensivo tanto en contorno como en silueta rellena. El cursor es
 * igual de reconocible y no admite esa lectura.
 */
export function IndicadorToque({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      // Salta hacia el botón y descansa entre repeticiones, para llamar la
      // atención sin resultar inquieto.
      animate={{ y: [0, -10, 0, 0, 0] }}
      transition={{
        duration: 2.2,
        times: [0, 0.2, 0.4, 0.75, 1],
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 sm:h-9 sm:w-9"
        fill="currentColor"
        stroke="var(--color-ivory)"
        strokeWidth={1.2}
        strokeLinejoin="round"
      >
        <path d="M5.5 2.2 5.5 19.4 10 15.1 12.8 21.4 15.6 20.1 12.9 14 18.8 13.6 Z" />
      </svg>
    </motion.div>
  );
}

/**
 * Anillos que laten desde el botón, el mismo recurso que invita a tocar el
 * sobre en la Portada.
 */
export function AnillosToque() {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-gold/50"
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.1,
          }}
        />
      ))}
    </>
  );
}
