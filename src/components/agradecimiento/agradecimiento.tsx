"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";

// Texto final acordado con los novios el 2026-08-19. 
const MENSAJE =
  "Antes de comenzar esta nueva etapa, queremos detenernos a agradecer a quienes nos dieron la vida y nos enseñaron a amar. A nuestros padres — María Otilia, Rosa Inés y Arnulfo — gracias por cada sacrificio silencioso, por las palabras justas en el momento preciso, y por creer en nosotros incluso cuando dudábamos. Y a Libardo, el padre de Liliana, que nos acompaña hoy desde otro lugar: aquella “Chiquis” a la que tanto amaste por fin se casa, y lleva tu amor en cada paso que da. Todo lo que somos hoy y todo el amor que hoy compartimos, nace de lo que ustedes sembraron primero. Este día es también suyo.";

export function Agradecimiento() {
  return (
    <section className="relative bg-ivory px-6 py-20 sm:py-28">
      <Reveal
        amount={0.4}
        className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Con gratitud
        </p>
        <div className="relative">
          <h2 className="font-script text-5xl text-ink sm:text-6xl">
            A nuestros padres
          </h2>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 -right-14 h-12 w-12 sm:top-1 sm:-right-28 sm:h-24 sm:w-24"
            initial={{ opacity: 0, x: 30, y: -6, rotate: 10, scale: 0.6 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 6, 0],
              rotate: [0, 3, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              x: { duration: 0.6, delay: 0.5 },
              scale: { duration: 0.6, delay: 0.5, ease: "easeOut" },
              y: {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              },
              rotate: {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              },
            }}
          >
            <Image
              src="/images/tortuga-duotono.png"
              alt=""
              width={1000}
              height={1000}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
        <Divider />
        <p className="text-lg leading-relaxed text-ink-soft">{MENSAJE}</p>
      </Reveal>
    </section>
  );
}
