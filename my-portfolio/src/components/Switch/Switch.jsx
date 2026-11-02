import "./Switch.css";

// Liga/desliga acessível: por baixo é um checkbox de verdade com role="switch",
// então teclado (espaço) e leitores de tela funcionam sem código extra.
const Switch = ({ id, label, description, checked, onChange, disabled = false }) => {
  return (
    <label className={`fo-switch ${disabled ? "fo-switch-disabled" : ""}`} htmlFor={id}>
      <span className="fo-switch-text">
        <span className="fo-switch-label">{label}</span>
        {description && <span className="fo-switch-desc">{description}</span>}
      </span>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="fo-switch-track" aria-hidden="true">
        <span className="fo-switch-thumb" />
      </span>
    </label>
  );
};

export default Switch;
