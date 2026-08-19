-- Corrige un olvido de 0001_init.sql: las políticas de RLS solo filtran
-- filas, pero Postgres exige además el GRANT de privilegio a nivel de tabla
-- antes de evaluar RLS. Al desactivar "Automatically expose new tables" al
-- crear el proyecto (a propósito, para no exponer nada por defecto), esas
-- tablas se quedaron sin ningún grant — incluidas las que sí queríamos
-- accesibles (configuracion_sitio para el público, las tres para admin).

grant usage on schema public to anon, authenticated;

grant select on configuracion_sitio to anon;

grant select, insert, update, delete on invitaciones to authenticated;
grant select, insert, update, delete on acompanantes to authenticated;
grant select, insert, update, delete on configuracion_sitio to authenticated;
