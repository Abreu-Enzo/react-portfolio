import Alert from "../Alert/Alert";
import EmptyState from "../EmptyState/EmptyState";
import ErrorState from "../ErrorState/ErrorState";
import MessageRow from "../MessageRow/MessageRow";
import Skeleton from "../Skeleton/Skeleton";
import "./MessagesPanel.css";

const SKELETON_ROWS = 3;

// Aba Mensagens do dashboard, com os quatro estados: carregando, erro, vazio e lista.
const MessagesPanel = ({ status, messages, onRetry, onOpen, onMarkAnswered, busyId, actionError }) => {
  if (status === "error") {
    return (
      <ErrorState
        title="Não foi possível carregar as Mensagens"
        description="O banco de dados não respondeu. Confira sua conexão e tente de novo."
        onRetry={onRetry}
      />
    );
  }

  if (status === "loading") {
    return (
      <div className="fo-panel-loading" aria-busy="true">
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <Skeleton key={index} height="112px" radius="var(--radius-lg)" />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="Nenhuma Mensagem ainda"
        description="Quando alguém escrever pelo formulário de contato, a Mensagem aparece aqui."
      />
    );
  }

  return (
    <div className="fo-panel">
      {actionError && <Alert tone="danger">{actionError}</Alert>}
      <ul className="fo-list">
        {messages.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            onOpen={onOpen}
            onMarkAnswered={onMarkAnswered}
            busy={busyId === message.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default MessagesPanel;
