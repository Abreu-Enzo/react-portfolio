import { Outlet } from "react-router";
import NavPill from "../components/NavPill/NavPill";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import "./RootLayout.css";

const NAV_ITEMS = [
  { id: "home", label: "Início", icon: "home", href: "/" },
  { id: "projects", label: "Projetos", icon: "briefcase", href: "/projetos" },
];

const FOOTER_MENU = [
  { label: "Início", href: "/" },
  { label: "Projetos", href: "/projetos" },
];

const FOOTER_CONTACT = [{ label: "GitHub", href: "https://github.com/Abreu-Enzo", external: true }];

const RootLayout = () => {
  return (
    <>
      <header className="fo-header">
        <NavPill items={NAV_ITEMS} />
      </header>
      <main className="fo-main">
        <Outlet />
      </main>
      <SiteFooter
        menu={FOOTER_MENU}
        contact={FOOTER_CONTACT}
        signature={`© ${new Date().getFullYear()} Enzo Abreu. Feito com React.`}
      />
    </>
  );
};

export default RootLayout;
