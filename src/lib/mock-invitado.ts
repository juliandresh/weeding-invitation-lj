import type { InvitadoInfo } from "@/components/invitado/tarjeta-invitado";

/**
 * Invitado de ejemplo usado en la Portada mientras el proyecto de
 * Supabase y la lista real de invitados no estén listos (CLAUDE.md §10).
 * Cuando existan, esto se reemplaza por una ruta dinámica /inv/[token]
 * que consulte la base de datos por token_unico.
 */
export const INVITADO_EJEMPLO: InvitadoInfo = {
  titulo: "Sra.",
  nombre: "Liseth López",
  mesa: 5,
  cupos: 2,
  acompanantes: ["Carlos Ramírez"],
};
