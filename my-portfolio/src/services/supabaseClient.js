import { createClient } from "@supabase/supabase-js";

let client = null;

// Cria o cliente na primeira vez que alguém precisa dele. Assim, se o .env não estiver
// configurado, só a ação que usa o Supabase falha, e não o site inteiro ao abrir.
export function getSupabase() {
  if (!client) {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error("Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env");
    }
    client = createClient(url, anonKey);
  }
  return client;
}
