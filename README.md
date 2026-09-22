# Portfólio — Vitória Luiza

Portfólio pessoal de **Vitória Luiza**, Desenvolvedora Full Stack. Página única,
bilíngue (pt-BR/en), com seções de perfil, habilidades, experiência, projetos,
recomendações e contato.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-087ea4?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white">
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-3-6e9f18?logo=vitest&logoColor=white">
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-12-f69220?logo=pnpm&logoColor=white">
</p>

---

## Sumário

- [Stack](#stack)
- [Começando](#começando)
- [Scripts](#scripts)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Internacionalização](#internacionalização)
- [Testes](#testes)
- [Qualidade de código](#qualidade-de-código)
- [CI/CD](#cicd)
- [Deploy](#deploy)
- [Decisões técnicas](#decisões-técnicas)

---

## Stack

| Camada      | Tecnologia                                                  |
| ----------- | ----------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack, React Server Components) |
| UI          | React 19, Tailwind CSS 4, Framer Motion 13                  |
| Linguagem   | TypeScript 5 (`strict`)                                     |
| Ícones      | lucide-react, @icons-pack/react-simple-icons                |
| Testes      | Vitest 3, Testing Library, jsdom                            |
| Qualidade   | ESLint 9, Prettier 3, Husky, lint-staged, commitlint        |
| Gerenciador | pnpm 12                                                     |
| CI/CD       | GitHub Actions, CodeQL, Dependabot                          |
| Hospedagem  | Vercel                                                      |

---

## Começando

### Pré-requisitos

- **Node.js 22+** — confira com `node -v`
- **pnpm 12** — a forma recomendada é via Corepack, que já vem com o Node:

  ```bash
  corepack enable pnpm
  ```

  O projeto fixa a versão exata no campo `packageManager` do `package.json`,
  então o Corepack baixa e usa a mesma versão que roda no CI.

### Instalação

```bash
git clone https://github.com/VitoriaLuizaDeveloper/portfolio.git
cd portfolio
pnpm install
```

### Variáveis de ambiente

Copie o exemplo e ajuste se necessário:

```bash
cp .env.example .env.local
```

| Variável               | Obrigatória | Descrição                                                    |
| ---------------------- | ----------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Não         | URL pública usada em metadata, `sitemap.xml` e `robots.txt`. |

### Rodando

```bash
pnpm dev
```

Abra <http://localhost:3000>.

Para conferir o build de produção localmente:

```bash
pnpm build && pnpm start
```

---

## Scripts

| Comando              | O que faz                                                   |
| -------------------- | ----------------------------------------------------------- |
| `pnpm dev`           | Servidor de desenvolvimento com Turbopack                   |
| `pnpm build`         | Build de produção                                           |
| `pnpm start`         | Sobe o build de produção                                    |
| `pnpm lint`          | ESLint                                                      |
| `pnpm lint:fix`      | ESLint corrigindo o que é automatizável                     |
| `pnpm format`        | Formata o projeto com Prettier                              |
| `pnpm format:check`  | Verifica formatação sem alterar arquivos (usado no CI)      |
| `pnpm typecheck`     | Gera os tipos de rota do Next e roda `tsc --noEmit`         |
| `pnpm test`          | Testes uma vez                                              |
| `pnpm test:watch`    | Testes em modo watch                                        |
| `pnpm test:coverage` | Testes com relatório de cobertura                           |
| `pnpm validate`      | Lint + tipos + formatação + testes — o mesmo conjunto do CI |

> Antes de abrir um PR, `pnpm validate` reproduz localmente o que o CI vai cobrar.

---

## Estrutura do projeto

```
src/
├── app/                      # App Router
│   ├── layout.tsx            # Shell, fontes, metadata, providers
│   ├── page.tsx              # Composição da página (Server Component)
│   ├── globals.css           # Tema, tokens e utilitários (Tailwind v4)
│   ├── icon.tsx              # Favicon gerado em build (ImageResponse)
│   ├── apple-icon.tsx        # Ícone iOS gerado em build
│   ├── sitemap.ts            # sitemap.xml
│   └── robots.ts             # robots.txt
│
├── components/
│   ├── layout/               # Casca da página: Navbar, Footer, Container, Panel…
│   ├── sections/             # Uma seção da home por arquivo: Hero, About, Skills…
│   └── ui/                   # Peças reutilizáveis: Modal, Reveal, TiltCard, Marquee…
│
├── config/
│   ├── sections.ts           # IDs das seções — fonte única para menu e âncoras
│   └── site.ts               # Nome, URL e descrição do site
│
├── data/
│   ├── recommendations.ts    # Recomendações do LinkedIn
│   └── resume.ts             # Canais de contato
│
├── i18n/
│   ├── types.ts              # Formato do dicionário (`Content`)
│   ├── pt.ts / en.ts         # Conteúdo por idioma
│   └── LanguageContext.tsx   # Provider, detecção e persistência do idioma
│
└── lib/
    └── anchor.ts             # Navegação por âncora sem hash na URL
```

Três regras sustentam essa divisão:

- **`ui/` não conhece o domínio.** Um componente em `ui/` recebe tudo por props
  e pode ser reaproveitado em qualquer seção.
- **`sections/` é quem lê o dicionário.** Cada seção busca o próprio conteúdo
  via `useLanguage()` e monta a tela com peças de `ui/`.
- **`config/` é fonte única.** Os IDs das seções vivem em um lugar só; o tipo
  `SectionId` faz o menu e a página quebrarem no build se saírem de sincronia —
  inclusive os rótulos, que os dicionários indexam por `SectionId`.
- **`lib/` é lógica sem JSX.** Helpers de comportamento que várias telas usam,
  testáveis sem montar componente.

---

## Internacionalização

A troca de idioma é client-side, sem rota por locale:

1. `LanguageProvider` detecta o idioma na primeira visita — `localStorage`
   primeiro, senão `navigator.language`.
2. A escolha é persistida e `document.documentElement.lang` acompanha.
3. Os componentes consomem `const { t } = useLanguage()`.

**Ao editar textos, mexa nos dois dicionários.** `src/i18n/__tests__/dictionaries.test.ts`
compara as chaves de `pt.ts` e `en.ts` e falha no CI se uma tradução ficar para trás.

---

## Testes

[Vitest](https://vitest.dev) com jsdom e Testing Library.

```bash
pnpm test           # uma rodada
pnpm test:watch     # durante o desenvolvimento
pnpm test:coverage  # com cobertura
```

Os testes ficam ao lado do código, em `__tests__/`, e cobrem:

- **Dicionários** — paridade de chaves entre pt/en, ausência de textos vazios,
  slugs únicos, URLs absolutas e consistência dos links entre idiomas.
- **`<ProjectCard />`** — renderização condicional de demo, API e selo de destaque.
- **`<Navbar />`** — uma âncora por seção, rótulos acessíveis, estado ativo e tradução.
- **`LanguageProvider`** — precedência `localStorage` > navegador, persistência,
  sincronia do atributo `lang` e erro explícito fora do provider.
- **`<TechIcon />` e `<AnimatedCounter />`** — regras de match de ícone e parsing
  de prefixo/sufixo dos números.
- **`<Modal />`** — nome acessível, foco que entra e volta para quem abriu,
  Tab preso dentro do diálogo e scroll do fundo travado.
- **`handleAnchorClick`** — rolagem sem hash na URL, `prefers-reduced-motion`,
  foco na seção e clique com modificador preservado.

Os _stubs_ de `IntersectionObserver`, `ResizeObserver` e `matchMedia` ficam em
`vitest.setup.ts` — jsdom não implementa essas APIs, e o scroll-spy, o marquee e
o `prefers-reduced-motion` dependem delas.

---

## Qualidade de código

| Ferramenta      | Papel                                                           |
| --------------- | --------------------------------------------------------------- |
| **ESLint**      | `eslint-config-next` com core-web-vitals e regras de TypeScript |
| **Prettier**    | Formatação, com ordenação automática de classes Tailwind        |
| **Husky**       | Hooks de git (`pre-commit` e `commit-msg`)                      |
| **lint-staged** | Roda lint e format só nos arquivos em staging                   |
| **commitlint**  | Valida a mensagem no padrão Conventional Commits                |

Os hooks são instalados junto com `pnpm install` (script `prepare`).

### Padrão de commits

```
tipo(escopo): descrição no imperativo
```

Tipos aceitos: `feat`, `fix`, `perf`, `refactor`, `style`, `docs`, `test`,
`build`, `ci`, `chore`, `revert`.

```bash
git commit -m "feat(navbar): adiciona scroll-spy no menu lateral"
git commit -m "perf(marquee): pausa a animação fora da viewport"
```

---

## CI/CD

Três workflows em `.github/workflows/`:

### `ci.yml` — CI/CD

Roda em todo push e PR para `main`:

```
quality  ──┐
           ├──> deploy
build    ──┘
```

- **quality** — ESLint, Prettier, `tsc --noEmit` e testes com cobertura
  (publicada como artefato).
- **build** — build de produção, com cache do `.next/cache` entre execuções.
- **deploy** — só roda se os dois passarem. Push em `main` vai para produção;
  PR gera preview e comenta a URL no próprio PR.

O workflow também aceita execução manual (**Actions → CI/CD → Run workflow**),
que publica em produção. É o caminho para republicar quando o que mudou foi um
secret ou uma variável de ambiente, e não o código.

`concurrency` com `cancel-in-progress` cancela execuções obsoletas quando chega
um push novo no mesmo branch.

### `codeql.yml` — Segurança

Análise estática do GitHub (`security-and-quality`) em push, PR e semanalmente,
para pegar CVE novo em código que não mudou.

### `keep-alive.yml` — APIs dos projetos

O tier gratuito do Render hiberna após ~15 min sem tráfego. Um ping a cada 10
minutos mantém as APIs demonstradas no portfólio acordadas, para o visitante não
esbarrar em 30-60s de cold start.

### Dependabot

`.github/dependabot.yml` abre PRs semanais de dependências (agrupadas em React,
Next e ferramentas de desenvolvimento) e mensais para as GitHub Actions.

---

## Deploy

Hospedado na [Vercel](https://vercel.com), publicado pelo job `deploy` do
`ci.yml` — nunca pela integração Git da Vercel. Assim nada chega em produção
sem antes passar por lint, tipos, testes e build.

`vercel.json` desliga o deploy automático da Vercel (`git.deploymentEnabled`),
o que mantém a garantia de pé mesmo que o projeto seja conectado ao repositório
um dia: quem publica é o CI, e só depois que os jobs verdes.

### Configuração inicial

O projeto na Vercel é criado pelo CLI, sem conectar o Git:

```bash
pnpm dlx vercel@latest login
pnpm dlx vercel@latest link --yes --project portfolio-vitoria-luiza
```

O `link` grava `.vercel/project.json` (fora do versionamento) com os IDs que os
secrets pedem. Cadastre em **Settings → Secrets and variables → Actions**:

| Secret              | Onde encontrar                              |
| ------------------- | ------------------------------------------- |
| `VERCEL_TOKEN`      | vercel.com/account/settings/tokens          |
| `VERCEL_ORG_ID`     | campo `orgId` do `.vercel/project.json`     |
| `VERCEL_PROJECT_ID` | campo `projectId` do `.vercel/project.json` |

E `NEXT_PUBLIC_SITE_URL` em dois lugares, porque são dois builds diferentes:

- **Vercel** (Settings → Environment Variables) — é lá que roda o build publicado
- **GitHub**, na aba _Variables_ (não Secrets) — usada pelo job `build` do CI

---

## Decisões técnicas

**Composição no servidor, interatividade no cliente.** `page.tsx` é um Server
Component: ele monta os `Panel` e só as seções — que dependem do idioma
escolhido em runtime — são client components. `Panel` e `Container` ficam fora
do bundle do navegador.

**Animações que param quando ninguém está vendo.** Marquee, texto rotativo,
manchas de fundo e o halo da foto são pausados fora da viewport com `useInView`;
sem isso, cada um seguiria consumindo um frame a cada 16 ms durante toda a
visita — inclusive depois que a pessoa já desceu a página.

**Contadores sem re-render.** `<AnimatedCounter />` passa uma `MotionValue`
direto como filho do `motion.span`, e o framer-motion escreve no DOM sem
re-renderizar o React. Com quatro contadores na tela, a versão com `useState`
disparava ~240 renders por segundo.

**`backdrop-filter` só onde compensa.** O efeito de vidro é o custo de
composição mais alto da página. No mobile, onde há vários cartões empilhados,
ele é trocado por um fundo sólido equivalente.

**Âncoras sem `#` na URL.** O menu e os CTAs continuam sendo `<a href="#secao">`
— funciona sem JavaScript e é o que o leitor de tela anuncia —, mas o clique é
interceptado em `lib/anchor.ts`: rola até a seção, move o foco para ela e deixa a
barra de endereços limpa. Ctrl/Cmd+clique segue abrindo em nova aba.

**Movimento é opcional.** `MotionConfig reducedMotion="user"` cobre o
framer-motion e um bloco `prefers-reduced-motion` cobre o que é puro CSS.

**Um só lugar para cada coisa.** IDs de seção em `config/sections.ts`, contato
em `data/resume.ts`, textos em `i18n/`. O tipo `SectionId` transforma
inconsistência entre menu e página em erro de build.

---

<p align="center">
  <a href="https://www.linkedin.com/in/developer-vitoria-luiza/">LinkedIn</a> ·
  <a href="https://github.com/VitoriaLuizaDeveloper">GitHub</a>
</p>
