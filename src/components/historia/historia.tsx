"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { Divider } from "@/components/ui/divider";
import { PetalosCayendo } from "@/components/ui/petalos-cayendo";
import { Reveal } from "@/components/ui/reveal";

// Resalta una frase dentro del relato. Se usa con moderación: son los
// remates de cada tramo de la historia, no cualquier frase.
function Destacado({ children }: { children: ReactNode }) {
  return <span className="text-gold">{children}</span>;
}

// Historia real de la pareja, acordada con los novios el 2026-09-03. Los
// nicknames de Messenger se muestran sin el dominio a propósito: la home es
// pública e indexable, y publicar las direcciones completas las expondría a
// los recolectores de spam.
const PARRAFOS: ReactNode[] = [
  <>
    Era el año 2006. Internet comenzaba a convertirse en parte de nuestras vidas
    y Messenger era prácticamente nuestra red social favorita. En medio de una
    sala de chat en la web, dos desconocidos hicieron su primer contacto de red.
  </>,
  <>
    Ella tenía un curioso nickname: <Destacado>Chelitanew</Destacado>. Empezamos
    hablando de rock, descubrimos gustos en común y, después de superar el gran
    filtro de seguridad de aquella época —
    <Destacado>agregarnos a Messenger</Destacado>—, comenzamos a conocernos.
  </>,
  <>
    Así fue como los usuarios <Destacado>jandrescadc</Destacado> y{" "}
    <Destacado>chelitanew</Destacado> comenzaron a intercambiar mensajes,
    historias, gustos y, poco a poco, algo más importante: una conexión que
    parecía funcionar bastante bien.
  </>,
  <>
    Después de muchas conversaciones llegó el momento de probar la conexión en
    el mundo real. Nuestro punto de encuentro fue frente a la Universidad
    Central. De allí pasamos a unas cervezas y rock en el recordado Pasaje
    Gourmet y, después de unas horas, ocurrió lo que podríamos considerar
    nuestro primer gran deploy: <Destacado>nuestro primer beso</Destacado>.
  </>,
  <>
    Fuimos novios, pero éramos jóvenes, la distancia no ayudaba (20 km en el
    colectivo Aldea/Refugio Fontibón - 20 de Julio) y la madurez… bueno,
    digamos que todavía estaba en proceso de instalación. Así que el sistema
    presentó algunos inconvenientes y terminamos nuestra primera versión.
  </>,
  <>
    La vida nos llevó por caminos diferentes durante algunos años, pero,
    afortunadamente, nunca eliminamos completamente el archivo.
  </>,
  <>
    En 2011 volvimos a encontrarnos. Entre conversaciones, un viaje a Santa
    Marta y muchas risas, descubrimos que aquella conexión que creíamos perdida
    todavía tenía señal, así que decidimos darle una segunda oportunidad. Esta
    vez, con una versión un poco más madura… aunque todavía con algunos bugs
    pendientes de corregir.
  </>,
  <>
    A los diez meses decidimos dar uno de los pasos más importantes: vivir
    juntos. No teníamos grandes recursos (el hardware era básico) pero el
    sistema tenía algo mucho más importante:{" "}
    <Destacado>ganas de construir juntos</Destacado>.
  </>,
  <>
    Desde entonces hemos ido actualizando nuestra vida con viajes, conciertos,
    sueños, proyectos, nuestras mascotas, música, risas y muchas experiencias.
    También hemos aprendido que una buena relación necesita algo parecido a un
    buen sistema: soporte, paciencia, mantenimiento, trabajo en equipo y, de vez
    en cuando, saber cuándo reiniciar.
  </>,
  <>
    Y sobre todo, descubrimos que la mejor función de trabajar en equipo es
    tener siempre a alguien que{" "}
    <Destacado>
      te cuide, te apoye y esté ahí cuando las cosas no funcionan como esperabas
    </Destacado>
    .
  </>,
  <>
    Cinco años después de nuestro reencuentro llegó una actualización
    importante. París.
  </>,
];

