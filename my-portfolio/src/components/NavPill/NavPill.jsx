import { NavLink } from "react-router";
import Icon from "../Icon/Icon";
import "./NavPill.css";

// NavLink (do próprio React Router) marca sozinho o item da rota atual com aria-current="page".
// `end` no "/" evita que Início fique ativo em todas as páginas.
const NavPill = ({ items, ariaLabel = "Navegação principal", children }) => {
  return (
    <nav className="fo-nav fo-nav-wide" aria-label={ariaLabel}>
      <div className="fo-nav-pill">
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            end={item.href === "/"}
            className="fo-nav-item"
            aria-label={item.label}
          >
            <Icon name={item.icon} size={18} />
            <span className="fo-nav-label">{item.label}</span>
            <span className="fo-nav-tip" aria-hidden="true">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
      {children}
    </nav>
  );
};

export default NavPill;
