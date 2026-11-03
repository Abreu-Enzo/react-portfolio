import "./Timeline.css";

// Trajetória (formação e experiência), do mais recente para o mais antigo.
// items: [{ title, org, place?, period }]
const Timeline = ({ items }) => {
  return (
    <ol className="fo-timeline">
      {items.map((item) => (
        <li key={`${item.title}-${item.period}`}>
          <span className="fo-tl-title">{item.title}</span>
          <span className="fo-tl-org">{item.org}</span>
          {item.place && <span className="fo-tl-place">{item.place}</span>}
          <span className="fo-tl-period">{item.period}</span>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
