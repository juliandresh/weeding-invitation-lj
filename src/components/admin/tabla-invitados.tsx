"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BotonCopiar } from "./boton-copiar";

export type FilaInvitado = {
  id: string;
  token_unico: string;
  telefono: string | null;
  mensaje_personalizado: string | null;
  mesa: number | null;
  cupos: number;
  confirmado: boolean | null;
  cupos_confirmados: number | null;
  personas: { nombre: string; apellido: string; rol: string }[];
};

function estadoTexto(confirmado: boolean | null) {
  if (confirmado === true) return { texto: "Confirmado", clase: "text-green-700" };
  if (confirmado === false) return { texto: "No asistirá", clase: "text-red-700" };
  return { texto: "Pendiente", clase: "text-ink-soft" };
}

// Un campo puede venir como null o como cadena vacía/espacios desde el
// formulario, así que no basta con comprobar que exista.
function tieneDato(valor: string | null) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function Falta() {
  return (
    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] tracking-wide text-amber-800">
      Falta
    </span>
  );
}

const FILTROS = [
  { id: "todas", etiqueta: "Todas" },
  { id: "sin-telefono", etiqueta: "Sin teléfono" },
  { id: "sin-mensaje", etiqueta: "Sin mensaje" },
  { id: "sin-mesa", etiqueta: "Sin mesa" },
] as const;

type Filtro = (typeof FILTROS)[number]["id"];

export function TablaInvitados({ filas }: { filas: FilaInvitado[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const resumen = useMemo(
    () => ({
      total: filas.length,
      conTelefono: filas.filter((f) => tieneDato(f.telefono)).length,
      conMensaje: filas.filter((f) => tieneDato(f.mensaje_personalizado)).length,
      conMesa: filas.filter((f) => f.mesa !== null).length,
    }),
    [filas]
  );

  const filtradas = filas.filter((f) => {
    if (filtro === "sin-telefono" && tieneDato(f.telefono)) return false;
    if (filtro === "sin-mensaje" && tieneDato(f.mensaje_personalizado))
      return false;
    if (filtro === "sin-mesa" && f.mesa !== null) return false;

    if (!busqueda.trim()) return true;
    const texto = f.personas
      .map((p) => `${p.nombre} ${p.apellido}`)
      .join(" ")
      .toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">
        {resumen.total} invitaciones · {resumen.conTelefono} con teléfono ·{" "}
        {resumen.conMensaje} con mensaje · {resumen.conMesa} con mesa
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Buscar por nombre…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-sm rounded-md border border-gold/40 bg-ivory px-3 py-2 text-sm text-ink"
        />

        <div className="flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={`rounded-full border px-3 py-1.5 text-xs tracking-wide transition ${
                filtro === f.id
                  ? "border-gold bg-gold text-ivory"
                  : "border-gold/40 text-ink-soft hover:bg-ivory-soft"
              }`}
            >
              {f.etiqueta}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gold/30 bg-ivory">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-gold/20 text-xs uppercase tracking-[0.08em] text-ink-soft">
              <th className="px-4 py-3">Invitación</th>
              <th className="px-4 py-3">Cupos</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">Mensaje</th>
              <th className="px-4 py-3">Mesa</th>
              <th className="px-4 py-3">Link</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((f) => {
              const principales = f.personas.filter((p) => p.rol === "principal");
              const estado = estadoTexto(f.confirmado);
              return (
                <tr key={f.id} className="border-b border-gold/10 last:border-0">
                  <td className="px-4 py-3">
                    {principales.map((p) => `${p.nombre} ${p.apellido}`).join(" & ") ||
                      "(sin nombre)"}
                  </td>
                  <td className="px-4 py-3">
                    {f.confirmado === true
                      ? `${f.cupos_confirmados ?? 0} / ${f.cupos}`
                      : f.cupos}
                  </td>
                  <td className={`px-4 py-3 ${estado.clase}`}>{estado.texto}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {tieneDato(f.telefono) ? f.telefono : <Falta />}
                  </td>
                  <td className="px-4 py-3">
                    {tieneDato(f.mensaje_personalizado) ? (
                      <span
                        className="text-ink-soft"
                        title={f.mensaje_personalizado ?? undefined}
                      >
                        ✓ Sí
                      </span>
                    ) : (
                      <Falta />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {f.mesa ?? <Falta />}
                  </td>
                  <td className="px-4 py-3">
                    <BotonCopiar token={f.token_unico} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/cheladmin/invitados/${f.id}`}
                      className="text-xs uppercase tracking-[0.08em] text-gold underline underline-offset-2 hover:opacity-80"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filtradas.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-ink-soft">
                  Sin resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
