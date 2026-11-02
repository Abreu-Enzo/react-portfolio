# Decisões técnicas

Registro das escolhas relevantes do projeto: opções comparadas, critério e o que aceitamos perder. Alimenta a parte 2 do vídeo.

## Prazo e prioridade de escopo
- Opções comparadas: implementar tudo em paralelo; priorizar requisitos obrigatórios e cortar o opcional
- Critério: prazo em 03/11 com o app ainda no template do Vite em 02/11
- Escolha: ordem de prioridade (1) rotas + GitHub + estados de carregamento, (2) formulário de contato com envio e gravação, (3) login + dashboard, (4) tema persistido, (5) testes + Husky + deploy, (6) cena 3D. A cena 3D é a primeira a cair; a `HeroScene` fica como placeholder estático com dimensões reservadas.
- O que aceitamos perder (trade-off): elemento 3D interativo e um histórico de commits concentrado em poucos dias (real, não forjado).

## Backend (login, mensagens e destaques)
- Opções comparadas: Supabase, Firebase, backend Node próprio
- Critério: proteção real no backend com o mínimo de código para manter e explicar; um único serviço para autenticação e dados
- Escolha: Supabase. Login pelo Supabase Auth; mensagens e destaques em tabelas Postgres; RLS garante que o visitante só insere mensagens e só o Dono lê e altera.
- O que aceitamos perder (trade-off): dependência de um serviço externo e do plano gratuito; menos controle do que um backend próprio.

## Envio do e-mail ao Dono
- Opções comparadas: EmailJS, Formspree, Edge Function do Supabase + Resend
- Critério: enviar e-mail sem escrever nem hospedar backend extra
- Escolha: EmailJS, chamado do front com a chave pública. O formulário salva a mensagem no Supabase e depois dispara o EmailJS. Se o salvamento der certo e o e-mail falhar, o visitante vê sucesso, porque a mensagem não se perdeu (fica no dashboard).
- O que aceitamos perder (trade-off): o e-mail não é garantido; chave pública exposta no front (aceitável, limitada por domínio no painel do EmailJS).

## Como o banco reconhece o Dono
- Opções comparadas: qualquer usuário autenticado; e-mail do Dono escrito nas policies; tabela `owner` com o id do usuário
- Critério: proteção real mesmo se alguém criar outra conta no Supabase; não expor o e-mail do Dono no repositório público
- Escolha: tabela `public.owner` (sem leitura pela API) + função `is_owner()` usada nas policies de RLS. Permissões por coluna deixam o Visitante inserir só nome, e-mail e texto, e o Dono alterar só o status; um trigger impede o status de voltar atrás. Tudo em `supabase/schema.sql`.
- O que aceitamos perder (trade-off): um passo manual na configuração (registrar o id do Dono depois de criar o usuário).

## O que conta como Projeto
- Opções comparadas: todos os repositórios; só públicos; públicos sem forks e sem arquivados; lista manual
- Critério: o requisito proíbe cadastro manual; forks e arquivados não representam trabalho atual
- Escolha: Projeto = repositório público, não-fork e não-arquivado de `Abreu-Enzo`, incluindo este portfólio. Repo sem descrição aparece com "Sem descrição". Slug = nome do repo em minúsculas; a busca por slug ignora maiúsculas/minúsculas.
- O que aceitamos perder (trade-off): forks com contribuição relevante não aparecem.

## Destaques da home
- Opções comparadas: quantidade livre; limite fixo; ordem por data de atualização ou por escolha do Dono
- Critério: layout previsível na home e controle do Dono
- Escolha: até 3 Destaques, na ordem em que o Dono os marcou. Destaque cujo repositório sumiu do GitHub é ignorado na home sem erro; no dashboard aparece como "Repositório não encontrado" com opção de remover. Sem Destaques, a home mostra os 3 Projetos atualizados mais recentemente.
- O que aceitamos perder (trade-off): mais de 3 projetos em evidência.

