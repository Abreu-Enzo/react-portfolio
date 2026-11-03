import Card from "../Card/Card";
import "./Timeline.css";

// Linha do tempo da trajetória, do mais recente para o mais antigo.
// No celular, a linha fica à esquerda; a partir de 900px, no centro, com os itens alternando de lado.
// items: [{ title, org, place?, period, current? }] (`current` destaca o ponto do cargo atual)
const Timeline = ({ items }) => {
  return (
    <ol className="fo-timeline">
      {items.map((item) => (
        <li
          key={`${item.title}-${item.period}`}
          className={`fo-tl-item ${item.current ? "fo-tl-current" : ""}`}
        >
          <span className="fo-tl-dot" aria-hidden="true" />
          <Card interactive className="fo-tl-card">
            <span className="fo-tl-period">{item.period}</span>
            <span className="fo-tl-title">{item.title}</span>
            <span className="fo-tl-org">
              {item.org}
              {item.place && ` · ${item.place}`}
            </span>
          </Card>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
