import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactPage from "./ContactPage";
import { sendContactMessage } from "../services/messagesService";

// Troca o service de verdade (Supabase + EmailJS) por uma função falsa:
// o teste não envia nada e consegue conferir se o envio foi chamado.
vi.mock("../services/messagesService", () => ({
  sendContactMessage: vi.fn(),
}));

const VALID = {
  name: "Visitante",
  email: "visitante@exemplo.com",
  body: "Olá! Gostei muito do seu portfólio.",
};

async function fillForm(user, values) {
  if (values.name) await user.type(screen.getByLabelText(/Nome/), values.name);
  if (values.email) await user.type(screen.getByLabelText(/E-mail/), values.email);
  if (values.body) await user.type(screen.getByLabelText(/Mensagem/), values.body);
}

describe("ContactPage", () => {
  beforeEach(() => {
    sendContactMessage.mockReset();
  });

  it("mostra o erro de cada campo e não envia com o formulário vazio", async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(screen.getByText("Nome obrigatório")).toBeInTheDocument();
    expect(screen.getByText("E-mail obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Mensagem com no mínimo 20 caracteres")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/)).toHaveFocus(); // foco vai para o primeiro campo com erro
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("mostra 'E-mail inválido' e não envia com e-mail mal formatado", async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    await fillForm(user, { ...VALID, email: "visitante@" });
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(screen.getByText("E-mail inválido")).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/)).toHaveFocus();
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("mostra o erro ao sair de um campo inválido", async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    await user.type(screen.getByLabelText(/Mensagem/), "curta");
    await user.tab(); // sai do campo (blur)

    expect(screen.getByText("Mensagem com no mínimo 20 caracteres")).toBeInTheDocument();
  });

  it("envia uma vez só, bloqueia o botão durante o envio e mostra sucesso", async () => {
    // Promessa que só termina quando o teste mandar: dá tempo de ver o botão bloqueado.
    let finishSending;
    sendContactMessage.mockReturnValue(new Promise((resolve) => (finishSending = resolve)));

    const user = userEvent.setup();
    render(<ContactPage />);
    await fillForm(user, VALID);

    const button = screen.getByRole("button", { name: "Enviar mensagem" });
    await user.dblClick(button);

    expect(screen.getByRole("button", { name: /Enviando/ })).toBeDisabled();
    expect(sendContactMessage).toHaveBeenCalledTimes(1);
    expect(sendContactMessage).toHaveBeenCalledWith(VALID);

    finishSending({ emailSent: true });

    expect(await screen.findByText("Mensagem enviada")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/)).toHaveValue(""); // sucesso limpa o formulário
  });

  it("mostra erro e mantém o que foi digitado quando o envio falha", async () => {
    sendContactMessage.mockRejectedValue(new Error("Supabase fora do ar"));

    const user = userEvent.setup();
    render(<ContactPage />);
    await fillForm(user, VALID);
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(await screen.findByText("Não foi possível enviar")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/)).toHaveValue(VALID.name);
    expect(screen.getByRole("button", { name: "Enviar mensagem" })).toBeEnabled();
  });
});
