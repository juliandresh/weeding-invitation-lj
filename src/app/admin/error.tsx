"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-16 text-center">
      <p className="text-lg text-ink">Algo salió mal</p>
      <p className="text-sm text-ink-soft">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-gold px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-ivory transition hover:opacity-90"
      >
        Reintentar
      </button>
    </div>
  );
}
