import { createClient } from "@/lib/supabase/server";

/**
 * Recalcula `cupos`, `cupos_confirmados` y `confirmado` de una invitación a
 * partir de `personas.asistira` — estos campos son derivados, no se editan
 * directamente (ver CLAUDE.md §5). Se llama después de cualquier cambio en
 * las personas de una invitación (agregar, editar, eliminar) desde el panel
 * admin.
 */
export async function recalcularInvitacion(invitacionId: string) {
  const supabase = await createClient();
  const { data: personas } = await supabase
    .from("personas")
    .select("asistira")
    .eq("invitacion_id", invitacionId);

  const filas = personas ?? [];
  const alguienRespondio = filas.some((p) => p.asistira !== null);
  const algunoAsiste = filas.some((p) => p.asistira === true);

  await supabase
    .from("invitaciones")
    .update({
      cupos: filas.length,
      cupos_confirmados: filas.filter((p) => p.asistira === true).length,
      confirmado: alguienRespondio ? algunoAsiste : null,
    })
    .eq("id", invitacionId);
}
