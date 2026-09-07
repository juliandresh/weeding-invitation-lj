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

function nombreInvitacion(f: FilaInvitado) {
  const principales = f.personas.filter((p) => p.rol === "principal");
  return (
    principales.map((p) => `${p.nombre} ${p.apellido}`).join(" & ") ||
    "(sin nombre)"
  );
}

function Falta() {
  return (
    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] tracking-wide text-amber-800">
      Falta
    </span>
  );
}

type Columna =
  | "invitacion"
  | "cupos"
  | "estado"
  | "telefono"
  | "mensaje"
  | "mesa";

type Direccion = "asc" | "desc";

// Orden lógico de los estados, para que al ordenar por esa columna queden
// agrupados de forma útil en vez de alfabéticamente.
const RANGO_ESTADO: Record<string, number> = {
  Confirmado: 0,
  "No asistirá": 1,
  Pendiente: 2,
};

const FILTROS_ESTADO = [
  { valor: "", etiqueta: "Estado: todos" },
  { valor: "confirmado", etiqueta: "Confirmados" },
  { valor: "no-asiste", etiqueta: "No asistirán" },
  { valor: "pendiente", etiqueta: "Pendientes" },
];

function filtrosPresencia(nombre: string) {
  return [
    { valor: "", etiqueta: `${nombre}: todos` },
    { valor: "con", etiqueta: `Con ${nombre.toLowerCase()}` },
    { valor: "sin", etiqueta: `Sin ${nombre.toLowerCase()}` },
  ];
}

