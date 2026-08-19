"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Divider } from "@/components/ui/divider";
import { PetalosCayendo } from "@/components/ui/petalos-cayendo";
import { Reveal } from "@/components/ui/reveal";
import { FECHA_BODA } from "@/lib/site-config";

type TiempoRestante = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

function calcularTiempoRestante(): TiempoRestante {
  const diff = Math.max(0, FECHA_BODA.getTime() - Date.now());
  const segundosTotales = Math.floor(diff / 1000);
  return {
    dias: Math.floor(segundosTotales / 86400),
    horas: Math.floor((segundosTotales % 86400) / 3600),
    minutos: Math.floor((segundosTotales % 3600) / 60),
    segundos: segundosTotales % 60,
  };
}

const UNIDADES: { key: keyof TiempoRestante; label: string }[] = [
  { key: "dias", label: "Días" },
  { key: "horas", label: "Horas" },
  { key: "minutos", label: "Minutos" },
  { key: "segundos", label: "Segundos" },
];

// Cada dígito se anima con un pequeño deslizamiento vertical al cambiar de
// valor, tipo "odómetro", en vez de reemplazarse de golpe.
function DigitoAnimado({ valor }: { valor: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={valor}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {valor}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown() {
  // Se calcula null durante el render del servidor y se llena en el
  // cliente para evitar un mismatch de hidratación con Date.now().
  const [tiempo, setTiempo] = useState<TiempoRestante | null>(null);

  useEffect(() => {
    const tick = () => setTiempo(calcularTiempoRestante());
    const primerTick = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(primerTick);
      clearInterval(id);
    };
  }, []);

  const fechaFormateada = FECHA_BODA.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative bg-gradient-to-b from-ivory via-sky-soft/50 to-ivory px-6 py-20 sm:py-28">
      <PetalosCayendo />
      <Reveal
        amount={0.4}
        className="relative mx-auto flex max-w-xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Falta muy poco
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          Nos casamos el {fechaFormateada}
        </h2>
        <Divider />

        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          {UNIDADES.map(({ key, label }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-1 rounded-lg border border-gold/30 bg-ivory px-2 py-4 sm:px-4 sm:py-6"
            >
              <span className="flex text-3xl tabular-nums text-ink sm:text-4xl">
                {(tiempo ? String(tiempo[key]).padStart(2, "0") : "--")
                  .split("")
                  .map((digito, i) => (
                    <DigitoAnimado key={i} valor={digito} />
                  ))}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-ink-soft sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
