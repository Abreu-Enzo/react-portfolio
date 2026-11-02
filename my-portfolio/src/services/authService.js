import { getSupabase } from "./supabaseClient";

// Login do Dono por e-mail e senha (não há cadastro: o usuário é criado à mão no Supabase).
export async function signIn(email, password) {
  const { error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await getSupabase().auth.signOut();
  if (error) throw error;
}

// Sessão salva pelo Supabase no navegador (null quando ninguém está logado).
export async function getSession() {
  const { data } = await getSupabase().auth.getSession();
  return data.session;
}

// Avisa a cada login, logout ou renovação de token. Devolve a função que cancela o aviso.
export function onAuthChange(callback) {
  const { data } = getSupabase().auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}
