"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FECHA_BODA } from "@/lib/site-config";
import { VideoCierre } from "./video-cierre";

const CREDITOS_AUTOCIERRE_MS = 6000;

export function Footer() {
  const fecha = FECHA_BODA.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [mostrarCreditos, setMostrarCreditos] = useState(false);

  // Se cierra solo a los pocos segundos para no restarle formalidad al
  // footer dejando el listado de atribuciones de Vecteezy abierto
  // indefinidamente — el invitado solo necesita verlo un momento.
  useEffect(() => {
    if (!mostrarCreditos) return;
    const id = window.setTimeout(
      () => setMostrarCreditos(false),
      CREDITOS_AUTOCIERRE_MS
    );
    return () => window.clearTimeout(id);
  }, [mostrarCreditos]);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="border-t border-gold/20 bg-ink px-6 py-14 text-center"
    >
      <VideoCierre />

      <p className="font-script text-4xl text-gold">Liliana &amp; Julián</p>
      <p className="mt-2 text-xs tracking-[0.3em] text-ivory-soft/70 uppercase">
        {fecha}
      </p>
      <p className="mx-auto mt-5 max-w-sm text-sm text-ivory-soft/60">
        Con todo nuestro cariño, gracias por celebrar este día junto a
        nosotros.
      </p>

      <button
        type="button"
        onClick={() => setMostrarCreditos((v) => !v)}
        className="mt-8 text-[10px] tracking-[0.2em] text-ivory-soft/35 uppercase underline underline-offset-2 hover:text-ivory-soft/60"
      >
        Créditos
      </button>

      <AnimatePresence>
        {mostrarCreditos && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="mx-auto overflow-hidden"
          >
            <p className="mx-auto mt-3 flex max-w-sm flex-col gap-1 text-[10px] tracking-wide text-ivory-soft/35">
              <span>
                Ilustración floral de{" "}
                <a
                  href="https://www.vecteezy.com/-/49105002-branch-of-flowering-tree-with-white-flowers-and-green-leaves-on-transparent-background-ai-generative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ivory-soft/60"
                >
                  Mujhaid Wakeel en Vecteezy
                </a>
              </span>
              <span>
                Colibrí de{" "}
                <a
                  href="https://es.vecteezy.com/png/58301942-artistico-ilustracion-de-un-vistoso-colibri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ivory-soft/60"
                >
                  Ikramul Islam Sifat en Vecteezy
                </a>
              </span>
              <span>
                Tortuga marina de{" "}
                <a
                  href="https://es.vecteezy.com/png/66667621-vibrante-mar-tortuga-nada-graciosamente-entre-vistoso-coral-arrecifes-exhibiendo-belleza-de-marina-fauna-silvestre-intrincado-detalles-de-tortuga-cascara-y-rodeando-corales-crear-cautivador-submarino-escena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ivory-soft/60"
                >
                  korawik phansawai en Vecteezy
                </a>
              </span>
              <span>
                Guacamayas de{" "}
                <a
                  href="https://es.vecteezy.com/png/57753650-romantico-loro-pareja-encaramado-en-un-artisticamente-hecho-a-mano-arbol-rama-en-transparente-antecedentes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ivory-soft/60"
                >
                  Zikku Creative en Vecteezy
                </a>
              </span>
              <span>
                Beagle de{" "}
                <a
                  href="https://es.vecteezy.com/png/55136015-beagle-perro-retrato-animal-fotografia-estudio-ajuste-de-cerca-ver-mascota-concepto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ivory-soft/60"
                >
                  Littlestar 0816 en Vecteezy
                </a>
              </span>
              <span>
                Ramo de flores de{" "}
                <a
                  href="https://www.vecteezy.com/-/68185675-bouquet-of-white-daisies-blooming-fresh-simple-countryside-flowers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ivory-soft/60"
                >
                  Ghulam Raza en Vecteezy
                </a>
              </span>
              <span>
                Abeja de{" "}
                <a
                  href="https://www.vecteezy.com/-/65276349-close-up-of-a-honey-bee-showcasing-intricate-details-and-wings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ivory-soft/60"
                >
                  Serhii Khmel en Vecteezy
                </a>
              </span>
              <span>
                Mariposas monarca de{" "}
                <a
                  href="https://www.vecteezy.com/-/58174468-colorful-monarch-butterflies-flying-together-in-a-soft-white-background-flying-monarch-butterflies-isolated-on-white-background"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ivory-soft/60"
                >
                  Iftikhar Alam en Vecteezy
                </a>
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.footer>
  );
}
