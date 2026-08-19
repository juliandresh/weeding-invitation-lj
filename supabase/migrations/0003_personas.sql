-- Reemplaza el modelo de "un principal fijo + acompañantes" por una tabla
-- única `personas`, ya que los datos reales muestran invitaciones con más
-- de un principal (ej. una pareja invitada junto con sus hijos como
-- acompañantes) — ver CLAUDE.md §5. Como todavía no hay invitados
-- cargados, se puede reestructurar sin migrar datos.

drop function if exists public.obtener_invitacion(uuid);
drop table if exists acompanantes;

alter table invitaciones
  drop column if exists nombre_principal,
  drop column if exists apellido_principal,
  drop column if exists genero_principal;

create table personas (
  id            uuid primary key default gen_random_uuid(),
  invitacion_id uuid not null references invitaciones(id) on delete cascade,
  nombre        text not null,
  apellido      text not null,
  genero        text check (genero in ('M', 'F')),
  rol           text not null check (rol in ('principal', 'acompanante')),
  -- datos de referencia del listado original, solo para el panel admin
  -- (no se muestran en el sitio público):
  parentesco    text,
  categoria     text, -- ej. "Familia cercana", "Familia Chelita", "Amigos"
  notas_edad    text, -- texto libre, ej. "Menor de edad", "Adulto Mayor (Silla de ruedas)"
  creado_en     timestamptz not null default now()
);

create index idx_personas_invitacion_id on personas(invitacion_id);

alter table personas enable row level security;

create policy admin_all_personas on personas
  for all to authenticated using (true) with check (true);

grant select, insert, update, delete on personas to authenticated;

-- Reemplaza la función pública: ahora devuelve todas las personas de la
-- invitación (con su rol), no un principal fijo + lista de acompañantes.
create or replace function public.obtener_invitacion(p_token uuid)
returns table (
  id                uuid,
  token_unico       uuid,
  mesa              int,
  cupos             int,
  confirmado        boolean,
  cupos_confirmados int,
  notas             text,
  personas          jsonb
)
language sql
security definer
set search_path = public
stable
as $$
  select
    i.id, i.token_unico, i.mesa, i.cupos, i.confirmado, i.cupos_confirmados, i.notas,
    coalesce(
      (select jsonb_agg(
                jsonb_build_object(
                  'nombre', p.nombre, 'apellido', p.apellido,
                  'genero', p.genero, 'rol', p.rol
                )
                order by (p.rol = 'principal') desc, p.creado_en
              )
       from personas p where p.invitacion_id = i.id),
      '[]'::jsonb
    ) as personas
  from invitaciones i
  where i.token_unico = p_token;
$$;

revoke all on function public.obtener_invitacion(uuid) from public;
grant execute on function public.obtener_invitacion(uuid) to anon, authenticated;
