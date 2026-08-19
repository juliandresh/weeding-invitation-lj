"use client";

import Link from "next/link";
import { useState } from "react";
import { BotonCopiar } from "./boton-copiar";

export type FilaInvitado = {
  id: string;
  token_unico: string;
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

export function TablaInvitados({ filas }: { filas: FilaInvitado[] }) {
  const [busqueda, setBusqueda] = useState("");

  const filtradas = filas.filter((f) => {
    if (!busqueda.trim()) return true;
    const texto = f.personas.map((p) => `${p.nombre} ${p.apellido}`).join(" ").toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-4">
      <input
        type="search"
        placeholder="Buscar por nombre…"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full max-w-sm rounded-md border border-gold/40 bg-ivory px-3 py-2 text-sm text-ink"
      />

      <div className="overflow-x-auto rounded-lg border border-gold/30 bg-ivory">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-gold/20 text-xs uppercase tracking-[0.08em] text-ink-soft">
              <th className="px-4 py-3">Invitación</th>
              <th className="px-4 py-3">Cupos</th>
              <th className="px-4 py-3">Estado</th>
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
                  <td className="px-4 py-3">{f.mesa ?? "—"}</td>
                  <td className="px-4 py-3">
                    <BotonCopiar token={f.token_unico} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/invitados/${f.id}`}
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
                <td colSpan={6} className="px-4 py-6 text-center text-ink-soft">
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
