"use client";

import { motion } from "framer-motion";
import { FECHA_BODA } from "@/lib/site-config";
import { VideoCierre } from "./video-cierre";

export function Footer() {
  const fecha = FECHA_BODA.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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

      <p className="mx-auto mt-8 flex max-w-sm flex-col gap-1 text-[10px] tracking-wide text-ivory-soft/35">
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
      </p>
    </motion.footer>
  );
}
