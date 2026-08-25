"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type Burbuja = {
  id: number;
  leftPct: number;
  size: number;
  duracion: number;
  delay: number;
  driftPx: number;
  color: string;
};

const COLORES = ["var(--color-sky)", "var(--color-sky-soft)"];

// Franjas cerca de los bordes izquierdo/derecho, evitando la columna central
// donde está el texto del mensaje.
function bordeAleatorio(): number {
  const enBordeIzquierdo = Math.random() < 0.5;
  return enBordeIzquierdo ? 2 + Math.random() * 12 : 84 + Math.random() * 12;
}

function generarBurbujas(cantidad: number): Burbuja[] {
  return Array.from({ length: cantidad }, (_, id) => ({
    id,
    leftPct: bordeAleatorio(),
    size: 7 + Math.random() * 11,
    duracion: 6 + Math.random() * 5,
    delay: Math.random() * 6,
    driftPx: 8 + Math.random() * 10,
    color: COLORES[id % COLORES.length],
  }));
}

function FormaBurbuja({ size, color }: { size: number; color: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill={color} opacity={0.28} />
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        opacity={0.8}
      />
      <circle cx="8" cy="8" r="2.4" fill="white" opacity={0.75} />
    </svg>
  );
}

// Burbujas subiendo desde el borde inferior de la sección, evocando el mar
// en relación a la tortuga marina de "Agradecimiento". Misma técnica que
// PetalosCayendo (bucle mientras la sección está en vista, se pausa fuera
// de vista), solo que suben en vez de caer.
export function BurbujasSubiendo() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { amount: 0.2 });
  const burbujas = useMemo(() => generarBurbujas(9), []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {enVista &&
        burbujas.map((b) => (
          <motion.div
            key={b.id}
            className="absolute bottom-0"
            style={{ left: `${b.leftPct}%` }}
            initial={{ y: "8vh", opacity: 0 }}
            animate={{
              y: "-70vh",
              x: [0, b.driftPx, -b.driftPx, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              y: {
                duration: b.duracion,
                delay: b.delay,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: {
                duration: b.duracion,
                delay: b.delay,
                repeat: Infinity,
                ease: "linear",
              },
              x: {
                duration: b.duracion / 2,
                delay: b.delay,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <FormaBurbuja size={b.size} color={b.color} />
          </motion.div>
        ))}
    </div>
  );
}
