---
name: react-fundamentos
description: Guia obrigatório para qualquer código React neste projeto (componentes, JSX, props, hooks, rotas, setup com Vite). Define o escopo permitido de tecnologias e a forma correta de aplicar cada conceito. Use antes de criar, editar ou revisar qualquer arquivo .jsx, configuração de rotas ou estrutura de pastas.
---

# React — Fundamentos do Projeto

Este guia compila o conteúdo das apostilas da faculdade (Iniciando com React, JSX, Componentes React, React Hooks e React Routes). Ele define **o que pode ser usado** e **como deve ser usado** neste projeto.

## 0. Regra de escopo (leia primeiro)

Trabalhe **somente** com as tecnologias e padrões listados aqui. O objetivo é que o código continue compreensível para quem estudou exatamente este conteúdo.

**Stack permitida**

| Área | Tecnologia |
|---|---|
| Biblioteca de UI | React (componentes funcionais) |
| Linguagem | JavaScript + JSX (variante **JavaScript** do Vite — sem TypeScript, sem SWC) |
| Build / dev server | Vite (`@vitejs/plugin-react`) |
| Rotas | React Router no **modo Data** (`createBrowserRouter` + `RouterProvider`) |
| Estilo | CSS puro: `index.css` (global), `App.css`, e um `.css` por componente |
| Módulos | ES Modules (`import`/`export`, `"type": "module"`) |
| Lint | ESLint (já vem no template do Vite) |
| Autenticação (simulada) | `localStorage` + componente wrapper `PrivateRoute` |

**Hooks permitidos:** `useState`, `useEffect`, `useContext` (+ `createContext`), `useRef`, `useMemo`.
**Hooks do React Router permitidos:** `useNavigate`, `useParams`. Componentes do Router: `Link`, `Outlet`, `Navigate`.

**Não introduza sem o usuário pedir explicitamente:**
- TypeScript, componentes de classe, `React.createElement` escrito à mão
- `useCallback`, `useReducer` (citados nas apostilas apenas como "existem outros")
- TanStack Router (citado só como dica de mercado), modo declarativo `<BrowserRouter>/<Routes>/<Route>`
- Bibliotecas de estado (Redux, Zustand…), de estilo (Tailwind, styled-components, CSS Modules, Sass), de UI (MUI, shadcn…), de requisição (axios, React Query) ou de formulários
- Next.js, Remix, SSR, ou o modo Framework do React Router

Se uma tarefa parecer exigir algo fora desta lista, **pergunte antes** e explique por quê, em vez de adicionar a dependência.

---

## 1. Criando e organizando o projeto (Vite)

### Criar o projeto
```bash
npm create vite@latest nome-projeto -- --template react
cd nome-projeto
npm install
npm run dev
```
- O primeiro `--` separa os argumentos do npm dos argumentos passados ao Vite.
- No modo interativo (`npm create vite@latest`), escolha **React** → **JavaScript**.

### Scripts (`package.json`)
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
`npm run dev` = servidor local com HMR · `npm run build` = gera `dist/` (transpila, faz bundle com Rollup, tree-shaking, minifica, otimiza assets) · `npm run preview` = serve o build.

### Papel de cada pasta/arquivo
| Caminho | Uso correto |
|---|---|
| `node_modules/` | Dependências. **Nunca** editar nem versionar (fica no `.gitignore`). |
| `public/` | Arquivos estáticos servidos **sem processamento**, acessados pela URL (`public/foto.png` → `/foto.png`). Ex.: `favicon.ico`, PDFs, imagens grandes. |
| `index.html` | Único HTML. Contém `<div id="root"></div>` e `<script type="module" src="/src/main.jsx"></script>`. |
| `src/main.jsx` | Ponto de entrada: monta o React no `#root` e registra o roteador. |
| `src/App.jsx` / `App.css` | Componente principal e seus estilos. |
| `src/index.css` | Estilos globais (reset, variáveis, fontes). |
| `src/assets/` | Imagens, ícones, fontes e utilitários **processados pelo Vite** (minificação, cache busting). Importe-os no código. |
| `vite.config.js` | Plugins e aliases de importação. |
| `eslint.config.js` | Regras de padronização. |
| `.gitignore` | `node_modules`, `.env`, `dist`… |

