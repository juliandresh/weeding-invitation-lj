import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con la service_role key — acceso completo, sin RLS.
 *
 * SOLO para uso en el servidor (Route Handlers, Server Actions del panel
 * admin ya autenticado). NUNCA importar este módulo desde un Client
 * Component ni exponer `SUPABASE_SERVICE_ROLE_KEY` al navegador.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
