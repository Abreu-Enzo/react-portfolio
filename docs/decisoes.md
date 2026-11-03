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

## Carregamento do login e do dashboard
- Opções comparadas: importar tudo no pacote inicial; `React.lazy` + `Suspense`; propriedade `lazy` das rotas do React Router
- Critério: o Visitante não deve baixar o código da área do Dono; solução que apareça nas possibilidades da `criterios-e-instrucoes` (3.8)
- Escolha: `React.lazy` + `Suspense`. As páginas ficam em `src/routes/lazyPages.js` (o ESLint do Fast Refresh não aceita componentes criados no `main.jsx`, que não exporta nada) e o `Suspense` fica no `AuthLayout`, o layout das rotas do Dono que também fornece a sessão. O build gera `LoginPage-*.js` e `DashboardPage-*.js` separados.
- O que aceitamos perder (trade-off): um instante de carregamento (spinner) na primeira vez que o Dono abre o login ou o dashboard.

## Sessão do Dono e rota protegida
- Opções comparadas: `localStorage` com token próprio (como na apostila); sessão do Supabase Auth em um `AuthContext`
- Critério: a proteção precisa valer no backend, e não só esconder a tela
- Escolha: `AuthProvider` lê a sessão do Supabase e ouve login/logout (`onAuthStateChange`); o `PrivateRoute` da apostila usa essa sessão e redireciona com `<Navigate to="/login" replace />`. Enquanto a sessão está sendo lida, mostra um spinner em vez de redirecionar (senão o Dono logado seria jogado para o login no F5). O `AuthProvider` envolve só `/login` e `/dashboard`.
- O que aceitamos perder (trade-off): o `PrivateRoute` sozinho não protege nada; quem garante que só o Dono lê as Mensagens é o RLS.

## Como salvar os Destaques
- Opções comparadas: apagar e regravar a lista inteira; atualizar linha a linha; função SQL (RPC) que troca a lista numa transação
- Critério: código curto e explicável; respeitar `position` único (1 a 3) sem conflito ao reordenar
- Escolha: apagar todos e inserir a lista nova com posições 1..N, a cada Switch ligado ou desligado. O Switch muda na hora (atualização otimista) e volta se o banco recusar; todos ficam desabilitados enquanto salva.
- O que aceitamos perder (trade-off): as duas operações não são atômicas. Se o insert falhar depois do delete, os Destaques ficam vazios e a home volta a mostrar os 3 Projetos mais recentes até o Dono salvar de novo.

## Atualização das Mensagens no dashboard
- Opções comparadas: virar Lida ao expandir; botões separados para expandir e para marcar como Lida. Esperar o banco ou atualização otimista.
- Critério: Mensagem curta, que cabe numa linha, não tem o que expandir e mesmo assim precisa poder virar Lida; o Dono decide quando muda o status, e os estados não têm desfazer
- Escolha: botões separados. "Expandir" (só aparece quando o texto não cabe na linha) muda apenas a visualização; "Marcar como lida" (só em Pendente) e "Marcar como respondida" mudam o status. As duas ações de status esperam o banco, com spinner, e os botões da linha ficam bloqueados enquanto salva. O service confere quantas linhas o banco alterou: 0 linhas (barrado pelo RLS) conta como erro, e não como sucesso.
- O que aceitamos perder (trade-off): um clique a mais para marcar como Lida e um instante de espera em cada mudança de status.

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
- Escolha: três estados: pendente, lida e respondida. Toda Mensagem nasce Pendente; vira Lida pelo botão "Marcar como lida" (expandir o texto não muda o status); vira Respondida pelo botão "Marcar como respondida" (a partir de Pendente ou Lida). Os estados só avançam: Respondida é final e Lida não volta a Pendente. O contador da marca mostra só as Pendentes; os `StatTile`s mostram Pendentes, Lidas e Respondidas.
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
- Escolha: na primeira visita, segue o sistema (fallback escuro); depois que o Visitante alterna, a escolha fica no `localStorage` e prevalece. Um script inline no `index.html` aplica o tema antes da renderização, sem flash; o `ThemeProvider` só lê o `data-theme` que o script já pôs no `<html>`, para a regra existir em um lugar só. O tema é gravado só quando o Visitante clica (gravar o tema do sistema na primeira visita faria o site parar de seguir o sistema). A troca usa revelação circular com a View Transitions API; sem suporte ou com movimento reduzido, troca direto.
- O que aceitamos perder (trade-off): a primeira impressão nem sempre é o tema escuro da referência visual.

