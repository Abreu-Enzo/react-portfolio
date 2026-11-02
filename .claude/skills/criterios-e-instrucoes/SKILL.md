---
name: criterios-e-instrucoes
description: Guia de trabalho e checklist de aceite do CP3 (FIAP) - portfólio pessoal em React com integração GitHub, formulário de contato, dashboard protegido, tema persistido, performance, testes, deploy na Vercel, padrões de commit/branch e vídeo de entrevista. Use SEMPRE que a tarefa envolver este projeto (código, arquitetura, commits, branches, README, deploy, testes, revisão ou preparação do vídeo) e quando o usuário pedir para validar/conferir se o projeto está pronto para entrega.
---

# CP3 — Portfólio: Stack e Harness Engineering

Esta skill é o **guia de como trabalhar neste projeto** e o **checklist final de entrega**. Toda tarefa deve respeitar as regras abaixo; antes de declarar uma funcionalidade pronta, confira os critérios de aceite correspondentes.

## 1. Contexto do projeto

- **O que é:** site de portfólio pessoal em React, publicado, mais um vídeo simulando entrevista técnica que apresenta a stack e o harness de IA.
- **Formato:** individual.
- **Prazo:** 03/11.
- **Entrega (tarefa do Teams):**
  1. Link do repositório no GitHub (público)
  2. Link do projeto publicado na Vercel
  3. Link do vídeo no YouTube em modo **não listado**
- **Uso de IA:** liberado e esperado. O aluno precisa **saber explicar todo o código** e **mostrar como configurou e conduziu a IA**. Por isso:
  - Explique decisões não óbvias ao implementar (em resposta e, quando relevante, em `docs/decisoes.md`).
  - Não gere código "mágico" que o aluno não consiga justificar; prefira soluções simples e legíveis.
- **Estrutura atual do repositório:**
  - Raiz do Git: `react-portfolio/`
  - App: `react-portfolio/my-portfolio/` (Vite + React 19, JavaScript, ESLint já configurado)
  - Na Vercel, o **Root Directory** deve ser `my-portfolio`.
  - Guia técnico de React: a skill `react-fundamentos` (conteúdo das apostilas da disciplina). Esta skill define **o que** entregar; a `react-fundamentos` define **como** escrever o código.
- **Inspirações de design:** reactjsexample.com (templates de portfólio React), bruno-simon.com, awwwards.com/websites/portfolio.

### Regra de ouro das escolhas técnicas
Cada requisito traz "possibilidades" de implementação. Elas são ponto de partida: pode-se usar outras, **desde que se pesquise as alternativas, compare prós e contras e justifique a escolha**. Sempre que uma escolha relevante for feita, registre em `docs/decisoes.md` no formato:

```
## <Tema> (ex.: Roteamento)
- Opções comparadas: A, B, C
- Critério: ...
- Escolha: B
- O que aceitamos perder (trade-off): ...
```

Esse arquivo alimenta a parte 2 do vídeo (justificativas da stack).

### Prioridade entre as possibilidades
- Em cada requisito, a opção marcada com **[react-fundamentos]** vem da skill `react-fundamentos` (conteúdo da disciplina) e é o **padrão**: use-a primeiro.
- Use outra possibilidade da lista **somente** quando a opção da disciplina não atender ao critério de aceite (ex.: proteção real no backend, envio de e-mail, testes, hooks de commit). Nesses casos, a ferramenta está **autorizada para este projeto** mesmo fora do escopo da `react-fundamentos`, mas: avise o aluno antes de instalar a dependência, explique a escolha e registre em `docs/decisoes.md`.
- Tudo que não estiver nas listas abaixo nem na `react-fundamentos`: pergunte antes.

## 2. Como trabalhar neste projeto (regras para a IA)

### 2.1 Fluxo de branches
- Nunca commitar direto na `main`. Cada funcionalidade em branch própria a partir da `main`, integrada via pull request (merge na `main`).
- Nomes de branch: `feature/<nome>`, `fix/<nome>`, `chore/<nome>`, `docs/<nome>`, `test/<nome>` (kebab-case). Ex.: `feature/dashboard`, `feature/formulario-contato`.
- Estratégia recomendada: GitHub Flow (main sempre deployável + branches curtas + PR). Se outra for escolhida, registrar em `docs/decisoes.md` e no README.
- Antes de começar uma tarefa: confirmar em qual branch está; se for uma funcionalidade nova, criar a branch.

