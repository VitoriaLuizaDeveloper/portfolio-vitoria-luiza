/**
 * Fonte única das seções da página. O menu (scroll-spy), as âncoras e a
 * composição da home derivam daqui, então adicionar uma seção em um lugar
 * e esquecer do outro vira erro de tipo, não bug silencioso em produção.
 */
export const SECTION_IDS = [
  "home",
  "sobre",
  "habilidades",
  "experiencia",
  "projetos",
  "recomendacoes",
  "contato",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
