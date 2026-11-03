import Badge from "../Badge/Badge";
import "./SkillGroup.css";

// Um grupo de skills com título. Com `items`, mostra pílulas (Badge do design system);
// com `children`, mostra o que vier dentro (ex.: o StackGrid das tecnologias).
// `wide` ocupa a linha inteira da grade de skills no desktop.
const SkillGroup = ({ title, items = [], wide = false, children }) => {
  return (
    <div className={`fo-skill-group ${wide ? "fo-skill-group-wide" : ""}`}>
      <h3 className="fo-skill-title">{title}</h3>
      {children ?? (
        <ul className="fo-skill-list">
          {items.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillGroup;
