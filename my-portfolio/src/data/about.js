// Conteúdo das seções Sobre, Trajetória e Skills da home (fonte: SOBREMIM.MD na raiz do repositório).
// Fica separado do JSX: para mudar um texto, mexa só aqui.
import pythonLogo from "../assets/stack/python.svg";
import html5Logo from "../assets/stack/html5.svg";
import cssLogo from "../assets/stack/css.svg";
import javascriptLogo from "../assets/stack/javascript.svg";
import reactLogo from "../assets/stack/react.svg";

export const ABOUT_PARAGRAPHS = [
  "Sou o Enzo Abreu. Trabalho com produtos digitais no PicPay há 3 anos e hoje sou Analista de Produtos na área de Seguros.",
  "Sou formado em Administração, com enfoque em Finanças e Produtos Digitais, e estou no primeiro semestre de Engenharia de Software na FIAP.",
  "Passei por atendimento, projetos internos, corretora de seguros e planejamento estratégico antes de chegar a Produtos. Essa trajetória me ajuda a enxergar o produto do lado do cliente, do negócio e, agora, do código.",
];

// Do mais recente para o mais antigo.
export const CAREER = [
  { title: "Analista de Produtos · Seguros", org: "PicPay", period: "fev. 2026 – atual" },
  { title: "Estagiário de Produtos · Seguros", org: "PicPay", period: "abr. 2025 – fev. 2026" },
  { title: "Planejamento Estratégico", org: "PicPay", period: "nov. 2024 – mar. 2025" },
  { title: "Corretora de Seguros", org: "PicPay", period: "jan. 2024 – out. 2024" },
  { title: "Projetos e Soluções Internas", org: "PicPay", period: "jul. 2023 – dez. 2023" },
  { title: "Relacionamento com o Cliente", org: "PicPay", period: "jan. 2023 – jun. 2023" },
];

export const SOFT_SKILLS = [
  "Comunicação e apresentação",
  "Gestão de produtos digitais",
  "Gerenciamento de tempo",
  "Otimização de processos",
];

export const PRODUCT_SKILLS = ["Discovery e benchmark", "Metodologias ágeis", "Data driven strategy"];

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
