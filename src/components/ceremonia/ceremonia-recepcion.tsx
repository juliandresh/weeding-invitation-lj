"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Divider } from "@/components/ui/divider";
import { PetalosCayendo } from "@/components/ui/petalos-cayendo";
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

const itemVariants: Variants = {
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
      <motion.path
        d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      <motion.circle
        cx="12"
        cy="9"
        r="2.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.9 }}
      />
    </svg>
  );
}

export function CeremoniaRecepcion() {
  return (
    <section className="relative bg-gradient-to-b from-ivory via-sky-soft/50 to-ivory px-6 py-20 sm:py-28">
      <PetalosCayendo />
      <Reveal
        amount={0.3}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Nos vemos en
        </p>
        <div className="relative flex flex-col items-center">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none mb-1 h-24 w-24 sm:absolute sm:-top-2 sm:-left-40 sm:mb-0 sm:h-[166px] sm:w-[166px]"
            initial={{ opacity: 0, x: -30, y: -6, rotate: -10, scale: 0.6 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 6, 0],
              rotate: [0, -3, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              x: { duration: 0.6, delay: 0.5 },
              scale: { duration: 0.6, delay: 0.5, ease: "easeOut" },
              y: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
              rotate: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
            }}
          >
            <Image
              src="/images/bouquet-duotono.png"
              alt=""
              width={600}
              height={600}
              className="h-full w-full object-contain"
            />
          </motion.div>
          <h2 className="font-script text-5xl text-ink sm:text-6xl">
            Hacienda La Victoria
          </h2>
        </div>
        <p className="text-ink-soft">{DIRECCION}</p>
        <Divider />

        {/* Ceremonia y recepción van en una sola tarjeta con un único botón:
            ambas ocurren en la misma hacienda y los dos mapas apuntaban al
            mismo sitio, así que separarlas ocupaba el doble sin aportar nada. */}
        <motion.div
          variants={listaVariants}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-4 flex w-full max-w-md flex-col items-center gap-6 rounded-lg border border-gold/30 bg-ivory px-6 py-8"
        >
          {LUGARES.map((lugar, i) => (
            <motion.div
              key={lugar.etiqueta}
              variants={itemVariants}
              className={`flex w-full flex-col items-center gap-1.5 ${
                i > 0 ? "border-t border-gold/20 pt-6" : ""
              }`}
            >
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-gold">
                {lugar.etiqueta}
              </p>
              <h3 className="text-2xl text-ink">{lugar.nombre}</h3>
              {lugar.nota && (
                <p className="text-sm text-ink-soft italic">{lugar.nota}</p>
              )}
            </motion.div>
          ))}

          <motion.a
            variants={itemVariants}
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 rounded-full border border-gold px-5 py-2 text-xs uppercase tracking-[0.15em] text-gold transition hover:bg-gold hover:text-ivory"
          >
            <IconoPin />
            Cómo llegar
          </motion.a>
        </motion.div>
      </Reveal>
    </section>
  );
}
