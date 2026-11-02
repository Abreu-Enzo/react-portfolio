import { Navigate } from "react-router";
import FrameSection from "../components/FrameSection/FrameSection";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import TextField from "../components/TextField/TextField";
import Button from "../components/Button/Button";
import Alert from "../components/Alert/Alert";
import useAuth from "../hooks/useAuth";
import useLoginForm from "../hooks/useLoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  const { session } = useAuth();
  const { values, errors, status, submitError, emailRef, passwordRef, handleChange, handleSubmit } =
    useLoginForm();

  // Já logado (ou acabou de entrar): vai direto para o dashboard.
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <FrameSection aria-labelledby="login-title">
      <SectionHeader title="Entrar" as="h1" id="login-title" eyebrow="Área do Dono" />

      <div className="fo-login">
        {status === "error" && (
          <Alert tone="danger" title="Login não realizado">
            {submitError}
          </Alert>
        )}

        <form className="fo-form" noValidate onSubmit={handleSubmit}>
          <TextField
            id="login-email"
            name="email"
            type="email"
            label="E-mail"
            autoComplete="email"
            required
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            ref={emailRef}
          />
          <TextField
            id="login-password"
            name="password"
            type="password"
            label="Senha"
            autoComplete="current-password"
            required
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            ref={passwordRef}
          />
          <div>
            <Button type="submit" iconLeft="lock" loading={status === "sending"} loadingText="Entrando...">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </FrameSection>
  );
};

export default LoginPage;
