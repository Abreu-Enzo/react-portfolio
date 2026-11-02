---
name: design-system
description: Design system do portfólio CP3 (tokens, tipografia, cores claro/escuro, ícones, animações e componentes inspirados em poulo.site). Use SEMPRE antes de criar ou alterar qualquer componente visual, página, CSS, tema, ícone ou animação em my-portfolio/, e ao revisar se a interface segue a identidade visual.
---

# Design System — Portfólio CP3

Identidade visual do portfólio: monocromática e técnica, com **um** verde-limão de marca (`--brand`), tipografia grotesca apertada (TikTok Sans, −0.04em), pílulas de vidro flutuantes, molduras de hairline e movimento sutil (desfoque → nítido). Referência visual: https://www.poulo.site. Galeria viva com previews de todos os componentes: https://claude.ai/artifact/HvuX5ThKNeqhjnwwUFddSk (privada, só para consulta do aluno).

Esta skill define **como a interface parece e se comporta**. A `react-fundamentos` continua mandando em **como o código é escrito** e a `criterios-e-instrucoes` em **o que é entregue**. Em conflito, vale a `react-fundamentos`.

## Arquivos

| Arquivo | Para quê |
| --- | --- |
| `my-portfolio/src/styles/tokens.css` | **Os tokens em uso** (variáveis CSS dos dois temas, fontes, espaçamentos, raios, durações). Deve ser importado uma única vez, na primeira linha do `src/index.css` (`@import "./styles/tokens.css";`), substituindo as variáveis do template do Vite. |
| `docs/design-system/tokens.json` | Fonte da verdade dos tokens, com a nota de uso de cada um. Mudou um valor? Mude nos dois arquivos. |
| `docs/design-system/brand.md` | Livro da marca: princípios, tom de voz, cor, tipografia, espaço, movimento, ícones e o **mapa rota → componentes**. Leia antes de montar uma página. |
| `docs/design-system/components.md` | Contrato de cada componente (props, quando usar, regras, estados). |
| `docs/design-system/components.css` | CSS de referência de cada componente, separado por blocos `---------- Nome ----------`. |
| `docs/design-system/icons.js` | Desenhos SVG dos 36 ícones de interface. |
| `docs/design-system/components.d.txt` | Formato das props (só documentação; o projeto é JavaScript). |

## Como usar ao implementar

1. **Leia** `brand.md` (seção da área que vai mexer) e o trecho do componente em `components.md`.
2. **Crie** `src/components/<Nome>/<Nome>.jsx` + `<Nome>.css`, copiando o bloco de mesmo nome de `components.css`. Componente funcional, `export default`, só recebe props e renderiza (dados vêm de `hooks/` + `services/`).
3. **Reaproveite**: se o componente já existe em `src/components/`, use-o; não crie variações locais de botão, card ou campo nas páginas.
4. **Cheque** nos dois temas (`data-theme="dark"` e `"light"`), em 360px e 1280px, com teclado (foco visível) e com "reduzir movimento".

### Adaptações obrigatórias para a stack da disciplina

- **CSS puro**, um `.css` por componente, classes com prefixo `fo-` (evita colisão, já que CSS puro é global). Sem Tailwind, CSS Modules, styled-components ou Sass.
- **Valores só por token**: `var(--background)`, `var(--space-6)`, `var(--radius-full)`, `var(--duration-base)`. Nunca hex, px de espaçamento ou ms soltos num componente.
- **Ícones**: componente `Icon` próprio que lê `src/components/Icon/icons.js` (cópia de `docs/design-system/icons.js`) e renderiza `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">`. Sem lucide, react-icons ou emoji. Ícone decorativo: `aria-hidden="true"`; ícone sozinho: `aria-label`.
- **Logos do StackGrid**: SVGs oficiais de simpleicons.org salvos em `src/assets/stack/` e importados; nada de pacote ou CDN.
- **Hooks**: só os permitidos (`useState`, `useEffect`, `useRef`, `useMemo`, `useContext`). IDs de campo vêm por prop `id` (não use `useId`). `IntersectionObserver` do `Reveal` vai num `useEffect` com limpeza.
- **Formulário**: validação em JS puro em `schemas/contactSchema.js`, retornando as mensagens exatas ("Nome obrigatório", "E-mail inválido", "Mensagem com no mínimo 20 caracteres").
- **Tema**: `ThemeContext` em `contexts/` + `localStorage.theme`, aplicando `document.documentElement.dataset.theme`. Script inline no `index.html` aplica o tema salvo antes do React (sem flash). A revelação circular usa `document.startViewTransition` quando existir.
- **3D**: a `HeroScene` já reserva a caixa (sem salto de layout) e funciona sem biblioteca (SVG que inclina com o mouse). Three.js / React Three Fiber são dependência fora da `react-fundamentos`: **pergunte antes** e registre em `docs/decisoes.md`. Se autorizado, carregue com `React.lazy` + `Suspense` dentro da `HeroScene`.

