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

// Fecha límite para confirmar asistencia (RSVP) — lunes 2 de noviembre de
// 2026. Usar para mostrar el aviso en la sección de confirmación y, más
// adelante, para bloquear el formulario después de esta fecha.
export const RSVP_FECHA_LIMITE = new Date("2026-11-02T23:59:59");

// Aviso sutil de exclusividad — la invitación solo incluye a las personas
// detalladas en ella (según cupos del invitado), sin acompañantes
// adicionales no listados. Se usa en la sección de RSVP.
export const RSVP_NOTA_EXCLUSIVIDAD =
  "Esta invitación es personal e intransferible, e incluye únicamente a las personas aquí detalladas.";
