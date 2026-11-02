import { getSupabase } from "./supabaseClient";

// Destaques guardam o id do repositório no GitHub, na ordem escolhida pelo Dono
// (ver docs/decisoes.md, "Referência do Destaque ao Projeto").

// Ids dos Destaques em ordem (posição 1, 2, 3). Qualquer Visitante pode ler.
export async function getFeaturedIds() {
  const { data, error } = await getSupabase()
    .from("featured_projects")
    .select("github_repo_id, position")
    .order("position");
  if (error) throw error;
  return data.map((row) => row.github_repo_id);
}

// Substitui a lista inteira: apaga os Destaques e grava os novos com posição 1..N.
// Só o Dono consegue (RLS). Ver docs/decisoes.md, "Como salvar os Destaques".
export async function saveFeaturedIds(ids) {
  const supabase = getSupabase();

  // O Supabase exige um filtro no delete; "position >= 1" pega todas as linhas.
  const { error: deleteError } = await supabase.from("featured_projects").delete().gte("position", 1);
  if (deleteError) throw deleteError;

  if (ids.length === 0) return;

  const rows = ids.map((id, index) => ({ github_repo_id: id, position: index + 1 }));
  const { error } = await supabase.from("featured_projects").insert(rows);
  if (error) throw error;
}
