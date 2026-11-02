import FrameSection from "../components/FrameSection/FrameSection";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Button from "../components/Button/Button";
import ProjectGrid from "../components/ProjectGrid/ProjectGrid";
import RateLimitAlert from "../components/RateLimitAlert/RateLimitAlert";
import useGithubRepos from "../hooks/useGithubRepos";
import useFeatured, { MAX_FEATURED } from "../hooks/useFeatured";
import { getFeaturedProjects, getRecentProjects } from "../utils/projects";
import "./HomePage.css";

const HomePage = () => {
  const { status, projects, error, retry, rateLimitedUntil } = useGithubRepos();
  const featured = useFeatured();

  // Destaques escolhidos no dashboard; sem nenhum (ou se o banco falhar), a home mostra
  // os 3 Projetos atualizados mais recentemente (ver docs/decisoes.md, "Destaques da home").
  const featuredProjects = getFeaturedProjects(projects, featured.ids);
  const hasFeatured = featuredProjects.length > 0;
  const highlights = hasFeatured ? featuredProjects : getRecentProjects(projects, MAX_FEATURED);

  // Espera os Destaques antes de mostrar a grade, para não trocar os cards na frente do Visitante.
  const gridStatus = status === "success" && featured.status === "loading" ? "loading" : status;

  return (
    <>
      <FrameSection className="fo-hero" aria-labelledby="hero-title">
        <p className="fo-hero-eyebrow">Enzo Abreu · Produtos digitais e Engenharia de Software</p>
        <h1 className="text-display fo-hero-title" id="hero-title">
          Produto e código, do discovery ao deploy.
        </h1>
        <p className="text-lead fo-hero-lead">
          Analista de Produtos no PicPay, onde estou há 3 anos, e estudante de Engenharia de Software na FIAP.
          Os projetos abaixo vêm direto do meu GitHub.
        </p>
        <div className="fo-hero-actions">
          <Button to="/projetos" iconRight="arrow-right">
            Ver projetos
          </Button>
          <Button
            href="https://github.com/Abreu-Enzo"
            external
            variant="secondary"
            iconRight="arrow-up-right"
          >
            Meu GitHub
          </Button>
        </div>
      </FrameSection>

      <FrameSection aria-labelledby="highlights-title">
        <SectionHeader
          title="Destaques"
          id="highlights-title"
          meta={
            hasFeatured
              ? "Os projetos que escolhi para mostrar primeiro."
              : "Os projetos em que mexi por último."
          }
          action={
            <Button to="/projetos" variant="ghost" iconRight="arrow-right">
              Ver todos
            </Button>
          }
        />
        {rateLimitedUntil && <RateLimitAlert resetAt={rateLimitedUntil} />}
        <ProjectGrid
          status={gridStatus}
          projects={highlights}
          error={error}
          onRetry={retry}
          skeletonCount={MAX_FEATURED}
          featured={hasFeatured}
        />
      </FrameSection>
    </>
  );
};

export default HomePage;
