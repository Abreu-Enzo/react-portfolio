-- Banco do portfólio (Supabase / Postgres).
-- Rode uma vez no SQL Editor do Supabase. Regras explicadas em docs/decisoes.md.
--
-- Quem pode o quê:
--   Visitante (anon): só INSERE Mensagem nova (status pendente) e LÊ os Destaques.
--   Dono (authenticated + registrado em public.owner): lê Mensagens, avança o status
--   e escolhe os Destaques.

-- ---------- Dono ----------
-- Depois de criar seu usuário em Authentication > Users, registre o id dele aqui:
--   insert into public.owner (user_id) values ('<id-do-usuario>');
create table public.owner (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- RLS ligado e nenhuma policy: ninguém lê esta tabela pela API.
alter table public.owner enable row level security;

-- true quando quem está logado é o Dono. "security definer" deixa a função
-- consultar public.owner mesmo sem policy de leitura nela.
create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.owner where user_id = auth.uid());
$$;

-- ---------- Mensagens ----------
create table public.messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 200),
  body text not null check (char_length(body) between 20 and 2000),
  status text not null default 'pending' check (status in ('pending', 'read', 'answered')),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Visitante envia Mensagem pendente"
  on public.messages for insert
  to anon, authenticated
  with check (status = 'pending');

create policy "Dono lê as Mensagens"
  on public.messages for select
  to authenticated
  using (public.is_owner());

create policy "Dono altera o status"
  on public.messages for update
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());

-- Permissões por coluna: no update, só o status pode mudar.
grant insert (name, email, body) on public.messages to anon, authenticated;
grant select on public.messages to authenticated;
grant update (status) on public.messages to authenticated;

-- Estados só avançam: pendente -> lida -> respondida (nunca voltam).
create or replace function public.messages_status_only_forward()
returns trigger
language plpgsql
as $$
begin
  if array_position(array['pending', 'read', 'answered'], new.status)
     < array_position(array['pending', 'read', 'answered'], old.status) then
    raise exception 'O status da Mensagem só avança (de % para % não é permitido)', old.status, new.status;
  end if;
  return new;
end;
$$;

create trigger messages_status_only_forward
  before update of status on public.messages
  for each row execute function public.messages_status_only_forward();

-- ---------- Destaques ----------
-- Guarda o id numérico do repositório no GitHub (sobrevive a renomeação).
-- position 1..3 + unique = no máximo 3 Destaques.
create table public.featured_projects (
  github_repo_id bigint primary key,
  position smallint not null unique check (position between 1 and 3),
  created_at timestamptz not null default now()
);

alter table public.featured_projects enable row level security;

create policy "Todos leem os Destaques"
  on public.featured_projects for select
  to anon, authenticated
  using (true);

create policy "Dono escolhe os Destaques"
  on public.featured_projects for all
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());

grant select on public.featured_projects to anon, authenticated;
grant insert, update, delete on public.featured_projects to authenticated;
