"use client";

import { TarjetaInvitado, type InvitadoInfo } from "@/components/invitado/tarjeta-invitado";
import { Sobre } from "@/components/portada/sobre";

// Página temporal de prototipo — datos de ejemplo, no conectados a
// Supabase todavía. Cuando exista el proyecto real y la lista de
// invitados, esto se reemplaza por una ruta dinámica /inv/[token] que
// consulte la base de datos por token_unico.
const INVITADO_EJEMPLO: InvitadoInfo = {
  titulo: "Sra.",
  nombre: "Liseth López",
  mesa: 5,
  cupos: 2,
  acompanantes: ["Carlos Ramírez"],
};

export default function PreviewInvitadoPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-ivory px-6 py-16 text-center">
      <p className="rounded-full border border-gold/40 px-3 py-1 font-serif text-xs uppercase tracking-[0.2em] text-ink-soft">
        Vista previa · datos de ejemplo
      </p>

      <TarjetaInvitado invitado={INVITADO_EJEMPLO} />

      <p className="max-w-md text-lg text-ink-soft">
        Sabemos que este día no sería igual sin ti. Toca el sobre para
        descubrir los detalles de nuestra celebración.
      </p>

      <Sobre onOpen={() => {}} />
    </main>
  );
}
