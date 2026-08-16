"use client";

import { motion } from "framer-motion";
import { FECHA_BODA } from "@/lib/site-config";
import { VideoCierre } from "./video-cierre";

export function Footer() {
  const fecha = FECHA_BODA.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-t border-gold/20 bg-ink px-6 py-14 text-center"
    >
      <VideoCierre />

      <p className="font-script text-4xl text-gold">Liliana &amp; Julián</p>
      <p className="mt-2 text-xs tracking-[0.3em] text-ivory-soft/70 uppercase">
        {fecha}
      </p>
      <p className="mx-auto mt-5 max-w-sm text-sm text-ivory-soft/60">
        Con todo nuestro cariño, gracias por celebrar este día junto a
        nosotros.
      </p>
    </motion.footer>
  );
}
