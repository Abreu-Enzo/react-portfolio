import Icon from "../Icon/Icon";
import "./Tabs.css";

// Abas em pílula. Cada aba controla o painel de id `panel-<value>` (o painel fica na página).
const Tabs = ({ items, value, onChange, label }) => {
  return (
    <div className="fo-tabs" role="tablist" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          id={`tab-${item.value}`}
          aria-controls={`panel-${item.value}`}
          aria-selected={item.value === value}
          className="fo-tab"
          onClick={() => onChange(item.value)}
        >
          {item.icon && <Icon name={item.icon} size={16} />}
          {item.label}
          {item.count > 0 && <span className="fo-tab-count">{item.count}</span>}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