## Estados da Mensagem
- Opções comparadas: dois estados (pendente, respondida); três estados (pendente, lida, respondida)
- Critério: o Dono quer distinguir o que ainda não viu do que já viu mas não respondeu
- Escolha: três estados: pendente, lida e respondida. Toda Mensagem nasce Pendente; vira Lida quando o Dono a expande no dashboard; vira Respondida pelo botão "Marcar como respondida" (a partir de Pendente ou Lida). Os estados só avançam: Respondida é final e Lida não volta a Pendente. O contador da marca mostra só as Pendentes; os `StatTile`s mostram Pendentes, Lidas e Respondidas.
- O que aceitamos perder (trade-off): um pouco mais de lógica e de UI no dashboard; um clique errado em "Marcar como respondida" não tem desfazer.

## Referência do Destaque ao Projeto
- Opções comparadas: guardar o slug (nome do repo); guardar o id numérico do repo no GitHub
- Critério: o Destaque deve sobreviver a uma renomeação do repositório
- Escolha: guardar o id do GitHub. O slug da URL acompanha o nome atual do repo.
- O que aceitamos perder (trade-off): o registro no banco não é legível sem consultar o GitHub.

## Dono e acesso ao dashboard
- Opções comparadas: um Dono criado manualmente; cadastro aberto com papel de administrador
- Critério: o site tem um único dono; cadastro aberto é superfície de ataque sem benefício
- Escolha: um único Dono, criado à mão no painel do Supabase, login por e-mail e senha, sem rota de cadastro. O RLS verifica que o usuário é o Dono, não só que está autenticado.
- O que aceitamos perder (trade-off): trocar de Dono exige mexer no Supabase.

## Tema na primeira visita
- Opções comparadas: sempre escuro; seguir `prefers-color-scheme` do sistema
- Critério: respeitar a preferência do Visitante antes mesmo de ele escolher
- Escolha: na primeira visita, segue o sistema (fallback escuro); depois que o Visitante alterna, a escolha fica no `localStorage` e prevalece. Um script inline no `index.html` aplica o tema antes da renderização, sem flash.
- O que aceitamos perder (trade-off): a primeira impressão nem sempre é o tema escuro da referência visual.

## Cache do GitHub e limite de requisições
- Opções comparadas: cache só em memória (Context); memória + `sessionStorage` com validade; token de acesso
- Critério: sem requisições repetidas ao navegar nem no F5, sem expor segredo no front (limite de 60 req/h por IP sem token)
- Escolha: memória + `sessionStorage` com validade de 10 minutos. No rate limit, com cache: mostra os dados em cache com aviso; sem cache: `ErrorState` de limite com o horário em que a API volta.
- O que aceitamos perder (trade-off): dados até 10 minutos desatualizados; token descartado porque ficaria público.

## Formatação e testes
- Opções comparadas: Prettier, Biome; Vitest + Testing Library, Playwright
- Critério: convivência com o ESLint do template e com a configuração do Vite; cobrir validação do formulário e bloqueio do dashboard
- Escolha: Prettier (com Husky + lint-staged) e Vitest + Testing Library
- O que aceitamos perder (trade-off): sem testes de ponta a ponta no navegador real.

## Item ativo do menu
- Opções comparadas: `Link` + `useLocation` comparando o caminho à mão; `NavLink` do React Router
- Critério: marcar a página atual com `aria-current="page"` sem lógica extra; nenhum dos dois está na lista da `react-fundamentos`, que só cita `Link`
- Escolha: `NavLink` (mesmo pacote `react-router`, sem dependência nova), com `end` no item "Início" para ele não ficar ativo em todas as rotas
- O que aceitamos perder (trade-off): um componente a mais fora do conteúdo da disciplina, que precisa ser explicado no vídeo.

## Glossário
- Opções comparadas: `CONTEXT.md`, `GLOSSARY.md`
- Critério: seguir a convenção da skill de modelagem de domínio usada no harness
- Escolha: `GLOSSARY.md` na raiz do repositório
- O que aceitamos perder (trade-off): nada relevante.

## Idioma dos nomes
- Opções comparadas: tudo em português; tudo em inglês; código em inglês e interface em português
- Critério: o design system já nomeia os componentes em inglês e o público do site é brasileiro
- Escolha: código em inglês (componentes, hooks, services, funções, tabelas e colunas); português em tudo que o Visitante vê (rotas, textos, mensagens de erro). O `GLOSSARY.md` define os termos em português.
- O que aceitamos perder (trade-off): duas línguas convivendo (ex.: rota `/projetos` renderiza `ProjectsPage`).
