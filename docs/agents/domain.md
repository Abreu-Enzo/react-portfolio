# Documentação de domínio

Como as skills de engenharia devem consumir a documentação de domínio deste repositório ao explorar o código.

## Antes de explorar, leia

- **`GLOSSARY.md`** na raiz do repositório.
- **`docs/decisoes.md`**: o registro de decisões do projeto, no formato da skill `criterios-e-instrucoes` (opções comparadas, critério, escolha, trade-off). Faz o papel dos ADRs. Leia as decisões que tocam a área em que você vai trabalhar.

Se algum desses arquivos não existir, **siga em silêncio**. Não aponte a ausência nem sugira criá-los de antemão. A skill `/domain-modeling` (acionada via `/grill-with-docs` e `/improve-codebase-architecture`) os cria quando termos ou decisões forem de fato resolvidos.

## Estrutura de arquivos

Contexto único:

```
/
├── GLOSSARY.md
├── docs/
│   └── decisoes.md
└── my-portfolio/src/
```

## Use o vocabulário do glossário

Quando sua saída nomear um conceito do domínio (título de issue, proposta de refatoração, hipótese, nome de teste), use o termo como definido no `GLOSSARY.md`. Não troque por sinônimos que o glossário manda evitar.

O código fica em inglês e a interface em português (ver `docs/decisoes.md`): o glossário define o termo em português, e o código usa a tradução direta (ex.: Destaque → `featured`, Mensagem → `message`, Dono → `owner`).

Se o conceito de que você precisa ainda não está no glossário, isso é um sinal: ou você está inventando linguagem que o projeto não usa (reconsidere), ou há uma lacuna real (anote para o `/domain-modeling`).

## Aponte conflitos com decisões

Se sua saída contradiz uma decisão registrada em `docs/decisoes.md`, diga isso explicitamente em vez de sobrescrevê-la em silêncio:

> _Contradiz a decisão "Estados da Mensagem" em `docs/decisoes.md`, mas vale reabrir porque…_