// El relato se parte en dos para dejar la torre Eiffel justo antes del
// momento de la propuesta.
const PARRAFOS_PARIS: ReactNode[] = [
  <>
    Frente a la Torre Eiffel, con un anillo que Liliana no esperaba y una
    pregunta que Julián llevaba tiempo preparando, hizo su mejor intento de
    poner en producción el proyecto más importante de sus vidas. Y Julián
    obtuvo el <Destacado>“Sí”</Destacado> que estaba esperando, entre emoción,
    luces y un ambiente incomparable.
  </>,
  <>
    Hoy, después de 20 años, podemos mirar atrás y entender que aquella conexión
    que comenzó en una sala de chat sobrevivió a distancias, pausas, cambios de
    versión, algunos bugs y muchas actualizaciones.
  </>,
  <>
    Porque no solo nos enamoramos…{" "}
    <Destacado>
      Crecimos juntos. Construimos juntos. Nos cuidamos. Nos elegimos.
    </Destacado>
  </>,
  <>
    Y ahora, con la bendición de Dios y de nuestros padres, estamos listos para
    hacer el deploy definitivo:{" "}
    <Destacado>una vida juntos. Para siempre.</Destacado>
  </>,
  <>
    Después de todo, aquella conversación que comenzó con un simple mensaje
    terminó convirtiéndose en nuestra mejor conexión.
  </>,
];

const ESTADO_CONEXION = [
  "STATUS:  CONNECTED ❤️",
  "UPTIME:  20 YEARS",
  "VERSION: JULILIANA 1.0",
  "STATUS:  IN PRODUCTION",
];

export function Historia() {
  return (
    <section className="relative bg-ivory-soft px-6 py-20 sm:py-28">
      <PetalosCayendo />
      {/* amount bajo a propósito: el relato es más alto que la pantalla de un
          celular, así que un umbral alto (0.3-0.4) nunca llegaría a cumplirse
          y la sección no aparecería nunca. */}
      <Reveal
        amount={0.05}
        className="relative mx-auto flex max-w-xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Nuestra historia
        </p>
        <div className="relative">
          <h2 className="font-script text-5xl text-ink sm:text-6xl">
            Cómo empezó todo
          </h2>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-1 -right-16 h-11 w-16 sm:top-2 sm:-right-32 sm:h-20 sm:w-28"
            initial={{ opacity: 0, x: 30, y: -6, rotate: 8, scale: 0.6 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 5, 0],
              rotate: [0, 2, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              x: { duration: 0.6, delay: 0.5 },
              scale: { duration: 0.6, delay: 0.5, ease: "easeOut" },
              y: {
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              },
              rotate: {
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1,
              },
            }}
          >
            <Image
              src="/images/guacamayas-duotono.png"
              alt=""
              width={700}
              height={560}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </div>
        <p className="max-w-md text-ink-soft italic">
          Una conexión que sobrevivió a todas las actualizaciones.
        </p>
        <Divider />

        <div className="flex flex-col gap-4">
          {PARRAFOS.map((texto, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink-soft">
              {texto}
            </p>
          ))}
        </div>

        {/* La torre marca el cambio de escena hacia la propuesta en París, y
            da contexto al video de cierre del Footer. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none my-2 h-24 w-16 sm:h-32 sm:w-20"
          initial={{ opacity: 0, y: 14, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src="/images/torre-eiffel-dorada.png"
            alt=""
            width={400}
            height={600}
            className="h-full w-full object-contain"
          />
        </motion.div>

        <div className="flex flex-col gap-4">
          {PARRAFOS_PARIS.map((texto, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink-soft">
              {texto}
            </p>
          ))}
        </div>

        <p className="font-script text-3xl leading-snug text-gold sm:text-4xl">
          Y esta vez prometemos no cerrar sesión.
        </p>

        {/* Remate del guiño tecnológico que recorre todo el relato. */}
        <div className="w-full max-w-xs rounded-lg border border-gold/30 bg-ink px-5 py-4 text-left font-mono text-xs leading-relaxed text-ivory-soft/90 sm:max-w-sm sm:text-sm">
          {ESTADO_CONEXION.map((linea) => (
            <p key={linea} className="whitespace-pre">
              {linea}
            </p>
          ))}
        </div>

        <p className="max-w-md text-ink-soft">
          La píldora roja nos trajo hasta aquí, ahora solo queda disfrutar del
          viaje. 🕶️❤️
        </p>
        <p className="max-w-md text-ink-soft">
          Y si después de leer nuestra historia todavía están aquí… bienvenidos
          a la Matrix. 🕶️😂
        </p>
      </Reveal>
    </section>
  );
}
