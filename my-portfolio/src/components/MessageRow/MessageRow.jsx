import { useEffect, useRef, useState } from "react";
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

// Uma Mensagem no dashboard. Fechada mostra só a primeira linha do texto.
// Expandir só muda a visualização; o status muda apenas pelos botões de status.
// `savingStatus`: status que está sendo salvo nesta linha ("read" | "answered"), ou null.
// Use dentro de <ul className="fo-list">.
const MessageRow = ({ message, onMarkRead, onMarkAnswered, savingStatus = null }) => {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const bodyRef = useRef(null);
  const badge = STATUS_BADGES[message.status];
  const bodyId = `message-${message.id}-body`;
  const saving = savingStatus !== null;

  // O botão "Expandir" só aparece se o texto não cabe na linha. Mede depois de desenhar
  // (requestAnimationFrame) e de novo quando a janela muda de tamanho (ex.: girar o celular).
  // Medido só fechado: aberto, o texto inteiro já está visível.
  useEffect(() => {
    const body = bodyRef.current;
    if (expanded || !body) return;

    function measure() {
      setOverflowing(body.scrollHeight > body.clientHeight);
    }

    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [expanded, message.body]);

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

      <p ref={bodyRef} className={`fo-row-body ${expanded ? "" : "fo-row-body-clamp"}`} id={bodyId}>
        {message.body}
      </p>

      <div className="fo-row-actions">
        {(overflowing || expanded) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={bodyId}
          >
            {expanded ? "Recolher" : "Expandir"}
          </Button>
        )}
        {message.status === "pending" && (
          <Button
            variant="secondary"
            size="sm"
            iconLeft="check"
            loading={savingStatus === "read"}
            loadingText="Salvando..."
            disabled={saving}
            onClick={() => onMarkRead(message)}
          >
            Marcar como lida
          </Button>
        )}
        {message.status !== "answered" && (
          <Button
            variant="secondary"
            size="sm"
            iconLeft="check-check"
            loading={savingStatus === "answered"}
            loadingText="Salvando..."
            disabled={saving}
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
