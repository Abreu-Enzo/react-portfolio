import { Link } from "react-router";
import Icon from "../Icon/Icon";
import "./SiteFooter.css";

const FooterLink = ({ link }) => {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer">
        {link.label}
        <Icon name="arrow-up-right" size={16} />
      </a>
    );
  }

  return <Link to={link.href}>{link.label}</Link>;
};

const SiteFooter = ({ menu, contact, signature }) => {
  return (
    <footer className="fo-footer">
      <div>
        <h2>Menu</h2>
        <ul>
          {menu.map((link) => (
            <li key={link.href}>
              <FooterLink link={link} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Contato</h2>
        <ul>
          {contact.map((link) => (
            <li key={link.href}>
              <FooterLink link={link} />
            </li>
          ))}
        </ul>
      </div>
      {signature && <p className="fo-footer-sign">{signature}</p>}
    </footer>
  );
};

export default SiteFooter;
