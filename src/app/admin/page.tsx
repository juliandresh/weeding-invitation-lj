import { AdminNav } from "@/components/admin/admin-nav";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function Tarjeta({ etiqueta, valor }: { etiqueta: string; valor: number | string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border border-gold/30 bg-ivory px-6 py-8 text-center">
      <span className="text-4xl text-ink">{valor}</span>
      <span className="text-xs uppercase tracking-[0.15em] text-ink-soft">
        {etiqueta}
      </span>
    </div>
  );
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: invitaciones } = await supabase
    .from("invitaciones")
    .select("cupos, confirmado, cupos_confirmados");

  const filas = invitaciones ?? [];
  const totalInvitaciones = filas.length;
  const totalCupos = filas.reduce((s, i) => s + (i.cupos ?? 0), 0);
  const confirmadas = filas.filter((i) => i.confirmado === true);
  const declinadas = filas.filter((i) => i.confirmado === false);
  const pendientes = filas.filter((i) => i.confirmado === null);
  const cuposConfirmados = confirmadas.reduce(
    (s, i) => s + (i.cupos_confirmados ?? 0),
    0
  );

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-6 text-2xl text-ink">Resumen</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Tarjeta etiqueta="Invitaciones" valor={totalInvitaciones} />
          <Tarjeta etiqueta="Cupos totales" valor={totalCupos} />
          <Tarjeta etiqueta="Personas confirmadas" valor={cuposConfirmados} />
          <Tarjeta etiqueta="Invitaciones confirmadas" valor={confirmadas.length} />
          <Tarjeta etiqueta="Pendientes" valor={pendientes.length} />
          <Tarjeta etiqueta="No asistirán" valor={declinadas.length} />
        </div>
      </main>
    </>
  );
}
