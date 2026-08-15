"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";

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
  const scrollerRef = useRef<HTMLDivElement>(null);
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

  const desplazar = useCallback((direccion: "izquierda" | "derecha") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = el.clientWidth * 0.8 * (direccion === "izquierda" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

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
      <Reveal
        amount={0.2}
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Momentos
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">Galería</h2>
        <Divider />
        <p className="text-xs text-ink-soft">
          Desliza o usa las flechas para ver más fotos
        </p>

        <div className="relative mt-2 w-full">
          <button
            type="button"
            onClick={() => desplazar("izquierda")}
            aria-label="Ver fotos anteriores"
            className="absolute top-1/2 left-0 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-ivory/90 text-gold shadow-sm transition hover:bg-ivory sm:flex"
          >
            <IconoFlecha direccion="izquierda" />
          </button>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FOTOS.map((foto, i) => (
              <button
                key={foto.src}
                type="button"
                onClick={() => setActiva(i)}
                className="relative aspect-[3/4] w-56 shrink-0 snap-center overflow-hidden rounded-md sm:w-64"
                aria-label={`Ver ${foto.alt} en grande`}
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(max-width: 640px) 60vw, 256px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => desplazar("derecha")}
            aria-label="Ver fotos siguientes"
            className="absolute top-1/2 right-0 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-ivory/90 text-gold shadow-sm transition hover:bg-ivory sm:flex"
          >
            <IconoFlecha direccion="derecha" />
          </button>
        </div>
      </Reveal>

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
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/40 bg-ink/60 text-ivory backdrop-blur-sm transition hover:bg-ink/80"
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
              className="absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 bg-ink/60 text-ivory backdrop-blur-sm transition hover:bg-ink/80 sm:left-6"
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
              className="absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 bg-ink/60 text-ivory backdrop-blur-sm transition hover:bg-ink/80 sm:right-6"
            >
              <IconoFlecha direccion="derecha" />
            </button>

            <motion.div
              key={activa}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 h-full max-h-[80vh] w-full max-w-3xl"
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
