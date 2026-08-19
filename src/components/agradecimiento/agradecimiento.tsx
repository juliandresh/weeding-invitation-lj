"use client";

import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";

// Texto placeholder — reemplazar cuando los novios tengan su propio mensaje.
// No se nombra a los padres individualmente a propósito: el listado de
// invitados solo identifica claramente a 3 de los 4 (Madre de la novia,
// Mamá y Papá del novio), así que nombrarlos aquí podría notarse como una
// omisión involuntaria. Mejor que los novios decidan cómo mencionarlos.
const MENSAJE =
  "Antes de comenzar esta nueva etapa, queremos detenernos a agradecer a quienes nos dieron la vida y nos enseñaron a amar. A nuestros padres: gracias por cada sacrificio silencioso, por las palabras justas en el momento preciso, y por creer en nosotros incluso cuando dudábamos. Todo lo que somos hoy —y todo el amor que hoy compartimos— nace de lo que ustedes sembraron primero. Este día es también suyo.";

export function Agradecimiento() {
  return (
    <section className="relative bg-ivory px-6 py-20 sm:py-28">
      <Reveal
        amount={0.4}
        className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Con gratitud
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          A nuestros padres
        </h2>
        <Divider />
        <p className="text-lg leading-relaxed text-ink-soft">{MENSAJE}</p>
      </Reveal>
    </section>
  );
}
