"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAudio } from "@/components/audio/audio-context";
import { TarjetaInvitado } from "@/components/invitado/tarjeta-invitado";
import { INVITADO_EJEMPLO } from "@/lib/mock-invitado";
import { Sobre } from "./sobre";

const NOVIA = "Liliana";
const NOVIO = "Julián";

// Coincide con la duración de la animación de apertura del sobre en Sobre.tsx
const REVEAL_DELAY_MS = 950;

export function Portada() {
  const { start } = useAudio();
  const [revealed, setRevealed] = useState(false);

  function handleOpen() {
    start();
    window.setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
  }

  // Bloquea el scroll de la página mientras el sobre no se haya abierto:
  // la pantalla inicial debe verse sola, sin poder desplazarse a las
  // siguientes secciones hasta hacer clic.
  useEffect(() => {
    if (revealed) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [revealed]);

  return (
    <section className="relative flex h-dvh flex-col items-center justify-center overflow-y-auto px-6 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--color-sky-soft),transparent_60%)]"
      />

      {!revealed && (
        <div className="relative z-10 flex flex-col items-center gap-6">
          <TarjetaInvitado invitado={INVITADO_EJEMPLO} />
          <p className="max-w-md text-lg text-ink-soft">
            Sabemos que este día no sería igual sin ti. Toca el sobre para
            descubrir los detalles de nuestra celebración.
          </p>
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