### Estrutura de pastas do código
```
src/
  main.jsx
  App.jsx
  App.css
  index.css
  assets/
  components/          ← componentes reutilizáveis, um por pasta
    Card/
      Card.jsx
      Card.css
    Botao/
      Botao.jsx
      Botao.css
  pages/               ← páginas e layouts usados nas rotas
    RootLayout.jsx
    Sobre.jsx
    PageNotFound.jsx
  auth.js              ← utilitário isAuthenticated (quando houver rotas privadas)
```
Imports são relativos ao arquivo atual (ex.: em `src/main.jsx` use `./pages/Sobre.jsx`, nunca `./src/...`).

---

## 2. JSX

JSX é convertido pelo React em `React.createElement(type, props, ...children)`, que gera um objeto `{ type, props: { ...atributos, children } }`. Escreva sempre JSX; não chame `createElement` à mão.

### Regras obrigatórias
1. **Um único elemento pai por `return`.** Use uma tag envolvente ou um **Fragment** (`<>...</>`) quando não quiser uma `div` extra.
   ```jsx
   return (
     <>
       <h1>Olá</h1>
       <p>Bem-vindo</p>
     </>
   );
   ```
2. **Atributos em camelCase**, com os nomes reservados trocados: `className` (não `class`), `htmlFor` (não `for`).
   ```jsx
   <label htmlFor="nome">Nome:</label>
   <input className="input" id="nome" />
   ```
3. **Eventos em camelCase**, recebendo uma **função** (não a chamada dela):
   ```jsx
   <button onClick={() => alert("Clicou!")}>Clique</button>
   <button onClick={focar}>Focar</button>      {/* ✅ referência */}
   <button onClick={focar()}>Focar</button>    {/* ❌ executa na renderização */}
   ```
4. **Tags sem conteúdo se fecham com `/`**: `<img />`, `<input />`, `<MeuComponente />`.
5. **`style` recebe um objeto** com propriedades em camelCase: `style={{ backgroundColor: cor }}`.
6. **Comentários dentro do JSX** usam `{/* ... */}` (nunca `<!-- -->`).

### JavaScript dentro do JSX — use chaves `{}`
Dentro das chaves só entram **expressões**:

| ✅ Pode | ❌ Não pode |
|---|---|
| string, número, variável | loops `for` / `while` |
| array | declarar variável (`const x = …`) |
| propriedade de objeto (`{user.nome}`) | declarar função |
| chamada de função (`{formatar(x)}`) | `if` tradicional |
| `array.map(...)` | um objeto literal renderizado diretamente |
| ternário (`{ok ? "Sim" : "Não"}`) | |

Para lógica com `if` ou loops, faça **antes do `return`** e use o resultado no JSX. Para listas, use `map` e **sempre passe `key` única e estável** (ex.: o `id`):
```jsx
<ul>
  {posts.map((post) => (
    <li key={post.id}>{post.title}</li>
  ))}
</ul>
```

---

## 3. Componentes

Componente = **função** com nome em **PascalCase** que retorna JSX e é exportada.

### Forma padrão
```jsx
// src/components/Card/Card.jsx
import "./Card.css";

const Card = ({ titulo, conteudo }) => {
  return (
    <div className="card">
      <h2>{titulo}</h2>
      <p>{conteudo}</p>
    </div>
  );
};

export default Card;
```
Também é válido `function Card() { ... }` ou `export default function Card() { ... }`. **Nunca** misture as sintaxes (`function Card = () =>` é inválido).

### Usando
```jsx
import Card from "./components/Card/Card";

const App = () => {
  return (
    <div>
      <Card titulo="Notícia 1" conteudo="Detalhes da notícia" />
    </div>
  );
};

export default App;
```

### Boas práticas obrigatórias
1. **Nomes**: sempre com inicial maiúscula e descritivos (`CardProduto`, não `comp1`). Componentes em minúsculo são tratados como tags HTML.
2. **Responsabilidade única**: componentes pequenos e focados. Não crie um componente gigante com a página inteira — divida (`Header`, `Main`, `Footer`) e componha:
   ```jsx
   const Pagina = () => (
     <>
       <Header />
       <Main />
       <Footer />
     </>
   );
   ```
