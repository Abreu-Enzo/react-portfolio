import Button from "../Button/Button";
import "./StatusPage.css";

const StatusPage = ({
  code = "404",
  title = "Página não encontrada",
  description = "Esse endereço não existe ou mudou de lugar. Escolha um caminho abaixo.",
  actions,
}) => {
  return (
    <section className="fo-status">
      <p className="fo-status-code">
        {code.slice(0, -1)}
        <em>{code.slice(-1)}</em>
      </p>
      <h1 className="fo-status-title">{title}</h1>
      <p className="fo-status-desc">{description}</p>
      <div className="fo-status-actions">
        {actions ?? (
          <>
            <Button to="/" iconLeft="home">
              Ir para a home
            </Button>
            <Button to="/projetos" variant="secondary">
              Ver projetos
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default StatusPage;
