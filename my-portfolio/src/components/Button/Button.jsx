import { Link } from "react-router";
import Icon from "../Icon/Icon";
import Spinner from "../Spinner/Spinner";
import "./Button.css";

// Um só botão para o site inteiro:
// - `to`   → navegação interna (Link do React Router, sem recarregar a página)
// - `href` → link externo (<a>), com `external` para abrir em nova aba
// - sem os dois → <button>, que fica desabilitado enquanto `loading` for true
const Button = ({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  loading = false,
  loadingText,
  to,
  href,
  external = false,
  type = "button",
  disabled = false,
  className = "",
  children,
  ...rest
}) => {
  const classes = ["fo-btn", `fo-btn-${variant}`, size !== "md" && `fo-btn-${size}`, className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? <Spinner /> : iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{loading && loadingText ? loadingText : children}</span>
      {iconRight && !loading && (
        <Icon name={iconRight} size={18} className={iconRight === "arrow-up-right" ? "fo-arrow" : ""} />
      )}
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
