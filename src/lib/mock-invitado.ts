import type { InvitadoInfo } from "@/components/invitado/tarjeta-invitado";

/**
 * Invitado de ejemplo usado en "/demo" — sirve como vista previa para los
 * novios. Los invitados reales acceden por su link personal
 * /inv/{token_unico}, que consulta Supabase.
 */
// Token inexistente a propósito: en la demo el RSVP se ve y se puede probar,
// pero al enviarlo la API respondería "Invitación no encontrada" (no hay
// fila real en Supabase detrás de este token).
export const TOKEN_DEMO = "00000000-0000-0000-0000-000000000000";

export const INVITADO_EJEMPLO: InvitadoInfo = {
  cupos: 2,
  mensajePersonalizado: null,
  personas: [
    {
      id: "demo-1",
      nombre: "Liseth",
      apellido: "López",
      genero: "F",
      rol: "principal",
      asistira: null,
    },
    {
      id: "demo-2",
      nombre: "Carlos",
      apellido: "Ramírez",
      genero: "M",
      rol: "acompanante",
      asistira: null,
    },
  ],
};
