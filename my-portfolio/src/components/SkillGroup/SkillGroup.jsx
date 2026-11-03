import SkillCard from "../SkillCard/SkillCard";
import "./SkillGroup.css";

// Um grupo de skills com título. Com `skills`, mostra uma grade de SkillCard;
// com `children`, mostra o que vier dentro (ex.: o StackGrid das tecnologias).
const SkillGroup = ({ title, skills = [], children }) => {
  return (
    <div className="fo-skill-group">
      <h3 className="fo-skill-title">{title}</h3>
      {children ?? (
        <ul className="fo-skill-cards">
          {skills.map((skill) => (
            <li key={skill.title}>
              <SkillCard {...skill} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SkillGroup;
