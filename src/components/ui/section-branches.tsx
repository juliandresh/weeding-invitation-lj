"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Ramas decorativas que enmarcan la transición entre secciones, entrando
// desde los bordes izquierdo y derecho al hacer scroll. Reutilizan la misma
// imagen (una reflejada por CSS), así que el navegador solo la descarga una
// vez sin importar cuántas veces se use en la página.
export function SectionBranches() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative mx-auto h-36 w-full max-w-5xl overflow-x-hidden sm:h-48"
    >
      <motion.div
        className="absolute top-1/2 -left-8 w-32 -translate-y-1/2 opacity-80 sm:-left-4 sm:w-44"
        initial={{ x: "-70%", opacity: 0 }}
        animate={enVista ? { x: "0%", opacity: 0.8 } : {}}
        transition={{ duration: 1, ease: EASE }}
      >
        <Image
          src="/images/rama-flor.png"
          alt=""
          width={900}
          height={900}
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 -right-8 w-32 -translate-y-1/2 scale-x-[-1] opacity-80 sm:-right-4 sm:w-44"
        initial={{ x: "70%", opacity: 0 }}
        animate={enVista ? { x: "0%", opacity: 0.8 } : {}}
        transition={{ duration: 1, delay: 0.12, ease: EASE }}
      >
        <Image
          src="/images/rama-flor.png"
          alt=""
          width={900}
          height={900}
          className="h-auto w-full"
        />
      </motion.div>
    </div>
  );
}
