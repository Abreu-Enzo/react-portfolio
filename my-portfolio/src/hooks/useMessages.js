import { useEffect, useState } from "react";
import { getMessages, updateMessageStatus } from "../services/messagesService";

// Mensagens do dashboard: status "loading" | "success" | "error", mais as ações que avançam o estado.
export default function useMessages() {
  const [state, setState] = useState({ status: "loading", messages: [], error: null });
  const [attempt, setAttempt] = useState(0);
  const [busyId, setBusyId] = useState(null); // Mensagem cujo "Marcar como respondida" está salvando
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

  // Abrir uma Mensagem Pendente faz ela virar Lida. Atualização otimista: muda na tela na hora
  // e desfaz se o banco recusar.
  function markAsRead(message) {
    if (message.status !== "pending") return;

    setMessageStatus(message.id, "read");
    updateMessageStatus(message.id, "read").catch(() => {
      setMessageStatus(message.id, "pending");
      setActionError("Não foi possível marcar a Mensagem como Lida. Tente abrir de novo.");
    });
  }

  // Respondida é final, então aqui esperamos o banco confirmar (spinner no botão) antes de mudar a tela.
  async function markAsAnswered(message) {
    setBusyId(message.id);
    setActionError("");
    try {
      await updateMessageStatus(message.id, "answered");
      setMessageStatus(message.id, "answered");
    } catch {
      setActionError("Não foi possível marcar a Mensagem como Respondida. Tente de novo.");
    } finally {
      setBusyId(null);
    }
  }

  return { ...state, retry, busyId, actionError, markAsRead, markAsAnswered };
}
