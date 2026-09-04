import type { Metadata } from "next";
import { PaginaInvitacion } from "@/components/sitio/pagina-invitacion";
import { INVITADO_EJEMPLO, TOKEN_DEMO } from "@/lib/mock-invitado";

// Vista previa del sitio completo con un invitado de ejemplo, para que los
// novios puedan revisarlo sin usar el enlace de un invitado real. No se
// indexa: no es la cara pública del sitio.
export const metadata: Metadata = {
  title: "Vista previa | Liliana & Julián",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return (
    <PaginaInvitacion
      invitado={INVITADO_EJEMPLO}
      token={TOKEN_DEMO}
      notasIniciales={null}
    />
  );
}
