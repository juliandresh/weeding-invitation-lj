"use client";

import { motion } from "framer-motion";
import { Divider } from "@/components/ui/divider";
import { PetalosCayendo } from "@/components/ui/petalos-cayendo";
import { Reveal } from "@/components/ui/reveal";

// Iconos placeholder (SVG, silueta simple) — más adelante se pueden
// reemplazar por imágenes de referencia generadas con IA.

const COLORES_DAMAS = [
  { nombre: "Blanco", hex: "#FFFFFF" },
  { nombre: "Beige", hex: "#E8DCC8" },
  { nombre: "Azul turquesa", hex: "#1CA9C9" },
];

const COLORES_CABALLEROS = [
  { nombre: "Blanco", hex: "#FFFFFF" },
  { nombre: "Negro", hex: "#111111" },
];

function IconoVestido() {
  return (
    <svg viewBox="0 0 100 160" className="h-24 w-auto sm:h-28" aria-hidden="true">
      <motion.path
        d="M50 8 C42 8 36 14 36 22 C36 30 40 36 44 40 C30 55 22 90 14 150 L86 150 C78 90 70 55 56 40 C60 36 64 30 64 22 C64 14 58 8 50 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

function IconoTraje() {
  return (
    <svg viewBox="0 0 100 160" className="h-24 w-auto sm:h-28" aria-hidden="true">
      <motion.path
        d="M15 25 L38 8 L50 22 L62 8 L85 25 L85 150 L15 150 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <motion.path
        d="M46 22 L54 22 L58 45 L50 130 L42 45 Z"
        fill="currentColor"
        opacity={0.15}
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 1.2 }}
      />
    </svg>
  );
}

function Paleta({ colores }: { colores: { nombre: string; hex: string }[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {colores.map((c) => (
        <div key={c.nombre} className="flex flex-col items-center gap-1.5">
          <span
            className="h-8 w-8 rounded-full border border-ink/15 shadow-sm"
            style={{ backgroundColor: c.hex }}
          />
          <span className="text-[11px] tracking-wide text-ink-soft uppercase">
            {c.nombre}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DressCode() {
  return (
    <section className="relative bg-gradient-to-b from-ivory via-sky-soft/50 to-ivory px-6 py-20 sm:py-28">
      <PetalosCayendo />
      <Reveal
        amount={0.2}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Cómo vestir
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          Dress Code
        </h2>
        <p className="text-ink-soft">Etiqueta formal</p>
        <Divider />

        <div className="mt-4 grid w-full gap-10 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-4">
            <div className="text-gold">
              <IconoVestido />
            </div>
            <h3 className="text-2xl text-ink">Damas</h3>
            <p className="max-w-xs text-ink-soft">Vestido largo, formal.</p>
            <p className="text-sm text-ink-soft">
              Colores reservados para la novia, evitar:
            </p>
            <Paleta colores={COLORES_DAMAS} />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="text-gold">
              <IconoTraje />
            </div>
            <h3 className="text-2xl text-ink">Caballeros</h3>
            <p className="max-w-xs text-ink-soft">
              Formal, con corbata o corbatín.
            </p>
            <p className="text-sm text-ink-soft">
              Colores reservados para el novio, evitar:
            </p>
            <Paleta colores={COLORES_CABALLEROS} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
