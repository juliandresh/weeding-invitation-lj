/**
 * Datos generales del sitio que hoy están fijos en código pero que, en el
 * modelo de datos real (CLAUDE.md §5), viven en la tabla
 * `configuracion_sitio` de Supabase. Cuando se conecte la base de datos,
 * estos valores se reemplazan por una consulta a esa tabla.
 */

// Momento al que apunta la cuenta regresiva. Se fija a las 4:00 p. m. a
// propósito, aunque el itinerario anuncie la ceremonia a las 3:45 p. m.:
// decisión de los novios (2026-09-07), para dar un margen de holgura.
// Las demás pantallas que usan esta constante solo muestran la fecha
// (día/mes/año), así que la hora únicamente afecta al conteo.
export const FECHA_BODA = new Date("2026-12-26T16:00:00");

// Fecha límite para confirmar asistencia (RSVP) — lunes 2 de noviembre de
// 2026. Usar para mostrar el aviso en la sección de confirmación y, más
// adelante, para bloquear el formulario después de esta fecha.
export const RSVP_FECHA_LIMITE = new Date("2026-11-02T23:59:59");

// Aviso sutil de exclusividad — la invitación solo incluye a las personas
// detalladas en ella (según cupos del invitado), sin acompañantes
// adicionales no listados. Se usa en la sección de RSVP.
export const RSVP_NOTA_EXCLUSIVIDAD =
  "Esta invitación es personal e intransferible, e incluye únicamente a las personas aquí detalladas.";