### 2.2 Commits
- Padrão **Conventional Commits**, mensagem em português, no imperativo/presente, descrição curta:
  `tipo(escopo opcional): descrição`
  - Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
  - Ex.: `feat: adiciona validação do formulário de contato`, `fix(github): trata limite de requisições da API`.
- Commits pequenos e atômicos (uma mudança lógica por commit).
- Validação automática com commitlint + Husky (hook `commit-msg`).
- Nunca commitar `.env`, segredos ou chaves.
- O histórico deve ser real e distribuído ao longo do prazo; não reescrever datas nem forjar histórico.

### 2.3 Arquitetura e organização de pastas
Estrutura base (dentro de `my-portfolio/src`), ajustável se justificada:

```
src/
  components/   # componentes reaproveitáveis, um por pasta com .jsx + .css (ex.: Card/Card.jsx + Card.css) [react-fundamentos]
  pages/        # páginas e layouts das rotas (RootLayout, Home, Projeto, Contato, Login, Dashboard, PageNotFound) [react-fundamentos]
  hooks/        # hooks personalizados (useGithubRepos, useTheme, useAuth...)
  services/     # acesso a APIs e backend (github.js, messages.js, supabase.js...)
  contexts/     # contextos (tema, autenticação) se usados
  routes/       # definição das rotas, rota protegida
  schemas/      # regras de validação: funções puras de validação manual [react-fundamentos] (Zod só se a validação manual não bastar)
  styles/       # estilos globais / tokens em CSS puro (variáveis CSS) [react-fundamentos]
  utils/        # funções puras auxiliares
  assets/       # imagens otimizadas
  test/ ou *.test.jsx junto ao arquivo testado
```

Regras:
- Componentes pequenos e reaproveitáveis; **lógica separada da apresentação**: chamadas à API ficam em `services/` e são consumidas por hooks; componentes visuais só recebem props e renderizam.
- Componentes de UI (botão, card, input, skeleton) criados uma vez e reutilizados em todas as páginas — não duplicar variações.
- Nada de `fetch` direto dentro de componentes de página/visuais.

### 2.4 Convenções de nomenclatura
- Componentes e páginas: **PascalCase** (`ProjectCard.jsx`, `DashboardPage.jsx`).
- Hooks: começam com `use` em camelCase (`useGithubRepos.js`).
- Services, utils e variáveis/funções: camelCase (`githubService.js`, `formatDate`).
- Constantes globais: UPPER_SNAKE_CASE.
- Pastas: minúsculas, **exceto** as pastas de componentes em `components/`, que usam o nome do componente em PascalCase (`components/Card/`), conforme a `react-fundamentos`.
- Componentes: `export default`; utilitários com várias funções: export nomeado [react-fundamentos].
- Variáveis de ambiente do Vite: prefixo `VITE_`.
- Estas convenções devem estar descritas no README e no `CLAUDE.md` do projeto.

### 2.5 Padrão de código automatizado
- ESLint + Prettier (ou Biome), com scripts `lint` e `format` no `package.json`.
- Husky + lint-staged: lint e formatação rodam no `pre-commit` sobre os arquivos alterados.
- Antes de considerar uma tarefa concluída: rodar `npm run lint`, `npm test` e `npm run build` dentro de `my-portfolio/` e corrigir erros.

### 2.6 Segurança e ambiente
- `.env` no `.gitignore`; manter `.env.example` atualizado com **todas** as variáveis (sem valores reais).
- Chaves sensíveis (service role, senhas) nunca no front-end. Chaves públicas (anon key do Supabase, public key do EmailJS) podem ir em `VITE_*`, mas o acesso a dados deve ser protegido por regras do backend (ex.: RLS no Supabase: visitante só insere mensagem; só o dono lê/atualiza).
- Variáveis de ambiente também configuradas na Vercel.

## 3. Requisitos do site (todos obrigatórios) e critérios de aceite

Marque cada item só quando for verificável no código e no site publicado.

### 3.1 Rotas
*Possibilidades: **[react-fundamentos]** React Router no modo Data (`createBrowserRouter` + `RouterProvider`), rota dinâmica `projetos/:slug` lida com `useParams`, layout com `<Outlet />`, 404 com `errorElement` + `path: "*"`, navegação com `<Link>`; React Router, TanStack Router, wouter, Next.js; redirecionamento no servidor (ex.: `vercel.json` rewrites, `.htaccess`).*
- [ ] Cada projeto tem link individual (ex.: `/projetos/meu-app`), baseado no nome/slug do repositório.
- [ ] Página amigável para rota inexistente (404) com caminho de volta para a home.
- [ ] Página/estado amigável para falha no carregamento da API (com opção de tentar novamente).
- [ ] Link compartilhado abre direto na página certa, **inclusive ao atualizar o navegador (F5)** em qualquer rota no site publicado (SPA: configurar rewrite para `index.html`, ex. `vercel.json`).
- [ ] Projeto inexistente em `/projetos/<slug-invalido>` mostra estado de "não encontrado", não tela branca.

