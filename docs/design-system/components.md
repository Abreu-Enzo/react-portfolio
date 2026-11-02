# Componentes — especificação

Contrato de cada componente do design system: o que faz, props, quando usar e regras. Implemente cada um em `src/components/<Nome>/<Nome>.jsx` + `<Nome>.css` (CSS em `components.css`, bloco de mesmo nome). Tipos de referência das props: `components.d.txt`.

## Fundamentos

### Icon

Ícone de traço único (24px de grade, traço 1.75, pontas arredondadas) — a mesma linguagem dos ícones do `NavPill` da referência.

**Props:** `name` (um de `Icon.names`), `size` (padrão 20), `strokeWidth`, `label` (só quando o ícone é a única informação; senão fica `aria-hidden`).

- Herda a cor por `currentColor`: pinte o elemento pai com `foreground`, `muted-foreground`, `brand-ink`, `destructive` ou `warning`.
- Tamanhos: 14 em badges e erros de campo, 16 em metadados e abas, 18 em botões e nav, 20–24 em estados vazios.
- No projeto, o componente `Icon` lê os desenhos de `src/components/Icon/icons.js` (copiado de `docs/design-system/icons.js`) e renderiza um `<svg>` com `stroke="currentColor"`. Sem biblioteca de ícones.
- Nunca use emoji como ícone. Logos de tecnologia vêm do `StackGrid`, não daqui.

## Ações

### Button

Botão em pílula (`radius-full`, 44px de altura) — o mesmo em todas as páginas.

**Props:** `variant` primary | secondary | ghost | brand | danger · `size` sm | md | lg · `iconLeft`, `iconRight` (nome de `Icon`) · `loading` + `loadingText` · `href` (vira `<a>`) · `disabled` e demais props de `<button>`.

- **primary** (`primary` / `primary-foreground`): a ação principal da tela. Uma por vista.
- **brand** (`brand` / `brand-foreground`): reservado ao envio do formulário de contato e ao "Salvar destaques". Não use em navegação.
- **secondary**: ação alternativa com borda `border-strong` ("Sobre mim", "Tentar de novo").
- **ghost**: ações de baixa ênfase e voltar.
- **danger**: só "Sair" e ações destrutivas.
- `loading` desabilita o botão e mostra `Spinner` — é assim que o envio do formulário fica bloqueado contra clique duplo. Teste: o botão deve estar `disabled` enquanto a Promise do envio não resolve.
- `iconRight="arrow-up-right"` desliza 2px na diagonal no hover (assinatura da referência em "See my work").
- Texto: verbo no infinitivo, sem ponto, em sentence case ("Ver projetos", "Marcar como respondida").

### IconButton

Botão redondo só com ícone; `label` é obrigatório (vira `aria-label` e `title`).

**Props:** `icon`, `label`, `variant` glass | solid | ghost, `size` sm | md | lg, `iconSize`.

- **glass** para tudo que flutua sobre o conteúdo (FAB, tema) — `glass` + `glass-border` + `shadow-glass` + blur 16px.
- **solid** (`secondary`) em barras; **ghost** dentro de cards, alerts e linhas.
- Área de toque mínima 36px (sm); use md (44px) no mobile.

## Navegação

### NavPill

Navegação principal: uma pílula de vidro flutuante, fixa a `space-6` do topo e centralizada (`z-header`).

**Props:** `items` `[{id, label, icon, href?}]`, `activeId`, `onSelect(id)`, `showLabels` (mostra rótulos a partir de 900px), `ariaLabel`.

- Com React Router, use `NavLink` (ou `Link`) e marque o ativo pela rota atual; o item ativo recebe `aria-current="page"` e fundo `muted`.
- No mobile só ícones; o rótulo aparece como tooltip (`primary` / `primary-foreground`) no hover e no foco.
- Itens do portfólio: Início `home`, Projetos `briefcase`, Sobre `user`, Stack `layers`, Contato `mail`. O Dashboard nunca aparece aqui — o dono entra por `/login`.
- Coloque o `ThemeToggle` ao lado, separado por `space-2`, como na referência.
- Reserve `header-height` + `space-6` no topo das páginas para nada ficar sob a pílula.

