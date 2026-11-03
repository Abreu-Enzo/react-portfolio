// Conteúdo das seções Sobre, Trajetória e Skills da home (fonte: SOBREMIM.MD na raiz do repositório).
// Fica separado do JSX: para mudar um texto, mexa só aqui.
import pythonLogo from "../assets/stack/python.svg";
import html5Logo from "../assets/stack/html5.svg";
import cssLogo from "../assets/stack/css.svg";
import javascriptLogo from "../assets/stack/javascript.svg";
import reactLogo from "../assets/stack/react.svg";
// Ilustrações do arquivo "1,600 Free Illustrations" (Figma Community), sem o fundo da apresentação.
import communicationArt from "../assets/illustrations/comunicacao.svg";
import productArt from "../assets/illustrations/gestao-produtos.svg";
import discoveryArt from "../assets/illustrations/discovery.svg";
// Fotos em WebP, já no tamanho em que aparecem (convertidas com sharp).
import halfBodyPhoto from "../assets/photos/perfil-meio-corpo.webp";
import facePhoto from "../assets/photos/perfil-rosto.webp";

// width/height reais de cada arquivo: o navegador reserva o espaço antes de baixar (sem salto de layout).
export const PROFILE_PHOTOS = {
  main: { src: halfBodyPhoto, width: 720, height: 747, alt: "Enzo Abreu, de camiseta branca, sorrindo" },
  detail: { src: facePhoto, width: 320, height: 392, alt: "Retrato de Enzo Abreu, de óculos" },
};

export const ABOUT_PARAGRAPHS = [
  "Sou o Enzo Abreu. Trabalho com produtos digitais no PicPay há 3 anos e hoje sou Analista de Produtos na área de Seguros.",
  "Sou formado em Administração, com enfoque em Finanças e Produtos Digitais, e estou no primeiro semestre de Engenharia de Software na FIAP.",
  "Passei por atendimento, projetos internos, corretora de seguros e planejamento estratégico antes de chegar a Produtos. Essa trajetória me ajuda a enxergar o produto do lado do cliente, do negócio e, agora, do código.",
];

// Do mais recente para o mais antigo.
export const CAREER = [
  { title: "Analista de Produtos · Seguros", org: "PicPay", period: "fev. 2026 – atual", current: true },
  { title: "Estagiário de Produtos · Seguros", org: "PicPay", period: "abr. 2025 – fev. 2026" },
  { title: "Planejamento Estratégico", org: "PicPay", period: "nov. 2024 – mar. 2025" },
  { title: "Corretora de Seguros", org: "PicPay", period: "jan. 2024 – out. 2024" },
  { title: "Projetos e Soluções Internas", org: "PicPay", period: "jul. 2023 – dez. 2023" },
  { title: "Relacionamento com o Cliente", org: "PicPay", period: "jan. 2023 – jun. 2023" },
];

// Cada skill: título, descrição curta, ilustração (ou ícone do design system) e cor de fundo (--tint-*).
// As que estão com `icon` aguardam a ilustração do Figma (ver nomes no comentário de cada uma).
export const SOFT_SKILLS = [
  {
    title: "Comunicação e apresentação",
    description: "Traduzir ideias e dados em mensagens claras para times, áreas de negócio e liderança.",
    illustration: communicationArt,
    tone: "sky",
  },
  {
    title: "Gestão de produtos digitais",
    description:
      "Cuidar do ciclo do produto: definir o problema, priorizar, acompanhar a entrega e medir o resultado.",
    illustration: productArt,
    tone: "lime",
  },
  {
    title: "Gerenciamento de tempo",
    description: "Organizar prioridades e prazos para entregar primeiro o que mais importa.",
    icon: "clock", // ilustração: digital-nomad-working-in-airport
    tone: "sand",
  },
  {
    title: "Otimização de processos",
    description: "Encontrar gargalos e simplificar fluxos para o time trabalhar com menos atrito.",
    icon: "refresh", // ilustração: recycle
    tone: "rose",
  },
];

export const PRODUCT_SKILLS = [
  {
    title: "Discovery e benchmark",
    description:
      "Entender o problema antes da solução: ouvir usuários, estudar o mercado e comparar referências.",
    illustration: discoveryArt,
    tone: "violet",
  },
  {
    title: "Metodologias ágeis",
    description: "Trabalhar em ciclos curtos, com entregas pequenas, feedback rápido e ajuste contínuo.",
    icon: "git-branch", // ilustração: lets-start
    tone: "sky",
  },
  {
    title: "Data driven strategy",
    description: "Usar dados para decidir: definir métricas, ler resultados e orientar os próximos passos.",
    icon: "gauge", // ilustração: analyze-data
    tone: "lime",
  },
];

// Logos do simpleicons.org (versão 16.36.0) com a cor oficial da marca.
// SQL e Engenharia de Prompt não têm logo oficial: usam um ícone do design system.
export const TECH_SKILLS = [
  { name: "Python", src: pythonLogo, hex: "3776AB" },
  { name: "SQL", icon: "code" },
  { name: "HTML", src: html5Logo, hex: "E34F26" },
  { name: "CSS", src: cssLogo, hex: "663399" },
  { name: "JavaScript", src: javascriptLogo, hex: "F7DF1E" },
  { name: "React", src: reactLogo, hex: "61DAFB" },
  { name: "Engenharia de Prompt", icon: "sparkle" },
];
