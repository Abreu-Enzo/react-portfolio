import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell/DashboardShell";
import StatTile from "../components/StatTile/StatTile";
import Tabs from "../components/Tabs/Tabs";
import Alert from "../components/Alert/Alert";
import MessagesPanel from "../components/MessagesPanel/MessagesPanel";
import FeaturedPanel from "../components/FeaturedPanel/FeaturedPanel";
import useAuth from "../hooks/useAuth";
import useMessages from "../hooks/useMessages";
import useFeatured, { MAX_FEATURED } from "../hooks/useFeatured";
import useGithubRepos from "../hooks/useGithubRepos";
import { signOut } from "../services/authService";
import { countByStatus, sortMessages } from "../utils/messages";

// Área do Dono. Só é renderizada dentro do PrivateRoute e é carregada sob demanda (React.lazy em main.jsx).
const DashboardPage = () => {
  const { session } = useAuth();
  const messages = useMessages();
  const featured = useFeatured();
  const projects = useGithubRepos(); // usa o mesmo cache do resto do site: sem requisição extra ao GitHub
  const [tab, setTab] = useState("messages");
  const [logoutFailed, setLogoutFailed] = useState(false);

  const sortedMessages = useMemo(() => sortMessages(messages.messages), [messages.messages]);
  const counts = useMemo(() => countByStatus(messages.messages), [messages.messages]);
  const loaded = messages.status === "success";

  // Ao sair, o AuthProvider recebe a sessão vazia e o PrivateRoute leva para /login.
  async function handleLogout() {
    setLogoutFailed(false);
    try {
      await signOut();
    } catch {
      setLogoutFailed(true);
    }
  }

  const stats = (
    <>
      <StatTile value={loaded ? counts.pending : "–"} label="Pendentes" highlight />
      <StatTile value={loaded ? counts.read : "–"} label="Lidas" />
      <StatTile value={loaded ? counts.answered : "–"} label="Respondidas" />
    </>
  );

  const tabs = (
    <Tabs
      label="Seções do dashboard"
      value={tab}
      onChange={setTab}
      items={[
        { value: "messages", label: "Mensagens", icon: "inbox", count: counts.pending },
        { value: "featured", label: "Destaques", icon: "star" },
      ]}
    />
  );

  return (
    <DashboardShell email={session.user.email} stats={stats} tabs={tabs} onLogout={handleLogout}>
      {logoutFailed && (
        <Alert tone="danger" title="Não foi possível sair">
          Tente de novo em instantes.
        </Alert>
      )}
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "messages" ? (
          <MessagesPanel
            status={messages.status}
            messages={sortedMessages}
            onRetry={messages.retry}
            onOpen={messages.markAsRead}
            onMarkAnswered={messages.markAsAnswered}
            busyId={messages.busyId}
            actionError={messages.actionError}
          />
        ) : (
          <FeaturedPanel projects={projects} featured={featured} maxFeatured={MAX_FEATURED} />
        )}
      </div>
    </DashboardShell>
  );
};

export default DashboardPage;
