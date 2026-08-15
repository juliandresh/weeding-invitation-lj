/**
 * Datos generales del sitio que hoy están fijos en código pero que, en el
 * modelo de datos real (CLAUDE.md §5), viven en la tabla
 * `configuracion_sitio` de Supabase. Cuando se conecte la base de datos,
 * estos valores se reemplazan por una consulta a esa tabla.
 */

// Hora de la ceremonia según el itinerario preliminar — no 100% confirmada.
export const FECHA_BODA = new Date("2026-12-26T15:45:00");

/**
 * Álbum digital de terceros (CLAUDE.md §3.3) — todavía no se contrata el
 * proveedor. `activo: false` oculta la sección "Comparte tus fotos" por
 * completo; mientras tanto queda en `true` con un QR de ejemplo (no
 * apunta a ningún álbum real). Cuando se contrate el proveedor, se
 * reemplaza `url` por el link real que entregue el servicio.
 */
export const ALBUM_QR = {
  activo: true,
  esDummy: true,
  url: "Álbum digital próximamente — QR de ejemplo",
};
