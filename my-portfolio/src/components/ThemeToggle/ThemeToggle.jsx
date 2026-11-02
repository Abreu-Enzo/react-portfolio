import IconButton from "../IconButton/IconButton";
import "./ThemeToggle.css";

// Alterna claro/escuro. Não guarda estado: recebe o tema atual e avisa qual é o próximo.
// O ícone mostra o destino: sol no escuro (vai para o claro), lua no claro.
const ThemeToggle = ({ theme, onChange }) => {
  const next = theme === "dark" ? "light" : "dark";

  function handleClick(event) {
    // Centro do botão: de onde parte a revelação circular (funciona também pelo teclado).
    const rect = event.currentTarget.getBoundingClientRect();
    onChange(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }

  return (
    <IconButton
      icon={theme === "dark" ? "sun" : "moon"}
      label={next === "light" ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      variant="glass"
      className="fo-theme"
      onClick={handleClick}
    />
  );
};

export default ThemeToggle;
