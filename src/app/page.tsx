import { PaginaInvitacion } from "@/components/sitio/pagina-invitacion";
import { INVITADO_EJEMPLO, TOKEN_DEMO } from "@/lib/mock-invitado";

export default function Home() {
  return (
    <PaginaInvitacion
      invitado={INVITADO_EJEMPLO}
      token={TOKEN_DEMO}
      notasIniciales={null}
    />
  );
}
