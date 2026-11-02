import Icon from "../Icon/Icon";
import "./Badge.css";

const Badge = ({ tone = "neutral", icon, children }) => {
  return (
    <span className={`fo-badge fo-badge-${tone}`}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
};

export default Badge;
