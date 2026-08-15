"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Monograma de los novios — imagen generada con IA (guirnalda floral con
 * las iniciales "L & J" entrelazadas), fondo blanco original removido por
 * des-mezclado de color para evitar halos.
 * Asset en bruto: assets-originales/monograma.png
 * Copia optimizada: public/images/monograma.png
 */
export function Monograma() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Image
        src="/images/monograma.png"
        alt="Monograma L & J"
        width={541}
        height={600}
        priority
        className="h-32 w-auto drop-shadow-[0_6px_14px_rgba(46,40,35,0.25)] sm:h-40"
      />
    </motion.div>
  );
}
