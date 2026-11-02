import { EMAIL_PATTERN } from "./contactSchema";

// Validação do login do Dono. Retorna só os campos com erro: {} significa válido.
export function validateLogin({ email, password }) {
  const errors = {};
  const text = email.trim();

  if (!text) errors.email = "E-mail obrigatório";
  else if (!EMAIL_PATTERN.test(text)) errors.email = "E-mail inválido";

  if (!password) errors.password = "Senha obrigatória";

  return errors;
}
