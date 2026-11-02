import { Suspense } from "react";
import { Outlet } from "react-router";
import AuthProvider from "../contexts/AuthProvider";
import PageLoader from "../components/PageLoader/PageLoader";

// Layout das rotas do Dono (/login e /dashboard). Só elas precisam da sessão,
// então o Visitante nas outras páginas nem consulta o login.
// O Suspense mostra o PageLoader enquanto o código da página (carregado sob demanda) chega.
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
};

export default AuthLayout;
