"use client";

import { motion } from "framer-motion";
import { Monograma } from "@/components/portada/monograma";

export type InvitadoInfo = {
  titulo: string;
  nombre: string;
  mesa: number;
  cupos: number;
  /**
   * Nombres de las personas que acompañan al invitado principal.
   * Nota: el modelo de datos actual (CLAUDE.md §5) solo guarda `cupos`
   * como número; para mostrar nombres reales de acompañantes habrá que
   * extender el esquema de Supabase (tabla o columna adicional) cuando
   * se conecte la base de datos real.
   */
  acompanantes: string[];
};

export function TarjetaInvitado({ invitado }: { invitado: InvitadoInfo }) {
  const etiquetaCupos = invitado.cupos === 1 ? "cupo" : "cupos";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center gap-4 text-center"
    >
      <Monograma />
      <h2 className="text-3xl text-ink sm:text-4xl">
        {invitado.titulo} {invitado.nombre}
      </h2>
      <p className="font-serif text-sm uppercase tracking-[0.2em] text-ink-soft">
        Mesa {invitado.mesa} · {invitado.cupos} {etiquetaCupos}
      </p>
      {invitado.acompanantes.length > 0 && (
        <p className="max-w-xs text-sm text-ink-soft">
          Acompañado de {invitado.acompanantes.join(", ")}
        </p>
      )}
    </motion.div>
  );
}
