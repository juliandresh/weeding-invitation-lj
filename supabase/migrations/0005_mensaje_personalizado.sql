-- Mensaje personalizado por invitación, mostrado en la Portada en vez del
-- texto genérico cuando tiene contenido. Ver CLAUDE.md §5.

alter table invitaciones
  add column mensaje_personalizado text;

-- Postgres no permite cambiar el tipo de retorno de una función existente
-- (agregar una columna a RETURNS TABLE cuenta como cambio de tipo) con
-- CREATE OR REPLACE — hay que borrarla primero.
drop function public.obtener_invitacion(uuid);

create function public.obtener_invitacion(p_token uuid)
returns table (
  id                   uuid,
  token_unico          uuid,
  mesa                 int,
  cupos                int,
  confirmado           boolean,
  cupos_confirmados    int,
  notas                text,
  mensaje_personalizado text,
  personas             jsonb
)
language sql
security definer
set search_path = public
stable
as $$
  select
    i.id, i.token_unico, i.mesa, i.cupos, i.confirmado, i.cupos_confirmados,
    i.notas, i.mensaje_personalizado,
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
