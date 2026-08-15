/**
 * Datos generales del sitio que hoy están fijos en código pero que, en el
 * modelo de datos real (CLAUDE.md §5), viven en la tabla
 * `configuracion_sitio` de Supabase. Cuando se conecte la base de datos,
 * estos valores se reemplazan por una consulta a esa tabla.
 */

// Hora de la ceremonia aún sin confirmar — placeholder.
export const FECHA_BODA = new Date("2026-12-26T18:00:00");
