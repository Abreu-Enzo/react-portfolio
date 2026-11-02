# Livro da marca

Sistema visual do portfólio React do CP3. Monocromático e técnico, com um único verde-limão de marca, tipografia grotesca apertada, pílulas de vidro flutuantes e molduras de hairline. Movimento sutil e sempre com propósito: desfoque que vira nitidez, objetos que respondem ao mouse.

## Princípios

- **Neutro primeiro, limão por último.** A interface vive em `background`, `card`, `muted`, `foreground` e `muted-foreground`. `brand` aparece no máximo em um ou dois pontos por tela: o botão de enviar, o badge "Destaque", o contador de Pendentes, o núcleo da cena 3D.
- **Pílula é a forma-assinatura.** Botões, chips, nav, abas, switch e badges usam `radius-full`. Superfícies usam `radius-xl` (cards) e `radius-2xl`/`radius-3xl` (mídia e painéis).
- **A grade aparece.** Seções ficam dentro de `FrameSection`: hairlines `border` e marcas de canto em cruz.
- **Todo dado de API tem quatro estados desenhados:** carregando (`ProjectCardSkeleton`/`Skeleton`), erro (`ErrorState`), vazio (`EmptyState`) e conteúdo — com as mesmas dimensões, para não haver salto de layout.
- **Um componente por papel.** O mesmo `Button`, o mesmo `Card` e o mesmo `TextField` em todas as páginas; páginas só compõem.

## Conteúdo e tom

- Português do Brasil, primeira pessoa, frases curtas. "Projetos carregados direto do meu GitHub."
- Títulos de seção são uma palavra e terminam em ponto: "Projetos.", "Stack.", "Contato.", "Dashboard." (o `SectionHeader` adiciona o ponto).
- Botões: verbo no infinitivo, sentence case, sem ponto ("Ver projetos", "Enviar mensagem", "Marcar como respondida").
- Erros dizem o problema e o próximo passo: "E-mail inválido", "Mensagem com no mínimo 20 caracteres", "A API do GitHub não respondeu. Confira sua conexão e tente de novo."
- Tópicos com hashtag (`#react`), datas relativas ("Atualizado há 2 dias"). Sem emoji.
- Uma anotação manuscrita (`HandNote`) por tela, no máximo, como toque pessoal.

## Cor

- Dois temas: **Escuro** (padrão da referência) e **Claro**. Os componentes só usam tokens — nunca hex soltos.
- Texto principal: `foreground` sobre `background`/`card`/`muted`. Texto de apoio: `muted-foreground` sobre `background` e `card`.
- Limão como texto ou ícone usa `brand-ink` (escurece no claro para 5:1). `brand` é só preenchimento, sempre com `brand-foreground` em cima.
- Estados: `destructive` (erro), `warning` (Mensagem pendente, limite da API), `brand-ink` (sucesso, respondida). Sempre com ícone e palavra.
- Vidro: `glass` + `glass-border` + `shadow-glass` + `backdrop-filter: blur(16px)` só em elementos que flutuam sobre o conteúdo.
- Hero: gradiente de `hero-sky` (céu claro de dia, azul-noite no escuro) até `background`.

## Tipografia

- **TikTok Sans** (Google Fonts, variável 300–900) para tudo; **IBM Plex Mono** para rotas, slugs, commits e contadores; **Reenie Beanie** só no `HandNote`.
- Tracking apertado em todo o sistema: `-0.04em` (−0.64px a 16px), como na referência.
- Escala: `numeral` 160/230px (404) · `display` 44px → 64px no desktop (H1 do hero) · `title-xl` 30px → 44px (seções) · `title-lg` 24px (projeto, painéis) · `lead` 18px · `heading` 16/500 · `body` 16/400 · `body-sm` 14 · `caption` 12/500 · `code` 14 mono · `hand` 32.
- No projeto: as fontes vêm do Google Fonts (`@import` no topo de `tokens.css`, com `display=swap`). Para o Lighthouse, troque por `<link rel="preconnect">` + `<link rel="stylesheet">` no `index.html`.

## Espaço e layout

