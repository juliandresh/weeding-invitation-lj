"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/components/audio/audio-context";
import {
  TarjetaInvitado,
  type InvitadoInfo,
} from "@/components/invitado/tarjeta-invitado";
import { PetalosCayendo } from "@/components/ui/petalos-cayendo";
import { Sobre } from "./sobre";

const NOVIA = "Liliana";
const NOVIO = "Julián";

const MENSAJE_GENERICO = "Sabemos que este día no sería igual sin ti.";

// Coincide con la duración de la animación de apertura del sobre en Sobre.tsx
const REVEAL_DELAY_MS = 950;

export function Portada({ invitado }: { invitado: InvitadoInfo }) {
  const { start } = useAudio();
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax suave: el degradado de fondo se desplaza levemente según el
  // scroll dentro de la sección (basado en scroll, no en giroscopio, para
  // que se comporte igual en todos los dispositivos).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

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
    <section
      ref={sectionRef}
      className="relative flex h-dvh flex-col items-center justify-center overflow-y-auto px-6 py-16 text-center"
    >
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--color-sky-soft),transparent_60%)]"
      />

      <PetalosCayendo />

      {!revealed && (
        <div className="relative z-10 flex flex-col items-center gap-6">
          <TarjetaInvitado invitado={invitado} />
          <p className="max-w-md text-lg text-ink-soft">
            {invitado.mensajePersonalizado ?? MENSAJE_GENERICO} Toca el sobre
            para descubrir los detalles de nuestra celebración.
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
