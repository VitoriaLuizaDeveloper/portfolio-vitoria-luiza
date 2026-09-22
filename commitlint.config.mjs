/**
 * Conventional Commits: https://www.conventionalcommits.org
 * Mensagens no padrão `tipo(escopo): descrição`, ex.: `feat(navbar): adiciona scroll-spy`.
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // nova funcionalidade
        "fix", // correção de bug
        "perf", // melhoria de performance
        "refactor", // mudança de código sem alterar comportamento
        "style", // formatação, sem impacto em lógica
        "docs", // documentação
        "test", // testes
        "build", // build, dependências
        "ci", // pipelines
        "chore", // tarefas auxiliares
        "revert", // reversão de commit
      ],
    ],
    "subject-case": [0],
    "header-max-length": [2, "always", 100],
  },
};

export default config;
