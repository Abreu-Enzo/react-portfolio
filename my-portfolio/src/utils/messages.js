// Regras da Mensagem no dashboard (ver GLOSSARY.md e docs/decisoes.md, "Estados da Mensagem").

// Respondidas vão para o fim; dentro de cada grupo, mantém a ordem recebida (mais nova primeiro).
export function sortMessages(messages) {
  return [...messages].sort((a, b) => (a.status === "answered") - (b.status === "answered"));
}

// Quantas Mensagens há em cada estado, para os StatTiles e o contador da aba.
export function countByStatus(messages) {
  const counts = { pending: 0, read: 0, answered: 0 };
  messages.forEach((message) => {
    counts[message.status] += 1;
  });
  return counts;
}
