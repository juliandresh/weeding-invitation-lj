"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Persona = {
  id: string;
  nombre: string;
  apellido: string;
  genero: string | null;
  rol: string;
  asistira: boolean | null;
};

type Invitacion = {
  id: string;
  telefono: string | null;
  mesa: number | null;
  cupos: number;
  confirmado: boolean | null;
  cupos_confirmados: number | null;
  notas: string | null;
  mensaje_personalizado: string | null;
  personas: Persona[];
};

async function llamar(url: string, opts: RequestInit) {
  const res = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Ocurrió un error");
  }
  return data;
}

export function PanelInvitacion({ invitacion }: { invitacion: Invitacion }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  async function guardarInvitacion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await llamar(`/cheladmin/api/invitaciones/${invitacion.id}`, {
        method: "PATCH",
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setGuardando(false);
    }
  }

  async function guardarPersona(personaId: string, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await llamar(`/cheladmin/api/personas/${personaId}`, {
        method: "PATCH",
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  async function eliminarPersona(personaId: string) {
    if (!window.confirm("¿Eliminar esta persona de la invitación?")) return;
    setError(null);
    try {
      await llamar(
        `/cheladmin/api/personas/${personaId}?invitacion_id=${invitacion.id}`,
        { method: "DELETE" }
      );
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  async function agregarPersona(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await llamar(`/cheladmin/api/invitaciones/${invitacion.id}/personas`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      e.currentTarget.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  async function eliminarInvitacion() {
    if (
      !window.confirm(
        "¿Eliminar esta invitación completa, con todas sus personas? Esta acción no se puede deshacer."
      )
    )
      return;
    setError(null);
    try {
      await llamar(`/cheladmin/api/invitaciones/${invitacion.id}`, { method: "DELETE" });
      router.push("/cheladmin/invitados");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  const confirmados = invitacion.personas.filter((p) => p.asistira === true).length;
  const noAsisten = invitacion.personas.filter((p) => p.asistira === false).length;
  const pendientes = invitacion.personas.filter((p) => p.asistira === null).length;

  return (
    <div className="flex flex-col gap-8">
      {error && (
        <p className="rounded-md border border-red-700/30 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <p className="text-sm text-ink-soft">
        <strong className="text-ink">Estado (calculado por persona):</strong>{" "}
        {confirmados} asisten · {noAsisten} no asisten · {pendientes} pendientes
        — de {invitacion.cupos} en total.
      </p>

      <section className="flex flex-col gap-4 rounded-lg border border-gold/30 bg-ivory px-6 py-6">
        <h2 className="text-sm uppercase tracking-[0.1em] text-ink-soft">
          Datos de la invitación
        </h2>
        <form onSubmit={guardarInvitacion} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Teléfono
            <input
              type="text"
              name="telefono"
              defaultValue={invitacion.telefono ?? ""}
              className="rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Mesa
            <input
              type="number"
              name="mesa"
              defaultValue={invitacion.mesa ?? ""}
              className="rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Mensaje personalizado (reemplaza el texto genérico de la Portada)
            <textarea
              name="mensaje_personalizado"
              rows={2}
              defaultValue={invitacion.mensaje_personalizado ?? ""}
              className="resize-none rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Notas (restricciones alimentarias, etc.)
            <textarea
              name="notas"
              rows={2}
              defaultValue={invitacion.notas ?? ""}
              className="resize-none rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            />
          </label>

          <button
            type="submit"
            disabled={guardando}
            className="mt-2 self-start rounded-full bg-gold px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-ivory transition hover:opacity-90 disabled:opacity-60"
          >
            {guardando ? "Guardando…" : "Guardar cambios"}
          </button>
        </form>
      </section>

      <section className="flex flex-col gap-4 rounded-lg border border-gold/30 bg-ivory px-6 py-6">
        <h2 className="text-sm uppercase tracking-[0.1em] text-ink-soft">
          Personas ({invitacion.cupos} {invitacion.cupos === 1 ? "cupo" : "cupos"})
        </h2>

        <div className="flex flex-col gap-4">
          {invitacion.personas.map((persona) => (
            <form
              key={persona.id}
              onSubmit={(e) => guardarPersona(persona.id, e)}
              className="flex flex-wrap items-end gap-2 border-b border-gold/15 pb-4 last:border-0"
            >
              <label className="flex flex-col gap-1 text-xs text-ink-soft">
                Nombre
                <input
                  type="text"
                  name="nombre"
                  defaultValue={persona.nombre}
                  required
                  className="w-32 rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-ink-soft">
                Apellido
                <input
                  type="text"
                  name="apellido"
                  defaultValue={persona.apellido}
                  className="w-32 rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-ink-soft">
                Género
                <select
                  name="genero"
                  defaultValue={persona.genero ?? ""}
                  className="rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
                >
                  <option value="">—</option>
                  <option value="F">Mujer</option>
                  <option value="M">Hombre</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs text-ink-soft">
                Rol
                <select
                  name="rol"
                  defaultValue={persona.rol}
                  className="rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
                >
                  <option value="principal">Principal</option>
                  <option value="acompanante">Acompañante</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs text-ink-soft">
                Asistirá
                <select
                  name="asistira"
                  defaultValue={
                    persona.asistira === true
                      ? "si"
                      : persona.asistira === false
                        ? "no"
                        : "pendiente"
                  }
                  className="rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </label>
              <button
                type="submit"
                className="rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.08em] text-ink-soft hover:bg-ivory-soft"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => eliminarPersona(persona.id)}
                className="rounded-full border border-red-700/30 px-4 py-1.5 text-xs uppercase tracking-[0.08em] text-red-700 hover:bg-red-50"
              >
                Eliminar
              </button>
            </form>
          ))}
        </div>

        <form
          onSubmit={agregarPersona}
          className="flex flex-wrap items-end gap-2 border-t border-gold/20 pt-4"
        >
          <label className="flex flex-col gap-1 text-xs text-ink-soft">
            Nombre
            <input
              type="text"
              name="nombre"
              required
              className="w-32 rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-ink-soft">
            Apellido
            <input
              type="text"
              name="apellido"
              className="w-32 rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-ink-soft">
            Género
            <select
              name="genero"
              defaultValue=""
              className="rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
            >
              <option value="">—</option>
              <option value="F">Mujer</option>
              <option value="M">Hombre</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-ink-soft">
            Rol
            <select
              name="rol"
              defaultValue="acompanante"
              className="rounded-md border border-gold/40 bg-ivory px-2 py-1.5 text-sm text-ink"
            >
              <option value="principal">Principal</option>
              <option value="acompanante">Acompañante</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-full bg-gold px-4 py-1.5 text-xs uppercase tracking-[0.08em] text-ivory hover:opacity-90"
          >
            + Agregar persona
          </button>
        </form>
      </section>

      <button
        type="button"
        onClick={eliminarInvitacion}
        className="self-start text-xs uppercase tracking-[0.1em] text-red-700 underline underline-offset-2"
      >
        Eliminar esta invitación completa
      </button>
    </div>
  );
}