3. **Dados via props**, nunca via variáveis globais.
4. **Composição** (props + `children`) em vez de concentrar tudo em um componente.
5. **Um componente por pasta** dentro de `components/`, com seu `.jsx` e `.css`.
6. Escreva o componente uma vez e reutilize; não duplique markup.

---

## 4. Import / Export (ES Modules)

| Tipo | Export | Import | Regra |
|---|---|---|---|
| **Nomeado** | `export function soma() {}` · `export const PI = 3.14159;` | `import { soma, PI } from "./utils.js";` | Mesmo nome, **entre chaves**. Vários por arquivo. |
| Nomeado renomeado | — | `import { soma as adicionar } from "./utils.js";` | Use `as`. |
| **Default** | `export default function multiplicar() {}` ou `export default Card;` | `import QualquerNome from "./calculadora.js";` | **Apenas um** por arquivo, sem chaves, nome livre. |

- Convenção do projeto: **componentes usam `export default`**; utilitários com várias funções usam export nomeado.
- `import` sempre no topo do arquivo.
- No navegador puro seria preciso `<script type="module">`; no Node, `"type": "module"` no `package.json`. O Vite já configura ambos.

---

## 5. Props, desestruturação, children e valores padrão

### Props
Objeto com os dados passados de pai para filho; tornam o componente reutilizável.
```jsx
<Welcome name="John" />
<Welcome name="Mary" />
```

### Desestruturação (forma preferida)
```jsx
const Welcome = ({ name }) => <h1>Hello, {name}</h1>;
```
O nome desestruturado **deve ser igual** ao nome da prop enviada. (`(props) => props.name` funciona, mas prefira desestruturar.)

### children
Prop especial com tudo que está **entre** as tags do componente. Use para wrappers/containers:
```jsx
const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

<Card>
  <h2>Notícia 1</h2>
  <p>Conteúdo da notícia</p>
</Card>
```

### Valores padrão
Defina na desestruturação para evitar `undefined`:
```jsx
const Botao = ({ texto = "Clique aqui", cor = "blue" }) => {
  return <button style={{ backgroundColor: cor }}>{texto}</button>;
};
```

---

## 6. Hooks

Hooks "puxam" funcionalidades extras para dentro do componente funcional. Importe sempre de `"react"`:
```jsx
import { useState, useEffect, useContext, createContext, useRef, useMemo } from "react";
```

### Regra dos hooks (vale para TODOS)
Chame hooks **apenas no nível superior do componente**, sempre na mesma ordem. **Nunca** dentro de `if`, loops, funções internas ou callbacks.
```jsx
// ❌ Nunca
if (condicao) { const [c, setC] = useState(0); }
for (let i = 0; i < 25; i++) { const [c, setC] = useState(0); }
const interna = () => { const [c, setC] = useState(0); };

// ✅ Sempre no topo do componente
function Contador() {
  const [c, setC] = useState(0);
  // ...
}
```

### useState — estado que atualiza a tela
```jsx
const [valor, setValor] = useState(valorInicial);
```
- `valor`: o estado atual · `setValor`: única forma de alterá-lo · `valorInicial`: valor da primeira renderização.
- Chamar `setValor` faz o React **re-renderizar** o componente. Variáveis comuns (`let`) **não** atualizam a tela — para dados que mudam e aparecem na UI, use estado.
- **Nunca** altere o estado diretamente (`contador++`, `user.nome = "x"`).

```jsx
function Contador() {
  const [contador, setContador] = useState(0);
  return (
    <div>
      <p>Valor atual: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>+1</button>
      <button onClick={() => setContador(contador - 1)}>-1</button>
    </div>
  );
}
```
- **Vários estados**: um `useState` por valor (`name`, `age`, `hobby`).
- **Estado objeto**: ao atualizar, crie um novo objeto copiando o anterior:
  ```jsx
  const [user, setUser] = useState({ name: "John Doe", age: 20, hobby: "Reading" });
  setUser({ ...user, age: 21 });
  // render: <p>{user.age} || {user.hobby}</p>  → cada valor em suas próprias chaves
  ```
