import type { Metadata } from "next";
import { Monograma } from "@/components/portada/monograma";
import { Divider } from "@/components/ui/divider";

// Se muestra cuando un enlace de invitación no corresponde a nadie (token
// mal copiado o cortado al reenviarlo por WhatsApp) y en cualquier ruta que
// no exista. Sin esta página, Next muestra su error por defecto, en inglés y
// sin diseño, que a un invitado le parecería que la invitación está rota.
export const metadata: Metadata = {
  title: "Invitación no encontrada | Liliana & Julián",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16 text-center">
      <div className="m-auto flex max-w-md flex-col items-center gap-6">
        <Monograma />

        <h1 className="font-script text-4xl text-ink sm:text-5xl">
          No encontramos esta invitación
        </h1>

        <Divider />

        <p className="text-lg leading-relaxed text-ink-soft">
          Es posible que el enlace esté incompleto: a veces se corta al
          copiarlo o al reenviarlo por mensaje.
        </p>
        <p className="text-ink-soft">
          Abre de nuevo el enlace original que te enviamos, completo. Si sigue
          sin funcionar, escríbenos y con gusto te lo reenviamos.
        </p>
      </div>
    </main>
  );
}
