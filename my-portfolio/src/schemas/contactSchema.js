// Validação do formulário de contato em JavaScript puro.
// Cada função devolve a mensagem de erro do campo, ou "" quando está tudo certo.
// Os limites batem com os da tabela messages (supabase/schema.sql).

export const NAME_MAX_LENGTH = 100;
export const BODY_MIN_LENGTH = 20;
export const BODY_MAX_LENGTH = 2000;

export const CONTACT_FIELDS = ["name", "email", "body"];

// Algo@algo.algo, sem espaços. Simples de propósito: quem confirma o e-mail de verdade é a resposta.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactField(field, value) {
  const text = value.trim();

  if (field === "name") {
    if (!text) return "Nome obrigatório";
    if (text.length > NAME_MAX_LENGTH) return `Nome com no máximo ${NAME_MAX_LENGTH} caracteres`;
  }

  if (field === "email") {
    if (!text) return "E-mail obrigatório";
    if (!EMAIL_PATTERN.test(text)) return "E-mail inválido";
  }

  if (field === "body") {
    if (text.length < BODY_MIN_LENGTH) return `Mensagem com no mínimo ${BODY_MIN_LENGTH} caracteres`;
    if (text.length > BODY_MAX_LENGTH) return `Mensagem com no máximo ${BODY_MAX_LENGTH} caracteres`;
  }

  return "";
}

// Valida todos os campos. Retorna só os campos com erro: {} significa formulário válido.
export function validateContact(values) {
  const errors = {};
  CONTACT_FIELDS.forEach((field) => {
    const message = validateContactField(field, values[field]);
    if (message) errors[field] = message;
  });
  return errors;
}
