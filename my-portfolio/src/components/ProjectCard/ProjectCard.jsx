import { Link } from "react-router";
import Card from "../Card/Card";
import Tag from "../Tag/Tag";
import Badge from "../Badge/Badge";
import Icon from "../Icon/Icon";
import ProjectMeta from "../ProjectMeta/ProjectMeta";
import { toSlug } from "../../utils/projects";
import "./ProjectCard.css";

const MAX_TOPICS = 4;

// Só recebe o repositório pronto por props; quem busca é o hook useGithubRepos.
const ProjectCard = ({ repo, featured = false }) => {
  const topics = (repo.topics ?? []).slice(0, MAX_TOPICS);

  return (
    <Card as="article" interactive className="fo-project">
      <div className="fo-project-top">
        <h3 className="fo-project-name">
          {/* O ::after do link cobre o card inteiro, então o card todo é clicável. */}
          <Link className="fo-project-link" to={`/projetos/${toSlug(repo.name)}`}>
            {repo.name}
          </Link>
        </h3>
        {featured ? (
          <Badge tone="brand" icon="star">
            Destaque
          </Badge>
        ) : (
          <Icon name="arrow-up-right" size={18} className="fo-project-arrow" />
        )}
      </div>

      <p className="fo-project-desc">{repo.description || "Sem descrição no GitHub."}</p>

      {topics.length > 0 && (
        <ul className="fo-tags">
          {topics.map((topic) => (
            <Tag key={topic}>{topic}</Tag>
          ))}
        </ul>
      )}

      <ProjectMeta repo={repo} />
    </Card>
  );
};

export default ProjectCard;
