"use client";

import { motion } from "framer-motion";
import { Monograma } from "@/components/portada/monograma";

export type PersonaInvitado = {
  id: string;
  nombre: string;
  apellido: string;
  genero: "M" | "F" | null;
  rol: "principal" | "acompanante";
  /** null = aún no respondió; true/false = esa persona asistirá o no. */
  asistira: boolean | null;
};

export type InvitadoInfo = {
  cupos: number;
  /** Texto que reemplaza el mensaje genérico de bienvenida en la Portada
   * cuando tiene contenido (ver CLAUDE.md §5, columna `mensaje_personalizado`). */
  mensajePersonalizado: string | null;
  personas: PersonaInvitado[];
};

function nombreCompleto(p: PersonaInvitado) {
  return `${p.nombre} ${p.apellido}`.trim();
}

function conTitulo(p: PersonaInvitado) {
  const nombre = nombreCompleto(p);
  if (p.genero === "M") return `Sr. ${nombre}`;
  if (p.genero === "F") return `Sra. ${nombre}`;
  return nombre;
}

export function TarjetaInvitado({ invitado }: { invitado: InvitadoInfo }) {
  const etiquetaCupos = invitado.cupos === 1 ? "cupo" : "cupos";
  const principales = invitado.personas.filter((p) => p.rol === "principal");
  const acompanantes = invitado.personas.filter((p) => p.rol === "acompanante");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center gap-4 text-center"
    >
      <Monograma />
      <h2 className="text-3xl text-ink sm:text-4xl">
        {principales.map(conTitulo).join(" & ")}
      </h2>
      <p className="font-serif text-sm uppercase tracking-[0.2em] text-ink-soft">
        {invitado.cupos} {etiquetaCupos}
      </p>
      {acompanantes.length > 0 && (
        <p className="max-w-xs text-sm text-ink-soft">
          Junto a {acompanantes.map(nombreCompleto).join(", ")}
        </p>
      )}
    </motion.div>
  );
}
