"use client";

import { motion } from "framer-motion";

/**
 * Insignia circular con el monograma de los novios, doble anillo dorado
 * fino como marco. 100% SVG/CSS original.
 */
export function Monograma() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-ivory-soft to-sky-soft shadow-[0_6px_20px_-8px_rgba(46,40,35,0.35)] sm:h-28 sm:w-28"
    >
      <span className="absolute inset-0 rounded-full border border-gold" />
      <span className="absolute inset-[5px] rounded-full border border-gold/60" />
      <span className="font-script text-3xl text-gold sm:text-4xl">
        L&nbsp;&amp;&nbsp;J
      </span>
    </motion.div>
  );
}