### 3.2 Estados de carregamento
*Possibilidades: **[react-fundamentos]** `useState` para `carregando`/`erro`/dados + `useEffect` para buscar, skeleton/spinner feitos com CSS puro como componente reutilizável; skeleton ou spinner; useState, Suspense, TanStack Query, SWR; react-loading-skeleton ou componentes da lib de UI.*
- [ ] **Todo** dado vindo de API (repos do GitHub, detalhe do projeto, destaques, mensagens do dashboard) exibe os três estados: **carregando**, **erro** e **lista vazia**.
- [ ] Indicador visual durante carregamento (ex.: skeleton nos cards de projeto; spinner no envio do formulário).
- [ ] Botão de enviar fica **desabilitado durante o envio**, impedindo mensagens duplicadas (inclusive duplo clique).

### 3.3 Integração com o GitHub
*Possibilidades: **[react-fundamentos]** `fetch` em `services/` consumido por hook personalizado com `useState` + `useEffect`, cache compartilhado via `createContext` + `useContext` (ou em módulo) para evitar requisições repetidas, `useMemo` para filtrar/ordenar; fetch, axios, TanStack Query; tratamento do limite de requisições.*
- [ ] Projetos carregados pela API do GitHub, **sem cadastro manual** de projetos.
- [ ] Cada card mostra dados do repositório: descrição, linguagem, data da última atualização (pode incluir estrelas, link, topics).
- [ ] Limite de requisições tratado (ex.: mensagem clara ao atingir o rate limit, cache, uso de dados em cache).
- [ ] Chamada à API isolada em `services/` + hook.

### 3.4 Formulário de contato
*Possibilidades: **[react-fundamentos]** formulário controlado com `useState` (objeto atualizado com spread), validação manual por campo em função pura, `useRef` para focar o primeiro campo com erro, `label` com `htmlFor`; para enviar e salvar (fora do escopo da disciplina, autorizado): validação manual, React Hook Form, Formik; Zod, Yup; EmailJS, Formspree, backend próprio.*
- [ ] Validação **por campo**, com mensagem específica (ex.: "e-mail inválido", "mensagem com no mínimo 20 caracteres", "nome obrigatório").
- [ ] Mensagem é **enviada por e-mail ao dono** do site.
- [ ] Mensagem é **salva** para consulta no dashboard.
- [ ] Feedback de **sucesso ou erro** após o envio.
- [ ] Botão bloqueado durante o envio (ver 3.2).

### 3.5 Dashboard do dono
*Possibilidades: **[react-fundamentos]** componente wrapper `PrivateRoute` com `<Navigate to="/login" replace />`, `useNavigate` com `{ replace: true }` após login/logout, layout próprio do dashboard com `<Outlet />`, estado de sessão com `createContext` + `useContext` (o `localStorage` da apostila serve só para lembrar a sessão no front; a proteção real exige backend, autorizado abaixo); Supabase, Firebase, Appwrite, PocketBase, backend Node; rotas protegidas; Context, Zustand, Redux Toolkit ou nenhuma lib de estado.*
- [ ] Acesso protegido por **login**; quem não está autenticado é **redirecionado** (ex.: para `/login`).
- [ ] Lista das mensagens recebidas.
- [ ] Opção de **marcar mensagem como respondida** (persistida no backend).
- [ ] Seleção dos **projetos em destaque** na home (persistida e refletida na home).
- [ ] Proteção real também no backend (regras de acesso), não só no front.

### 3.6 Preferências do visitante
*Possibilidades: **[react-fundamentos]** `createContext` + `useContext` + `useState` para o tema, `useEffect` gravando em `localStorage`, `useState` com inicialização preguiçosa lendo o `localStorage`, variáveis CSS por tema; Context + localStorage, Zustand, bibliotecas de tema.*
- [ ] Tema claro/escuro com alternância visível.
- [ ] Preferência **persistida entre visitas** (saiu no escuro → abre no escuro).
- [ ] Sem "flash" do tema errado ao abrir (aplicar o tema antes da renderização, ex.: script inline no `index.html`).

