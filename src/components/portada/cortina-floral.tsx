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

type Elemento = {
  top: number;
  left: number;
  escala: number;
  rotate: number;
  flip: boolean;
  /** segundos que tarda un ciclo del balanceo */
  ritmo: number;
  /** desfase del balanceo, para que no se muevan todas a la vez */
  desfase: number;
};

// Ramos que tapan la pantalla completa. Se distribuyen en bandas para
// garantizar cobertura, pero con posiciones desalineadas y variación de
// tamaño, giro y reflejo en cada uno: colocados en rejilla regular la
// repetición de la misma imagen se lee como papel tapiz. El ancho base va en
// unidades de viewport para mantener la densidad tanto en celular (pantalla
// alta y angosta) como en escritorio (ancha).
const RAMOS: Elemento[] = [
  { top: -14, left: -18, escala: 1.15, rotate: -9, flip: false, ritmo: 6.2, desfase: 0 },
  { top: -8, left: 14, escala: 0.85, rotate: 7, flip: true, ritmo: 5.4, desfase: 0.8 },
  { top: -12, left: 44, escala: 1.05, rotate: -4, flip: false, ritmo: 7, desfase: 1.5 },
  { top: -6, left: 76, escala: 0.95, rotate: 11, flip: true, ritmo: 5.8, desfase: 0.4 },

  { top: 10, left: -8, escala: 0.9, rotate: 5, flip: true, ritmo: 6.6, desfase: 1.1 },
  { top: 16, left: 24, escala: 1.2, rotate: -8, flip: false, ritmo: 5.2, desfase: 2 },
  { top: 12, left: 56, escala: 0.8, rotate: 10, flip: true, ritmo: 7.4, desfase: 0.6 },
  { top: 18, left: 86, escala: 1.1, rotate: -6, flip: false, ritmo: 6, desfase: 1.7 },

  { top: 30, left: -16, escala: 1.0, rotate: 8, flip: false, ritmo: 5.6, desfase: 0.3 },
  { top: 36, left: 12, escala: 0.75, rotate: -5, flip: true, ritmo: 6.8, desfase: 1.3 },
  { top: 32, left: 44, escala: 1.25, rotate: 4, flip: false, ritmo: 5, desfase: 2.2 },
  { top: 38, left: 78, escala: 0.9, rotate: -10, flip: true, ritmo: 7.2, desfase: 0.9 },

  { top: 50, left: -6, escala: 1.1, rotate: -7, flip: true, ritmo: 6.4, desfase: 1.9 },
  { top: 56, left: 26, escala: 0.85, rotate: 9, flip: false, ritmo: 5.9, desfase: 0.5 },
  { top: 50, left: 58, escala: 1.0, rotate: -3, flip: true, ritmo: 6.9, desfase: 1.4 },
  { top: 58, left: 88, escala: 1.15, rotate: 6, flip: false, ritmo: 5.3, desfase: 2.4 },

  { top: 68, left: -14, escala: 0.95, rotate: 10, flip: false, ritmo: 7.1, desfase: 0.7 },
  { top: 72, left: 16, escala: 1.2, rotate: -6, flip: true, ritmo: 5.7, desfase: 1.6 },
  { top: 66, left: 48, escala: 0.8, rotate: 5, flip: false, ritmo: 6.3, desfase: 2.1 },
  { top: 74, left: 80, escala: 1.05, rotate: -9, flip: true, ritmo: 5.5, desfase: 1 },

  { top: 84, left: -6, escala: 1.1, rotate: 4, flip: true, ritmo: 6.7, desfase: 0.2 },
  { top: 90, left: 24, escala: 0.9, rotate: -8, flip: false, ritmo: 5.1, desfase: 1.8 },
  { top: 86, left: 56, escala: 1.15, rotate: 7, flip: true, ritmo: 7.3, desfase: 1.2 },
  { top: 92, left: 86, escala: 0.85, rotate: -5, flip: false, ritmo: 6.1, desfase: 2.3 },
];

type FlorSuelta = Elemento & { tipo: "azul" | "blanca" };

