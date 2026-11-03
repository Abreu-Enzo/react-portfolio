# Portfólio · Enzo Abreu

Portfólio pessoal em React (Checkpoint 3 de Web Development, FIAP). Mostra os projetos direto do GitHub, recebe mensagens pelo formulário de contato e tem um dashboard privado onde o dono lê as mensagens e escolhe os projetos em destaque da home.

**Site publicado:** https://my-portfolio-mu-amber-kcktl2ttbi.vercel.app

## O que o site faz

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, Sobre (com fotos), Trajetória (linha do tempo), Skills e os 3 Destaques |
| `/projetos` | Todos os projetos do GitHub, com filtro por linguagem |
| `/projetos/:slug` | Página de um projeto (o slug é o nome do repositório em minúsculas) |
| `/contato` | Formulário com validação por campo; a mensagem é salva no Supabase e avisa o dono por e-mail |
| `/login` | Login do dono (Supabase Auth, e-mail e senha, sem cadastro) |
| `/dashboard` | Área protegida: mensagens (Pendente → Lida → Respondida) e escolha dos Destaques |
| qualquer outra | Página 404 com caminho de volta |

Também tem tema claro/escuro salvo entre visitas (sem "flash" ao abrir), carregamento com skeleton, estados de erro e de lista vazia em todo dado de API e tratamento do limite de requisições do GitHub (cache de 10 minutos).

## Tecnologias

| Camada | Escolha |
| --- | --- |
| Interface | React 19 + Vite 8, JavaScript, CSS puro com variáveis (design system próprio em `docs/design-system/`) |
| Rotas | React Router 8 (modo Data: `createBrowserRouter` + `RouterProvider`) |
| Dados | API pública do GitHub (projetos); Supabase (login, mensagens e destaques, protegidos por RLS) |
| E-mail | EmailJS (avisa o dono quando chega mensagem) |
| Testes | Vitest + Testing Library (jsdom) |
| Padrão de código | ESLint + Prettier, Husky + lint-staged (pre-commit) e commitlint (commit-msg) |
| CI e deploy | GitHub Actions (formatação, lint, testes e build em cada PR) e Vercel (deploy automático da `main`) |

O porquê de cada escolha, com as alternativas comparadas e o que aceitamos perder, está em [`docs/decisoes.md`](docs/decisoes.md).

## Como rodar

Pré-requisitos: Node.js 20.19+ (ou 22.12+) e npm.

```bash
git clone https://github.com/Abreu-Enzo/react-portfolio.git
cd react-portfolio/my-portfolio
npm install            # também ativa os hooks do Husky
cp .env.example .env   # e preencha as variáveis (ver abaixo)
npm run dev            # http://localhost:5173
```

