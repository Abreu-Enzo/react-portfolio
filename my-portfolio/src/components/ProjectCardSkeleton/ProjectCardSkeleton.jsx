import Card from "../Card/Card";
import Skeleton from "../Skeleton/Skeleton";
import "../ProjectCard/ProjectCard.css";
import "../ProjectMeta/ProjectMeta.css";

// Mesma geometria do ProjectCard (altura mínima, 3 linhas de descrição, metadados): sem salto de layout.
const ProjectCardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Card key={index} className="fo-project" aria-hidden="true">
          <Skeleton width="55%" height={20} />
          <div className="fo-project-desc">
            <Skeleton shape="text" />
            <Skeleton shape="text" />
            <Skeleton shape="text" width="70%" />
          </div>
          <div className="fo-project-meta">
            <Skeleton width={72} height={16} />
            <Skeleton width={40} height={16} />
            <Skeleton width={128} height={16} />
          </div>
        </Card>
      ))}
    </>
  );
};

export default ProjectCardSkeleton;
