import { CeremoniaRecepcion } from "@/components/ceremonia/ceremonia-recepcion";
import { CompartirFotos } from "@/components/compartir-fotos/compartir-fotos";
import { Countdown } from "@/components/countdown/countdown";
import { DressCode } from "@/components/dress-code/dress-code";
import { Footer } from "@/components/footer/footer";
import { Frase } from "@/components/frase/frase";
import { Galeria } from "@/components/galeria/galeria";
import { Historia } from "@/components/historia/historia";
import type { InvitadoInfo } from "@/components/invitado/tarjeta-invitado";
import { Itinerario } from "@/components/itinerario/itinerario";
import { Notas } from "@/components/notas/notas";
import { Portada } from "@/components/portada/portada";
import { Regalos } from "@/components/regalos/regalos";
import { Rsvp } from "@/components/rsvp/rsvp";
import { Sugerencias } from "@/components/sugerencias/sugerencias";
import { SectionBranches } from "@/components/ui/section-branches";

// Composición completa del sitio, compartida entre "/" (demo con invitado de
// ejemplo) y "/inv/[token]" (invitado real desde Supabase) — ver
// src/app/page.tsx y src/app/inv/[token]/page.tsx.
export function PaginaInvitacion({
  invitado,
  token,
  notasIniciales,
}: {
  invitado: InvitadoInfo;
  token: string;
  notasIniciales: string | null;
}) {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Portada invitado={invitado} />
        <SectionBranches />
        <Historia />
        <SectionBranches />
        <Countdown />
        <SectionBranches />
        <Itinerario />
        <SectionBranches />
        <CeremoniaRecepcion />
        <SectionBranches />
        <Galeria />
        <SectionBranches />
        <Frase />
        <SectionBranches />
        <DressCode />
        <SectionBranches />
        <CompartirFotos />
        <SectionBranches />
        <Sugerencias />
        <SectionBranches />
        <Notas />
        <SectionBranches />
        <Regalos />
        <SectionBranches />
        <Rsvp
          token={token}
          personas={invitado.personas}
          notasIniciales={notasIniciales}
        />
      </main>
      <Footer />
    </>
  );
}
