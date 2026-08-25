import { createClient } from "@/lib/supabase/server";

function csvEscape(valor: unknown) {
  const texto = valor === null || valor === undefined ? "" : String(valor);
  if (/[",\n]/.test(texto)) {
    return `"${texto.replace(/"/g, '""')}"`;
  }
  return texto;
}

export async function GET() {
  const supabase = await createClient();
  const { data: invitaciones } = await supabase
    .from("invitaciones")
    .select("*, personas(*)")
    .order("creado_en", { ascending: true });

  const encabezado = [
    "invitacion_id",
    "token_unico",
    "telefono",
    "mesa",
    "cupos",
    "confirmado",
    "cupos_confirmados",
    "notas",
    "persona_nombre",
    "persona_apellido",
    "persona_genero",
    "persona_rol",
    "persona_asistira",
  ];

  const filas: string[] = [encabezado.join(",")];

  for (const inv of invitaciones ?? []) {
    const personas = inv.personas.length ? inv.personas : [{}];
    for (const p of personas) {
      filas.push(
        [
          inv.id,
          inv.token_unico,
          inv.telefono,
          inv.mesa,
          inv.cupos,
          inv.confirmado,
          inv.cupos_confirmados,
          inv.notas,
          p.nombre,
          p.apellido,
          p.genero,
          p.rol,
          p.asistira,
        ]
          .map(csvEscape)
          .join(",")
      );
    }
  }

  const csv = filas.join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="invitados.csv"',
    },
  });
}
