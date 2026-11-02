const DAY_MS = 24 * 60 * 60 * 1000;

// "Atualizado hoje", "Atualizado há 3 dias"; acima de 30 dias, data curta ("Atualizado em 12 de out. de 2025").
export function formatUpdatedAt(isoDate, now = new Date()) {
  const date = new Date(isoDate);
  const days = Math.floor((now - date) / DAY_MS);

  if (days < 1) return "Atualizado hoje";
  if (days === 1) return "Atualizado há 1 dia";
  if (days <= 30) return `Atualizado há ${days} dias`;

  const shortDate = date.toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });
  return `Atualizado em ${shortDate}`;
}

// Horário em que o limite da API do GitHub é liberado ("14:05").
export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
