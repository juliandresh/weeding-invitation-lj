"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminNav } from "@/components/admin/admin-nav";

export default function NuevaInvitacionPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/admin/api/invitaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        genero: formData.get("genero") || null,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "No se pudo crear la invitación.");
      setEnviando(false);
      return;
    }

    router.push(`/admin/invitados/${data.id}`);
  }

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-md px-6 py-10">
        <h1 className="mb-6 text-2xl text-ink">Nueva invitación</h1>
        <p className="mb-6 text-sm text-ink-soft">
          Crea la invitación con su primer invitado principal. Luego podrás
          agregar acompañantes y más datos desde su página de edición.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Nombre
            <input
              type="text"
              name="nombre"
              required
              className="rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Apellido
            <input
              type="text"
              name="apellido"
              className="rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Género
            <select
              name="genero"
              className="rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            >
              <option value="">Sin especificar</option>
              <option value="F">Mujer</option>
              <option value="M">Hombre</option>
            </select>
          </label>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={enviando}
            className="mt-2 rounded-full bg-gold px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-ivory transition hover:opacity-90 disabled:opacity-60"
          >
            {enviando ? "Creando…" : "Crear invitación"}
          </button>
        </form>
      </main>
    </>
  );
}
