"use client";

import { motion, type Variants } from "framer-motion";
import { CorazonesCayendo } from "@/components/ui/corazones-cayendo";
import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";

// Horario preliminar — no 100% confirmado, sirve como base para construir
// la sección hasta tener el itinerario definitivo.
const ITINERARIO = [
  { hora: "3:00 PM", evento: "Llegada de invitados" },
  { hora: "3:45 PM", evento: "Ceremonia" },
  { hora: "5:00 PM", evento: "Cóctel de bienvenida" },
  { hora: "6:30 PM", evento: "Entrada de invitados al salón" },
  { hora: "7:00 PM", evento: "Cena" },
  { hora: "8:00 PM", evento: "Brindis" },
  { hora: "9:00 PM", evento: "Fiesta" },
];

const listaVariants: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  oculto: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Itinerario() {
  return (
    <section className="relative bg-ivory px-6 py-20 sm:py-28">
      <CorazonesCayendo />
      <Reveal
        amount={0.3}
        className="relative mx-auto flex max-w-md flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          El gran día
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          Itinerario
        </h2>
        <Divider />

        <motion.div
          variants={listaVariants}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-4 flex w-full flex-col gap-7 border-l border-gold/30 pl-6 text-left sm:pl-10"
        >
          {ITINERARIO.map((item) => (
            <motion.div key={item.evento} variants={itemVariants} className="relative">
              <span className="absolute top-1.5 -left-[27px] h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-ivory sm:-left-[43px]" />
              <p className="font-serif text-xs uppercase tracking-[0.2em] text-gold">
                {item.hora}
              </p>
              <p className="text-lg text-ink">{item.evento}</p>
            </motion.div>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}
