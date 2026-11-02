import { useEffect, useState } from "react";
import { getCachedProjects, getProjects } from "../services/githubService";

// Estado da lista de Projetos para as páginas: status "loading" | "success" | "error".
// Os componentes só leem este estado; a requisição e o cache ficam no githubService.
function getInitialState() {
  const cached = getCachedProjects();
  if (cached) {
    return { status: "success", projects: cached, error: null, rateLimitedUntil: null };
  }
  return { status: "loading", projects: [], error: null, rateLimitedUntil: null };
}

export default function useGithubRepos() {
  const [state, setState] = useState(getInitialState);
  // Mudar `attempt` faz o useEffect rodar de novo: é assim que o "Tentar de novo" funciona.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false; // descarta a resposta se a página foi desmontada antes dela chegar

    getProjects()
      .then(({ projects, rateLimitedUntil }) => {
        if (!ignore) setState({ status: "success", projects, error: null, rateLimitedUntil });
      })
      .catch((error) => {
        if (!ignore) setState({ status: "error", projects: [], error, rateLimitedUntil: null });
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setState({ ...state, status: "loading" });
    setAttempt(attempt + 1);
  }

  return { ...state, retry };
}
