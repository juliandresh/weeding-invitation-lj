import { NextResponse } from "next/server";
import { recalcularInvitacion } from "@/lib/admin/recalcular-invitacion";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const nombre = String(body.nombre || "").trim();

  if (!nombre) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }

  const asistira =
    body.asistira === "si" ? true : body.asistira === "no" ? false : null;

  const supabase = await createClient();
  const { data: persona, error } = await supabase
    .from("personas")
    .update({
      nombre,
      apellido: String(body.apellido || "").trim(),
      genero: body.genero || null,
      rol: body.rol === "principal" ? "principal" : "acompanante",
      asistira,
    })
    .eq("id", id)
    .select("invitacion_id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await recalcularInvitacion(persona.invitacion_id);

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const invitacionId = searchParams.get("invitacion_id") || "";

  const supabase = await createClient();
  const { error } = await supabase.from("personas").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (invitacionId) {
    await recalcularInvitacion(invitacionId);
  }

  return NextResponse.json({ ok: true });
}
