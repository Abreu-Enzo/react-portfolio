import { useEffect, useState } from "react";
import { getMessages, updateMessageStatus } from "../services/messagesService";

// Mensagens do dashboard: status "loading" | "success" | "error", mais as ações que avançam o estado.
export default function useMessages() {
  const [state, setState] = useState({ status: "loading", messages: [], error: null });
  const [attempt, setAttempt] = useState(0);
  const [saving, setSaving] = useState(null); // { id, status } da Mensagem que está salvando, ou null
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    let ignore = false;

    getMessages()
      .then((messages) => {
        if (!ignore) setState({ status: "success", messages, error: null });
      })
      .catch((error) => {
        if (!ignore) setState({ status: "error", messages: [], error });
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setState({ ...state, status: "loading" });
    setAttempt(attempt + 1);
  }

  // Troca o status de uma Mensagem na lista em memória. Usa a forma `setState(atual => ...)`
  // porque roda depois de um `await`, quando `state` deste render já pode estar desatualizado.
  function setMessageStatus(id, status) {
    setState((current) => ({
      ...current,
      messages: current.messages.map((message) => (message.id === id ? { ...message, status } : message)),
    }));
  }

  // Avança o status esperando o banco confirmar (spinner no botão) antes de mudar a tela.
  // Os estados só avançam e não há desfazer, então não vale mostrar uma mudança que pode falhar.
  async function advanceStatus(message, status, label) {
    setSaving({ id: message.id, status });
    setActionError("");
    try {
      await updateMessageStatus(message.id, status);
      setMessageStatus(message.id, status);
    } catch {
      setActionError(`Não foi possível marcar a Mensagem como ${label}. Tente de novo.`);
    } finally {
      setSaving(null);
    }
  }

  function markAsRead(message) {
    return advanceStatus(message, "read", "Lida");
  }

  function markAsAnswered(message) {
    return advanceStatus(message, "answered", "Respondida");
  }

  return { ...state, retry, saving, actionError, markAsRead, markAsAnswered };
}