- **Inicialização preguiçosa** (cálculo caro só na primeira renderização): passe uma função.
  ```jsx
  const [calc, setCalc] = useState(() => expensiveComputation());
  ```

### useEffect — efeitos colaterais
Para ações fora do fluxo de renderização: buscar dados em API, timers, ouvir eventos do navegador (scroll, resize).
```jsx
useEffect(() => {
  // roda DEPOIS que a tela foi desenhada
}, [dependencias]);
```
| Array de dependências | Quando roda |
|---|---|
| `[]` | Só na montagem (primeira vez na tela) |
| `[valor]` | Na montagem e sempre que `valor` mudar |
| omitido | Em toda renderização (evite) |

Coloque no array **todas** as variáveis/estados usados dentro do efeito. Ao criar timers ou listeners, retorne uma função de limpeza:
```jsx
useEffect(() => {
  const id = setInterval(() => setSegundos((s) => s + 1), 1000);
  return () => clearInterval(id);
}, []);
```

### useContext — compartilhar valor sem prop drilling
Use quando um valor (ex.: tema claro/escuro) é necessário em muitos componentes.
```jsx
import { createContext, useContext } from "react";

const TemaContext = createContext("claro");      // 1. criar (com valor padrão)

function App() {
  return (
    <TemaContext.Provider value="escuro">        {/* 2. prover */}
      <Botao />
    </TemaContext.Provider>
  );
}

function Botao() {
  const tema = useContext(TemaContext);          // 3. consumir
  return (
    <button style={{ background: tema === "claro" ? "#fff" : "#333" }}>Clique</button>
  );
}
```
Para valores que mudam, combine com `useState` no componente provedor e passe o estado em `value`. Exporte o contexto de um arquivo próprio quando for usado em vários arquivos.

### useRef — valor mutável que NÃO re-renderiza
Usos: acessar elementos do DOM (focar input) e guardar valores que não precisam aparecer na tela.
```jsx
import { useRef } from "react";

function InputFocus() {
  const inputRef = useRef(null);

  function focar() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Digite algo" />
      <button onClick={focar}>Focar no input</button>
    </div>
  );
}
```
O valor fica em `ref.current`. Se o valor precisa aparecer na tela, use `useState`, não `useRef`.

### useMemo — memorizar cálculos pesados
Recalcula só quando uma dependência muda.
```jsx
import { useMemo } from "react";

function Fatorial({ numero }) {
  const resultado = useMemo(() => {
    let total = 1;
    for (let i = 2; i <= numero; i++) total *= i;
    return total;
  }, [numero]);

  return <p>Fatorial de {numero} = {resultado}</p>;
}
```
Use apenas para cálculos realmente caros; não envolva tudo em `useMemo`.

---

## 7. Rotas (React Router — modo Data)

### Instalação
```bash
npm i react-router
```
Imports usados:
```jsx
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Link, Outlet, Navigate, useNavigate, useParams } from "react-router";
```

### Configuração em `main.jsx`
`createBrowserRouter` recebe um **array de objetos de rota**, cada um com `path` (caminho; `/` = home) e `element` (componente renderizado — **sempre importado**). O `RouterProvider` substitui o `<App />` no render.
```jsx
// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";

import RootLayout from "./pages/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Sobre from "./pages/Sobre.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "sobre", element: <Sobre /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

### Links entre rotas
Use `<Link to="...">` no lugar de `<a href="...">` para navegação interna (não recarrega a página). `<a>` só para links externos.
```jsx
import { Link } from "react-router";

const NavBar = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/sobre">Sobre</Link></li>
    </ul>
  );
};

