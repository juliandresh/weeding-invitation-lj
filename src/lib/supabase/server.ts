import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente de Supabase para uso en Server Components, Route Handlers y Server
 * Actions. Usa la anon key, limitada por las políticas RLS definidas en
 * Supabase. Lee/escribe la sesión de auth vía cookies.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll fue llamado desde un Server Component sin middleware
            // que refresque la sesión; se puede ignorar si hay middleware
            // manejando la renovación de sesión.
          }
        },
      },
    }
  );
}
