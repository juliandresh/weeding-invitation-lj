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
    size: 9 + Math.random() * 7,
    duracion: 3.6 + Math.random() * 2.4,
    delay: Math.random() * 2.6,
    driftPx: 10 + Math.random() * 18,
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
  top: number;
  left: number;
  escala: number;
  rotate: number;
  flip: boolean;
};

// Ramos que tapan la pantalla completa. Se distribuyen en bandas para
// garantizar cobertura, pero con posiciones desalineadas y variación de
// tamaño, giro y reflejo en cada uno: colocados en rejilla regular la
// repetición de la misma imagen se lee como papel tapiz. El ancho base va en
// unidades de viewport para mantener la densidad tanto en celular (pantalla
// alta y angosta) como en escritorio (ancha).
const FLORES: Flor[] = [
  { top: -14, left: -18, escala: 1.15, rotate: -9, flip: false },
  { top: -8, left: 14, escala: 0.85, rotate: 7, flip: true },
  { top: -12, left: 44, escala: 1.05, rotate: -4, flip: false },
  { top: -6, left: 76, escala: 0.95, rotate: 11, flip: true },

  { top: 10, left: -8, escala: 0.9, rotate: 5, flip: true },
  { top: 16, left: 24, escala: 1.2, rotate: -8, flip: false },
  { top: 12, left: 56, escala: 0.8, rotate: 10, flip: true },
  { top: 18, left: 86, escala: 1.1, rotate: -6, flip: false },

  { top: 30, left: -16, escala: 1.0, rotate: 8, flip: false },
  { top: 36, left: 12, escala: 0.75, rotate: -5, flip: true },
  { top: 32, left: 44, escala: 1.25, rotate: 4, flip: false },
  { top: 38, left: 78, escala: 0.9, rotate: -10, flip: true },

  { top: 50, left: -6, escala: 1.1, rotate: -7, flip: true },
  { top: 56, left: 26, escala: 0.85, rotate: 9, flip: false },
  { top: 50, left: 58, escala: 1.0, rotate: -3, flip: true },
  { top: 58, left: 88, escala: 1.15, rotate: 6, flip: false },

  { top: 68, left: -14, escala: 0.95, rotate: 10, flip: false },
  { top: 72, left: 16, escala: 1.2, rotate: -6, flip: true },
  { top: 66, left: 48, escala: 0.8, rotate: 5, flip: false },
  { top: 74, left: 80, escala: 1.05, rotate: -9, flip: true },

  { top: 84, left: -6, escala: 1.1, rotate: 4, flip: true },
  { top: 90, left: 24, escala: 0.9, rotate: -8, flip: false },
  { top: 86, left: 56, escala: 1.15, rotate: 7, flip: true },
  { top: 92, left: 86, escala: 0.85, rotate: -5, flip: false },
];

type Mariposa = {
  top: string;
  left: string;
  size: string;
  delay: number;
};

const MARIPOSAS: Mariposa[] = [
  { top: "12%", left: "14%", size: "w-16 sm:w-24", delay: 0.1 },
  { top: "26%", left: "62%", size: "w-14 sm:w-20", delay: 0.35 },
  { top: "44%", left: "8%", size: "w-12 sm:w-16", delay: 0.5 },
  { top: "52%", left: "74%", size: "w-16 sm:w-24", delay: 0.2 },
  { top: "70%", left: "26%", size: "w-14 sm:w-20", delay: 0.45 },
  { top: "84%", left: "58%", size: "w-12 sm:w-16", delay: 0.3 },
];

const DURACION_VISIBLE_MS = 3200;
const DURACION_DESVANECIDO_S = 2.1;
export const CORTINA_TOTAL_S =
  DURACION_VISIBLE_MS / 1000 + DURACION_DESVANECIDO_S;

// Cortina de flores, mariposas y pétalos (azul celeste/blanco) que cubre por
// completo la primera pantalla al abrirse el sobre, y se disuelve lentamente
// para revelar el título, la foto de los novios y el mensaje de bienvenida.
//
// Los ramos se renderizan estáticos (sin animación propia de entrada): la
// cortina ya debe estar formada en el instante en que aparece, y así lo único
// que se anima es la opacidad del contenedor, manteniendo el efecto liviano
// pese a la cantidad de imágenes. Se desmonta al terminar.
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
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: DURACION_VISIBLE_MS / 1000,
        duration: DURACION_DESVANECIDO_S,
        ease: "easeInOut",
      }}
    >
      {/* capa base opaca: garantiza que nada del contenido se transparente */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-soft via-ivory to-sky-soft" />

      {FLORES.map((f, i) => (
        <div
          key={`flor-${i}`}
          className="absolute w-[46vw] sm:w-[30vw]"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            transform: `rotate(${f.rotate}deg) scale(${f.escala})${
              f.flip ? " scaleX(-1)" : ""
            }`,
          }}
        >
          <Image
            src="/images/flores-celeste-duotono.png"
            alt=""
            width={500}
            height={500}
            className="h-auto w-full"
            priority
          />
        </div>
      ))}

      {MARIPOSAS.map((m, i) => (
        <motion.div
          key={`mariposa-${i}`}
          className={`absolute ${m.size}`}
          style={{ top: m.top, left: m.left }}
          animate={{ y: [0, -9, 0], rotate: [0, 4, -4, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: m.delay,
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
          initial={{ y: "-15vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "115vh",
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
