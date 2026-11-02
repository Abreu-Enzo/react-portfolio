import { useParams } from "react-router";
import FrameSection from "../components/FrameSection/FrameSection";
import Button from "../components/Button/Button";
import Tag from "../components/Tag/Tag";
import Skeleton from "../components/Skeleton/Skeleton";
import ErrorState from "../components/ErrorState/ErrorState";
import ProjectMeta from "../components/ProjectMeta/ProjectMeta";
import RateLimitAlert from "../components/RateLimitAlert/RateLimitAlert";
import useGithubRepos from "../hooks/useGithubRepos";
import { findProjectBySlug } from "../utils/projects";
import "./ProjectPage.css";

const ProjectDetail = ({ project }) => {
  return (
    <article className="fo-detail">
      <h1 className="text-title-lg fo-detail-title">{project.name}</h1>
      {project.topics?.length > 0 && (
        <ul className="fo-tags">
          {project.topics.map((topic) => (
            <Tag key={topic}>{topic}</Tag>
          ))}
        </ul>
      )}
      <p className="text-lead fo-detail-desc">{project.description || "Sem descrição no GitHub."}</p>
      <ProjectMeta repo={project} />
      <div className="fo-detail-actions">
        <Button href={project.html_url} external variant="secondary" iconRight="arrow-up-right">
          Ver no GitHub
        </Button>
        {project.homepage && (
          <Button href={project.homepage} external iconRight="arrow-up-right">
            Abrir projeto
          </Button>
        )}
      </div>
    </article>
  );
};

// Mesmo formato do detalhe (título, tópicos, descrição, metadados) para não haver salto de layout.
const ProjectDetailSkeleton = () => {
  return (
    <div className="fo-detail" aria-busy="true">
      <Skeleton width="40%" height={32} />
      <Skeleton width={180} height={16} />
      <div>
        <Skeleton shape="text" />
        <Skeleton shape="text" width="80%" />
      </div>
      <Skeleton width={280} height={20} />
    </div>
  );
};

const ProjectPage = () => {
  const { slug } = useParams();
  const { status, projects, error, retry, rateLimitedUntil } = useGithubRepos();
  const project = findProjectBySlug(projects, slug);

  let content;
  if (status === "loading") {
    content = <ProjectDetailSkeleton />;
  } else if (status === "error") {
    content = <ErrorState variant={error.kind} resetAt={error.resetAt} onRetry={retry} backHref="/projetos" />;
  } else if (!project) {
    content = <ErrorState variant="not-found" backHref="/projetos" />;
  } else {
    content = <ProjectDetail project={project} />;
  }

  return (
    <FrameSection>
      <div>
        <Button to="/projetos" variant="ghost" iconLeft="arrow-left">
          Voltar
        </Button>
      </div>
      {rateLimitedUntil && <RateLimitAlert resetAt={rateLimitedUntil} />}
      {content}
    </FrameSection>
  );
};

export default ProjectPage;