### ThemeToggle

Alterna claro/escuro com uma revelação circular a partir do clique (View Transitions API), como na referência; sem suporte ou com movimento reduzido, troca direto.

**Props:** `theme` ('dark' | 'light'), `onChange(next)`.

- O componente não guarda estado. O hook `useTheme` (em `hooks/`) lê/grava `localStorage.theme` e aplica `data-theme` no `<html>`.
- Evite o flash do tema errado: um script inline no `index.html`, antes do bundle, aplica `localStorage.theme ?? (prefers-color-scheme)` no `<html>`.
- Ícone mostra o destino: sol no escuro, lua no claro. Gira 30° no hover.

### FilterChips

Grupo de pílulas para filtrar a lista de projetos (linguagem ou tópico), como os filtros "Works" da referência.

**Props:** `options` `[{value, label, count?}]`, `value`, `onChange(value)`, `label` (aria).

- Gere as opções a partir dos próprios repositórios (linguagens distintas), nunca fixas no código.
- Ativo = `primary` preenchido (`aria-pressed`). Atualize o `SectionHeader` com "Mostrando X de Y projetos".
- Filtrar não pode disparar nova requisição: filtre o array em cache com `useMemo`.

### Tabs

Segmentos em pílula sobre `muted`; o ativo vira `card`. Usado para alternar Mensagens e Destaques no dashboard.

**Props:** `items` `[{value, label, icon?, count?}]`, `value`, `onChange(value)`, `label`.

- `count` mostra um contador `brand` (mensagens não respondidas). Omita quando for 0.
- Se cada aba for rota (`/dashboard/mensagens`), sincronize `value` com a URL.

### SiteFooter

Rodapé em duas colunas (Menu e Contato) com assinatura, como o da referência.

**Props:** `menu`, `contact` (`[{label, href, icon?, external?}]`), `signature`.

- Links externos abrem em nova aba com seta `arrow-up-right`. Hover em `brand-ink`.

## Conteúdo

### SectionHeader

Título de seção curto e terminado em ponto ("Projetos.", "Stack.", "Contato.") — o ponto é adicionado se faltar.

**Props:** `title`, `eyebrow?`, `meta?` (texto ao vivo, ex. contagem do filtro), `action?` (nó), `as` (h2 padrão), `id`.

- Estilo `title-xl` (30px) no mobile, 44px/600 a partir de 1024px. `meta` e `eyebrow` em `muted-foreground`.
- Use `id` para a âncora da seção e `aria-labelledby` no `<section>`.

### Card

A superfície única do sistema: `card`, borda `border`, `radius-xl`, padding `space-6`. Todo painel, item de lista grande e card de projeto parte dele.

**Props:** `as` (div padrão; use `article` para itens), `interactive` (hover sobe 4px, borda `border-strong`, `shadow-lift`), demais props HTML.

- Não crie variações locais de card nas páginas; estenda por composição (`ProjectCard` é um `Card`).
- Interativo só quando o card inteiro é clicável (link esticado com `::after`).

### ProjectCard

Card de repositório do GitHub com nome, descrição, tópicos, linguagem, estrelas e data da última atualização. O card inteiro leva a `/projetos/:slug`.

**Props:** `repo` (objeto da API do GitHub: `name`, `description`, `language`, `stargazers_count`, `updated_at`, `topics`), `href?` (padrão `/projetos/{name}`), `featured?`, `onOpen?`.

- Recebe dados prontos por props; quem busca é o hook `useGithubRepos` (`services/githubService.js` + cache simples em módulo/Context; sem bibliotecas de requisição). Nada de `fetch` aqui.
- Altura mínima de 236px e descrição limitada a 3 linhas com altura reservada: o skeleton tem o mesmo tamanho, então não há salto de layout.
- Sem descrição → "Sem descrição no GitHub." em `muted-foreground`.
- `featured` (escolhido no dashboard) troca a seta por `Badge` brand "Destaque".
- Datas relativas em pt-BR ("Atualizado há 2 dias"); acima de 30 dias, data curta.

