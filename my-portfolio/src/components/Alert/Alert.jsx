import Icon from "../Icon/Icon";
import "./Alert.css";

const ICONS_BY_TONE = {
  success: "check",
  danger: "alert-circle",
  warning: "alert-triangle",
  info: "info",
};

// Retorno de uma ação ou aviso. `danger` interrompe o leitor de tela (role="alert"); os outros não.
const Alert = ({ tone = "info", title, children }) => {
  return (
    <div className={`fo-alert fo-alert-${tone} fo-alert-enter`} role={tone === "danger" ? "alert" : "status"}>
      <Icon name={ICONS_BY_TONE[tone]} size={18} className="fo-alert-icon" />
      <div className="fo-alert-body">
        {title && <p className="fo-alert-title">{title}</p>}
        {children && <p className="fo-alert-text">{children}</p>}
      </div>
    </div>
  );
};

export default Alert;
