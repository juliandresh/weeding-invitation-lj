"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

const COLORES = [
  "var(--color-gold)",
  "var(--color-gold-soft)",
  "var(--color-sky)",
  "var(--color-sky-soft)",
];

type Particula = {
  id: number;
  xVw: number;
  rotate: number;
  delay: number;
  duracion: number;
  color: string;
  size: number;
};

function generarParticulas(cantidad: number): Particula[] {
  return Array.from({ length: cantidad }, (_, id) => ({
    id,
    xVw: (Math.random() - 0.5) * 70,
    rotate: Math.random() * 360,
    delay: Math.random() * 0.3,
    duracion: 2 + Math.random() * 0.8,
    color: COLORES[id % COLORES.length],
    size: 6 + Math.random() * 6,
  }));
}

/**
 * Efecto festivo breve y puntual (confeti/pétalos cayendo), pensado para un
 * momento único como confirmar la asistencia en el RSVP — no es una
 * animación continua. Se dispara cada vez que `activo` pasa de `false` a
 * `true`; el llamador debe volver a ponerlo en `false` antes de reactivarlo
 * para poder repetir el efecto.
 *
 * Uso previsto (aún no conectado, a la espera de la sección RSVP):
 *   const [celebrar, setCelebrar] = useState(false);
 *   // al confirmar con éxito: setCelebrar(true)
 *   <Confetti activo={celebrar} />
 */
export function Confetti({ activo }: { activo: boolean }) {
  const particulas = useMemo(
    () => (activo ? generarParticulas(28) : []),
    [activo],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      <AnimatePresence>
        {activo &&
          particulas.map((p) => (
            <motion.span
              key={p.id}
              className="absolute top-[-5%] left-1/2 rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              initial={{ x: "-50%", y: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: `calc(-50% + ${p.xVw}vw)`,
                y: "110vh",
                opacity: [1, 1, 0],
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duracion,
                delay: p.delay,
                ease: "easeIn",
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