### Tag

Tópico do repositório em `caption`, prefixado com `#`, como as hashtags da referência ("#AIandAgentics").

**Props:** `children` (texto do tópico). Renderize dentro de `<ul className="fo-tags">`.

- Vêm de `repo.topics`; mostre no máximo 4 no card e todas na página do projeto.

### Badge

Rótulo curto de status em pílula de 24px.

**Props:** `tone` neutral | brand | success | warning | danger, `icon?`, `children`.

- **brand** (preenchido) = projeto em destaque. **success** (`brand-ink`) = mensagem respondida. **warning** = mensagem nova / limite da API. **danger** = falha.
- Sempre com ícone e palavra — a cor nunca é a única pista.

### Timeline

Lista de trajetória (formação e experiência) da página Sobre, no formato "Journey" da referência: título, instituição, local e período alinhado à direita.

**Props:** `items` `[{title, org, place, period}]`.

- Ordem do mais recente para o mais antigo. Período com números tabulares.

### StackGrid

Grade de logos de tecnologia monocromáticos (`muted-foreground`) que ganham a cor da marca no hover/foco e mostram o nome — a seção "My Stack" da referência.

**Props:** `items` `[{name, slug, hex?, src?}]`, `label`.

- Logos: baixe os SVGs oficiais de simpleicons.org (slug + hex) e salve em `src/assets/stack/`; importe-os no código. Não instale o pacote nem dependa de CDN.
- Marcas quase pretas ou brancas (GitHub, Vercel, Three.js) usam `foreground` no hover para continuar visíveis nos dois temas.
- Em telas de toque o nome fica sempre visível.
- Use para a seção Stack da home e no vídeo da entrevista (parte 1).

## Estados

### ProjectCardSkeleton

Esqueleto com a mesma geometria do `ProjectCard` (mesma altura mínima, linhas de texto e metadados), usado enquanto a lista carrega.

**Props:** `count` (padrão 1).

- Renderize tantos quanto a página costuma mostrar (6 na home, 9 em `/projetos`) dentro do mesmo `.fo-grid`, com `aria-busy` no contêiner.
- O brilho (`fo-shimmer`, 1.6s) para com `prefers-reduced-motion`.

### Skeleton

Bloco de carregamento com brilho que corre da direita para a esquerda (`muted` → `secondary`).

**Props:** `width`, `height`, `radius`, `shape` text | circle.

- Monte esqueletos com as dimensões finais do conteúdo (CLS zero). Para mensagens do dashboard e detalhe do projeto, componha a partir deste.

### Spinner

Anel girando em `currentColor` para ações curtas (envio do formulário, marcar como respondida, login).

**Props:** `size` (padrão 16), `label` (quando sozinho na tela, vira `role="status"`).

- Em listas use `Skeleton`; o spinner é para ações do usuário. Já vem embutido em `Button loading`.

### EmptyState

Estado de lista vazia: ícone em círculo `muted`, título, descrição e ação opcional, com borda tracejada `border-strong`.

**Props:** `icon`, `title`, `description?`, `action?`, `tone?`.

- Obrigatório em toda lista vinda de API: projetos ("Nenhum repositório público encontrado"), destaques ("Nenhum projeto em destaque — escolha no dashboard"), mensagens.
- Texto explica o que aconteceria aqui e o próximo passo; nunca só "Vazio".

### ErrorState

Falha no carregamento de dados com explicação e "Tentar de novo".

**Props:** `variant` api | rate-limit | not-found, `onRetry?`, `retrying?`, `resetAt?` (timestamp do header `x-ratelimit-reset` × 1000), `backHref?`, `title?`, `description?`.

- **api**: erro de rede/5xx → `onRetry` chama `refetch()` da query.
- **rate-limit**: status 403 com `x-ratelimit-remaining: 0`. Mostre o horário de liberação e os dados em cache, se houver.
- **not-found**: `/projetos/slug-invalido` — nunca tela branca.
- `role="alert"`, ícone + cor `destructive`/`warning`.

