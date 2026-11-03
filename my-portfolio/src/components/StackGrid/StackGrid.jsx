import Icon from "../Icon/Icon";
import "./StackGrid.css";

// Grade de tecnologias. Cada logo é monocromático e ganha a cor da marca no hover.
// items: [{ name, src?, hex?, icon? }]
// - src + hex: logo oficial (SVG do simpleicons.org em src/assets/stack/) e a cor da marca, sem "#"
// - icon: para quem não tem logo oficial, um ícone do próprio design system
const StackGrid = ({ items, label }) => {
  return (
    <ul className="fo-stack" aria-label={label}>
      {items.map((item) => (
        <li key={item.name} className="fo-stack-item">
          {item.src ? (
            // O SVG vira máscara (CSS), assim a cor vem do tema e não do arquivo.
            // Aspas no url(): o Vite embute SVG pequeno como "data:" com espaços e aspas simples.
            <span
              className="fo-stack-logo"
              style={{ "--logo": `url("${item.src}")`, "--logo-color": item.hex && `#${item.hex}` }}
              aria-hidden="true"
            />
          ) : (
            <Icon name={item.icon} size={32} className="fo-stack-icon" />
          )}
          <span className="fo-stack-name">{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default StackGrid;
