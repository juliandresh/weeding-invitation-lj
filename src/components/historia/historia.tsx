"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Divider } from "@/components/ui/divider";
import { PetalosCayendo } from "@/components/ui/petalos-cayendo";
import { Reveal } from "@/components/ui/reveal";

// Texto placeholder — reemplazar con la historia real de la pareja.
const PARRAFOS = [
  "La vida tiene una forma curiosa de unir los caminos correctos en el momento justo. Así fue como Liliana y Julián se encontraron, casi sin buscarlo, y descubrieron que lo que comenzó como una casualidad se convirtió en la certeza de querer construir un futuro juntos.",
  "Hoy, después de reír, aprender y crecer el uno al lado del otro, damos el paso más importante de nuestras vidas, y no podríamos imaginar un mejor momento para hacerlo que rodeados de las personas que más queremos.",
];

export function Historia() {
  return (
    <section className="relative bg-ivory-soft px-6 py-20 sm:py-28">
      <PetalosCayendo />
      <Reveal
        amount={0.4}
        className="relative mx-auto flex max-w-xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Nuestra historia
        </p>
        <div className="relative">
          <h2 className="font-script text-5xl text-ink sm:text-6xl">
            Cómo empezó todo
          </h2>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-1 -right-16 h-11 w-16 sm:top-2 sm:-right-32 sm:h-20 sm:w-28"
            initial={{ opacity: 0, x: 30, y: -6, rotate: 8, scale: 0.6 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 5, 0],
              rotate: [0, 2, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              x: { duration: 0.6, delay: 0.5 },
              scale: { duration: 0.6, delay: 0.5, ease: "easeOut" },
              y: {
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              },
              rotate: {
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              },
            }}
          >
            <Image
              src="/images/guacamayas-duotono.png"
              alt=""
              width={700}
              height={560}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          {PARRAFOS.map((texto) => (
            <p key={texto} className="text-lg leading-relaxed text-ink-soft">
              {texto}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
