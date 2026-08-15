"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Divider } from "@/components/ui/divider";

// Fotos temporales (dummy) mientras llega la sesión profesional — ver
// CLAUDE.md §10. Reemplazar los archivos en public/images/galeria/ cuando
// estén listas las definitivas (mismo esquema de nombres o ajustar TOTAL_FOTOS).
const TOTAL_FOTOS = 9;
const FOTOS = Array.from({ length: TOTAL_FOTOS }, (_, i) => ({
  src: `/images/galeria/galeria-${i + 1}.jpg`,
  alt: `Foto ${i + 1} de Liliana y Julián`,
}));

function IconoCerrar() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconoFlecha({ direccion }: { direccion: "izquierda" | "derecha" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d={direccion === "izquierda" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Galeria() {
  const [activa, setActiva] = useState<number | null>(null);

  const cerrar = useCallback(() => setActiva(null), []);
  const anterior = useCallback(
    () => setActiva((i) => (i === null ? null : (i - 1 + FOTOS.length) % FOTOS.length)),
    []
  );
  const siguiente = useCallback(
    () => setActiva((i) => (i === null ? null : (i + 1) % FOTOS.length)),
    []
  );

  useEffect(() => {
    if (activa === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activa, cerrar, anterior, siguiente]);

  return (
    <section className="relative bg-ivory-soft px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Momentos
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">Galería</h2>
        <Divider />

        <div className="mt-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {FOTOS.map((foto, i) => (
            <button
              key={foto.src}
              type="button"
              onClick={() => setActiva(i)}
              className="group relative aspect-square overflow-hidden rounded-md"
              aria-label={`Ver ${foto.alt} en grande`}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {activa !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 px-4 py-10"
            onClick={cerrar}
          >
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/40 text-ivory"
            >
              <IconoCerrar />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                anterior();
              }}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 text-ivory sm:left-6"
            >
              <IconoFlecha direccion="izquierda" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                siguiente();
              }}
              aria-label="Foto siguiente"
              className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 text-ivory sm:right-6"
            >
              <IconoFlecha direccion="derecha" />
            </button>

            <motion.div
              key={activa}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative h-full max-h-[80vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={FOTOS[activa].src}
                alt={FOTOS[activa].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