## Regras visuais (resumo — detalhes em `brand.md`)

- **Neutro primeiro, limão por último.** `--brand` no máximo em 1–2 pontos por tela (botão de enviar, badge "Destaque", contador, núcleo da cena 3D). Limão como texto/ícone usa `--brand-ink`; sobre `--brand` o texto é `--brand-foreground`.
- **Pílula é a assinatura**: botões, chips, nav, abas, switch, badges em `--radius-full`. Cards `--radius-xl`; mídia e painéis `--radius-2xl`/`--radius-3xl`.
- **Superfícies**: página `--background`; cards e campos `--card` com borda `--border`; apoio `--muted`. Vidro (`--glass` + `--glass-border` + `--shadow-glass` + `backdrop-filter: blur(16px)`) só no que flutua: `NavPill`, `ThemeToggle`, botão flutuante.
- **Tipografia**: `display` 44→64px (H1 do hero), `title-xl` 30→44px (seções, terminando em ponto: "Projetos."), `title-lg` 24, `lead` 18, `body` 16, `body-sm` 14, `caption` 12, `code` (IBM Plex Mono), `hand` (Reenie Beanie, uma vez por tela). Classes prontas `.text-<estilo>` em `tokens.css`.
- **Layout**: gutter `--space-6` (mobile) / `--space-10` (≥768px); seções separadas por `--space-30`; larguras `--container-xl|lg|content|text`; grade de cards `repeat(auto-fill, minmax(min(100%, 300px), 1fr))`.
- **Estados de dados**: todo dado de API tem carregando (`ProjectCardSkeleton`/`Skeleton` com o mesmo tamanho do conteúdo), erro (`ErrorState`: api, rate-limit, not-found), vazio (`EmptyState`) e conteúdo. Ações usam `Button loading` (desabilita e mostra `Spinner`).
- **Movimento**: entradas "vapor" (blur 12px → 0) e `Reveal` ao rolar; hover de card sobe 4px com `--shadow-lift`; seta `arrow-up-right` desliza na diagonal. Só `transform`, `opacity` e `filter` (sem saltos de layout). Tudo respeita `prefers-reduced-motion`.
- **Acessibilidade**: foco `outline: 2px solid var(--ring); outline-offset: 2px` em tudo que é clicável; texto de apoio `--muted-foreground` só sobre `--background`/`--card`; status sempre com ícone + palavra, nunca só cor.
- **Tom**: português, primeira pessoa, frases curtas; botões no infinitivo sem ponto ("Ver projetos", "Marcar como respondida"); erros dizem o problema e o próximo passo. Sem emoji.

## Inventário de componentes

Fundamentos: `Icon` · Ações: `Button`, `IconButton` · Navegação: `NavPill`, `ThemeToggle`, `FilterChips`, `Tabs`, `SiteFooter` · Conteúdo: `SectionHeader`, `Card`, `ProjectCard`, `Tag`, `Badge`, `Timeline`, `StackGrid` · Estados: `ProjectCardSkeleton`, `Skeleton`, `Spinner`, `EmptyState`, `ErrorState`, `StatusPage`, `Alert` · Formulário: `TextField`, `TextArea`, `Switch` · Dashboard: `MessageRow`, `FeaturedRow`, `StatTile`, `DashboardShell` · Movimento: `RotatingHeadline`, `HandNote`, `Reveal`, `FrameSection`, `HeroScene`.

Nomes em inglês por padrão (o idioma dos nomes ainda está em Pendências no `CLAUDE.md`; se o aluno decidir por português, renomeie aqui e em `components.md`).
