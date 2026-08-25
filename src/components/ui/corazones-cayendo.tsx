"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type Corazon = {
  id: number;
  leftPct: number;
  size: number;
  duracion: number;
  delay: number;
  driftPx: number;
  color: string;
};

const COLORES = [
  "var(--color-gold-soft)",
  "var(--color-sky-soft)",
  "var(--color-gold)",
];

function generarCorazones(cantidad: number): Corazon[] {
  return Array.from({ length: cantidad }, (_, id) => ({
    id,
    leftPct: 4 + Math.random() * 92,
    size: 10 + Math.random() * 7,
    duracion: 7 + Math.random() * 5,
    delay: Math.random() * 6,
    driftPx: 16 + Math.random() * 22,
    color: COLORES[id % COLORES.length],
  }));
}

function FormaCorazon({ size, color }: { size: number; color: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.5 4 12 5C12.5 4 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14.5 12 21 12 21Z"
        fill={color}
        opacity={0.85}
      />
    </svg>
  );
}

// Corazones cayendo suavemente de arriba hacia abajo, mismo patrón que
// PetalosCayendo (bucle mientras la sección está en vista, se pausa fuera
// de vista) — pensado para secciones con un tono más romántico/afectivo.
export function CorazonesCayendo() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { amount: 0.2 });
  const corazones = useMemo(() => generarCorazones(7), []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {enVista &&
        corazones.map((c) => (
          <motion.div
            key={c.id}
            className="absolute top-0"
            style={{ left: `${c.leftPct}%` }}
            initial={{ y: "-10vh", opacity: 0, rotate: -12 }}
            animate={{
              y: "85vh",
              x: [0, c.driftPx, -c.driftPx, 0],
              opacity: [0, 1, 1, 0],
              rotate: 12,
            }}
            transition={{
              y: {
                duration: c.duracion,
                delay: c.delay,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: c.duracion,
                delay: c.delay,
                repeat: Infinity,
                ease: "linear",
              },
              rotate: {
                duration: c.duracion,
                delay: c.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                duration: c.duracion / 2,
                delay: c.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <FormaCorazon size={c.size} color={c.color} />
          </motion.div>
        ))}
    </div>
  );
}
