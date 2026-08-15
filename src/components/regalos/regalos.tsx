"use client";

import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";

function IconoSobre() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13v3" strokeLinecap="round" />
      <path
        d="M10.3 15.2c0-1 .8-1.5 1.7-1.5s1.7.5 1.7 1.5-1.7 2.1-1.7 2.1-1.7-1.1-1.7-2.1Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function Regalos() {
  return (
    <section className="relative bg-ivory-soft px-6 py-20 sm:py-28">
      <Reveal
        amount={0.4}
        className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center"
      >
        <div className="text-gold">
          <IconoSobre />
        </div>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">Regalos</h2>
        <Divider />
        <p className="text-lg text-ink-soft">
          Si deseas expresarnos tu cariño, la lluvia de sobres será una dulce
          bendición para nuestro hogar.
        </p>
      </Reveal>
    </section>
  );
}
