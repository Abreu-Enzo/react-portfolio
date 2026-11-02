# Portfólio React (CP3 FIAP)

Portfólio pessoal em React, entrega individual da FIAP, com prazo em 03/11. O aluno precisa saber explicar todo o código, então prefira soluções simples e legíveis e explique decisões não óbvias.

Responda sempre em português.

## Onde fica cada coisa

- Raiz do Git: esta pasta (`react-portfolio/`).
- App: `my-portfolio/` (Vite + React 19, JavaScript). Rode todos os comandos `npm` dentro de `my-portfolio/`.
- Na Vercel, o Root Directory é `my-portfolio`.

## Skills do projeto (consulte antes de trabalhar)

- `criterios-e-instrucoes`: **o que** entregar. Requisitos, critérios de aceite, fluxo de trabalho e checklist final.
- `react-fundamentos`: **como** escrever o código. Conteúdo das apostilas e tecnologias permitidas.

Regra de prioridade:
1. Em cada requisito, a opção marcada com **[react-fundamentos]** é o padrão.
2. Outra possibilidade listada na `criterios-e-instrucoes` só quando a opção da disciplina não atender ao critério de aceite. Avise o aluno antes de instalar a dependência e registre a decisão.
3. Algo fora das duas skills: pergunte antes.

## Design system (consulte antes de qualquer trabalho visual)

Antes de criar ou alterar componente, página, CSS, tema, ícone ou animação, siga a skill `design-system` (`.claude/skills/design-system/SKILL.md`). Esse arquivo explica a identidade visual, as adaptações à stack da disciplina e o que há em cada arquivo:

- `my-portfolio/src/styles/tokens.css`: variáveis CSS dos temas escuro (padrão) e claro (`data-theme="light"`). Use só `var(--…)` nos componentes.
- `docs/design-system/brand.md`: regras de marca e o mapa de cada rota para os componentes.
- `docs/design-system/components.md` + `components.css`: o contrato e o CSS de referência de cada componente.
- `docs/design-system/icons.js` e `tokens.json`: os ícones e os tokens com nota de uso.

## Estrutura de `my-portfolio/src`

```
components/   um componente por pasta, com .jsx + .css (components/Card/Card.jsx)
pages/        páginas e layouts das rotas
hooks/        hooks personalizados (useAlgo.js)
services/     acesso a APIs e backend; nada de fetch direto em componentes
contexts/     contextos (tema, sessão)
schemas/      funções de validação
styles/       estilos globais e tokens em CSS puro
utils/        funções puras auxiliares
assets/       imagens processadas pelo Vite
```

## Convenções

- Componentes e páginas: PascalCase, com `export default`.
- Hooks: `useAlgo` em camelCase. Services, utils, variáveis e funções: camelCase.
- Constantes globais: UPPER_SNAKE_CASE. Variáveis de ambiente: prefixo `VITE_`.
- Pastas minúsculas, exceto as pastas de componentes (PascalCase).

## Git

- Nunca commitar direto na `main`. Uma branch por funcionalidade (`feature/`, `fix/`, `chore/`, `docs/`, `test/` + nome em kebab-case), integrada via pull request.
- Commits em Conventional Commits, em português: `feat: adiciona formulário de contato`.
- Commits pequenos, um assunto por commit. Nunca commitar `.env` nem segredos.

## Antes de dar uma tarefa como pronta

Dentro de `my-portfolio/`, rode e corrija os erros de:

```
npm run lint
npm test
npm run build
```

## Decisões e documentação

- Decisões técnicas: `docs/decisoes.md`, no formato descrito na skill `criterios-e-instrucoes`.
- Glossário do projeto: `GLOSSARY.md`. Use os termos dele (Projeto, Destaque, Mensagem, Dono...) no código e nos textos.

## Decidido no /grill-with-docs (detalhes em `docs/decisoes.md`)

- Backend: Supabase (Auth + Postgres + RLS). Um único Dono, criado à mão, login por e-mail e senha, sem cadastro.
- E-mail ao Dono: EmailJS, disparado depois de salvar a Mensagem no Supabase.
- Exceções autorizadas além da `react-fundamentos`: Supabase e EmailJS (mais as já listadas na `criterios-e-instrucoes` para testes e versionamento).
- Projeto = repo público, não-fork e não-arquivado de `Abreu-Enzo`; slug = nome do repo em minúsculas.
- Destaques: até 3, na ordem do Dono; sem Destaques, a home mostra os 3 Projetos atualizados mais recentemente.
- Destaque guarda o id do repo no GitHub (sobrevive a renomeação).
- Mensagem: Pendente → Lida (ao expandir no dashboard) → Respondida (botão). Só avança; contador da marca = Pendentes.
- Idioma: código em inglês; tudo que o Visitante vê em português.
- Tema: primeira visita segue o sistema (fallback escuro); depois vale a escolha salva no `localStorage`.
- GitHub: cache em memória + `sessionStorage` (10 min); no rate limit, usa o cache com aviso ou mostra o erro de limite.
- Ferramentas: Prettier + Husky + lint-staged + commitlint; testes com Vitest + Testing Library.
- Prioridade: rotas + GitHub > contato > dashboard > tema > testes/deploy > cena 3D (a primeira a cair).

## Pendências

- Design system: criado (ver seção "Design system"). Falta importar `styles/tokens.css` no `index.css` e implementar os componentes.

## Agent skills

### Issue tracker

Issues e specs em Markdown local, em `.scratch/<funcionalidade>/`. Ver `docs/agents/issue-tracker.md`.

### Triage labels

Os cinco rótulos padrão (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), registrados na linha `Status:` de cada issue. Ver `docs/agents/triage-labels.md`.

### Domain docs

Contexto único: `GLOSSARY.md` na raiz e decisões em `docs/decisoes.md`. Ver `docs/agents/domain.md`.
