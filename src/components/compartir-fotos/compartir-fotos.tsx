"use client";

import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Divider } from "@/components/ui/divider";
import { ALBUM_QR } from "@/lib/site-config";

export function CompartirFotos() {
  if (!ALBUM_QR.activo) return null;

  return (
    <section className="relative bg-ivory-soft px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto flex max-w-md flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Comparte tus fotos
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          Nuestro álbum digital
        </h2>
        <p className="text-ink-soft">
          Escanea este código para subir las fotos que tomes durante la
          celebración y ayúdanos a armar el álbum del recuerdo entre todos.
        </p>
        <Divider />

        <div className="mt-2 flex flex-col items-center gap-3 rounded-lg border border-gold/30 bg-ivory p-6">
          <QRCodeSVG
            value={ALBUM_QR.url}
            size={160}
            bgColor="#FFFFFF"
            fgColor="#2E2823"
            level="M"
          />
          {ALBUM_QR.esDummy && (
            <p className="rounded-full border border-gold/40 px-3 py-1 text-[10px] tracking-[0.2em] text-ink-soft uppercase">
              Próximamente
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
