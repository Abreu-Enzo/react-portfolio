import { createContext } from "react";

// Tema do site compartilhado com qualquer componente: { theme: "dark" | "light", changeTheme(next, origin?) }.
export const ThemeContext = createContext({ theme: "dark", changeTheme: () => {} });
