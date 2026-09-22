import { describe, expect, it } from "vitest";

import { en } from "../en";
import { pt } from "../pt";
import type { Content } from "../types";

/**
 * O site troca de idioma em runtime lendo o mesmo objeto `Content` em pt e en.
 * Qualquer divergência de forma entre os dois dicionários vira texto faltando
 * (ou `undefined` na tela) só depois do deploy — estes testes seguram isso no CI.
 */

/** Achata o objeto em caminhos ("home.stats.0.label") para comparar as formas. */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

const dictionaries: [name: string, dict: Content][] = [
  ["pt", pt],
  ["en", en],
];

describe("dicionários de idioma", () => {
  it("expõem exatamente as mesmas chaves em pt e en", () => {
    const ptKeys = keyPaths(pt).sort();
    const enKeys = keyPaths(en).sort();

    expect(enKeys).toEqual(ptKeys);
  });

  it.each(dictionaries)("não tem textos vazios em %s", (_name, dict) => {
    const empties: string[] = [];

    const walk = (value: unknown, path: string) => {
      if (typeof value === "string") {
        if (value.trim() === "") empties.push(path);
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item, i) => walk(item, `${path}[${i}]`));
        return;
      }
      if (value !== null && typeof value === "object") {
        Object.entries(value).forEach(([key, child]) => walk(child, path ? `${path}.${key}` : key));
      }
    };

    walk(dict, "");
    expect(empties).toEqual([]);
  });
});

describe("projetos", () => {
  it.each(dictionaries)("tem slugs únicos em %s", (_name, dict) => {
    const slugs = dict.projectsList.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("lista os mesmos projetos, na mesma ordem, nos dois idiomas", () => {
    expect(en.projectsList.map((p) => p.slug)).toEqual(pt.projectsList.map((p) => p.slug));
  });

  it("aponta os mesmos links e imagens nos dois idiomas (só o texto é traduzido)", () => {
    pt.projectsList.forEach((project, i) => {
      const translated = en.projectsList[i];

      expect(translated.repoUrl).toBe(project.repoUrl);
      expect(translated.demoUrl).toBe(project.demoUrl);
      expect(translated.apiRepoUrl).toBe(project.apiRepoUrl);
      expect(translated.image).toBe(project.image);
    });
  });

  it.each(dictionaries)("usa URLs absolutas e imagens locais em %s", (_name, dict) => {
    dict.projectsList.forEach((project) => {
      expect(project.repoUrl).toMatch(/^https:\/\//);
      if (project.demoUrl) expect(project.demoUrl).toMatch(/^https:\/\//);
      if (project.apiRepoUrl) expect(project.apiRepoUrl).toMatch(/^https:\/\//);
      expect(project.image).toMatch(/^\/projects\/.+\.(webp|png|jpg)$/);
    });
  });
});

describe("experiência e habilidades", () => {
  it("mantém a mesma quantidade de cargos e categorias nos dois idiomas", () => {
    expect(en.experienceList).toHaveLength(pt.experienceList.length);
    expect(en.skills).toHaveLength(pt.skills.length);
    expect(en.certifications).toHaveLength(pt.certifications.length);
    expect(en.competencies).toHaveLength(pt.competencies.length);
    expect(en.sectors).toHaveLength(pt.sectors.length);
  });

  it.each(dictionaries)("descreve cada cargo com ao menos um bullet em %s", (_name, dict) => {
    dict.experienceList.forEach((job) => {
      expect(job.bullets.length).toBeGreaterThan(0);
    });
  });

  it.each(dictionaries)("não repete tecnologias dentro de uma categoria em %s", (_name, dict) => {
    dict.skills.forEach((category) => {
      expect(new Set(category.items).size).toBe(category.items.length);
    });
  });
});
