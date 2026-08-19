import { notFound } from "next/navigation";
import type { InvitadoInfo } from "@/components/invitado/tarjeta-invitado";
import { PaginaInvitacion } from "@/components/sitio/pagina-invitacion";
import { createClient } from "@/lib/supabase/server";

// Los datos de confirmación pueden cambiar en cualquier momento (RSVP), así
// que esta página nunca se sirve desde caché estática.
export const dynamic = "force-dynamic";

type PersonaRpc = {
  id: string;
  nombre: string;
  apellido: string;
  genero: "M" | "F" | null;
  rol: "principal" | "acompanante";
  asistira: boolean | null;
};

type InvitacionRpc = {
  id: string;
  token_unico: string;
  mesa: number | null;
  cupos: number;
  confirmado: boolean | null;
  cupos_confirmados: number | null;
  notas: string | null;
  mensaje_personalizado: string | null;
  personas: PersonaRpc[];
};

export default async function InvitacionPage(props: PageProps<"/inv/[token]">) {
  const { token } = await props.params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .rpc("obtener_invitacion", { p_token: token })
    .single<InvitacionRpc>();

  if (error || !data) {
    notFound();
  }

  const invitado: InvitadoInfo = {
    cupos: data.cupos,
    mensajePersonalizado: data.mensaje_personalizado,
    personas: data.personas,
  };

  return (
    <PaginaInvitacion
      invitado={invitado}
      token={token}
      notasIniciales={data.notas}
    />
  );
}
