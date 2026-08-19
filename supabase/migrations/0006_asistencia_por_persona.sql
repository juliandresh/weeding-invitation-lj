-- Asistencia por persona individual, no solo un total por invitación — ver
-- CLAUDE.md §5. Permite que dentro de una misma invitación algunas personas
-- confirmen que sí asisten y otras que no (ej. una pareja que se separó).
-- `invitaciones.confirmado`/`cupos_confirmados` pasan a ser un resumen
-- DERIVADO de `personas.asistira`, ya no se editan directamente.

alter table personas
  add column asistira boolean;

-- ── obtener_invitacion: ahora incluye id y asistira por persona ─────────

drop function public.obtener_invitacion(uuid);

create function public.obtener_invitacion(p_token uuid)
returns table (
  id                    uuid,
  token_unico           uuid,
  mesa                  int,
  cupos                 int,
  confirmado            boolean,
  cupos_confirmados     int,
  notas                 text,
  mensaje_personalizado text,
  personas              jsonb
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
      (select jsonb_agg(jsonb_build_object(
                'id', p.id, 'nombre', p.nombre, 'apellido', p.apellido,
                'genero', p.genero, 'rol', p.rol, 'asistira', p.asistira
              )
              order by (p.rol = 'principal') desc, p.creado_en)
       from personas p where p.invitacion_id = i.id),
      '[]'::jsonb
    ) as personas
  from invitaciones i
  where i.token_unico = p_token;
$$;

revoke all on function public.obtener_invitacion(uuid) from public;
grant execute on function public.obtener_invitacion(uuid) to anon, authenticated;

-- ── confirmar_asistencia: recibe el detalle por persona ─────────────────

drop function public.confirmar_asistencia(uuid, boolean, int, text);

create function public.confirmar_asistencia(
  p_token    uuid,
  p_personas jsonb, -- [{"id": "<uuid>", "asistira": true|false}, ...]
  p_notas    text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invitacion_id uuid;
  v_fecha_limite timestamptz;
  v_item jsonb;
  v_total_si int;
begin
  select id into v_invitacion_id from invitaciones where token_unico = p_token;
  if not found then
    raise exception 'Invitación no encontrada';
  end if;

  select valor::timestamptz into v_fecha_limite
  from configuracion_sitio where clave = 'rsvp_fecha_limite';

  if v_fecha_limite is not null and now() > v_fecha_limite then
    raise exception 'La fecha límite para confirmar ya pasó';
  end if;

  for v_item in select * from jsonb_array_elements(p_personas)
  loop
    update personas
    set asistira = (v_item->>'asistira')::boolean
    where id = (v_item->>'id')::uuid
      and invitacion_id = v_invitacion_id;

    if not found then
      raise exception 'Persona inválida para esta invitación';
    end if;
  end loop;

  select count(*) filter (where asistira = true) into v_total_si
  from personas where invitacion_id = v_invitacion_id;

  update invitaciones
  set confirmado         = (v_total_si > 0),
      cupos_confirmados  = v_total_si,
      notas              = coalesce(p_notas, notas),
      fecha_confirmacion = now()
  where id = v_invitacion_id;
end;
$$;

revoke all on function public.confirmar_asistencia(uuid, jsonb, text) from public;
grant execute on function public.confirmar_asistencia(uuid, jsonb, text) to anon, authenticated;