### StatusPage

Página inteira para rota inexistente (`path="*"`): número gigante `numeral` (160px, 230px no desktop) com o último dígito em `brand-ink`, título, texto e caminhos de volta.

**Props:** `code` ('404'), `title?`, `description?`, `actions?` (nós; padrão: "Ir para a home" e "Ver projetos").

- Também serve para falha geral de carregamento (`code="500"`, ação "Recarregar").
- Precisa funcionar com F5: configure o rewrite de SPA em `vercel.json`.

### Alert

Retorno após uma ação (envio do formulário, salvar destaques, login inválido).

**Props:** `tone` success | danger | warning | info, `title`, `children` (texto), `onClose?`.

- Aparece com a entrada "vapor" (desfoque → nítido). `danger` usa `role="alert"`; os demais `role="status"`.
- Após sucesso no contato: limpe o formulário e mostre o alerta acima dele. Após erro: mantenha os dados digitados.

## Formulário

### TextField

Campo de texto com rótulo visível, dica e erro específico por campo.

**Props:** `label`, `error?`, `hint?`, `required?`, `type`, `value`/`onChange` ou `defaultValue`, e demais props de `<input>`.

- Erro substitui a dica no mesmo lugar (altura reservada: sem salto), com ícone e `aria-invalid` + `aria-describedby`.
- Mensagens específicas vindas da função de validação em `schemas/contactSchema.js` (JS puro): "Nome obrigatório", "E-mail inválido".
- Valide no `onBlur` e no submit; não grite erro enquanto a pessoa digita pela primeira vez.
- 48px de altura e fonte 16px (evita zoom no iOS).

### TextArea

Mesmo contrato do `TextField` para texto longo, com contador em `code` (fica `warning` abaixo do mínimo).

**Props:** as do `TextField` + `minLength`, `maxLength`, `showCount`.

- Mínimo de 20 caracteres no contato, com a mensagem "Mensagem com no mínimo 20 caracteres".

### Switch

Liga/desliga com rótulo e descrição; ligado = trilho `brand` e botão `brand-foreground`.

**Props:** `label`, `description?`, `checked`, `onChange(checked)`, `disabled?`.

- É um `<input type="checkbox" role="switch">` real: teclado e leitores de tela funcionam.
- Use para escolher projetos em destaque e preferências; não para enviar formulário.

## Dashboard

### MessageRow

Linha de mensagem recebida no dashboard: nome, e-mail clicável, status, data, texto e ação de marcar como respondida.

**Props:** `message` `{id, name, email, body, createdAt, answered}`, `onToggleAnswered(id, answered)`, `busy?` (spinner no botão enquanto salva).

- Renderize dentro de `<ul className="fo-list">`. Ordene das mais novas para as antigas; não respondidas primeiro.
- `onToggleAnswered` chama o service (`messagesService.setAnswered`) e atualiza a query; use atualização otimista e desfaça em caso de erro com `Alert` danger.
- Respondida fica com opacidade 0.7 e badge `success`; nova, badge `warning` "Nova".

### FeaturedRow

Linha de repositório com `Switch` para escolher os projetos em destaque da home.

**Props:** `repo`, `checked`, `onChange(checked)`, `disabled?`.

- A lista vem da mesma query do GitHub (sem nova requisição). As escolhas são salvas no backend (backend a definir — ver Pendências do CLAUDE.md) e lidas pela home.
- Limite sugerido de 3 destaques: ao atingir, desabilite os desligados e explique com um `Alert` info.

### DashboardShell

Moldura da área do dono: avatar com iniciais, título, e-mail, botão Sair, faixa de `StatTile`, `Tabs` e painel `card` com raio `radius-3xl`.

**Props:** `user` `{name?, email}`, `title?`, `stats?` (nós), `tabs?` (nó), `onLogout`, `children` (conteúdo da aba).

