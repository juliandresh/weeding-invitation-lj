import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const nombre = String(body.nombre || "").trim();
  const apellido = String(body.apellido || "").trim();
  const genero = body.genero || null;

  if (!nombre) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: invitacion, error: errorInvitacion } = await supabase
    .from("invitaciones")
    .insert({ cupos: 1 })
    .select("id")
    .single();

  if (errorInvitacion || !invitacion) {
    return NextResponse.json(
      { error: errorInvitacion?.message || "No se pudo crear la invitación." },
      { status: 400 }
    );
  }

  const { error: errorPersona } = await supabase.from("personas").insert({
    invitacion_id: invitacion.id,
    nombre,
    apellido,
    genero,
    rol: "principal",
  });

  if (errorPersona) {
    return NextResponse.json({ error: errorPersona.message }, { status: 400 });
  }

  return NextResponse.json({ id: invitacion.id });
}
