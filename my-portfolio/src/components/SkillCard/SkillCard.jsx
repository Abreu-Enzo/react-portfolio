import Card from "../Card/Card";
import Icon from "../Icon/Icon";
import "./SkillCard.css";

// Card de uma skill: ilustração, nome e descrição curta, sobre um fundo suave (token --tint-*).
// - illustration: SVG de traço (src/assets/illustrations/), usado como máscara para pegar a cor do tema
// - icon: alternativa do design system enquanto a skill não tem ilustração
// - tone: "sky" | "lime" | "sand" | "rose" | "violet"
const SkillCard = ({ title, description, illustration, icon, tone = "sky" }) => {
  return (
    <Card as="article" interactive className={`fo-skill-card fo-tint-${tone}`}>
      {illustration ? (
        <span className="fo-skill-art" style={{ "--art": `url("${illustration}")` }} aria-hidden="true" />
      ) : (
        <span className="fo-skill-art-icon" aria-hidden="true">
          <Icon name={icon} size={40} strokeWidth={1.5} />
        </span>
      )}
      <h4 className="fo-skill-name">{title}</h4>
      <p className="fo-skill-desc">{description}</p>
    </Card>
  );
};

export default SkillCard;
