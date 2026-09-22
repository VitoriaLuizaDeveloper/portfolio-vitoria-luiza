import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/i18n";

const labels = {
  featuredBadge: "Destaque",
  demo: "Demo",
  repo: "Repositório",
  api: "API",
};

const baseProject: Project = {
  slug: "devstore",
  title: "DevStore",
  description: "E-commerce completo com catálogo, carrinho e API própria.",
  stack: ["React", "Next.js", "TypeScript"],
  image: "/projects/devstore.webp",
  repoUrl: "https://github.com/VitoriaLuizaDeveloper/devstore",
};

function renderCard(overrides: Partial<Project> = {}) {
  return render(<ProjectCard project={{ ...baseProject, ...overrides }} labels={labels} />);
}

describe("<ProjectCard />", () => {
  it("mostra título, descrição e a stack do projeto", () => {
    renderCard();

    expect(screen.getByRole("heading", { name: "DevStore" })).toBeInTheDocument();
    expect(screen.getByText(/e-commerce completo/i)).toBeInTheDocument();
    baseProject.stack.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it("sempre expõe o repositório, apontando para o GitHub em nova aba", () => {
    renderCard();

    const repo = screen.getByRole("link", { name: /repositório/i });
    expect(repo).toHaveAttribute("href", baseProject.repoUrl);
    expect(repo).toHaveAttribute("target", "_blank");
    expect(repo).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });

  it("omite demo e API quando o projeto não tem esses links", () => {
    renderCard();

    expect(screen.queryByRole("link", { name: /demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^api$/i })).not.toBeInTheDocument();
  });

  it("exibe demo e API quando os links existem", () => {
    renderCard({
      demoUrl: "https://devstore-prod-dusky.vercel.app/",
      apiRepoUrl: "https://github.com/VitoriaLuizaDeveloper/devstore-api",
    });

    expect(screen.getByRole("link", { name: /demo/i })).toHaveAttribute(
      "href",
      "https://devstore-prod-dusky.vercel.app/",
    );
    expect(screen.getByRole("link", { name: /^api$/i })).toHaveAttribute(
      "href",
      "https://github.com/VitoriaLuizaDeveloper/devstore-api",
    );
  });

  it("marca o selo de destaque apenas nos projetos em destaque", () => {
    const { unmount } = renderCard();
    expect(screen.queryByText("Destaque")).not.toBeInTheDocument();
    unmount();

    renderCard({ featured: true });
    expect(screen.getByText("Destaque")).toBeInTheDocument();
  });

  it("descreve a imagem do projeto com um alt significativo", () => {
    renderCard();

    expect(screen.getByAltText("DevStore")).toBeInTheDocument();
  });
});
