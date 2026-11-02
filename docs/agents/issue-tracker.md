# Issue tracker: Markdown local

Issues e specs deste repositório ficam em arquivos Markdown dentro de `.scratch/`.

## Convenções

- Uma funcionalidade por pasta: `.scratch/<slug-da-funcionalidade>/`
- A spec fica em `.scratch/<slug-da-funcionalidade>/spec.md`
- Issues de implementação são um arquivo por ticket em `.scratch/<slug-da-funcionalidade>/issues/<NN>-<slug>.md`, numerados a partir de `01`; nunca um arquivo único com todos os tickets
- O estado de triagem fica numa linha `Status:` perto do topo de cada issue (ver `triage-labels.md` para os valores)
- Comentários e histórico da conversa são acrescentados no fim do arquivo, sob o título `## Comments`

## Quando uma skill disser "publique no issue tracker"

Crie um arquivo novo em `.scratch/<slug-da-funcionalidade>/` (criando a pasta se preciso).

## Quando uma skill disser "busque o ticket"

Leia o arquivo no caminho indicado. Normalmente o aluno passa o caminho ou o número da issue.

## Operações do wayfinding

Usadas pelo `/wayfinder`. O **mapa** é um arquivo com um arquivo **filho** por ticket.

- **Mapa**: `.scratch/<esforço>/map.md` (corpo com Notes / Decisions-so-far / Fog).
- **Ticket filho**: `.scratch/<esforço>/issues/NN-<slug>.md`, numerado a partir de `01`, com a pergunta no corpo. Uma linha `Type:` registra o tipo (`research`/`prototype`/`grilling`/`task`); uma linha `Status:` registra `claimed`/`resolved`.
- **Bloqueio**: uma linha `Blocked by: NN, NN` perto do topo. O ticket está desbloqueado quando todos os arquivos listados estão `resolved`.
- **Fronteira**: procure em `.scratch/<esforço>/issues/` os arquivos abertos, desbloqueados e não reivindicados; vence o de menor número.
- **Reivindicar**: defina `Status: claimed` e salve antes de qualquer trabalho.
- **Resolver**: acrescente a resposta sob `## Answer`, defina `Status: resolved` e depois acrescente um ponteiro de contexto (resumo + link) em Decisions-so-far no `map.md`.
