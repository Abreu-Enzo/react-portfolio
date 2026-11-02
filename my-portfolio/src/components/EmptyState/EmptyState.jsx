import Icon from "../Icon/Icon";
import "./EmptyState.css";

// Também é a base visual do ErrorState (classes fo-state-*).
const EmptyState = ({ icon = "folder", title, description, action, tone, role }) => {
  const classes = ["fo-state", tone && `fo-state-${tone}`].filter(Boolean).join(" ");

  return (
    <div className={classes} role={role}>
      <span className="fo-state-icon">
        <Icon name={icon} size={24} />
      </span>
      <p className="fo-state-title">{title}</p>
      {description && <p className="fo-state-desc">{description}</p>}
      {action && <div className="fo-state-actions">{action}</div>}
    </div>
  );
};

export default EmptyState;
