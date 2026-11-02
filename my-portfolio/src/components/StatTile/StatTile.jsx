import "./StatTile.css";

// Número grande + legenda do resumo do dashboard. `highlight` só no que pede ação (as Pendentes).
const StatTile = ({ value, label, highlight = false }) => {
  return (
    <div className="fo-stat">
      <span className={`fo-stat-value ${highlight ? "fo-stat-value-brand" : ""}`}>{value}</span>
      <span className="fo-stat-label">{label}</span>
    </div>
  );
};

export default StatTile;
