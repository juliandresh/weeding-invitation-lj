"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Envoltorio compartido para la animación de aparición al hacer scroll,
 * usado por (casi) todas las secciones del sitio. Centralizarlo permite
 * ajustar el "efecto mágico" de las transiciones en un solo lugar, y más
 * adelante reutilizarlo para bloques de imágenes/video.
 */
export function Reveal({
  children,
  className,
  amount = 0.3,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
