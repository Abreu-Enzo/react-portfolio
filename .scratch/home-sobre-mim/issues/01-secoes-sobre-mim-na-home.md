# Seções "sobre mim" na home

Status: ready-for-agent

## O que fazer

Adicionar à home, depois do hero e dos Destaques, três seções com o conteúdo de `SOBREMIM.MD` (raiz do repositório):

1. **Apresentação**: quem é o Dono (nome, formação em Administração com enfoque em Finanças e Produtos Digitais, Engenharia de Software na FIAP em andamento, 3 anos de PicPay). Primeira pessoa, frases curtas.
2. **Trajetória**: as áreas do PicPay em ordem do mais recente para o mais antigo, com o período de cada uma. Usar o componente `Timeline` do design system (`title`, `org`, `place`, `period`).
3. **Hard e soft skills**: três grupos (soft skills, hard skills de produto, hard skills de tecnologia). Para as de tecnologia, avaliar o `StackGrid` (logos de simpleicons.org salvos em `src/assets/stack/`); para as demais, lista simples ou `Tag`.

## Critérios de aceite

- Cada seção dentro de um `FrameSection` com `SectionHeader` ("Sobre.", "Trajetória.", "Skills."), seguindo `docs/design-system/brand.md`.
- O conteúdo fica em dados (array/objeto) separados do JSX; os componentes só recebem props.
- NavPill ganha os itens Sobre (`user`) e Stack (`layers`) apontando para as âncoras das seções, como no mapa de navegação do brand.md.
- Funciona em 360px e 1280px, nos dois temas.
- `npm run lint` e `npm run build` sem erros.

## Fora do escopo

- Seção de projetos manuais (Site do Ayrton Senna, Revi App): os Projetos vêm só do GitHub.
- Idade: não entra no site.

## Comments

**02/11, implementação (branch `feature/home-sobre-mim`):**

- Ordem mudada a pedido do Dono: as três seções ficam **entre o hero e os Destaques** (hero → Sobre → Trajetória → Skills → Destaques).
- Conteúdo em `src/data/about.js`; componentes novos `Timeline`, `StackGrid` e `SkillGroup` (pílulas com `Badge`).
- `StackGrid` com logos do simpleicons.org 16.36.0 em `src/assets/stack/`; SQL e Engenharia de Prompt não têm logo oficial e usam os ícones `code` e `sparkle` do design system.
- Seções com âncoras `#sobre`, `#trajetoria` e `#skills` (com `scroll-margin-top` para o menu fixo).
- **Não feito: itens Sobre e Stack na NavPill.** O `NavLink` ignora o `#` ao decidir o item ativo, então Sobre e Stack ficariam marcados como página atual na home inteira. Além disso, o React Router não rola até a âncora ao navegar. Resolver isso pede ler a URL (`useLocation`, fora da `react-fundamentos`) ou trocar `NavLink` por `<a href="/#sobre">`. Fica para decisão do Dono.
