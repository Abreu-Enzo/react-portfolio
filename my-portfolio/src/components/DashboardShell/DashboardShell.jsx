import Button from "../Button/Button";
import "./DashboardShell.css";

// Moldura da área do Dono: quem está logado, botão Sair, resumo, abas e o painel da aba ativa.
const DashboardShell = ({ email, title = "Dashboard", stats, tabs, onLogout, children }) => {
  const initial = email ? email[0].toUpperCase() : "?";

  return (
    <section className="fo-shell" aria-labelledby="dashboard-title">
      <div className="fo-shell-top">
        <div className="fo-shell-user">
          <span className="fo-avatar" aria-hidden="true">
            {initial}
          </span>
          <div>
            <h1 className="fo-shell-hello" id="dashboard-title">
              {title}
            </h1>
            <p className="fo-shell-sub">{email}</p>
          </div>
        </div>
        <Button variant="secondary" iconLeft="log-out" onClick={onLogout}>
          Sair
        </Button>
      </div>

      {stats && <div className="fo-stats">{stats}</div>}
      {tabs}
      <div className="fo-shell-panel">{children}</div>
    </section>
  );
};

export default DashboardShell;
