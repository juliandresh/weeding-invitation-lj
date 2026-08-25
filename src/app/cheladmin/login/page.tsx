"use client";

import { useActionState } from "react";
import { iniciarSesion } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(iniciarSesion, undefined);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-lg border border-gold/30 bg-ivory px-8 py-10">
        <p className="text-center font-script text-4xl text-gold">Panel</p>
        <p className="mb-6 text-center text-sm text-ink-soft">
          Liliana &amp; Julián — acceso privado
        </p>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Correo
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-ink-soft">
            Contraseña
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="rounded-md border border-gold/40 bg-ivory px-3 py-2 text-ink"
            />
          </label>

          {state?.error && (
            <p className="text-sm text-red-700">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full bg-gold px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-ivory transition hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
