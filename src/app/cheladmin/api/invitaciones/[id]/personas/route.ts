import { NextResponse } from "next/server";
import { recalcularInvitacion } from "@/lib/admin/recalcular-invitacion";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const nombre = String(body.nombre || "").trim();

  if (!nombre) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("personas").insert({
    invitacion_id: id,
    nombre,
    apellido: String(body.apellido || "").trim(),
    genero: body.genero || null,
    rol: body.rol === "principal" ? "principal" : "acompanante",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await recalcularInvitacion(id);

  return NextResponse.json({ ok: true });
}
