import FrameSection from "../components/FrameSection/FrameSection";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import TextField from "../components/TextField/TextField";
import TextArea from "../components/TextArea/TextArea";
import Button from "../components/Button/Button";
import Alert from "../components/Alert/Alert";
import useContactForm from "../hooks/useContactForm";
import { BODY_MAX_LENGTH, BODY_MIN_LENGTH } from "../schemas/contactSchema";
import "./ContactPage.css";

const ContactPage = () => {
  const { values, errors, status, nameRef, emailRef, bodyRef, handleChange, handleBlur, handleSubmit } =
    useContactForm();

  return (
    <FrameSection aria-labelledby="contact-title">
      <SectionHeader
        title="Contato"
        as="h1"
        id="contact-title"
        eyebrow="Fale comigo"
        meta="Respondo pelo e-mail que você informar."
      />

      <div className="fo-contact">
        {status === "success" && (
          <Alert tone="success" title="Mensagem enviada">
            Obrigado pelo contato! Respondo em breve no e-mail que você informou.
          </Alert>
        )}
        {status === "error" && (
          <Alert tone="danger" title="Não foi possível enviar">
            Algo falhou do meu lado. O que você escreveu continua no formulário: tente de novo em instantes.
          </Alert>
        )}

        {/* noValidate: a validação é a nossa (mensagens específicas), não a do navegador. */}
        <form className="fo-form" noValidate onSubmit={handleSubmit}>
          <TextField
            id="contact-name"
            name="name"
            label="Nome"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            ref={nameRef}
          />
          <TextField
            id="contact-email"
            name="email"
            type="email"
            label="E-mail"
            autoComplete="email"
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            hint="É por ele que eu respondo."
            ref={emailRef}
          />
          <TextArea
            id="contact-body"
            name="body"
            label="Mensagem"
            required
            showCount
            minLength={BODY_MIN_LENGTH}
            maxLength={BODY_MAX_LENGTH}
            value={values.body}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.body}
            hint={`No mínimo ${BODY_MIN_LENGTH} caracteres.`}
            ref={bodyRef}
          />
          <div>
            <Button
              type="submit"
              variant="brand"
              iconRight="send"
              loading={status === "sending"}
              loadingText="Enviando..."
            >
              Enviar mensagem
            </Button>
          </div>
        </form>
      </div>
    </FrameSection>
  );
};

export default ContactPage;
