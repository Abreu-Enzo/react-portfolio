import { Navigate } from "react-router";
import PageLoader from "../PageLoader/PageLoader";
import useAuth from "../../hooks/useAuth";

// Só deixa passar o Dono logado; sem sessão, manda para /login.
// É proteção de interface: quem protege os dados de verdade é o RLS do Supabase.
const PrivateRoute = ({ children }) => {
  const { status, session } = useAuth();

  // Enquanto o Supabase lê a sessão salva, não dá para saber se há login: espera em vez de redirecionar.
  if (status === "loading") {
    return <PageLoader label="Verificando login" />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