export default NavBar;
```

### Layouts compartilhados — `children` + `<Outlet />`
- A rota pai define o layout em `element` e as páginas em `children`.
- `{ index: true, element: ... }` = conteúdo padrão exibido no caminho do pai.
- Paths dos filhos são **relativos** ao pai (`"sobre"`, sem barra inicial).
- O layout **precisa** renderizar `<Outlet />` onde o conteúdo do filho deve aparecer.
```jsx
// src/pages/RootLayout.jsx
import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
```

### Página não encontrada
Duas formas (podem coexistir):
1. `errorElement: <PageNotFound />` na rota pai — trata rotas inexistentes e erros (renderiza **sem** o layout).
2. `{ path: "*", element: <PageNotFound /> }` como último filho — captura qualquer caminho não mapeado (renderiza **dentro** do layout).

### Layouts distintos
Crie outra rota de topo com seu próprio layout (que também tem `<Outlet />`):
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "sobre", element: <Sobre /> },
      { path: "servicos", element: <Servicos /> },
      { path: "contato", element: <Contato /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <FormLogin /> },
      { path: "home", element: <AdminHome /> },     // → /admin/home
      { path: "perfil", element: <Profile /> },     // → /admin/perfil
    ],
  },
]);
```

### Navegação programática — `useNavigate`
Para mudar de rota via código (após submit, login, logout), sem o usuário clicar em um `Link`.
```jsx
import { useNavigate } from "react-router";

const MyComponent = () => {
  const navigate = useNavigate();      // no topo do componente (regra dos hooks)

  function goToHome() {
    navigate("/");
  }

  return <button onClick={goToHome}>Ir para Home</button>;
};
```
| Chamada | Efeito |
|---|---|
| `navigate("/dashboard")` | vai para a rota |
| `navigate(-1)` / `navigate(1)` | volta / avança no histórico |
| `navigate("/login", { replace: true })` | substitui a entrada do histórico (o "voltar" não retorna). Use após login/logout. |

### Rotas dinâmicas — `:parametro` + `useParams`
```jsx
// configuração
{ path: "/posts/:id", element: <Post /> }
{ path: "/posts/:id/:commentId", element: <Comment /> }   // múltiplos parâmetros
```
```jsx
// links (valor normalmente vem dos dados)
{posts.map((post) => (
  <li key={post.id}>
    <Link to={`/posts/${post.id}`}>{post.title}</Link>
  </li>
))}
```
```jsx
// leitura do parâmetro
import { useParams } from "react-router";

const Post = () => {
  const { id } = useParams();       // nome igual ao definido após ":"
  return (
    <div>
      {/* parâmetros chegam sempre como string */}
      <h1>Post #{id}</h1>
    </div>
  );
};

export default Post;
```
Ao buscar o item nos dados, compare considerando que o parâmetro é string: `posts.find((p) => String(p.id) === id)`.

### Rotas privadas — wrapper `PrivateRoute`
Rotas acessíveis só por usuário autenticado; caso contrário, redireciona para `/login`.
```jsx
// src/auth.js
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
```
```jsx
// src/components/PrivateRoute/PrivateRoute.jsx
import { Navigate } from "react-router";
import { isAuthenticated } from "../../auth";

export default function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```
```jsx
// main.jsx
const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);
```
- Dentro de JSX, para redirecionar use o componente `<Navigate />`; em funções/eventos, use `navigate()` do `useNavigate`.
- No login: `localStorage.setItem("token", valor)` e `navigate("/dashboard", { replace: true })`. No logout: `localStorage.removeItem("token")` e `navigate("/login", { replace: true })`.

---

## 8. Checklist antes de entregar código

- [ ] Só usei tecnologias/hooks da seção 0
- [ ] Componentes em PascalCase, um por pasta em `components/` (páginas em `pages/`), com `export default`
- [ ] Cada `return` tem um único elemento pai (ou Fragment)
- [ ] `className` / `htmlFor` / eventos camelCase recebendo função
- [ ] Listas com `map` e `key` única
- [ ] Dados via props (desestruturadas, com valores padrão quando fizer sentido); `children` para wrappers
- [ ] Hooks só no topo do componente; estado alterado só pelo `set`, objetos copiados com spread
- [ ] `useEffect` com array de dependências correto e limpeza de timers/listeners
- [ ] Rotas com `createBrowserRouter` + `RouterProvider`; navegação interna com `Link`; layouts com `<Outlet />`
- [ ] Rota 404 (`errorElement` e/ou `path: "*"`)
- [ ] Imports relativos corretos e todos os componentes usados nas rotas importados
- [ ] `npm run build` executa sem erros

## Referências das apostilas
react.dev · vite.dev · reactrouter.com · react.dev/learn/your-first-component
