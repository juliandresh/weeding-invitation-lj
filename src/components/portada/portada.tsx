"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useAudio } from "@/components/audio/audio-context";
import { Sobre } from "./sobre";

const NOVIA = "Liliana";
const NOVIO = "Julián";

// Coincide con la duración de la animación de apertura del sobre en Sobre.tsx
const REVEAL_DELAY_MS = 1150;

export function Portada() {
  const { start } = useAudio();
  const [revealed, setRevealed] = useState(false);

  function handleOpen() {
    start();
    window.setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
  }

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--color-blush-soft),transparent_60%)]"
      />

      {!revealed && (
        <div className="relative z-10">
          <Sobre onOpen={handleOpen} />
        </div>
      )}

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
            Nos casamos
          </p>
          <h1 className="text-6xl leading-tight font-script text-ink sm:text-7xl">
            {NOVIA} <span className="text-gold">&amp;</span> {NOVIO}
          </h1>
          <p className="max-w-md text-lg text-ink-soft">
            Con inmensa alegría y la bendición de Dios, los invitamos a
            celebrar el inicio de nuestra nueva vida juntos.
          </p>
        </motion.div>
      )}
    </section>
  );
}
