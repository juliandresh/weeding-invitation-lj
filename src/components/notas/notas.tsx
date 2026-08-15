"use client";

import { motion } from "framer-motion";
import { Divider } from "@/components/ui/divider";

function IconoCopa() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <path d="M5 4h14l-6.2 8v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 18h6" strokeLinecap="round" />
      <path d="M6 4c0 4 2.5 6.5 6 6.5S18 8 18 4" strokeLinecap="round" />
    </svg>
  );
}

export function Notas() {
  return (
    <section className="relative bg-ivory px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center"
      >
        <div className="text-gold">
          <IconoCopa />
        </div>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">Notas</h2>
        <Divider />
        <p className="text-lg text-ink-soft">
          Con cariño, hemos pensado esta celebración para adultos, para que
          puedan disfrutar con total tranquilidad. Los invitamos a elegir con
          anticipación a su conductor designado.
        </p>
      </motion.div>
    </section>
  );
}