### 3.7 Interface
*Possibilidades: **[react-fundamentos]** CSS puro (`index.css` global com variáveis CSS + um `.css` por componente), componentes reutilizáveis com props, valores padrão e `children`, composição (`Header`, `Main`, `Footer`); CSS puro, CSS Modules, Tailwind, shadcn/ui, MUI, Mantine; Three.js, React Three Fiber, Spline.*
- [ ] Layout responsivo **testado em celular e desktop**.
- [ ] Componentes visuais reaproveitados (mesmo botão, mesmo card em todas as páginas).
- [ ] Identidade visual própria (paleta, tipografia, estilo), podendo incluir elemento 3D interativo (ex.: objeto na home que reage ao mouse ou à rolagem).
- [ ] Acessibilidade básica: labels nos campos, contraste nos dois temas, foco visível, `alt` nas imagens.

### 3.8 Performance
*Possibilidades: **[react-fundamentos]** `useMemo` para cálculos caros, imagens em `src/assets/` importadas para o Vite otimizar, `npm run build` (bundle, tree-shaking, minificação); React.lazy + Suspense, divisão por rota; WebP/AVIF, `loading="lazy"`, sharp; cache com TanStack Query ou SWR; memo/useMemo; rollup-plugin-visualizer; Lighthouse e PageSpeed Insights.*
- [ ] Nota **≥ 80 em Performance no Lighthouse, modo mobile**, medida no site publicado.
- [ ] Imagens otimizadas em formato (WebP/AVIF) e tamanho, com carregamento só quando aparecem na tela (`loading="lazy"`), e `width`/`height` definidos.
- [ ] Dashboard e elementos pesados (ex.: cena 3D) **carregados sob demanda**, fora do pacote inicial do visitante (verificar no build/visualizer que viram chunks separados).
- [ ] **Sem saltos de layout** (CLS baixo): skeletons com o mesmo tamanho do conteúdo final, dimensões reservadas para imagens e cena 3D.
- [ ] **Sem requisições repetidas** à API do GitHub ao navegar entre páginas (cache; conferir na aba Network).

### 3.9 Testes
*Possibilidades: (não há opção na `react-fundamentos`; autorizado para este requisito) Vitest + Testing Library, Playwright.*
- [ ] Testes automatizados da **validação do formulário** (campos inválidos mostram a mensagem específica; envio não acontece com dados inválidos).
- [ ] Teste do **bloqueio do dashboard sem login** (usuário não autenticado é redirecionado).
- [ ] Script `npm test` funcionando; todos os testes passando.
- [ ] (Recomendado) testes rodando no CI.

### 3.10 Deploy
*Possibilidades: **[react-fundamentos]** build do Vite (`npm run build` gera `dist/`, conferível com `npm run preview`); Vercel, Netlify, outros; deploy via GitHub Actions.*
- [ ] Site publicado com URL pública (Vercel).
- [ ] **Publicação automática a cada push na branch principal** (integração Vercel ↔ GitHub ou GitHub Actions).
- [ ] Variáveis de ambiente configuradas na plataforma.
- [ ] Root Directory = `my-portfolio` e rewrite de SPA funcionando.

### 3.11 Versionamento
*Possibilidades: (não há opção na `react-fundamentos`; autorizado para este requisito) Conventional Commits, Gitmoji; commitlint + Husky; GitHub Flow, Git Flow, trunk-based; PRs e proteção da branch principal.*
- [ ] Commits seguindo padrão definido (Conventional Commits), validado por commitlint + Husky.
- [ ] Estratégia de branches definida; cada funcionalidade em branch própria e integrada à `main` (preferencialmente via PR).
- [ ] (Recomendado) proteção da branch `main` no GitHub.
- [ ] Padrões descritos **no README** e **nas instruções do projeto para a IA** (`CLAUDE.md` + esta skill).

### 3.12 Arquitetura e padronização do código
*Possibilidades: **[react-fundamentos]** estrutura da apostila (`components/` um por pasta, `pages/`), responsabilidade única, dados via props, ESLint do template do Vite; por tipo de arquivo ou feature-based, atomic design; hooks; ESLint, Prettier, Biome; Husky + lint-staged; TypeScript.*
- [ ] Estrutura de pastas com responsabilidades claras (`components`, `pages`, `services`, `hooks`...).
- [ ] Componentes pequenos e reaproveitáveis, lógica separada da apresentação (API em `services`/hooks).
- [ ] Convenções de nomenclatura definidas e descritas no README e no `CLAUDE.md`.
- [ ] Padrão de código verificado automaticamente antes de cada commit (lint + formatação via Husky + lint-staged).

