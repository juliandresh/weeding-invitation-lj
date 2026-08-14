import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para uso en componentes del navegador (Client Components).
 * Usa la anon key, limitada por las políticas RLS definidas en Supabase.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
