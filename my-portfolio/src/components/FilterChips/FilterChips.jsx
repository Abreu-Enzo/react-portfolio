import "./FilterChips.css";

const FilterChips = ({ options, value, onChange, label = "Filtrar" }) => {
  return (
    <div className="fo-chips" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="fo-chip"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {option.count !== undefined && <span className="fo-chip-count">{option.count}</span>}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
