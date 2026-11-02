// Regras do domínio "Projeto" (ver GLOSSARY.md e docs/decisoes.md).

// Projeto = repositório público, não-fork e não-arquivado.
export function isProject(repo) {
  return !repo.private && !repo.fork && !repo.archived;
}

// Slug = nome do repositório em minúsculas.
export function toSlug(repoName) {
  return repoName.toLowerCase();
}

// A busca ignora maiúsculas/minúsculas: /projetos/React-Portfolio encontra "react-portfolio".
export function findProjectBySlug(projects, slug) {
  return projects.find((project) => toSlug(project.name) === slug.toLowerCase());
}

// Fallback da home quando não há Destaques: os N projetos atualizados mais recentemente.
export function getRecentProjects(projects, count = 3) {
  return [...projects].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, count);
}

// Opções do filtro por linguagem, geradas a partir dos próprios projetos (mais usadas primeiro).
export function getLanguageOptions(projects) {
  const counts = {};
  projects.forEach((project) => {
    if (project.language) {
      counts[project.language] = (counts[project.language] ?? 0) + 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([language, count]) => ({ value: language, label: language, count }));
}
