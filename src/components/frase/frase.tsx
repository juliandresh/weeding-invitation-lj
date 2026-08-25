"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CorazonesCayendo } from "@/components/ui/corazones-cayendo";
import { Reveal } from "@/components/ui/reveal";

// Frase placeholder — los novios aún no eligieron la definitiva (CLAUDE.md
// §4.7, opcional). Reemplazar cuando la tengan, o quitar la sección.
const FRASE =
  "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.";
const AUTOR = "Antoine de Saint-Exupéry";

export function Frase() {
  return (
    <section className="relative bg-ivory px-6 py-20 sm:py-28">
      <CorazonesCayendo />
      <Reveal
        amount={0.4}
        className="relative mx-auto flex max-w-xl flex-col items-center gap-4 text-center"
      >
        <motion.div
          aria-hidden="true"
          className="h-12 w-12 sm:h-16 sm:w-16"
          initial={{ opacity: 0, y: -14, rotate: -10, scale: 0.6 }}
          animate={{
            opacity: 1,
            y: [0, 6, 0],
            rotate: [0, 4, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3 },
            scale: { duration: 0.6, delay: 0.3, ease: "easeOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
          }}
        >
          <Image
            src="/images/abeja-duotono.png"
            alt=""
            width={600}
            height={600}
            className="h-full w-full object-contain"
          />
        </motion.div>
        <span
          className="font-script text-7xl leading-none text-gold/70"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="font-script text-3xl leading-snug text-ink sm:text-4xl">
          {FRASE}
        </p>
        <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink-soft">
          — {AUTOR}
        </p>
      </Reveal>
    </section>
  );
}
