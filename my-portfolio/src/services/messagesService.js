import { send } from "@emailjs/browser";
import { getSupabase } from "./supabaseClient";

// Grava a Mensagem no banco. O status nasce "pending" (padrão da tabela).
async function saveMessage({ name, email, body }) {
  const { error } = await getSupabase().from("messages").insert({ name, email, body });
  if (error) throw error;
}

// Avisa o Dono por e-mail. Os nomes dos parâmetros precisam bater com o template do EmailJS.
async function notifyOwner({ name, email, body }) {
  await send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    { from_name: name, from_email: email, message: body },
    { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
  );
}

// Primeiro salva, depois avisa (ver docs/decisoes.md, "Envio do e-mail ao Dono"):
// - se salvar falhar, lança o erro e o formulário mostra a falha;
// - se só o e-mail falhar, a Mensagem já está no dashboard, então conta como enviada.
export async function sendContactMessage(message) {
  await saveMessage(message);

  try {
    await notifyOwner(message);
    return { emailSent: true };
  } catch {
    return { emailSent: false };
  }
}

// ---------- Dashboard (só o Dono: o RLS bloqueia os demais) ----------

// Converte a linha do banco (snake_case) para o formato usado no front.
function toMessage(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    body: row.body,
    status: row.status,
    createdAt: row.created_at,
  };
}

// Mensagens da mais nova para a mais antiga.
export async function getMessages() {
  const { data, error } = await getSupabase()
    .from("messages")
    .select("id, name, email, body, status, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(toMessage);
}

// status: "read" | "answered". O banco recusa voltar atrás (trigger em supabase/schema.sql).
export async function updateMessageStatus(id, status) {
  const { error } = await getSupabase().from("messages").update({ status }).eq("id", id);
  if (error) throw error;
}
