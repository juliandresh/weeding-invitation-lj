"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Nota: el CRUD de invitados/personas NO usa Server Actions — se detectó
// que en esta versión de Next.js, las Server Actions invocadas vía
// `<form action={fn}>` pierden la cookie de sesión de Supabase después de
// ejecutarse (confirmado con pruebas: el mismo código funciona sin
// problema desde un Route Handler). Login/logout sí funcionan bien como
// Server Action (ambos llaman a un método `.auth.*` directamente). El
// resto vive en Route Handlers bajo /admin/api/, llamados vía fetch desde
// componentes cliente — ver src/components/admin/panel-invitacion.tsx.

export async function iniciarSesion(
  _prevState: { error?: string } | undefined,
  formData: FormData
) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Correo o contraseña incorrectos." };
  }

  redirect("/admin");
}

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
