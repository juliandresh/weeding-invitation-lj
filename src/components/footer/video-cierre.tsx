"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Corazon = {
  xPx: number;
  delay: number;
  duracion: number;
  size: number;
  color: string;
};

const CORAZONES: Corazon[] = [
  { xPx: -34, delay: 0, duracion: 4.6, size: 15, color: "var(--color-gold)" },
  { xPx: 18, delay: 0.9, duracion: 5.3, size: 11, color: "var(--color-ivory-soft)" },
  { xPx: -10, delay: 1.8, duracion: 4.9, size: 13, color: "var(--color-gold-soft)" },
  { xPx: 32, delay: 2.6, duracion: 5.6, size: 10, color: "var(--color-ivory-soft)" },
  { xPx: -24, delay: 3.4, duracion: 5.1, size: 12, color: "var(--color-gold)" },
];

function IconoCorazon({ size, color }: { size: number; color: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
      <path d="M12 21s-7.5-4.6-10.2-9.3C-0.4 7.9 1.8 4 5.7 4c2 0 3.5 1 4.3 2.4C10.8 5 12.3 4 14.3 4c3.9 0 6.1 3.9 3.9 7.7C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}

// Los corazones solo se animan mientras el video está en pantalla, para no
// gastar ciclos de animación cuando el invitado ya pasó esta sección.
export function VideoCierre() {
  const ref = useRef<HTMLDivElement>(null);
  const enVista = useInView(ref, { amount: 0.4 });

  return (
    <div
      ref={ref}
      className="relative mx-auto mb-10 aspect-[9/16] w-40 overflow-hidden rounded-2xl border border-gold/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] sm:w-48"
    >
      <video
        src="/video/torre-paris.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />

      {enVista &&
        CORAZONES.map((c, i) => (
          <div
            key={i}
            className="pointer-events-none absolute bottom-6"
            style={{ left: `calc(50% + ${c.xPx}px)`, transform: "translateX(-50%)" }}
          >
            <motion.div
              initial={{ y: 0, opacity: 0, scale: 0.6 }}
              animate={{ y: -190, opacity: [0, 1, 1, 0], scale: 1 }}
              transition={{
                duration: c.duracion,
                delay: c.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <IconoCorazon size={c.size} color={c.color} />
            </motion.div>
          </div>
        ))}
    </div>
  );
}
