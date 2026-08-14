"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function Sobre({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);

  function handleClick() {
    if (isOpening) return;
    setIsOpening(true);
    onOpen();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        type="button"
        onClick={handleClick}
        disabled={isOpening}
        aria-label="Abrir invitación"
        className="group relative block h-[170px] w-[240px] outline-none sm:h-[190px] sm:w-[270px]"
        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
      >
        {/* cuerpo del sobre */}
        <motion.div
          className="absolute inset-0 rounded-sm border border-gold/50 bg-gradient-to-b from-ivory-soft to-sky-soft shadow-[0_10px_30px_-12px_rgba(46,40,35,0.35)]"
          animate={
            isOpening ? { y: -14, opacity: 0 } : { y: 0, opacity: 1, scale: [1, 1.015, 1] }
          }
          transition={
            isOpening
              ? { delay: 0.4, duration: 0.5, ease: "easeInOut" }
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="absolute inset-2 border border-gold/25" />
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-ivory font-script text-lg text-gold shadow-sm">
            L&amp;J
          </div>
        </motion.div>

        {/* solapa: se usan solo transformaciones 2D (translate/scale) +
            opacidad para máxima compatibilidad móvil — combinar clip-path
            con rotateX/perspective falla en varios navegadores de celular */}
        <motion.div
          className="absolute left-0 top-0 z-10 h-[52%] w-full origin-top bg-gradient-to-b from-sky to-sky-soft"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          animate={
            isOpening
              ? { y: -40, opacity: 0, scale: 0.9 }
              : { y: 0, opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </button>

      <motion.p
        className="font-serif text-sm uppercase tracking-[0.25em] text-ink-soft"
        animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Toca para abrir
      </motion.p>
    </div>
  );
}
