import Icon from "../Icon/Icon";
import { formatUpdatedAt } from "../../utils/formatDate";
import "./ProjectMeta.css";

// Linha de metadados do repositório: linguagem, estrelas e última atualização.
// Usada no ProjectCard e na página do projeto.
const ProjectMeta = ({ repo }) => {
  return (
    <div className="fo-project-meta">
      {repo.language && (
        <span>
          <span className="fo-lang-dot" aria-hidden="true" />
          {repo.language}
        </span>
      )}
      <span>
        <Icon name="star" size={16} label="Estrelas" />
        {repo.stargazers_count}
      </span>
      <span>
        <Icon name="clock" size={16} />
        {formatUpdatedAt(repo.updated_at)}
      </span>
    </div>
  );
};

export default ProjectMeta;
