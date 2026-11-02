import Switch from "../Switch/Switch";
import "./FeaturedRow.css";

// Um Projeto na aba Destaques: ligar o Switch faz dele um Destaque da home.
// Use dentro de <ul className="fo-list">.
const FeaturedRow = ({ id, name, description, checked, onChange, disabled = false }) => {
  return (
    <li className="fo-featured-row">
      <Switch
        id={`featured-${id}`}
        label={name}
        description={description}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </li>
  );
};

export default FeaturedRow;
