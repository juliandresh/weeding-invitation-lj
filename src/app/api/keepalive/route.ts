import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Mantiene despierto el proyecto de Supabase. El plan gratuito suspende los
 * proyectos que pasan varios días sin recibir peticiones, y un proyecto
 * pausado haría que TODAS las invitaciones dejaran de cargar. Un cron de
 * Vercel llama a esta ruta a diario (ver vercel.json) para que eso no ocurra
 * entre hoy y el día de la boda.
 *
 * Hace la consulta más barata posible: cuenta filas sin traer ninguna.
 */
export async function GET(request: Request) {
  // Vercel envía este encabezado automáticamente cuando CRON_SECRET está
  // definido en el entorno. Si no lo está, la ruta queda abierta: no expone
  // datos, pero conviene configurarlo.
  const secreto = process.env.CRON_SECRET;
  if (secreto) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secreto}`) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Faltan variables de entorno de Supabase" },
      { status: 500 }
    );
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { count, error } = await supabase
    .from("invitaciones")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, invitaciones: count });
}
