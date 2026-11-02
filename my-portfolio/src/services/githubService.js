import { isProject } from "../utils/projects";

const GITHUB_USERNAME = "Abreu-Enzo";
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`;

// Cache em dois níveis (ver docs/decisoes.md, "Cache do GitHub"):
// - memória: navegar entre páginas não faz nova requisição;
// - sessionStorage: atualizar a página (F5) também usa o cache.
// Depois de 10 minutos o cache fica "velho": buscamos de novo, mas guardamos o velho
// para mostrar caso o GitHub recuse por limite de requisições.
const CACHE_KEY = "github-repos";
const CACHE_TTL_MS = 10 * 60 * 1000;

let memoryCache = null; // { projects, savedAt }
let pendingRequest = null; // evita duas requisições iguais ao mesmo tempo (ex.: StrictMode)

function readCache() {
  if (memoryCache) return memoryCache;
  try {
    const saved = sessionStorage.getItem(CACHE_KEY);
    if (saved) memoryCache = JSON.parse(saved);
  } catch {
    // sessionStorage indisponível (aba anônima, bloqueio): segue só com a memória.
  }
  return memoryCache;
}

function saveCache(projects) {
  memoryCache = { projects, savedAt: Date.now() };
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(memoryCache));
  } catch {
    // idem: sem sessionStorage, o cache em memória continua valendo.
  }
}

function isFresh(cache) {
  return Date.now() - cache.savedAt < CACHE_TTL_MS;
}

// Erro com `kind` ("api" ou "rate-limit") para a tela escolher a mensagem certa.
function createGithubError(kind, resetAt) {
  const error = new Error(`GitHub: ${kind}`);
  error.kind = kind;
  error.resetAt = resetAt;
  return error;
}

async function requestProjects() {
  let response;
  try {
    response = await fetch(REPOS_URL, { headers: { Accept: "application/vnd.github+json" } });
  } catch {
    throw createGithubError("api"); // sem rede
  }

  if (!response.ok) {
    const isRateLimited =
      (response.status === 403 || response.status === 429) &&
      response.headers.get("x-ratelimit-remaining") === "0";

    if (isRateLimited) {
      // x-ratelimit-reset vem em segundos; o JavaScript trabalha em milissegundos.
      const resetAt = Number(response.headers.get("x-ratelimit-reset")) * 1000;
      throw createGithubError("rate-limit", resetAt);
    }
    throw createGithubError("api");
  }

  const repos = await response.json();
  return repos.filter(isProject);
}

// Projetos já no cache e dentro da validade, ou null. Permite mostrar a lista
// sem passar pelo skeleton quando o visitante volta a uma página.
export function getCachedProjects() {
  const cache = readCache();
  return cache && isFresh(cache) ? cache.projects : null;
}

// Retorna { projects, rateLimitedUntil }.
// rateLimitedUntil só vem preenchido quando estamos mostrando o cache velho por causa do limite.
export async function getProjects() {
  const cache = readCache();
  if (cache && isFresh(cache)) {
    return { projects: cache.projects, rateLimitedUntil: null };
  }

  if (!pendingRequest) {
    pendingRequest = requestProjects().finally(() => {
      pendingRequest = null;
    });
  }

  try {
    const projects = await pendingRequest;
    saveCache(projects);
    return { projects, rateLimitedUntil: null };
  } catch (error) {
    if (error.kind === "rate-limit" && cache) {
      return { projects: cache.projects, rateLimitedUntil: error.resetAt };
    }
    throw error;
  }
}
