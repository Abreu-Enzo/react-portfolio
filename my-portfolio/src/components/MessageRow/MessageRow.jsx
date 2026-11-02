import { useState } from "react";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import { formatDateTime } from "../../utils/formatDate";
import "./MessageRow.css";

// Status sempre com ícone + palavra (nunca só cor). Termos do GLOSSARY.md.
const STATUS_BADGES = {
  pending: { tone: "warning", icon: "clock", label: "Pendente" },
  read: { tone: "neutral", icon: "check", label: "Lida" },
  answered: { tone: "success", icon: "check-check", label: "Respondida" },
};

// Uma Mensagem no dashboard. Fechada mostra só o começo do texto; abrir chama `onOpen`
// (é o que faz a Mensagem Pendente virar Lida). Use dentro de <ul className="fo-list">.
const MessageRow = ({ message, onOpen, onMarkAnswered, busy = false }) => {
  const [expanded, setExpanded] = useState(false);
  const badge = STATUS_BADGES[message.status];
  const bodyId = `message-${message.id}-body`;

  function handleToggle() {
    if (!expanded) onOpen(message);
    setExpanded(!expanded);
  }

  return (
    <li className={`fo-row ${message.status === "answered" ? "fo-row-answered" : ""}`}>
      <div className="fo-row-head">
        <span className="fo-row-name">{message.name}</span>
        <a className="fo-row-email" href={`mailto:${message.email}`}>
          {message.email}
        </a>
        <Badge tone={badge.tone} icon={badge.icon}>
          {badge.label}
        </Badge>
      </div>
      <time className="fo-row-date" dateTime={message.createdAt}>
        {formatDateTime(message.createdAt)}
      </time>

      <p className={`fo-row-body ${expanded ? "" : "fo-row-body-clamp"}`} id={bodyId}>
        {message.body}
      </p>

      <div className="fo-row-actions">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          aria-expanded={expanded}
          aria-controls={bodyId}
        >
          {expanded ? "Recolher" : "Ler mensagem"}
        </Button>
        {message.status !== "answered" && (
          <Button
            variant="secondary"
            size="sm"
            iconLeft="check-check"
            loading={busy}
            loadingText="Salvando..."
            onClick={() => onMarkAnswered(message)}
          >
            Marcar como respondida
          </Button>
        )}
      </div>
    </li>
  );
};

export default MessageRow;
