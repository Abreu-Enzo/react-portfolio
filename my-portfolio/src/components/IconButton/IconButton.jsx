import Icon from "../Icon/Icon";
import "./IconButton.css";

// Botão redondo só com ícone. `label` é obrigatório: vira o nome acessível (aria-label) e a dica (title).
const IconButton = ({
  icon,
  label,
  variant = "ghost",
  size = "md",
  iconSize = 20,
  className = "",
  type = "button",
  ...rest
}) => {
  const classes = ["fo-iconbtn", `fo-iconbtn-${variant}`, size !== "md" && `fo-iconbtn-${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={iconSize} />
    </button>
  );
};

export default IconButton;
