import Icon from "../Icon/Icon";
import "./TextField.css";

// Campo de texto com rótulo visível e erro específico no lugar da dica (altura reservada: sem salto).
// No React 19, `ref` chega como prop comum e é repassado ao <input> para o formulário poder focá-lo.
const TextField = ({ id, label, error, hint, required = false, ref, ...rest }) => {
  const footId = `${id}-foot`;

  return (
    <div className={`fo-field ${error ? "fo-field-invalid" : ""}`}>
      <label className="fo-label" htmlFor={id}>
        {label}
        {required && <span className="fo-label-req"> (obrigatório)</span>}
      </label>
      <input
        id={id}
        ref={ref}
        className="fo-input"
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={footId}
        {...rest}
      />
      <div className="fo-field-foot" id={footId}>
        {error ? (
          <span className="fo-error">
            <Icon name="alert-circle" size={14} />
            {error}
          </span>
        ) : (
          hint && <span className="fo-hint">{hint}</span>
        )}
      </div>
    </div>
  );
};

export default TextField;
