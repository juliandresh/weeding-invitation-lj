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

// Historia real de la pareja, acordada con los novios el 2026-09-02. El
// relato está en primera persona plural salvo el momento de la propuesta en
// París, que lo cuenta Julián — es intencional, no un descuido.
const PARRAFOS: ReactNode[] = [
  <>
    Hace 20 años, cuando Internet apenas comenzaba a convertirse en parte de
    nuestras vidas y Messenger era prácticamente nuestra red social favorita,
    dos desconocidos coincidieron en una sala de chat de una emisora de rock.
  </>,
  <>
    Ella tenía un curioso nickname: <Destacado>Chelitanew</Destacado>. Hablamos
    de música, descubrimos gustos en común y, después de superar el gran filtro
    de aquella época —<Destacado>agregarnos a Messenger</Destacado>—, comenzamos
    a conocernos.
  </>,
  <>
    Después de muchas conversaciones llegó el momento de comprobar si la química
    funcionaba también fuera de Internet. Y funcionó. Nuestra primera cita fue
    en un bar de rock, donde además llegó nuestro primer beso.
  </>,
  <>
    Fuimos novios, pero éramos jóvenes, la distancia no ayudaba y la madurez…
    bueno, digamos que todavía estaba en proceso de instalación. La vida nos
    separó durante algunos años, pero nunca borró completamente nuestra
    historia.
  </>,
  <>
    En 2011 volvimos a encontrarnos. Entre conversaciones, un viaje a la costa y
    muchas risas, descubrimos que quizás aquella historia no había terminado.
    Nos dimos una segunda oportunidad, y esta vez decidimos construir algo
    juntos.
  </>,
  <>
    A los diez meses nos fuimos a vivir con prácticamente nada: una cama, un
    televisor, una lavadora, una nevera y una estufa. Pero teníamos lo más
    importante: <Destacado>las ganas de construir una vida juntos</Destacado>.
  </>,
  <>
    Desde entonces hemos crecido, aprendido, viajado, cumplido sueños, cuidado
    de nuestros animales, compartido música, hecho miles de chistes y, sobre
    todo, aprendido que el amor también significa{" "}
    <Destacado>cuidarse, apoyarse y elegirse todos los días</Destacado>.
  </>,
];

// El relato se parte en dos para dejar la torre Eiffel justo antes del
// momento de la propuesta.
const PARRAFOS_PARIS: ReactNode[] = [
  <>
    Cinco años después de nuestro reencuentro, en París, llegó otra de esas
    decisiones que cambian una vida. Frente a la Torre Eiffel, con un anillo que
    ella no esperaba y una pregunta que yo llevaba tiempo preparando, llegó el{" "}
    <Destacado>“Sí”</Destacado> que quería escuchar.
  </>,
  <>
    Hoy, después de 20 años, podemos mirar atrás y entender que cada vuelta,
    cada encuentro y cada decisión nos trajo hasta aquí. Porque no solo nos
    enamoramos.{" "}
    <Destacado>
      Crecimos juntos. Construimos juntos. Nos cuidamos. Nos elegimos.
    </Destacado>
  </>,
  <>
    Y ahora, con la bendición de Dios y de nuestros padres, queremos dar el paso
    más importante de nuestra historia:{" "}
    <Destacado>seguir eligiéndonos para toda la vida</Destacado>.
  </>,
  <>
    Después de todo, aquella historia que comenzó en una sala de chat de rock
    resultó ser nuestra mejor conexión.
  </>,
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
          Y esta vez, prometemos no cerrar sesión.
        </p>
      </Reveal>
    </section>
  );
}
