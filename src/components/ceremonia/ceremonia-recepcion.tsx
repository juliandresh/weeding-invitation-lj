"use client";

import { motion, type Variants } from "framer-motion";
import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";

const DIRECCION = "Vía Subachoque, Subachoque, Cundinamarca";
const MAPS_LINK = "https://maps.app.goo.gl/igCDDELryFnQtBwt9";

const LUGARES = [
  {
    etiqueta: "Ceremonia",
    nombre: "Capilla Religiosa Hacienda la Victoria",
    nota: "Ceremonia religiosa",
  },
  {
    etiqueta: "Recepción",
    nombre: "Salón Victoria",
    nota: null,
  },
];

const listaVariants: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  oculto: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function IconoPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      <path
        d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.3" />
    </svg>
  );
}

export function CeremoniaRecepcion() {
  return (
    <section className="relative bg-gradient-to-b from-ivory via-sky-soft/50 to-ivory px-6 py-20 sm:py-28">
      <Reveal
        amount={0.3}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Nos vemos en
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          Hacienda La Victoria
        </h2>
        <p className="text-ink-soft">{DIRECCION}</p>
        <Divider />

        <motion.div
          variants={listaVariants}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-4 grid w-full gap-6 sm:grid-cols-2"
        >
          {LUGARES.map((lugar) => (
            <motion.div
              key={lugar.etiqueta}
              variants={cardVariants}
              className="flex flex-col items-center gap-2 rounded-lg border border-gold/30 bg-ivory px-6 py-8"
            >
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-gold">
                {lugar.etiqueta}
              </p>
              <h3 className="text-2xl text-ink">{lugar.nombre}</h3>
              {lugar.nota && (
                <p className="text-sm text-ink-soft italic">{lugar.nota}</p>
              )}
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2 text-xs uppercase tracking-[0.15em] text-gold transition hover:bg-gold hover:text-ivory"
              >
                <IconoPin />
                Cómo llegar
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}