- Renderizada só dentro de `<ProtectedRoute>`; sem sessão, redirecione para `/login` com `<Navigate replace state={{from}} />` (é isso que o teste cobre).
- Carregue a rota inteira com `React.lazy` para ela não entrar no pacote do visitante.
- Login usa a mesma composição do formulário de contato: `TextField` e-mail + senha, `Button` primary com `loading`, `Alert` danger para credenciais inválidas.

### StatTile

Número grande + legenda sobre `muted`, para o resumo no topo do dashboard.

**Props:** `value`, `label`, `highlight?` (número em `brand-ink`; use só no que pede ação).

## Movimento

### RotatingHeadline

H1 do hero que troca de papel a cada ~2.8s com a entrada "vapor" da referência: a palavra nova nasce desfocada (12px), sobe 0.35em e assenta em `duration-slow`.

**Props:** `words` (3 a 5 papéis curtos), `prefix?`, `interval?` (ms), `as` (h1).

- O `aria-label` lista todos os papéis; a animação é `aria-hidden`. Com movimento reduzido, fica parado na primeira palavra.
- Altura mínima de 2 linhas reservada: a troca não empurra o layout.

### HandNote

Anotação manuscrita em `hand` (Reenie Beanie, 32px) que se "escreve" da esquerda para a direita e ganha um traço `brand` por baixo — o toque pessoal da referência ("Keep holding").

**Props:** `children`, `underline` (padrão true).

- No máximo uma por tela, perto de um CTA ou de algo interativo ("mova o mouse", "isso é 3D →"). Nunca para informação essencial.

### Reveal

Envolve um bloco para que ele entre quando aparece na tela (IntersectionObserver): opacidade 0 → 1, desfoque 8px → 0, 16px de subida em `duration-slow` / `ease-out`.

**Props:** `children`, `delay?` (ms; escalone itens de uma grade em 80–120ms), `threshold?`, `as`.

- Só transform/opacity/filter: não causa saltos de layout. Respeita `prefers-reduced-motion`.
- Não envolva o hero acima da dobra (piora o LCP).

### FrameSection

Moldura "blueprint" das seções: hairlines `border` nas laterais, topo e base, com marcas de canto em cruz — a estrutura de grade visível da referência.

**Props:** `as` (section), `ticks` (padrão true), demais props HTML.

- Largura `container-content` (1176px), centralizada. Empilhe seções coladas para as linhas formarem uma grade contínua.
- Decorativa: nenhuma informação depende das linhas.

### HeroScene

O espaço do elemento 3D da home: caixa quadrada (`aspect-ratio: 1`) com céu `hero-sky` → `background`, raio `radius-2xl`, que reage ao ponteiro. O preview usa uma esfera de anéis em SVG que inclina até 15°.

**Props:** `children?` (a cena real), `label`, `hint?`.

- No projeto, passe como `children` a cena 3D (Three.js/React Three Fiber — dependência que precisa ser autorizada antes) carregada com `React.lazy` + `Suspense` e o fallback deste próprio componente — a caixa já tem tamanho fixo (sem CLS) e a cena fica fora do pacote inicial.
- Paleta da cena: geometria em `foreground` com opacidade 0.55, um único ponto de `brand`.
- Pause a animação com `prefers-reduced-motion` e quando sair da tela (`frameloop="demand"`).

## Páginas de exemplo

### ContactFormPage

`FrameSection` > `SectionHeader` "Contato" + `Alert` (success/danger) + `<form noValidate>` com `TextField` Nome, `TextField` E-mail, `TextArea` Mensagem (mín. 20, `showCount`) e `Button variant="brand" type="submit" loading`. Validação no `onBlur` (depois que o campo foi tocado) e no submit; erro específico por campo; sucesso limpa o formulário; erro mantém os dados.

### DashboardPage

`DashboardShell` com 3 `StatTile` (não respondidas em destaque, total, destaques ativos), `Tabs` Mensagens/Destaques. Aba Mensagens: `<ul className="fo-list">` de `MessageRow`, não respondidas primeiro, `busy` no item que está salvando. Aba Destaques: `FeaturedRow` por repositório, limite de 3 (desliga os demais). Lista vazia → `EmptyState`; falha → `ErrorState`.
