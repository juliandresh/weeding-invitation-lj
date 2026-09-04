import type { Metadata } from "next";
import { Monograma } from "@/components/portada/monograma";
import { Divider } from "@/components/ui/divider";
import { FECHA_BODA } from "@/lib/site-config";

// Quien entra al dominio sin enlace personal no debería ver una invitación
// con invitados de ejemplo: aquí se muestra una página neutra. La demo
// completa vive en /demo, para que los novios puedan seguir revisando el
// sitio entero.
export const metadata: Metadata = {
  title: "Liliana & Julián",
  robots: { index: false, follow: false },
};

export default function Home() {
  const fecha = FECHA_BODA.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16 text-center">
      <div className="m-auto flex max-w-md flex-col items-center gap-6">
        <Monograma />

        <h1 className="font-script text-5xl text-ink sm:text-6xl">
          Liliana <span className="text-gold">&amp;</span> Julián
        </h1>
        <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold">
          {fecha}
        </p>

        <Divider />

        <p className="text-lg leading-relaxed text-ink-soft">
          Nuestra invitación es personal: cada una lleva un enlace propio con
          los datos de quienes nos acompañarán.
        </p>
        <p className="text-ink-soft">
          Por favor abre el enlace que te enviamos para ver la tuya.
        </p>
      </div>
    </main>
  );
}