## Cache do GitHub e limite de requisições
- Opções comparadas: cache só em memória (Context); memória + `sessionStorage` com validade; token de acesso
- Critério: sem requisições repetidas ao navegar nem no F5, sem expor segredo no front (limite de 60 req/h por IP sem token)
- Escolha: memória + `sessionStorage` com validade de 10 minutos. No rate limit, com cache: mostra os dados em cache com aviso; sem cache: `ErrorState` de limite com o horário em que a API volta.
- O que aceitamos perder (trade-off): dados até 10 minutos desatualizados; token descartado porque ficaria público.

## Formatação e testes
- Opções comparadas: Prettier, Biome; Vitest + Testing Library, Playwright
- Critério: convivência com o ESLint do template e com a configuração do Vite; cobrir validação do formulário e bloqueio do dashboard
- Escolha: Prettier (com Husky + lint-staged) e Vitest + Testing Library, com jsdom simulando o navegador. Os testes trocam o Supabase por dublês: o `ContactPage` usa um `sendContactMessage` falso (`vi.mock`) e o `PrivateRoute` recebe a sessão direto pelo `AuthContext`. Um workflow do GitHub Actions (`.github/workflows/ci.yml`) roda formatação, lint, testes e build em cada PR.
- O que aceitamos perder (trade-off): sem testes de ponta a ponta no navegador real; o envio de verdade ao Supabase e ao EmailJS e as regras de RLS não são testados automaticamente.

## Versionamento e hooks de commit
- Opções comparadas: Conventional Commits, Gitmoji; GitHub Flow, Git Flow, trunk-based; validar só na revisão do PR ou com hooks locais (Husky)
- Critério: padrão que dá para conferir automaticamente e explicar em uma frase; um aluno só, com entregas curtas na `main`
- Escolha: Conventional Commits em português, validado pelo commitlint no hook `commit-msg`; Husky + lint-staged no `pre-commit` (ESLint e Prettier só nos arquivos do commit, para ser rápido); GitHub Flow (`main` sempre publicável, uma branch por funcionalidade, merge por PR). Como o `package.json` fica em `my-portfolio/` e o `.git` na raiz, o script `prepare` roda `cd .. && husky my-portfolio/.husky` e cada hook entra em `my-portfolio/` antes de rodar.
- O que aceitamos perder (trade-off): hooks locais podem ser pulados com `--no-verify`; por isso o CI repete formatação, lint, testes e build no PR.

## Seções Sobre, Trajetória e Skills da home
- Opções comparadas: lista simples ou linha do tempo; skills em pílulas (`Badge`) ou em cards ilustrados; cores soltas nos cards ou tokens novos
- Critério: pedido do Dono (linha do tempo como na referência, cards com cor, ilustração e descrição) sem quebrar as regras do design system (só `var(--…)`, contraste nos dois temas)
- Escolha: `Timeline` virou linha do tempo (vertical à esquerda no celular, alternada a partir de 900px), com hover por item. Skills de soft e produto em `SkillCard` sobre tokens novos `--tint-sky|lime|sand|rose|violet` (em `tokens.css` e `tokens.json`); tecnologia continua no `StackGrid`. Ilustrações de traço do Figma Community usadas como máscara CSS, para pegar a cor do tema. Fotos do Dono em WebP (`sharp`) com `width`/`height` e `loading="lazy"`.
- O que aceitamos perder (trade-off): o design system deixa de ser só monocromático (cinco fundos suaves, restritos aos cards de skill). O limite de chamadas do plano gratuito do Figma permitiu baixar só 3 das 7 ilustrações: as outras 4 usam um ícone do design system até serem exportadas.

## Recursos usados além da react-fundamentos
- Opções comparadas: ficar só com o que as apostilas mostram; usar o recurso equivalente do React, do React Router ou do navegador quando o da apostila não resolve
- Critério: a regra do projeto pede a opção da disciplina primeiro; fora dela, só quando ela não atende e com o motivo registrado
- Escolha:
  - `setState((atual) => ...)` (forma com função do próprio `useState`) em `useMessages` e `useFeatured`: o estado muda depois de um `await`, quando o valor capturado no render pode estar velho. A forma da apostila, `setX({ ...x })`, apagaria uma mudança feita nesse meio-tempo.
  - `createMemoryRouter` nos testes do `PrivateRoute`: é o mesmo roteador do `createBrowserRouter`, mas com a URL em memória, porque no teste não existe barra de endereço.
  - Trocados por recursos da disciplina: o `ResizeObserver` do `MessageRow` virou ouvinte de `resize` da janela em `useEffect` com limpeza; a animação do círculo do tema saiu do `element.animate()` (JavaScript) e foi para `@keyframes` no CSS, com a origem passada por variáveis CSS.
- O que aceitamos perder (trade-off): dois recursos a explicar no vídeo; com o ouvinte de `resize`, o botão "Expandir" não se atualiza se a largura da lista mudar sem a janela mudar (não acontece no layout atual).

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
