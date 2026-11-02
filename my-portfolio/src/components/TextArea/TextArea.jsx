import Icon from "../Icon/Icon";
import "../TextField/TextField.css";
import "./TextArea.css";

// Mesmo contrato do TextField, para texto longo, com contador opcional
// (fica em `warning` enquanto o texto está abaixo do mínimo).
const TextArea = ({
  id,
  label,
  error,
  hint,
  required = false,
  showCount = false,
  minLength,
  maxLength,
  value = "",
  ref,
  ...rest
}) => {
  const footId = `${id}-foot`;
  const length = value.trim().length;
  const isBelowMin = minLength !== undefined && length < minLength;

  return (
    <div className={`fo-field ${error ? "fo-field-invalid" : ""}`}>
      <label className="fo-label" htmlFor={id}>
        {label}
        {required && <span className="fo-label-req"> (obrigatório)</span>}
      </label>
      <textarea
        id={id}
        ref={ref}
        className="fo-input fo-textarea"
        required={required}
        value={value}
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
        {showCount && (
          <span className={`fo-counter ${isBelowMin ? "fo-counter-low" : ""}`}>
            {length}
            {maxLength ? `/${maxLength}` : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