// Flores sueltas (una azul y una blanca) salpicadas sobre los ramos, para
// romper la uniformidad del fondo y dar profundidad a la cortina.
const FLORES_SUELTAS: FlorSuelta[] = [
  { tipo: "azul", top: 4, left: 8, escala: 1.1, rotate: -12, flip: false, ritmo: 4.8, desfase: 0.3 },
  { tipo: "blanca", top: 10, left: 38, escala: 0.9, rotate: 8, flip: true, ritmo: 5.6, desfase: 1.2 },
  { tipo: "azul", top: 14, left: 88, escala: 0.85, rotate: 15, flip: true, ritmo: 4.2, desfase: 2 },
  { tipo: "blanca", top: 28, left: 6, escala: 1.15, rotate: -6, flip: false, ritmo: 5.2, desfase: 0.7 },
  { tipo: "azul", top: 22, left: 62, escala: 1.0, rotate: 10, flip: false, ritmo: 4.6, desfase: 1.6 },
  { tipo: "blanca", top: 34, left: 84, escala: 0.95, rotate: -14, flip: true, ritmo: 5.9, desfase: 0.4 },
  { tipo: "azul", top: 38, left: 26, escala: 1.2, rotate: 5, flip: true, ritmo: 4.4, desfase: 2.2 },
  { tipo: "blanca", top: 44, left: 54, escala: 0.8, rotate: -9, flip: false, ritmo: 5.4, desfase: 1 },
  { tipo: "azul", top: 54, left: 72, escala: 1.05, rotate: 13, flip: false, ritmo: 4.9, desfase: 0.6 },
  { tipo: "blanca", top: 58, left: 20, escala: 1.1, rotate: -4, flip: true, ritmo: 5.7, desfase: 1.9 },
  { tipo: "azul", top: 62, left: 40, escala: 0.85, rotate: -11, flip: true, ritmo: 4.3, desfase: 1.4 },
  { tipo: "blanca", top: 66, left: 90, escala: 1.0, rotate: 7, flip: false, ritmo: 5.1, desfase: 0.9 },
  { tipo: "azul", top: 70, left: 12, escala: 0.95, rotate: 9, flip: false, ritmo: 4.7, desfase: 2.4 },
  { tipo: "blanca", top: 76, left: 66, escala: 1.15, rotate: -13, flip: true, ritmo: 5.8, desfase: 0.2 },
  { tipo: "azul", top: 86, left: 46, escala: 1.1, rotate: 6, flip: true, ritmo: 4.5, desfase: 1.7 },
  { tipo: "blanca", top: 90, left: 14, escala: 0.9, rotate: -8, flip: false, ritmo: 5.3, desfase: 1.1 },
  { tipo: "azul", top: 92, left: 78, escala: 1.0, rotate: 12, flip: false, ritmo: 5, desfase: 0.5 },
];

const SRC_FLOR = {
  azul: "/images/flor-azul-celeste.png",
  blanca: "/images/flor-blanca-celeste.png",
} as const;

type Mariposa = {
  top: string;
  left: string;
  size: string;
  ritmo: number;
  desfase: number;
};

const MARIPOSAS: Mariposa[] = [
  { top: "12%", left: "14%", size: "w-16 sm:w-24", ritmo: 2.6, desfase: 0.1 },
  { top: "26%", left: "62%", size: "w-14 sm:w-20", ritmo: 3.1, desfase: 0.9 },
  { top: "44%", left: "8%", size: "w-12 sm:w-16", ritmo: 2.4, desfase: 1.5 },
  { top: "52%", left: "74%", size: "w-16 sm:w-24", ritmo: 3.4, desfase: 0.5 },
  { top: "70%", left: "26%", size: "w-14 sm:w-20", ritmo: 2.8, desfase: 1.2 },
  { top: "84%", left: "58%", size: "w-12 sm:w-16", ritmo: 3.2, desfase: 0.3 },
];

const DURACION_VISIBLE_MS = 3200;
const DURACION_DESVANECIDO_S = 2.1;
export const CORTINA_TOTAL_S =
  DURACION_VISIBLE_MS / 1000 + DURACION_DESVANECIDO_S;

function transformBase(e: Elemento) {
  return `rotate(${e.rotate}deg) scale(${e.escala})${
    e.flip ? " scaleX(-1)" : ""
  }`;
}

function estiloBalanceo(e: { ritmo: number; desfase: number }) {
  return {
    animationDuration: `${e.ritmo}s`,
    animationDelay: `${e.desfase}s`,
  };
}

// Cortina de flores, mariposas y pétalos (azul celeste/blanco) que cubre por
// completo la primera pantalla al abrirse el sobre, y se disuelve lentamente
// para revelar el título, la foto de los novios y el mensaje de bienvenida.
//
// La cortina ya debe estar formada en el instante en que aparece, así que
// nada tiene animación de entrada: lo único que se anima en JS es la opacidad
// del contenedor al disolverse. El balanceo de flores y mariposas va por CSS
// (ver globals.css), que no cuesta trabajo por fotograma pese a la cantidad
// de elementos. Se desmonta al terminar.
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

      {RAMOS.map((f, i) => (
        <div
          key={`ramo-${i}`}
          className="absolute w-[46vw] sm:w-[30vw]"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            transform: transformBase(f),
          }}
        >
          <div className="cortina-flota" style={estiloBalanceo(f)}>
            <Image
              src="/images/flores-celeste-duotono.png"
              alt=""
              width={500}
              height={500}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      ))}

      {FLORES_SUELTAS.map((f, i) => (
        <div
          key={`flor-${i}`}
          className="absolute w-[22vw] sm:w-[13vw]"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            transform: transformBase(f),
          }}
        >
          <div className="cortina-flota" style={estiloBalanceo(f)}>
            <Image
              src={SRC_FLOR[f.tipo]}
              alt=""
              width={450}
              height={450}
              className="h-auto w-full"
            />
          </div>
        </div>
      ))}

      {MARIPOSAS.map((m, i) => (
        <div
          key={`mariposa-${i}`}
          className={`absolute ${m.size}`}
          style={{ top: m.top, left: m.left }}
        >
          <div className="cortina-flota" style={estiloBalanceo(m)}>
            <Image
              src="/images/mariposas-celeste-duotono.png"
              alt=""
              width={500}
              height={500}
              className="h-auto w-full"
            />
          </div>
        </div>
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
