import Button from "../components/Button/Button";
import StatusPage from "../components/StatusPage/StatusPage";
import "./RootLayout.css";

// errorElement do roteador: aparece se algum componente quebrar ao renderizar.
// Fica fora do layout (o próprio layout pode ser o que quebrou).
const ErrorPage = () => {
  return (
    <main className="fo-main">
      <StatusPage
        code="500"
        title="Algo deu errado"
        description="Um erro inesperado interrompeu a página. Recarregue para tentar de novo."
        actions={
          <>
            <Button iconLeft="refresh" onClick={() => window.location.reload()}>
              Recarregar
            </Button>
            <Button to="/" variant="secondary">
              Ir para a home
            </Button>
          </>
        }
      />
    </main>
  );
};

export default ErrorPage;
