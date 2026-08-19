import { notFound } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { BotonCopiar } from "@/components/admin/boton-copiar";
import { PanelInvitacion } from "@/components/admin/panel-invitacion";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditarInvitacionPage(
  props: PageProps<"/admin/invitados/[id]">
) {
  const { id } = await props.params;

  const supabase = await createClient();
  const { data: invitacion } = await supabase
    .from("invitaciones")
    .select("*, personas(*)")
    .eq("id", id)
    .single();

  if (!invitacion) {
    notFound();
  }

  return (
    <>
      <AdminNav />
      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-ink">Editar invitación</h1>
          <BotonCopiar token={invitacion.token_unico} />
        </div>

        <PanelInvitacion invitacion={invitacion} />
      </main>
    </>
  );
}
