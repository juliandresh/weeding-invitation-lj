"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

// Texto acordado con los novios el 2026-09-02. El tono de esta sección es
// deliberadamente informal, a diferencia del resto del sitio.
const NOTAS = [
  {
    icono: "👶",
    titulo: "Esta noche es solo para adultos",
    parrafos: [
      "Amamos a los pequeños de nuestras familias y sabemos que son lo máximo, pero esta vez queremos que ellos también tengan una noche libre… y que ustedes puedan bailar, reír, brindar y disfrutar sin tener que perseguir a nadie debajo de las mesas.",
      "Por eso, nuestra celebración es exclusivamente para adultos. Les agradecemos muchísimo que nos ayuden a mantener esta noche tal como la hemos imaginado.",
    ],
  },
  {
    icono: "💃",
    titulo: "Preparen sus pasos prohibidos",
    parrafos: [
      "No importa si bailan como profesionales, como si nadie los estuviera viendo o como si acabaran de descubrir que tienen dos pies izquierdos.",
      "La pista será territorio libre. Así que vayan calentando motores porque queremos ver esos movimientos que normalmente solo aparecen después de la tercera canción.",
    ],
  },
  {
    icono: "🎶",
    titulo: "Mente abierta y corazón dispuesto",
    parrafos: [
      "La música será una parte muy especial de nuestra celebración. Habrá canciones para cantar, bailar, recordar y probablemente alguna que otra que los haga preguntarse: “¿¿¿¿Quién pidió esta canción????”",
      "Solo les pedimos una cosa: déjense sorprender. Puede que escuchen algo que no esperaban… y terminen cantándolo a todo pulmón, llorando o pateando.",
    ],
  },
  {
    icono: "🥂",
    titulo: "Si van a brindar, piensen en el regreso",
    parrafos: [
      "Les recomendamos elegir con anticipación a su conductor designado o planear cómo regresar a casa.",
      "Queremos que celebren con nosotros hasta que el cuerpo aguante, pero sobre todo queremos que todos lleguen sanos y felices a casa.",
    ],
  },
  {
    icono: "📸",
    titulo: "Una noche para vivirla",
    parrafos: [
      "Tomen fotos, graben videos, etiqueten, compartan… pero no se olviden de levantar la mirada de vez en cuando.",
      "Queremos que estén presentes, que rían, que abracen, que bailen y que disfruten cada momento con nosotros.",
    ],
  },
  {
    icono: "❤️",
    titulo: "Y la regla más importante",
    parrafos: [
      "Vengan con ganas de celebrar. Nosotros ponemos el amor, la música y la fiesta. Ustedes solo tienen que traer su mejor energía.",
    ],
  },
];

export function Notas() {
  return (
    <section className="relative bg-ivory px-6 py-20 sm:py-28">
      <PetalosCayendo />
      {/* amount bajo a propósito: la sección es más alta que la pantalla de un
          celular, así que un umbral alto nunca llegaría a cumplirse y no
          aparecería nunca. */}
      <Reveal
        amount={0.05}
        className="relative mx-auto flex max-w-lg flex-col items-center gap-5 text-center"
      >
        <div className="text-gold">
          <IconoCopa />
        </div>
        <div className="relative">
          <h2 className="font-script text-5xl text-ink sm:text-6xl">
            Notas importantes
          </h2>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-4 h-16 w-16 sm:-top-14 sm:-right-24 sm:h-24 sm:w-24"
            initial={{ opacity: 0, x: 30, y: -6, rotate: 10, scale: 0.6 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 6, 0],
              rotate: [0, 3, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              x: { duration: 0.6, delay: 0.5 },
              scale: { duration: 0.6, delay: 0.5, ease: "easeOut" },
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
              rotate: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
            }}
          >
            <Image
              src="/images/mariposas-duotono.png"
              alt=""
              width={600}
              height={600}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
        <p className="max-w-md text-ink-soft italic">
          O, como nos gusta llamarlo: instrucciones para pasarla increíble.
        </p>
        <Divider />

        <div className="mt-2 flex flex-col gap-9">
          {NOTAS.map((nota) => (
            <div key={nota.titulo} className="flex flex-col gap-3">
              <span aria-hidden="true" className="text-3xl leading-none">
                {nota.icono}
              </span>
              <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-gold">
                {nota.titulo}
              </h3>
              {nota.parrafos.map((texto, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink-soft">
                  {texto}
                </p>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-4 font-script text-3xl leading-snug text-gold sm:text-4xl">
          ¡Nos vemos en la pista!
        </p>
        <p className="text-ink-soft italic">
          Y ya saben que… desde Septiembreeeee.
        </p>
      </Reveal>
    </section>
  );
}
