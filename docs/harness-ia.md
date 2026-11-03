# Harness de IA

Como a IA foi configurada e conduzida neste projeto. Alimenta a parte 3 do vídeo.

## Ferramenta e modelo

- **Ferramenta:** Claude Code, pela extensão do VS Code.
- **Modelo:** Claude Opus 5.5.
- **Por quê:** o Claude Code trabalha direto no repositório. Ele lê e edita arquivos, roda `npm` e `git` no terminal e carrega sozinho as instruções versionadas (`CLAUDE.md`, skills e agentes). Assim as regras do projeto valem em toda conversa, sem precisar repetir. O Opus foi escolhido por lidar bem com tarefas longas que mexem em vários arquivos e exigem seguir muitas regras ao mesmo tempo.

<!-- Revise este "por quê" com as suas palavras antes de gravar o vídeo. -->

## O que cada arquivo faz

| Arquivo | Papel |
| --- | --- |
| [`CLAUDE.md`](../CLAUDE.md) | Instruções do projeto, carregadas em toda conversa. Descreve stack, estrutura de pastas, convenções, regras de Git, comandos que precisam passar antes de dar uma tarefa como pronta e as decisões já tomadas. |
| [`.claude/skills/criterios-e-instrucoes/`](../.claude/skills/criterios-e-instrucoes/SKILL.md) | **O que** entregar: requisitos do CP3, critérios de aceite, fluxo de branches e commits e checklist final. |
| [`.claude/skills/react-fundamentos/`](../.claude/skills/react-fundamentos/SKILL.md) | **Como** escrever o código: o conteúdo das apostilas, os hooks permitidos e o que não pode entrar sem perguntar. |
| [`.claude/skills/design-system/`](../.claude/skills/design-system/SKILL.md) | Identidade visual e regras de interface (tokens, componentes, acessibilidade, movimento). Aponta para `docs/design-system/`. |
| [`.claude/agents/revisor.md`](../.claude/agents/revisor.md) | Agente que só lê: revisa a branch contra as três skills, roda formatação, lint, testes e build e entrega um relatório antes do PR. |
| [`.claude/settings.json`](../.claude/settings.json) | Permissões: libera os comandos de verificação e bloqueia ler ou editar o `.env`, `git push --force` e `git commit --no-verify`. |
| [`.mcp.json`](../.mcp.json) | Conectores (MCP) do projeto, sem segredos (ver abaixo). |
| [`docs/decisoes.md`](decisoes.md) | Cada decisão relevante: opções comparadas, critério, escolha e o que aceitamos perder. |
| [`GLOSSARY.md`](../GLOSSARY.md) | Vocabulário do domínio (Dono, Visitante, Projeto, Destaque, Mensagem e estados). A IA usa esses termos no código e nos textos. |
| [`docs/agents/`](agents/) | Onde ficam as issues (Markdown em `.scratch/`), os rótulos de triagem e a documentação de domínio, para as skills de planejamento. |
| [`docs/design-system/`](design-system/) | Tokens, livro da marca, contrato e CSS de referência de cada componente e os ícones. |

Skills de uso pessoal, instaladas no usuário (`~/.claude/skills`) e não no repositório, também foram usadas:
- `grill-with-docs`, `grilling` e `domain-modeling` na entrevista inicial, que gerou o `decisoes.md` e o `GLOSSARY.md`;
- `setup-matt-pocock-skills`, que gerou o `docs/agents/`.

## Conectores (MCP)

O `.mcp.json` não guarda nenhum segredo. O GitHub lê o token da variável de ambiente `GITHUB_PERSONAL_ACCESS_TOKEN`, e os outros conectores pedem login (OAuth) no primeiro uso. O Claude Code pede aprovação antes de ativar um conector do projeto.

| Conector | Para quê |
| --- | --- |
| `github` | Ler issues, PRs e checks do CI |
| `supabase` (`read_only=true`) | Consultar tabelas e regras de acesso sem risco de alterar dados |
| `vercel` | Ver deploys e logs de build |
| `figma` | Ler o design e exportar ilustrações |
| `chrome-devtools` | Abrir o site num navegador, testar responsividade e rodar o Lighthouse |

O que foi usado de fato durante o desenvolvimento:
- **Figma**, pelo conector do claude.ai, para exportar as ilustrações dos cards de skill. O limite do plano gratuito parou o download em 3 de 7.
- **Lighthouse por linha de comando**, com o Edge sem interface, para medir a performance e tirar prints da home em desktop, celular e tema claro.
- **Consultas de leitura ao Supabase** com a chave pública, para confirmar que o Visitante não enxerga as Mensagens.

Nesta máquina não havia a CLI do GitHub (`gh`), então os PRs foram abertos à mão pelo aluno, com a descrição que a IA escreveu.

## Como o conjunto faz a IA seguir os padrões

| Padrão | O que orienta | O que garante |
| --- | --- | --- |
| **Arquitetura** | `CLAUDE.md` (estrutura de pastas) e `react-fundamentos` (service → hook → componente, só hooks permitidos) | Revisor confere `fetch` fora de `services/` e hooks proibidos; ESLint (`react-hooks`) |
| **Código e interface** | `design-system` (tokens, prefixo `fo-`, reaproveitar componentes) e `GLOSSARY.md` | Prettier + ESLint no `pre-commit` (lint-staged); testes no `npm test`; CI no PR |
| **Commits** | `CLAUDE.md` e `criterios-e-instrucoes` (Conventional Commits em português, um assunto por commit) | commitlint no hook `commit-msg`; `settings.json` bloqueia `--no-verify` |
| **Branches** | `CLAUDE.md` (nunca na `main`, prefixos `feature/` `fix/` `chore/` `docs/` `test/`) | Merge só por PR, com CI; `settings.json` bloqueia `push --force` |
| **Decisões** | Regra de prioridade do `CLAUDE.md` (opção da disciplina primeiro; fora dela, avisar e registrar) | Revisor confere se o recurso fora das skills está justificado no `decisoes.md` |

## Como o trabalho foi conduzido

1. **Entrevista** (`/grill-with-docs`): a IA perguntou e o aluno decidiu backend, envio de e-mail, estados da Mensagem, tema, cache e outros pontos. Cada resposta virou um item do `decisoes.md`.
2. **Uma branch por funcionalidade**, na ordem de prioridade do `CLAUDE.md`: rotas e GitHub, contato, dashboard, tema, testes e hooks, home.
3. **Antes de cada entrega:** formatação, lint, testes e build. Depois, commits pequenos, push e a descrição do PR no modelo do aluno.
4. **O aluno revisa, testa no navegador e faz o merge.** Os testes manuais dele mudaram o rumo algumas vezes:
   - **Mensagem Lida:** a regra "vira Lida ao expandir" falhava em mensagens curtas e virou botões separados.
   - **Performance:** uma branch inteira foi descartada quando a medição em um navegador real mostrou 92, sem precisar das mudanças.
   - **Recursos fora das skills:** uma revisão encontrou `ResizeObserver` e `element.animate()` e eles foram trocados pelos recursos da disciplina.
