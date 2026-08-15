/**
 * Datos generales del sitio que hoy están fijos en código pero que, en el
 * modelo de datos real (CLAUDE.md §5), viven en la tabla
 * `configuracion_sitio` de Supabase. Cuando se conecte la base de datos,
 * estos valores se reemplazan por una consulta a esa tabla.
 */

// Hora de la ceremonia según el itinerario preliminar — no 100% confirmada.
export const FECHA_BODA = new Date("2026-12-26T15:45:00");
