"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Sello de lacre — imagen generada con IA (anillos de matrimonio
 * entrelazados, grabados en cera dorada/bronce), recortada en círculo
 * para integrarse sobre el sobre sin mostrar el fondo original.
 * Asset en bruto: assets-originales/Sello_lacre_con_dos_anillos.png
 * Copia optimizada: public/images/sello-lacre.png
 */
export function SelloLacre({ cracked = false }: { cracked?: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[52%] z-20 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, rotate: -20, opacity: 0 }}
      animate={
        cracked
          ? { scale: 0.85, rotate: 10, opacity: 0, y: -8 }
          : { scale: [1, 1.04, 1], rotate: 0, opacity: 1 }
      }
      transition={
        cracked
          ? { duration: 0.35, ease: "easeIn" }
          : {
              scale: {
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.9,
              },
              rotate: { type: "spring", stiffness: 260, damping: 14, delay: 0.5 },
              opacity: { duration: 0.4, delay: 0.5 },
            }
      }
    >
      <Image
        src="/images/sello-lacre.png"
        alt=""
        width={480}
        height={480}
        className="h-16 w-16 shadow-[0_4px_10px_-3px_rgba(46,40,35,0.5)] sm:h-[68px] sm:w-[68px]"
        style={{ clipPath: "circle(47% at 50% 50%)" }}
      />
    </motion.div>
  );
}
