"use client";

import { Divider } from "@/components/ui/divider";
import { PetalosCayendo } from "@/components/ui/petalos-cayendo";
import { Reveal } from "@/components/ui/reveal";

function IconoCopa() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <path d="M5 4h14l-6.2 8v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 18h6" strokeLinecap="round" />
      <path d="M6 4c0 4 2.5 6.5 6 6.5S18 8 18 4" strokeLinecap="round" />
    </svg>
  );
}

export function Notas() {
  return (
    <section className="relative bg-ivory px-6 py-20 sm:py-28">
      <PetalosCayendo />
      <Reveal
        amount={0.4}
        className="relative mx-auto flex max-w-lg flex-col items-center gap-5 text-center"
      >
        <div className="text-gold">
          <IconoCopa />
        </div>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">Notas</h2>
        <Divider />
        <p className="text-lg text-ink-soft">
          Adoramos a los más pequeños de la familia, pero en esta ocasión
          queremos que todos puedan disfrutar de una noche tranquila entre
          adultos. Por eso, esta celebración está pensada solo para grandes.
        </p>
        <p className="text-lg text-ink-soft">
          Los invitamos a elegir con anticipación a su conductor designado.
        </p>
      </Reveal>
    </section>
  );
}
