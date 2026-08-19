-- service_role bypassa RLS, pero igual necesita el GRANT de privilegio a
-- nivel de tabla (igual que anon/authenticated en 0002) — se quedó fuera al
-- desactivar "Automatically expose new tables" al crear el proyecto.

grant select, insert, update, delete on invitaciones to service_role;
grant select, insert, update, delete on personas to service_role;
grant select, insert, update, delete on configuracion_sitio to service_role;
