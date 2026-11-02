import { useRef, useState } from "react";
import { validateLogin } from "../schemas/loginSchema";
import { signIn } from "../services/authService";

// status: "idle" | "sending" | "error"
// Não há "success" aqui: com o login feito, o AuthProvider recebe a sessão e a LoginPage redireciona.
export default function useLoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const sendingRef = useRef(false); // trava contra clique duplo, como no formulário de contato

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (sendingRef.current) return;

    const foundErrors = validateLogin(values);
    setErrors(foundErrors);
    if (foundErrors.email) return emailRef.current?.focus();
    if (foundErrors.password) return passwordRef.current?.focus();

    sendingRef.current = true;
    setStatus("sending");
    try {
      await signIn(values.email.trim(), values.password);
    } catch (error) {
      setSubmitError(
        error.code === "invalid_credentials"
          ? "E-mail ou senha incorretos. Confira e tente de novo."
          : "Não foi possível entrar agora. Tente de novo em instantes.",
      );
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  }

  return { values, errors, status, submitError, emailRef, passwordRef, handleChange, handleSubmit };
}
