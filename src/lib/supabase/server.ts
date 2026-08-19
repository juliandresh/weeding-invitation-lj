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
      // El proxy (src/proxy.ts) ya refresca la sesión y reescribe la cookie
      // en cada request. Si este cliente TAMBIÉN intenta auto-refrescar,
      // ambos compiten por usar el mismo refresh token de un solo uso —
      // quien pierde la carrera recibe "already used" y Supabase borra la
      // cookie de sesión por completo. Se desactiva aquí para que este
      // cliente solo lea la sesión ya (re)validada por el proxy.
      auth: {
        autoRefreshToken: false,
      },
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
