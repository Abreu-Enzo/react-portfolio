import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectCardSkeleton from "../ProjectCardSkeleton/ProjectCardSkeleton";
import EmptyState from "../EmptyState/EmptyState";
import ErrorState from "../ErrorState/ErrorState";
import "./ProjectGrid.css";

// Grade de projetos com os quatro estados de um dado de API: carregando, erro, vazio e conteúdo.
const ProjectGrid = ({
  status,
  projects,
  error,
  onRetry,
  skeletonCount = 6,
  emptyTitle,
  emptyDescription,
}) => {
  if (status === "error") {
    return <ErrorState variant={error?.kind ?? "api"} resetAt={error?.resetAt} onRetry={onRetry} />;
  }

  if (status === "success" && projects.length === 0) {
    return (
      <EmptyState
        icon="folder"
        title={emptyTitle ?? "Nenhum repositório público encontrado"}
        description={
          emptyDescription ?? "Quando eu publicar um projeto no GitHub, ele aparece aqui automaticamente."
        }
      />
    );
  }

  return (
    <div className="fo-grid" aria-busy={status === "loading"}>
      {status === "loading" ? (
        <ProjectCardSkeleton count={skeletonCount} />
      ) : (
        projects.map((project) => <ProjectCard key={project.id} repo={project} />)
      )}
    </div>
  );
};

export default ProjectGrid;
