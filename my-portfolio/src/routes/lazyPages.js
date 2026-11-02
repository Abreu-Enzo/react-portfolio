import { lazy } from "react";

// Login e dashboard só interessam ao Dono: com lazy, o código deles vira um arquivo
// separado, baixado só quando alguém abre essas rotas (fora do pacote inicial do Visitante).
export const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
export const DashboardPage = lazy(() => import("../pages/DashboardPage.jsx"));