function Selector({
  valor,
  onChange,
  opciones,
}: {
  valor: string;
  onChange: (v: string) => void;
  opciones: { valor: string; etiqueta: string }[];
}) {
  return (
    <select
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-md border px-2.5 py-1.5 text-xs text-ink ${
        valor ? "border-gold bg-ivory-soft" : "border-gold/40 bg-ivory"
      }`}
    >
      {opciones.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.etiqueta}
        </option>
      ))}
    </select>
  );
}

function Encabezado({
  columna,
  etiqueta,
  orden,
  onOrdenar,
}: {
  columna: Columna;
  etiqueta: string;
  orden: { columna: Columna; direccion: Direccion } | null;
  onOrdenar: (c: Columna) => void;
}) {
  const activa = orden?.columna === columna;
  return (
    <th
      className="px-4 py-3"
      aria-sort={
        activa
          ? orden.direccion === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      <button
        type="button"
        onClick={() => onOrdenar(columna)}
        className="inline-flex items-center gap-1 uppercase transition hover:text-ink"
      >
        {etiqueta}
        <span className={activa ? "text-gold" : "text-ink-soft/30"}>
          {activa ? (orden.direccion === "asc" ? "▲" : "▼") : "↕"}
        </span>
      </button>
    </th>
  );
}

export function TablaInvitados({ filas }: { filas: FilaInvitado[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [fEstado, setFEstado] = useState("");
  const [fTelefono, setFTelefono] = useState("");
  const [fMensaje, setFMensaje] = useState("");
  const [fMesa, setFMesa] = useState("");
  const [orden, setOrden] = useState<{
    columna: Columna;
    direccion: Direccion;
  } | null>(null);

  const resumen = useMemo(
    () => ({
      total: filas.length,
      conTelefono: filas.filter((f) => tieneDato(f.telefono)).length,
      conMensaje: filas.filter((f) => tieneDato(f.mensaje_personalizado)).length,
      conMesa: filas.filter((f) => f.mesa !== null).length,
    }),
    [filas]
  );

  function alternarOrden(columna: Columna) {
    setOrden((actual) => {
      if (actual?.columna !== columna) return { columna, direccion: "asc" };
      // Tercer clic sobre la misma columna: vuelve al orden original.
      if (actual.direccion === "asc") return { columna, direccion: "desc" };
      return null;
    });
  }

  const visibles = useMemo(() => {
    const filtradas = filas.filter((f) => {
      const estado = estadoTexto(f.confirmado).texto;
      if (fEstado === "confirmado" && estado !== "Confirmado") return false;
      if (fEstado === "no-asiste" && estado !== "No asistirá") return false;
      if (fEstado === "pendiente" && estado !== "Pendiente") return false;

      const conTel = tieneDato(f.telefono);
      if (fTelefono === "con" && !conTel) return false;
      if (fTelefono === "sin" && conTel) return false;

      const conMsg = tieneDato(f.mensaje_personalizado);
      if (fMensaje === "con" && !conMsg) return false;
      if (fMensaje === "sin" && conMsg) return false;

      const conMesa = f.mesa !== null;
      if (fMesa === "con" && !conMesa) return false;
      if (fMesa === "sin" && conMesa) return false;

      if (!busqueda.trim()) return true;
      const texto = f.personas
        .map((p) => `${p.nombre} ${p.apellido}`)
        .join(" ")
        .toLowerCase();
      return texto.includes(busqueda.toLowerCase());
    });

    if (!orden) return filtradas;

    // Las filas sin dato van siempre al final, ordene como ordene: son las
    // que faltan por completar y esconderlas arriba no ayuda.
    const sinDato = (f: FilaInvitado) => {
      switch (orden.columna) {
        case "telefono":
          return !tieneDato(f.telefono);
        case "mensaje":
          return !tieneDato(f.mensaje_personalizado);
        case "mesa":
          return f.mesa === null;
        default:
          return false;
      }
    };

    const valor = (f: FilaInvitado): number | string => {
      switch (orden.columna) {
        case "invitacion":
          return nombreInvitacion(f).toLowerCase();
        case "cupos":
          return f.cupos;
        case "estado":
          return RANGO_ESTADO[estadoTexto(f.confirmado).texto] ?? 99;
        case "telefono":
          return (f.telefono ?? "").trim().toLowerCase();
        case "mensaje":
          return (f.mensaje_personalizado ?? "").trim().toLowerCase();
        case "mesa":
          return f.mesa ?? 0;
      }
    };

    const signo = orden.direccion === "asc" ? 1 : -1;

    return [...filtradas].sort((a, b) => {
      const faltaA = sinDato(a);
      const faltaB = sinDato(b);
      if (faltaA !== faltaB) return faltaA ? 1 : -1;

      const va = valor(a);
      const vb = valor(b);
      let cmp =
        typeof va === "number" && typeof vb === "number"
          ? va - vb
          : String(va).localeCompare(String(vb), "es");

      // A igualdad, alfabético por nombre: así al agrupar por estado o por
      // mesa, cada grupo queda ordenado por nombre.
      if (cmp === 0) {
        cmp = nombreInvitacion(a).localeCompare(nombreInvitacion(b), "es");
        return cmp;
      }
      return cmp * signo;
    });
  }, [filas, busqueda, fEstado, fTelefono, fMensaje, fMesa, orden]);

  const hayFiltros = fEstado || fTelefono || fMensaje || fMesa || busqueda;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">
        {resumen.total} invitaciones · {resumen.conTelefono} con teléfono ·{" "}
        {resumen.conMensaje} con mensaje · {resumen.conMesa} con mesa
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          placeholder="Buscar por nombre…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-xs rounded-md border border-gold/40 bg-ivory px-3 py-2 text-sm text-ink"
        />
        <Selector valor={fEstado} onChange={setFEstado} opciones={FILTROS_ESTADO} />
        <Selector
          valor={fTelefono}
          onChange={setFTelefono}
          opciones={filtrosPresencia("Teléfono")}
        />
        <Selector
          valor={fMensaje}
          onChange={setFMensaje}
          opciones={filtrosPresencia("Mensaje")}
        />
        <Selector
          valor={fMesa}
          onChange={setFMesa}
          opciones={filtrosPresencia("Mesa")}
        />

        {hayFiltros && (
          <button
            type="button"
            onClick={() => {
              setBusqueda("");
              setFEstado("");
              setFTelefono("");
              setFMensaje("");
              setFMesa("");
            }}
            className="rounded-full border border-gold/40 px-3 py-1.5 text-xs text-ink-soft transition hover:bg-ivory-soft"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {hayFiltros && (
        <p className="text-xs text-ink-soft">
          Mostrando {visibles.length} de {resumen.total}
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-gold/30 bg-ivory">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-gold/20 text-xs tracking-[0.08em] text-ink-soft">
              <Encabezado
                columna="invitacion"
                etiqueta="Invitación"
                orden={orden}
                onOrdenar={alternarOrden}
              />
              <Encabezado
                columna="cupos"
                etiqueta="Cupos"
                orden={orden}
                onOrdenar={alternarOrden}
              />
              <Encabezado
                columna="estado"
                etiqueta="Estado"
                orden={orden}
                onOrdenar={alternarOrden}
              />
              <Encabezado
                columna="telefono"
                etiqueta="Teléfono"
                orden={orden}
                onOrdenar={alternarOrden}
              />
              <Encabezado
                columna="mensaje"
                etiqueta="Mensaje"
                orden={orden}
                onOrdenar={alternarOrden}
              />
              <Encabezado
                columna="mesa"
                etiqueta="Mesa"
                orden={orden}
                onOrdenar={alternarOrden}
              />
              <th className="px-4 py-3 uppercase">Link</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((f) => {
              const estado = estadoTexto(f.confirmado);
              return (
                <tr key={f.id} className="border-b border-gold/10 last:border-0">
                  <td className="px-4 py-3">{nombreInvitacion(f)}</td>
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
                  <td className="px-4 py-3">{f.mesa ?? <Falta />}</td>
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
            {visibles.length === 0 && (
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
