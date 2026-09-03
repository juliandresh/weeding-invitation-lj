"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Petalo = {
  id: number;
  leftPct: number;
  size: number;
  duracion: number;
  delay: number;
  driftPx: number;
};

function generarPetalos(cantidad: number): Petalo[] {
  return Array.from({ length: cantidad }, (_, id) => ({
    id,
    leftPct: -5 + Math.random() * 110,
    size: 8 + Math.random() * 6,
    duracion: 3.4 + Math.random() * 2.2,
    delay: Math.random() * 2.4,
    driftPx: 8 + Math.random() * 14,
  }));
}

function FormaPetalo({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 40" width={size} height={size * 1.6} aria-hidden="true">
      <path
        d="M12 0C18 8 22 19 12 40C2 19 6 8 12 0Z"
        fill="white"
        opacity={0.92}
      />
    </svg>
  );
}

type Flor = {
  top: string;
  left: string;
  width: string;
  rotate: number;
  delay: number;
};

// Las flores se posicionan en porcentajes del marco de la foto (no de la
// sección), de modo que la tapan por completo sin importar el tamaño de
// pantalla. Se desbordan a propósito de los bordes para que la cortina no
// se vea recortada en un rectángulo perfecto.
const FLORES: Flor[] = [
  { top: "-10%", left: "-18%", width: "78%", rotate: -12, delay: 0 },
  { top: "-6%", left: "38%", width: "80%", rotate: 9, delay: 0.09 },
  { top: "6%", left: "10%", width: "82%", rotate: -4, delay: 0.05 },
  { top: "20%", left: "-20%", width: "82%", rotate: 6, delay: 0.18 },
  { top: "24%", left: "40%", width: "84%", rotate: -7, delay: 0.13 },
  { top: "36%", left: "8%", width: "86%", rotate: 3, delay: 0.21 },
  { top: "50%", left: "-16%", width: "80%", rotate: 11, delay: 0.24 },
  { top: "52%", left: "36%", width: "82%", rotate: -10, delay: 0.29 },
  { top: "64%", left: "12%", width: "82%", rotate: -2, delay: 0.32 },
  { top: "74%", left: "-8%", width: "76%", rotate: 5, delay: 0.35 },
  { top: "72%", left: "34%", width: "78%", rotate: -4, delay: 0.4 },
];

type Mariposa = {
  top: string;
  left: string;
  width: string;
  delay: number;
};

const MARIPOSAS: Mariposa[] = [
  { top: "8%", left: "12%", width: "38%", delay: 0.2 },
  { top: "34%", left: "48%", width: "34%", delay: 0.42 },
  { top: "62%", left: "8%", width: "36%", delay: 0.55 },
  { top: "84%", left: "44%", width: "32%", delay: 0.32 },
];

const DURACION_VISIBLE_MS = 3200;
const DURACION_DESVANECIDO_S = 2.1;
export const CORTINA_TOTAL_S =
  DURACION_VISIBLE_MS / 1000 + DURACION_DESVANECIDO_S;

// Cortina de flores, mariposas y pétalos (azul celeste/blanco) que cubre por
// completo la foto de los novios al abrirse el sobre, y se desvanece
// lentamente para revelarla. Se monta DENTRO del marco de la foto, así que
// las flores tapan exactamente la imagen en vez de decorar los bordes de la
// sección. Se desmonta del todo al terminar, para no dejar animaciones
// corriendo de fondo.
export function CortinaFloral() {
  const [visible, setVisible] = useState(true);
  const petalos = useMemo(() => generarPetalos(14), []);

  useEffect(() => {
    const id = window.setTimeout(
      () => setVisible(false),
      CORTINA_TOTAL_S * 1000
    );
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: DURACION_VISIBLE_MS / 1000,
        duration: DURACION_DESVANECIDO_S,
        ease: "easeInOut",
      }}
    >
      {/* capa base opaca: garantiza que la foto quede oculta al inicio */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-soft via-ivory to-sky-soft" />

      {FLORES.map((f, i) => (
        <motion.div
          key={`flor-${i}`}
          className="absolute"
          style={{ top: f.top, left: f.left, width: f.width }}
          initial={{ opacity: 0, scale: 0.72, rotate: f.rotate - 6 }}
          animate={{ opacity: 1, scale: 1, rotate: f.rotate }}
          transition={{ duration: 0.9, delay: f.delay, ease: "easeOut" }}
        >
          <Image
            src="/images/flores-celeste-duotono.png"
            alt=""
            width={500}
            height={500}
            className="h-auto w-full"
          />
        </motion.div>
      ))}

      {MARIPOSAS.map((m, i) => (
        <motion.div
          key={`mariposa-${i}`}
          className="absolute"
          style={{ top: m.top, left: m.left, width: m.width }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -7, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: m.delay },
            scale: { duration: 0.6, delay: m.delay, ease: "easeOut" },
            y: {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: m.delay + 0.3,
            },
            rotate: {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: m.delay + 0.3,
            },
          }}
        >
          <Image
            src="/images/mariposas-celeste-duotono.png"
            alt=""
            width={500}
            height={500}
            className="h-auto w-full"
          />
        </motion.div>
      ))}

      {petalos.map((p) => (
        <motion.div
          key={`petalo-${p.id}`}
          className="absolute top-0"
          style={{ left: `${p.leftPct}%` }}
          initial={{ y: "-15%", opacity: 0, rotate: 0 }}
          animate={{
            y: "115%",
            x: [0, p.driftPx, -p.driftPx, 0],
            opacity: [0, 1, 1, 0.9],
            rotate: 200,
          }}
          transition={{
            duration: p.duracion,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FormaPetalo size={p.size} />
        </motion.div>
      ))}
    </motion.div>
  );
}
