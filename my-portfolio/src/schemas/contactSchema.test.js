import { describe, expect, it } from "vitest";
import { validateContact, validateContactField } from "./contactSchema";

describe("validateContactField", () => {
  it("exige o nome", () => {
    expect(validateContactField("name", "")).toBe("Nome obrigatório");
    expect(validateContactField("name", "   ")).toBe("Nome obrigatório");
  });

  it("exige o e-mail e confere o formato", () => {
    expect(validateContactField("email", "")).toBe("E-mail obrigatório");
    expect(validateContactField("email", "enzo@")).toBe("E-mail inválido");
    expect(validateContactField("email", "enzo exemplo@site.com")).toBe("E-mail inválido");
    expect(validateContactField("email", "visitante@exemplo.com")).toBe("");
  });

  it("exige mensagem com no mínimo 20 caracteres, sem contar espaços nas pontas", () => {
    expect(validateContactField("body", "curta demais")).toBe("Mensagem com no mínimo 20 caracteres");
    expect(validateContactField("body", `   ${"a".repeat(19)}   `)).toBe(
      "Mensagem com no mínimo 20 caracteres",
    );
    expect(validateContactField("body", "a".repeat(20))).toBe("");
  });

  it("limita o tamanho do nome e da mensagem", () => {
    expect(validateContactField("name", "a".repeat(101))).toBe("Nome com no máximo 100 caracteres");
    expect(validateContactField("body", "a".repeat(2001))).toBe("Mensagem com no máximo 2000 caracteres");
  });
});

describe("validateContact", () => {
  it("devolve o erro de cada campo inválido", () => {
    expect(validateContact({ name: "", email: "enzo@", body: "oi" })).toEqual({
      name: "Nome obrigatório",
      email: "E-mail inválido",
      body: "Mensagem com no mínimo 20 caracteres",
    });
  });

  it("devolve {} quando tudo é válido", () => {
    const values = {
      name: "Visitante",
      email: "visitante@exemplo.com",
      body: "Olá! Gostei muito do seu portfólio.",
    };
    expect(validateContact(values)).toEqual({});
  });
});
