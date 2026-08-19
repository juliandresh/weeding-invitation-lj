"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type Petalo = {
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
  "var(--color-ivory-soft)",
];

function generarPetalos(cantidad: number): Petalo[] {
  return Array.from({ length: cantidad }, (_, id) => ({
    id,
    leftPct: 4 + Math.random() * 92,
    size: 11 + Math.random() * 7,
    duracion: 7 + Math.random() * 5,
    delay: Math.random() * 6,
    driftPx: 18 + Math.random() * 26,
    color: COLORES[id % COLORES.length],
  }));
}

function FormaPetalo({ size, color }: { size: number; color: string }) {
  return (
    <svg
      viewBox="0 0 24 40"
      width={size}
      height={size * 1.6}
      aria-hidden="true"
    >
      <path d="M12 0C18 8 22 19 12 40C2 19 6 8 12 0Z" fill={color} opacity={0.85} />
    </svg>
  );
}

// Pétalos de flor de loto cayendo suavemente, en bucle mientras la sección
// está en pantalla — se pausan al salir de vista (igual que los corazones
// del video de cierre) para no animar de forma continua fuera de vista.
// Pensado para usarse solo en un par de secciones clave, no en todo el
// sitio, para mantener el efecto liviano.
export function PetalosCayendo() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { amount: 0.2 });
  const petalos = useMemo(() => generarPetalos(7), []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {enVista &&
        petalos.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-0"
            style={{ left: `${p.leftPct}%` }}
            initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
            animate={{
              y: "85vh",
              x: [0, p.driftPx, -p.driftPx, 0],
              opacity: [0, 1, 1, 0],
              rotate: 220,
            }}
            transition={{
              y: {
                duration: p.duracion,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: p.duracion,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              },
              rotate: {
                duration: p.duracion,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              },
              x: {
                duration: p.duracion / 2,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <FormaPetalo size={p.size} color={p.color} />
          </motion.div>
        ))}
    </div>
  );
}
