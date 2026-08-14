"use client";

import { motion } from "framer-motion";
import { Divider } from "@/components/ui/divider";

// Texto placeholder — reemplazar con la historia real de la pareja.
const PARRAFOS = [
  "La vida tiene una forma curiosa de unir los caminos correctos en el momento justo. Así fue como Liliana y Julián se encontraron, casi sin buscarlo, y descubrieron que lo que comenzó como una casualidad se convirtió en la certeza de querer construir un futuro juntos.",
  "Hoy, después de reír, aprender y crecer el uno al lado del otro, damos el paso más importante de nuestras vidas, y no podríamos imaginar un mejor momento para hacerlo que rodeados de las personas que más queremos.",
];

export function Historia() {
  return (
    <section className="relative bg-ivory-soft px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Nuestra historia
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          Cómo empezó todo
        </h2>
        <Divider />
        <div className="flex flex-col gap-4">
          {PARRAFOS.map((texto) => (
            <p key={texto} className="text-lg leading-relaxed text-ink-soft">
              {texto}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
