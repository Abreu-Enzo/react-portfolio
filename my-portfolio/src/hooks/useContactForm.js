import { useRef, useState } from "react";
import { CONTACT_FIELDS, validateContact, validateContactField } from "../schemas/contactSchema";
import { sendContactMessage } from "../services/messagesService";

const EMPTY_VALUES = { name: "", email: "", body: "" };

// Toda a lógica do formulário de contato; a página só renderiza.
// status: "idle" | "sending" | "success" | "error"
export default function useContactForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  // Refs dos campos, para focar o primeiro campo com erro no envio.
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const bodyRef = useRef(null);
  const fieldRefs = { name: nameRef, email: emailRef, body: bodyRef };

  // Trava contra clique duplo: o ref muda na hora, antes de o React desenhar
  // o botão desabilitado, então um segundo clique imediato já encontra `true`.
  const sendingRef = useRef(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    // Só revalida enquanto digita se o campo já foi visitado (não grita erro na primeira digitação).
    if (touched[name]) {
      setErrors({ ...errors, [name]: validateContactField(name, value) });
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateContactField(name, value) });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (sendingRef.current) return;

    const foundErrors = validateContact(values);
    setErrors(foundErrors);
    setTouched({ name: true, email: true, body: true });

    const firstInvalid = CONTACT_FIELDS.find((field) => foundErrors[field]);
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus("sending");
    try {
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        body: values.body.trim(),
      });
      setValues(EMPTY_VALUES); // sucesso limpa o formulário
      setTouched({});
      setStatus("success");
    } catch {
      setStatus("error"); // erro mantém o que a pessoa digitou
    } finally {
      sendingRef.current = false;
    }
  }

  return { values, errors, status, nameRef, emailRef, bodyRef, handleChange, handleBlur, handleSubmit };
}
