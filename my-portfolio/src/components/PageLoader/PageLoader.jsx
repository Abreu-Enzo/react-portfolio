import Spinner from "../Spinner/Spinner";
import "./PageLoader.css";

// Espera de uma página inteira (rota carregada sob demanda ou verificação de login).
const PageLoader = ({ label = "Carregando" }) => {
  return (
    <div className="fo-page-loader">
      <Spinner size={24} label={label} />
    </div>
  );
};

export default PageLoader;
