"use client";

import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";

// Investigado a partir de la ubicación de Hacienda La Victoria (Vía
// Subachoque, Cundinamarca). Son sugerencias generales, no reservas ni
// alianzas confirmadas — se recomienda que cada invitado verifique
// disponibilidad, horarios y precios directamente antes de su visita.

const HOTELES = [
  {
    nombre: "Finca Casa de Teja",
    descripcion:
      "Casa de campo renovada en Puente de Piedra, a ~10 km de Subachoque; también recibe eventos.",
  },
  {
    nombre: "Santuario Glamping",
    descripcion:
      "Glamping en Subachoque con jardín privado, terraza y cancha de tenis.",
  },
  {
    nombre: "Hotel Campestre Franchesca",
    descripcion:
      "Hotel campestre entre Tenjo y Tabio, a ~9 km de Subachoque.",
  },
  {
    nombre: "Hacienda La Yegüera",
    descripcion: "Alojamiento con vista a las montañas, cerca de Subachoque.",
  },
];

const SITIOS = [
  {
    nombre: "Laguna Verde y Cerro El Tablazo",
    descripcion:
      "Senderismo y observación de aves, entre Subachoque y Supatá.",
  },
  {
    nombre: "Iglesia de San Miguel Arcángel",
    descripcion:
      "Iglesia principal de Subachoque, reconocible por su cúpula roja.",
  },
  {
    nombre: "Alto de Canicas",
    descripcion:
      "Ruta ciclística con miradores panorámicos, muy popular en la zona.",
  },
  {
    nombre: "La Ferrería de Subachoque",
    descripcion: "Antigua fundición de hierro de 1858, hoy sitio histórico.",
  },
];

function enlaceMapa(nombre: string) {
  const query = encodeURIComponent(`${nombre}, Subachoque, Cundinamarca`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function Lista({
  items,
}: {
  items: { nombre: string; descripcion: string }[];
}) {
  return (
    <ul className="flex flex-col gap-4 text-left">
      {items.map((item) => (
        <li
          key={item.nombre}
          className="rounded-lg border border-gold/30 bg-ivory px-5 py-4"
        >
          <p className="text-lg text-ink">{item.nombre}</p>
          <p className="mt-1 text-sm text-ink-soft">{item.descripcion}</p>
          <a
            href={enlaceMapa(item.nombre)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs tracking-[0.1em] text-gold uppercase underline underline-offset-2"
          >
            Ver en el mapa
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Sugerencias() {
  return (
    <section className="relative bg-gradient-to-b from-ivory via-sky-soft/50 to-ivory px-6 py-20 sm:py-28">
      <Reveal
        amount={0.15}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Si vienes de lejos
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          Sugerencias
        </h2>
        <p className="max-w-md text-ink-soft">
          Algunas opciones cerca de Subachoque para hospedarte o pasear
          antes o después de la celebración.
        </p>
        <Divider />

        <div className="mt-4 grid w-full gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-ink">Dónde alojarse</h3>
            <Lista items={HOTELES} />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl text-ink">Qué visitar</h3>
            <Lista items={SITIOS} />
          </div>
        </div>

        <p className="mt-2 text-xs text-ink-soft italic">
          Recomendamos confirmar disponibilidad y horarios directamente
          antes de tu visita.
        </p>
      </Reveal>
    </section>
  );
}
