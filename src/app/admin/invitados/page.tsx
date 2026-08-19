import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { TablaInvitados } from "@/components/admin/tabla-invitados";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function InvitadosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("invitaciones")
    .select(
      "id, token_unico, mesa, cupos, confirmado, cupos_confirmados, personas(nombre, apellido, rol)"
    )
    .order("creado_en", { ascending: true });

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl text-ink">Invitados</h1>
          <div className="flex gap-4">
            <a
              href="/admin/export"
              className="rounded-full border border-gold/40 px-5 py-2 text-xs uppercase tracking-[0.1em] text-ink-soft transition hover:bg-ivory-soft"
            >
              Exportar CSV
            </a>
            <Link
              href="/admin/invitados/nuevo"
              className="rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.1em] text-ivory transition hover:opacity-90"
            >
              + Nueva invitación
            </Link>
          </div>
        </div>

        <TablaInvitados filas={data ?? []} />
      </main>
    </>
  );
}