- Gutter lateral `space-6` no mobile, `space-10` a partir de 768px. Seções separadas por `space-30` no desktop, `space-16` no mobile.
- Hero: `container-xl`, padding `space-28` em cima (abre espaço para o `NavPill` fixo) e `space-16` embaixo, grid de 3 colunas no desktop (texto · cena · intro), 1 coluna no mobile.
- Conteúdo: `container-lg`; molduras `container-content`; texto longo e detalhe do projeto `container-text`.
- Grade de projetos: `.fo-grid` (`auto-fill, minmax(300px, 1fr)`, gap `space-6`).
- Breakpoints de trabalho: 360 (celular), 768, 1024, 1280. Teste em 360px e 1280px antes de cada PR.

## Movimento e interação

- Durações: `duration-fast` (cor/opacidade), `duration-base` (hover de card, chips, abas), `duration-slow` (entradas por scroll, troca de palavra), `duration-reveal` (cena 3D e imagens grandes). Curvas: `ease-out` para entradas e respostas; `ease-in-out` para cor e tema.
- **Vapor**: elementos novos entram desfocados (12px) e assentam nítidos — `RotatingHeadline`, `Alert`.
- **Reveal**: blocos sobem 16px e perdem desfoque ao entrar na tela (`Reveal`, escalonar 80–120ms).
- **Hover**: cards sobem 4px com `shadow-lift`; setas `arrow-up-right` deslizam na diagonal; logos do `StackGrid` ganham a cor da marca; ícone do tema gira 30°.
- **Tema**: troca com revelação circular a partir do clique (`ThemeToggle`, View Transitions API).
- **3D**: a `HeroScene` inclina até 15° seguindo o ponteiro; a cena real (React Three Fiber) é carregada sob demanda dentro da caixa já dimensionada.
- Escrita manual: `HandNote` se escreve da esquerda para a direita e ganha traço `brand`.
- Tudo respeita `prefers-reduced-motion`: animações viram cortes, nada gira.
- Foco visível sempre: anel sólido 2px `ring` com offset 2px, 3:1 ou mais em todas as superfícies dos dois temas.

## Ícones e imagens

- Ícones de interface: traço único 1.75px em grade de 24px, pontas arredondadas — conjunto do `Icon`. No projeto, os desenhos ficam em `src/components/Icon/icons.js` (sem biblioteca).
- Mapa de nav: Início `home`, Projetos `briefcase`, Sobre `user`, Stack `layers`, Contato `mail`, Dashboard `inbox`.
- Logos de tecnologia: SVGs oficiais de simpleicons.org salvos em `src/assets/stack/`, monocromáticos em `muted-foreground`, cor oficial só no hover (`StackGrid`).
- Fotos e prints de projeto: WebP/AVIF, `loading="lazy"`, `width`/`height` sempre definidos, raio `radius-2xl`, borda `border`.
- Sem ilustrações genéricas, sem gradientes roxo-azul, sem emoji decorativo.

## Mapa de páginas → componentes

| Rota | Composição |
| --- | --- |
| `/` Home | `NavPill` + `ThemeToggle` · hero com `RotatingHeadline`, `Button` primary "Ver projetos" + secondary "Sobre mim", `HandNote`, `HeroScene` (cena 3D lazy) · `FrameSection` "Destaques." com `ProjectCard featured` (dados do dashboard) · `StackGrid` · `Timeline` · `SiteFooter` |
| `/projetos` | `SectionHeader` com contagem · `FilterChips` por linguagem · `.fo-grid` de `ProjectCard` / `ProjectCardSkeleton` / `ErrorState` (api, rate-limit) / `EmptyState` |
| `/projetos/:slug` | `Button` ghost "Voltar" · `title-lg` + `Tag`s · metadados do card · link para o GitHub · `Skeleton` no carregamento · `ErrorState variant="not-found"` se o repo não existir |
| `/contato` | `SectionHeader` · `TextField` nome/e-mail · `TextArea` mensagem (mín. 20) · `Button` brand com `loading` · `Alert` success/danger — ver card **ContactFormPage** |
| `/login` | `TextField` e-mail + senha · `Button` primary `loading` · `Alert` danger para credencial inválida |
| `/dashboard` (protegida, lazy) | `DashboardShell` · `StatTile`s · `Tabs` Mensagens/Destaques · `MessageRow` · `FeaturedRow` · `EmptyState` · `ErrorState` — ver card **DashboardPage** |
| `*` | `StatusPage code="404"` |
| falha geral | `StatusPage code="500"` com ação "Recarregar" ou `ErrorState` na seção |
