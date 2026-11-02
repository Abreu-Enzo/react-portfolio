import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "theme";
const REVEAL_DURATION_MS = 500;

// O script inline do index.html já escolheu o tema (salvo ou do sistema) e o aplicou no <html>
// antes do React carregar. Aqui só lemos esse valor: assim não há flash nem duas regras diferentes.
function readInitialTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

// Salva só quando o Visitante escolhe: na primeira visita, o tema segue o sistema e nada é gravado
// (ver docs/decisoes.md, "Tema na primeira visita").
function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Navegação privada ou armazenamento bloqueado: o tema funciona, só não fica salvo.
  }
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readInitialTheme);

  // Mantém o <html> igual ao estado.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // `origin` é o ponto da tela de onde parte a revelação circular (o centro do botão).
  function changeTheme(next, origin) {
    saveTheme(next);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion || !origin) {
      setTheme(next); // sem suporte ou com movimento reduzido: troca direto
      return;
    }

    // A View Transition tira uma "foto" da tela, roda o callback e anima da foto antiga para a nova.
    // O callback precisa mudar a página na hora, por isso aplicamos o tema direto no <html>
    // (o setTheme sozinho só atualizaria no próximo render).
    const transition = document.startViewTransition(() => {
      applyTheme(next);
      setTheme(next);
    });

    transition.ready.then(() => {
      const { x, y } = origin;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: REVEAL_DURATION_MS, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
