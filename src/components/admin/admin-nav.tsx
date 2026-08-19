import Link from "next/link";
import { cerrarSesion } from "@/app/admin/actions";

export function AdminNav() {
  return (
    <nav className="flex items-center justify-between border-b border-gold/25 bg-ivory px-6 py-4">
      <div className="flex items-center gap-6">
        <span className="font-script text-2xl text-gold">Panel</span>
        <Link href="/admin" className="text-sm text-ink-soft hover:text-ink">
          Resumen
        </Link>
        <Link
          href="/admin/invitados"
          className="text-sm text-ink-soft hover:text-ink"
        >
          Invitados
        </Link>
      </div>
      <form action={cerrarSesion}>
        <button
          type="submit"
          className="text-xs uppercase tracking-[0.1em] text-ink-soft hover:text-ink"
        >
          Cerrar sesión
        </button>
      </form>
    </nav>
  );
}
