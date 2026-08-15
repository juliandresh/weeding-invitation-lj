"use client";

import { motion } from "framer-motion";

// Frase placeholder — los novios aún no eligieron la definitiva (CLAUDE.md
// §4.7, opcional). Reemplazar cuando la tengan, o quitar la sección.
const FRASE =
  "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.";
const AUTOR = "Antoine de Saint-Exupéry";

export function Frase() {
  return (
    <section className="relative bg-ivory px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center"
      >
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
      </motion.div>
    </section>
  );
}
