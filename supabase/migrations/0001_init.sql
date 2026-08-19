-- Esquema inicial: invitaciones + acompañantes + configuración del sitio.
-- Ver CLAUDE.md §5 para el contexto del modelo de datos.
--
-- Diseño de acceso público (sin login): en vez de una política RLS directa
-- sobre `invitaciones`/`acompanantes` (que no puede filtrar de forma segura
-- por un token que el cliente envía como parámetro de consulta), el acceso
-- público pasa únicamente por dos funciones `SECURITY DEFINER` acotadas:
-- `obtener_invitacion` y `confirmar_asistencia`. Las tablas base no tienen
-- ningún grant directo para `anon` — solo el admin autenticado puede leerlas
-- o escribirlas directamente.

create extension if not exists pgcrypto;

-- ── Tablas ──────────────────────────────────────────────────────────────

create table invitaciones (
  id                 uuid primary key default gen_random_uuid(),
  token_unico        uuid not null unique default gen_random_uuid(),
  nombre_principal   text not null,
  apellido_principal text not null,
  genero_principal   text not null check (genero_principal in ('M', 'F')),
  telefono           text,
  mesa               int,
  cupos              int not null check (cupos > 0),
  confirmado         boolean,
  cupos_confirmados  int,
  fecha_confirmacion timestamptz,
  notas              text,
  creado_en          timestamptz not null default now()
);

create table acompanantes (
  id            uuid primary key default gen_random_uuid(),
  invitacion_id uuid not null references invitaciones(id) on delete cascade,
  nombre        text not null,
  apellido      text not null,
  genero        text check (genero in ('M', 'F')),
  creado_en     timestamptz not null default now()
);

create index idx_acompanantes_invitacion_id on acompanantes(invitacion_id);

create table configuracion_sitio (
  id            uuid primary key default gen_random_uuid(),
  clave         text not null unique,
  valor         text,
  actualizado_en timestamptz not null default now()
);

-- Valor inicial usado por confirmar_asistencia() para rechazar RSVPs tarde.
-- Ver CLAUDE.md §4.13 / src/lib/site-config.ts (RSVP_FECHA_LIMITE).
insert into configuracion_sitio (clave, valor) values
  ('rsvp_fecha_limite', '2026-11-02T23:59:59-05:00');

-- ── Row Level Security ──────────────────────────────────────────────────

alter table invitaciones enable row level security;
alter table acompanantes enable row level security;
alter table configuracion_sitio enable row level security;

-- Admin autenticado (panel /admin): acceso completo a las tres tablas.
create policy admin_all_invitaciones on invitaciones
  for all to authenticated using (true) with check (true);

create policy admin_all_acompanantes on acompanantes
  for all to authenticated using (true) with check (true);

create policy admin_all_configuracion on configuracion_sitio
  for all to authenticated using (true) with check (true);

-- Público: solo lectura de configuración general del sitio (fecha, lugar,
-- textos, etc. — nada sensible). Nada de acceso público directo a
-- invitaciones/acompanantes: eso solo se sirve a través de las funciones
-- de abajo, que exigen conocer el token exacto.
create policy public_select_configuracion on configuracion_sitio
  for select to anon using (true);

-- ── Acceso público acotado por token ────────────────────────────────────

-- Devuelve los datos de una invitación (y sus acompañantes) solo si se
-- conoce su token_unico exacto (uuid, no adivinable). No expone `telefono`
-- ni `fecha_confirmacion`, que no hacen falta en el sitio público.
create or replace function public.obtener_invitacion(p_token uuid)
returns table (
  id                 uuid,
  token_unico        uuid,
  nombre_principal   text,
  apellido_principal text,
  genero_principal   text,
  mesa               int,
  cupos              int,
  confirmado         boolean,
  cupos_confirmados  int,
  notas              text,
  acompanantes       jsonb
)
language sql
security definer
set search_path = public
stable
as $$
  select
    i.id, i.token_unico, i.nombre_principal, i.apellido_principal,
    i.genero_principal, i.mesa, i.cupos, i.confirmado, i.cupos_confirmados,
    i.notas,
    coalesce(
      (select jsonb_agg(jsonb_build_object(
                'nombre', a.nombre, 'apellido', a.apellido, 'genero', a.genero))
       from acompanantes a where a.invitacion_id = i.id),
      '[]'::jsonb
    ) as acompanantes
  from invitaciones i
  where i.token_unico = p_token;
$$;

revoke all on function public.obtener_invitacion(uuid) from public;
grant execute on function public.obtener_invitacion(uuid) to anon, authenticated;

-- Confirma (o declina) la asistencia de una invitación completa,
-- identificada únicamente por su token. Valida que no se confirmen más
-- cupos de los asignados y que no haya pasado la fecha límite.
create or replace function public.confirmar_asistencia(
  p_token             uuid,
  p_confirmado        boolean,
  p_cupos_confirmados int,
  p_notas             text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cupos int;
  v_fecha_limite timestamptz;
begin
  select cupos into v_cupos from invitaciones where token_unico = p_token;
  if not found then
    raise exception 'Invitación no encontrada';
  end if;

  select valor::timestamptz into v_fecha_limite
  from configuracion_sitio where clave = 'rsvp_fecha_limite';

  if v_fecha_limite is not null and now() > v_fecha_limite then
    raise exception 'La fecha límite para confirmar ya pasó';
  end if;

  if p_confirmado and p_cupos_confirmados > v_cupos then
    raise exception 'cupos_confirmados no puede superar los cupos asignados (%)', v_cupos;
  end if;

  update invitaciones
  set confirmado         = p_confirmado,
      cupos_confirmados  = case when p_confirmado then p_cupos_confirmados else 0 end,
      notas              = coalesce(p_notas, notas),
      fecha_confirmacion = now()
  where token_unico = p_token;
end;
$$;

revoke all on function public.confirmar_asistencia(uuid, boolean, int, text) from public;
grant execute on function public.confirmar_asistencia(uuid, boolean, int, text) to anon, authenticated;
