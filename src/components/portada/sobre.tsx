"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SelloLacre } from "./sello-lacre";

export function Sobre({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);

  function handleClick() {
    if (isOpening) return;
    setIsOpening(true);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(18);
    }
    onOpen();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={isOpening}
        aria-label="Abrir invitación"
        className="group relative block h-[170px] w-[240px] outline-none sm:h-[190px] sm:w-[270px]"
        style={{
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
        animate={isOpening ? { y: 0 } : { y: [0, -6, 0] }}
        transition={
          isOpening
            ? { duration: 0.3 }
            : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* resplandor detrás del sobre, invita a tocarlo */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,var(--color-gold-soft)_0%,transparent_70%)] blur-2xl"
          animate={
            isOpening
              ? { opacity: 0 }
              : { opacity: [0.35, 0.65, 0.35], scale: [0.9, 1.05, 0.9] }
          }
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* cuerpo del sobre */}
        <motion.div
          className="absolute inset-0 rounded-sm border border-gold/50 bg-gradient-to-b from-ivory-soft to-sky-soft shadow-[0_10px_30px_-12px_rgba(46,40,35,0.35)]"
          animate={
            isOpening ? { y: -14, opacity: 0 } : { y: 0, opacity: 1 }
          }
          transition={{
            delay: isOpening ? 0.4 : 0,
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-2 border border-gold/25" />
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

        {/* anillos que laten desde el sello, invitando a tocar */}
        {!isOpening &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute top-[52%] left-1/2 z-[15] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60"
              animate={{ scale: [1, 2.1], opacity: [0.55, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.2,
              }}
            />
          ))}

        <SelloLacre cracked={isOpening} />
      </motion.button>

      <motion.p
        className="font-serif text-sm uppercase tracking-[0.25em] text-ink-soft"
        animate={
          isOpening ? { opacity: 0 } : { opacity: [0.6, 1, 0.6] }
        }
        transition={
          isOpening
            ? { duration: 0.3 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        Toca para abrir
      </motion.p>
    </div>
  );
}
