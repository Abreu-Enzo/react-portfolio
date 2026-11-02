import { useEffect, useState } from "react";
import { getFeaturedIds, saveFeaturedIds } from "../services/featuredService";

export const MAX_FEATURED = 3;

// Destaques escolhidos pelo Dono. A home só lê; o dashboard também liga e desliga.
// status: "loading" | "success" | "error"
export default function useFeatured() {
  const [state, setState] = useState({ status: "loading", ids: [], error: null });
  const [attempt, setAttempt] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let ignore = false;

    getFeaturedIds()
      .then((ids) => {
        if (!ignore) setState({ status: "success", ids, error: null });
      })
      .catch((error) => {
        if (!ignore) setState({ status: "error", ids: [], error });
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setState({ ...state, status: "loading" });
    setAttempt(attempt + 1);
  }

  // Ligar põe o Projeto no fim da lista (a ordem é a ordem em que o Dono marcou); desligar tira.
  // Otimista: o Switch muda na hora e volta se o banco recusar.
  async function toggle(id, checked) {
    const previousIds = state.ids;
    const nextIds = checked ? [...previousIds, id] : previousIds.filter((featuredId) => featuredId !== id);
    if (nextIds.length > MAX_FEATURED) return;

    setState({ ...state, ids: nextIds });
    setSaving(true);
    setSaveError("");
    try {
      await saveFeaturedIds(nextIds);
    } catch {
      setState((current) => ({ ...current, ids: previousIds }));
      setSaveError("Não foi possível salvar os Destaques. Tente de novo.");
    } finally {
      setSaving(false);
    }
  }

  return { ...state, retry, saving, saveError, toggle };
}
