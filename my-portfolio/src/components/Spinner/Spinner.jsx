import "./Spinner.css";

const Spinner = ({ size = 16, label }) => {
  return (
    <span
      className="fo-spinner"
      style={{ width: size, height: size }}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    />
  );
};

export default Spinner;
