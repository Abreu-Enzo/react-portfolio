import Alert from "../Alert/Alert";
import EmptyState from "../EmptyState/EmptyState";
import ErrorState from "../ErrorState/ErrorState";
import FeaturedRow from "../FeaturedRow/FeaturedRow";
import Skeleton from "../Skeleton/Skeleton";
import "../MessagesPanel/MessagesPanel.css";

const SKELETON_ROWS = 4;

// Aba Destaques do dashboard. Junta dois dados: os Projetos (GitHub) e os ids dos Destaques (Supabase).
const FeaturedPanel = ({ projects, featured, maxFeatured }) => {
  if (projects.status === "error") {
    return (
      <ErrorState
        variant={projects.error?.kind ?? "api"}
        resetAt={projects.error?.resetAt}
        onRetry={projects.retry}
      />
    );
  }

  if (featured.status === "error") {
    return (
      <ErrorState
        title="Não foi possível carregar os Destaques"
        description="O banco de dados não respondeu. Confira sua conexão e tente de novo."
        onRetry={featured.retry}
      />
    );
  }

  if (projects.status === "loading" || featured.status === "loading") {
    return (
      <div className="fo-panel-loading" aria-busy="true">
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <Skeleton key={index} height="60px" radius="var(--radius-lg)" />
        ))}
      </div>
    );
  }

  if (projects.projects.length === 0) {
    return (
      <EmptyState
        icon="folder"
        title="Nenhum Projeto para destacar"
        description="Publique um repositório no GitHub e ele aparece aqui."
      />
    );
  }

  const limitReached = featured.ids.length >= maxFeatured;
  const projectIds = projects.projects.map((project) => project.id);
  // Destaque cujo repositório sumiu do GitHub (apagado ou privado): aparece para o Dono poder remover.
  const missingIds = featured.ids.filter((id) => !projectIds.includes(id));

  function describe(id, fallback) {
    const position = featured.ids.indexOf(id) + 1;
    return position > 0 ? `Destaque ${position} na home` : fallback;
  }

  return (
    <div className="fo-panel">
      <Alert tone="info" title={`${featured.ids.length} de ${maxFeatured} Destaques escolhidos`}>
        {limitReached
          ? `Limite atingido. Desligue um Destaque para escolher outro.`
          : "Eles aparecem na home na ordem em que você os ligar. Sem nenhum, a home mostra os 3 Projetos atualizados por último."}
      </Alert>
      {featured.saveError && <Alert tone="danger">{featured.saveError}</Alert>}

      <ul className="fo-list">
        {missingIds.map((id) => (
          <FeaturedRow
            key={id}
            id={id}
            name="Repositório não encontrado"
            description={`${describe(id)}. Ele saiu do GitHub ou ficou privado: desligue para remover.`}
            checked
            onChange={(checked) => featured.toggle(id, checked)}
            disabled={featured.saving}
          />
        ))}
        {projects.projects.map((project) => {
          const checked = featured.ids.includes(project.id);
          return (
            <FeaturedRow
              key={project.id}
              id={project.id}
              name={project.name}
              description={describe(project.id, project.description || "Sem descrição no GitHub.")}
              checked={checked}
              onChange={(value) => featured.toggle(project.id, value)}
              disabled={featured.saving || (limitReached && !checked)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default FeaturedPanel;
