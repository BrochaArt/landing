-- Lista de acceso anticipado de la landing de BROCHA.
--
-- Modelo de acceso: la landing solo puede AGREGAR correos. No existe política
-- de SELECT, UPDATE ni DELETE, así que ni con la clave publishable en mano se
-- puede leer, modificar ni borrar la lista desde la API. Para consultarla se
-- usa el dashboard de Supabase o la service_role key, que vive solo ahí.

create table if not exists public.subscribers (
  id         uuid        primary key default gen_random_uuid(),
  email      text        not null,
  source     text        not null default 'landing',
  created_at timestamptz not null default now()
);

-- Único por correo, insensible a mayúsculas. El endpoint ya normaliza a
-- minúsculas; el índice funcional lo garantiza aunque alguien inserte por otra
-- vía. Una violación aquí devuelve 23505, que el endpoint traduce a
-- "ya estabas suscrito" en vez de a un error.
create unique index if not exists subscribers_email_lower_key
  on public.subscribers (lower(email));

alter table public.subscribers enable row level security;

drop policy if exists "landing puede suscribir" on public.subscribers;
create policy "landing puede suscribir"
  on public.subscribers
  for insert
  to anon
  with check (true);

-- En Supabase, una tabla creada por SQL no queda expuesta a la Data API por sí
-- sola: hay que otorgar el permiso al rol explícitamente. Solo INSERT.
grant usage  on schema public       to anon;
grant insert on public.subscribers  to anon;
