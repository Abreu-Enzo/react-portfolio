import "./Tag.css";

// Tópico do repositório. Use dentro de <ul className="fo-tags">.
const Tag = ({ children }) => {
  return <li className="fo-tag">#{children}</li>;
};

export default Tag;