Comandos (sempre dentro de `my-portfolio/`):

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm test` | Roda os testes uma vez (`npm run test:watch` para ficar observando) |
| `npm run lint` | ESLint |
| `npm run format` | Formata com Prettier (`format:check` só confere) |
| `npm run build` | Gera o site em `dist/` (`npm run preview` serve o build) |

### Variáveis de ambiente (`.env`)

Todas estão listadas em [`my-portfolio/.env.example`](my-portfolio/.env.example). São chaves públicas por natureza (vão para o navegador); a proteção dos dados fica nas regras do banco. O `.env` nunca é commitado.

| Variável | Onde pegar |
| --- | --- |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Supabase > Project Settings > API |
| `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` | EmailJS > Email Services, Email Templates e Account |

### Configurar o Supabase (uma vez)

1. Crie o projeto e rode [`supabase/schema.sql`](supabase/schema.sql) no SQL Editor (tabelas, RLS, permissões por coluna e trigger de status).
2. Em Authentication > Users, crie o usuário do dono e desligue o cadastro aberto.
3. Registre o dono: `insert into public.owner (user_id) values ('<id-do-usuario>');`
4. No EmailJS, o template usa as variáveis `{{from_name}}`, `{{from_email}}` e `{{message}}`.
5. Na Vercel, cadastre as mesmas variáveis do `.env` (Root Directory: `my-portfolio`).

## Estrutura de pastas

```
react-portfolio/
├── CLAUDE.md                instruções do projeto para a IA
├── GLOSSARY.md              termos do domínio (Dono, Visitante, Projeto, Destaque, Mensagem...)
├── .claude/                 skills, agente revisor e permissões da IA (ver docs/harness-ia.md)
├── .mcp.json                conectores (MCP) da IA, sem segredos
├── .github/workflows/       CI
├── docs/
│   ├── decisoes.md          decisões técnicas (opções, critério, escolha, trade-off)
│   ├── harness-ia.md        como a IA foi configurada e conduzida
│   ├── roteiro-video.md     roteiro da entrevista (com diagramas)
│   └── design-system/       tokens, marca, contratos e CSS de referência dos componentes
├── supabase/schema.sql      banco: tabelas, RLS e permissões
└── my-portfolio/            o app (Vite)
    ├── public/              arquivos servidos sem processamento (favicon)
    ├── vercel.json          rewrite da SPA (F5 em qualquer rota)
    └── src/
        ├── components/      componentes reutilizáveis, um por pasta (.jsx + .css)
        ├── pages/           páginas e layouts das rotas
        ├── hooks/           hooks personalizados (useGithubRepos, useMessages, useTheme...)
        ├── services/        acesso a APIs e backend (GitHub, Supabase, EmailJS)
        ├── contexts/        contextos de tema e de sessão
        ├── routes/          páginas carregadas sob demanda (React.lazy)
        ├── schemas/         validação dos formulários (funções puras)
        ├── data/            conteúdo fixo da home (textos, trajetória, skills)
        ├── utils/           funções puras (slug, datas, ordenação)
        ├── styles/          tokens do design system
        ├── assets/          imagens processadas pelo Vite (fotos, logos, ilustrações)
        └── test/            configuração dos testes
```

Fluxo de dados: **service** (busca na API) → **hook** (guarda estado de carregando/erro/dados) → **página** (decide o que mostrar) → **componentes** (só recebem props e renderizam). Nenhum componente faz `fetch` direto.

## Convenções

- **Componentes e páginas:** PascalCase, `export default` (`ProjectCard.jsx`, `DashboardPage.jsx`).
- **Hooks:** `useAlgo` em camelCase. **Services, utils, variáveis e funções:** camelCase.
- **Constantes globais:** UPPER_SNAKE_CASE. **Variáveis de ambiente:** prefixo `VITE_`.
- **Pastas:** minúsculas, exceto as de componentes (PascalCase, ex.: `components/Card/`).
- **CSS:** um arquivo por componente, classes com prefixo `fo-`, valores só por token (`var(--space-6)`, `var(--brand)`).
- **Idioma:** código em inglês; tudo que o visitante vê em português.

## Commits e branches

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/pt-br/) em português, no presente: `feat(contato): adiciona validação por campo`. Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. O commitlint recusa mensagens fora do padrão.
- **Antes de cada commit:** o Husky roda ESLint e Prettier nos arquivos alterados (lint-staged).
- **Branches:** GitHub Flow. A `main` está sempre publicável; cada funcionalidade nasce em uma branch `feature/`, `fix/`, `chore/`, `docs/` ou `test/` + nome em kebab-case e entra na `main` por pull request.
- **Caminho de uma mudança:** branch → commits (com hooks) → PR (CI roda formatação, lint, testes e build) → merge na `main` → deploy automático na Vercel.

## Uso de IA

O projeto foi feito com o Claude Code, conduzido por instruções, skills e um agente revisor versionados no repositório. Como isso funciona está em [`docs/harness-ia.md`](docs/harness-ia.md).

## Licença

[MIT](LICENSE)
