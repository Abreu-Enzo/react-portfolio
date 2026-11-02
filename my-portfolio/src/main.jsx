import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import ThemeProvider from "./contexts/ThemeProvider.jsx";

import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AuthLayout from "./pages/AuthLayout.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import { DashboardPage, LoginPage } from "./routes/lazyPages.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projetos", element: <ProjectsPage /> },
      { path: "projetos/:slug", element: <ProjectPage /> },
      { path: "contato", element: <ContactPage /> },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          {
            path: "dashboard",
            element: (
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            ),
          },
        ],
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* O tema envolve tudo, inclusive a página de erro, que fica fora do RootLayout. */}
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
