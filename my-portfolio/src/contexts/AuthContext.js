import { createContext } from "react";

// Sessão do Dono compartilhada entre login, rota protegida e dashboard.
// Valor: { status: "loading" | "ready", session } (session é null sem login).
export const AuthContext = createContext({ status: "loading", session: null });
