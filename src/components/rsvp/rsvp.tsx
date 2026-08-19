"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PersonaInvitado } from "@/components/invitado/tarjeta-invitado";
import { Confetti } from "@/components/ui/confetti";
import { Divider } from "@/components/ui/divider";
import { Reveal } from "@/components/ui/reveal";
import { RSVP_FECHA_LIMITE, RSVP_NOTA_EXCLUSIVIDAD } from "@/lib/site-config";
import { type TurnstileHandle, TurnstileWidget } from "./turnstile-widget";

function nombreCompleto(p: PersonaInvitado) {
  return `${p.nombre} ${p.apellido}`.trim();
}

export function Rsvp({
  token,
  personas,
  notasIniciales,
}: {
  token: string;
  personas: PersonaInvitado[];
  notasIniciales: string | null;
}) {
  const [personasActuales, setPersonasActuales] = useState(personas);
  const [abierto, setAbierto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [celebrar, setCelebrar] = useState(false);
  const [notasForm, setNotasForm] = useState(notasIniciales ?? "");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);

  // Por defecto se asume que todos asisten, salvo que ya hayan respondido
  // que no — el invitado desmarca a quien no pueda ir.
  const [selecciones, setSelecciones] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(personas.map((p) => [p.id, p.asistira ?? true]))
  );

  const yaRespondio = personasActuales.some((p) => p.asistira !== null);
  const confirmados = personasActuales.filter((p) => p.asistira === true);
  const noAsisten = personasActuales.filter((p) => p.asistira === false);

  const [fechaLimitePasada, setFechaLimitePasada] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => {
      setFechaLimitePasada(Date.now() > RSVP_FECHA_LIMITE.getTime());
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const fechaLimiteTexto = useMemo(
    () =>
      RSVP_FECHA_LIMITE.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    []
  );

  function alternar(id: string) {
    setSelecciones((s) => ({ ...s, [id]: !s[id] }));
  }

  async function enviar() {
    if (!turnstileToken) {
      setError("Completa la verificación antes de enviar.");
      return;
    }

    setEnviando(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          personas: personasActuales.map((p) => ({
            id: p.id,
            asistira: selecciones[p.id] ?? true,
          })),
          notas: notasForm || null,
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "No se pudo enviar la confirmación");
      }

      const actualizadas = personasActuales.map((p) => ({
        ...p,
        asistira: selecciones[p.id] ?? true,
      }));
      setPersonasActuales(actualizadas);
      setAbierto(false);
      if (actualizadas.some((p) => p.asistira === true)) {
        setCelebrar(true);
        window.setTimeout(() => setCelebrar(false), 2600);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ocurrió un error inesperado");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section
      id="rsvp"
      className="relative bg-gradient-to-b from-ivory via-sky-soft/50 to-ivory px-6 py-20 sm:py-28"
    >
      <Confetti activo={celebrar} />
      <Reveal
        amount={0.3}
        className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center"
      >
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold">
          Confirmación de asistencia
        </p>
        <h2 className="font-script text-5xl text-ink sm:text-6xl">
          ¿Nos acompañas?
        </h2>
        <Divider />

        {!yaRespondio && (
          <p className="max-w-md text-ink-soft">
            {fechaLimitePasada ? (
              <>
                La fecha límite para confirmar ({fechaLimiteTexto}) ya pasó. Si
                necesitas avisarnos algo, contáctanos directamente.
              </>
            ) : (
              <>
                Esta invitación incluye a {personasActuales.length}{" "}
                {personasActuales.length === 1 ? "persona" : "personas"}. Por
                favor confirma antes del {fechaLimiteTexto}.
              </>
            )}
          </p>
        )}

        {yaRespondio && (
          <div className="max-w-md text-ink-soft">
            {confirmados.length > 0 && (
              <p>
                <strong className="text-ink">Asistirán:</strong>{" "}
                {confirmados.map(nombreCompleto).join(", ")}
              </p>
            )}
            {noAsisten.length > 0 && (
              <p className="mt-1">
                <strong className="text-ink">No podrán asistir:</strong>{" "}
                {noAsisten.map(nombreCompleto).join(", ")}
              </p>
            )}
          </div>
        )}

        {!abierto && !fechaLimitePasada && (
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-gold transition hover:bg-gold hover:text-ivory"
          >
            {yaRespondio ? "Editar mi respuesta" : "Confirmar asistencia"}
          </button>
        )}

        <AnimatePresence>
          {abierto && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full overflow-hidden"
            >
              <div className="mt-2 flex flex-col gap-5 rounded-lg border border-gold/30 bg-ivory px-6 py-8">
                <p className="text-sm text-ink-soft">
                  Marca quiénes de esta invitación podrán acompañarnos:
                </p>

                <div className="flex flex-col gap-2">
                  {personasActuales.map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-3 rounded-md border border-gold/25 px-4 py-2.5 text-left"
                    >
                      <input
                        type="checkbox"
                        checked={selecciones[p.id] ?? true}
                        onChange={() => alternar(p.id)}
                        className="h-4 w-4 accent-gold"
                      />
                      <span className="text-ink">{nombreCompleto(p)}</span>
                    </label>
                  ))}
                </div>

                <label className="flex flex-col items-start gap-2 text-sm text-ink-soft">
                  Restricciones alimentarias o alguna nota (opcional)
                  <textarea
                    value={notasForm}
                    onChange={(e) => setNotasForm(e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-md border border-gold/40 bg-ivory px-4 py-2 text-ink"
                  />
                </label>

                <div className="flex justify-center">
                  <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
                </div>

                {error && <p className="text-sm text-red-700">{error}</p>}

                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAbierto(false)}
                    disabled={enviando}
                    className="rounded-full border border-gold/40 px-5 py-2 text-xs uppercase tracking-[0.1em] text-ink-soft transition hover:bg-ivory-soft"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={enviar}
                    disabled={enviando || !turnstileToken}
                    className="rounded-full bg-gold px-6 py-2 text-xs uppercase tracking-[0.1em] text-ivory transition hover:opacity-90 disabled:opacity-60"
                  >
                    {enviando ? "Enviando…" : "Enviar confirmación"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-2 text-xs text-ink-soft italic">
          {RSVP_NOTA_EXCLUSIVIDAD}
        </p>
      </Reveal>
    </section>
  );
}
