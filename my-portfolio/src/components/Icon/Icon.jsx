import { ICONS } from "./icons";
import "./Icon.css";

// Os desenhos de icons.js são strings SVG fixas escritas por nós (nunca vêm do usuário),
// por isso é seguro injetá-las com dangerouslySetInnerHTML.
const Icon = ({ name, size = 20, strokeWidth = 1.75, label, className = "" }) => {
  return (
    <svg
      className={`fo-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
};

export default Icon;
