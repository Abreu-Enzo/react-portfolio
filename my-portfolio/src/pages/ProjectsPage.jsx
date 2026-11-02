import { useMemo, useState } from "react";
import FrameSection from "../components/FrameSection/FrameSection";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import FilterChips from "../components/FilterChips/FilterChips";
import ProjectGrid from "../components/ProjectGrid/ProjectGrid";
import RateLimitAlert from "../components/RateLimitAlert/RateLimitAlert";
import useGithubRepos from "../hooks/useGithubRepos";
import { getLanguageOptions } from "../utils/projects";

const ALL_LANGUAGES = "all";

const ProjectsPage = () => {
  const { status, projects, error, retry, rateLimitedUntil } = useGithubRepos();
  const [language, setLanguage] = useState(ALL_LANGUAGES);

  // Filtrar não faz nova requisição: só recalcula a partir da lista que já está em memória.
  const options = useMemo(
    () => [{ value: ALL_LANGUAGES, label: "Todas", count: projects.length }, ...getLanguageOptions(projects)],
    [projects],
  );
  const visibleProjects = useMemo(
    () => (language === ALL_LANGUAGES ? projects : projects.filter((project) => project.language === language)),
    [projects, language],
  );

  const meta =
    status === "success" ? `Mostrando ${visibleProjects.length} de ${projects.length} projetos` : undefined;

  return (
    <FrameSection aria-labelledby="projects-title">
      <SectionHeader title="Projetos" as="h1" id="projects-title" eyebrow="Direto do meu GitHub" meta={meta} />
      {rateLimitedUntil && <RateLimitAlert resetAt={rateLimitedUntil} />}
      {status === "success" && projects.length > 0 && (
        <FilterChips options={options} value={language} onChange={setLanguage} label="Filtrar por linguagem" />
      )}
      <ProjectGrid
        status={status}
        projects={visibleProjects}
        error={error}
        onRetry={retry}
        skeletonCount={9}
      />
    </FrameSection>
  );
};

export default ProjectsPage;
