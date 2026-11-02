import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../../contexts/AuthContext";

// Monta um roteador em memória começando em /dashboard, com a sessão que o teste escolher.
// Fornecemos o AuthContext direto: o teste não depende do Supabase.
function renderDashboard(auth) {
  const router = createMemoryRouter(
    [
      { path: "/login", element: <p>Página de login</p> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <p>Conteúdo do dashboard</p>
          </PrivateRoute>
        ),
      },
    ],
    { initialEntries: ["/dashboard"] },
  );

  render(
    <AuthContext.Provider value={auth}>
      <RouterProvider router={router} />
    </AuthContext.Provider>,
  );
  return router;
}

describe("PrivateRoute", () => {
  it("redireciona para /login quem não está logado", async () => {
    const router = renderDashboard({ status: "ready", session: null });

    expect(await screen.findByText("Página de login")).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo do dashboard")).not.toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/login");
  });

  it("mostra o dashboard para o Dono logado", async () => {
    const session = { user: { email: "dono@exemplo.com" } };
    const router = renderDashboard({ status: "ready", session });

    expect(await screen.findByText("Conteúdo do dashboard")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/dashboard");
  });

  it("espera a sessão carregar antes de decidir (não redireciona no F5)", async () => {
    const router = renderDashboard({ status: "loading", session: null });

    expect(await screen.findByRole("status", { name: "Verificando login" })).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/dashboard");
  });
});