## 4. Requisitos do repositório
- [ ] Repositório **público** no GitHub.
- [ ] Histórico de commits **distribuído ao longo do prazo**.
- [ ] `.env` fora do repositório (no `.gitignore` e nunca commitado no histórico).
- [ ] `.env.example` com todas as variáveis necessárias.
- [ ] README com: descrição do projeto, link do deploy, tecnologias utilizadas, instruções para rodar (clonar, `cd my-portfolio`, `npm install`, configurar `.env`, `npm run dev`, `npm test`), estrutura de pastas, convenções de nomenclatura, padrão de commits e estratégia de branches.

## 5. Harness de IA (versionado no repositório)
O vídeo precisa **mostrar os arquivos versionados**. Mantenha no repositório:
- [ ] `CLAUDE.md` (instruções do projeto): stack, estrutura de pastas, convenções, commits, branches, comandos (`lint`, `test`, `build`) e referência a esta skill.
- [ ] `.claude/skills/criterios-e-instrucoes/SKILL.md` (esta skill), `.claude/skills/react-fundamentos/SKILL.md` e outras skills criadas.
- [ ] Conectores/MCPs configurados (ex.: `.mcp.json` com GitHub, Supabase, Vercel, Figma, navegador para testar responsividade/Lighthouse), sem segredos versionados.
- [ ] Agentes configurados, se houver (ex.: `.claude/agents/revisor.md` que revisa PRs contra este checklist).
- [ ] (Opcional) `.claude/settings.json` com hooks/permissões (ex.: rodar lint após edições).
- [ ] Registro em `docs/harness-ia.md`: ferramenta e modelo usados e por quê; o que cada arquivo faz; como o conjunto garante que a IA siga arquitetura, código, commits e branches.

## 6. Vídeo de entrevista (checklist)
Cenário: entrevista técnica para vaga front-end; apresentar o portfólio com foco na stack e no harness de IA.
- [ ] Duração **máxima de 8 minutos**.
- [ ] **Rosto e tela visíveis durante todo o vídeo**.
- [ ] Publicado no YouTube como **não listado**.
- [ ] **Parte 1 — Stack e arquitetura:** tecnologias e como se conectam; elementos visuais (diagrama simples da estrutura de pastas e do fluxo de dados); critério para dividir componentes; caminho de uma alteração da branch até o deploy (branch → commit com hooks → PR → merge na main → deploy automático na Vercel).
- [ ] **Parte 2 — Justificativas da stack:** para cada escolha relevante, opções comparadas, critério usado e o que aceitou perder (usar `docs/decisoes.md`).
- [ ] **Parte 3 — Harness de IA:** ferramenta e modelo e por quê; instruções do projeto, skills, conectores/MCPs e agentes, mostrando os arquivos versionados; como esse conjunto faz a IA seguir os padrões de arquitetura, código, commits e branches.

Quando o usuário pedir, ajude a montar roteiro do vídeo com tempos por parte e os diagramas (pastas e fluxo de dados).

## 7. Validação final (modo checklist)
Quando pedirem para validar o projeto / "está pronto para entregar?":
1. Percorra **todas** as seções 3, 4, 5 e 6, item a item.
2. Para cada item, verifique evidência concreta (arquivo, trecho de código, comando executado, comportamento no site publicado) e marque: ✅ atendido, ⚠️ parcial, ❌ ausente, ❓ precisa de verificação manual do aluno (ex.: Lighthouse no celular, vídeo).
3. Rode em `my-portfolio/`: `npm run lint`, `npm test`, `npm run build`; confira tamanho dos chunks (dashboard e 3D separados do inicial).
4. Confira no Git: padrão das mensagens (`git log --oneline`), branches de feature mergeadas, `.env` nunca commitado (`git log --all -- '*.env'`), distribuição de datas dos commits.
5. Se possível, abra o site publicado: atualize (F5) em `/projetos/<slug>` e numa rota inexistente; teste tema persistido; teste dashboard sem login; observe a aba Network ao navegar.
6. Entregue um relatório em tabela (requisito → status → evidência → o que falta) e uma lista priorizada do que corrigir até o prazo (03/11).
7. Lembre os 3 links da entrega no Teams: GitHub, Vercel e YouTube (não listado).
