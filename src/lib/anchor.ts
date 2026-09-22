import type { MouseEvent } from "react";

/** Cliques com modificador (nova aba, nova janela) são do navegador, não nossos. */
function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Rola até a seção sem deixar o `#id` na barra de endereços.
 *
 * O `href="#id"` continua no HTML — é o que faz a navegação funcionar sem
 * JavaScript e o que leitores de tela anunciam. Aqui só trocamos o pulo
 * nativo (que escreve o hash na URL e cria entrada no histórico) por um
 * scroll equivalente, movendo o foco para a seção para que o teclado
 * continue de onde a página parou.
 */
export function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute("href");
  if (!href?.startsWith("#") || isModifiedClick(event)) return;

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });

  // `tabindex="-1"` deixa a seção focável por script sem entrar na ordem de tabulação.
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });

  // Se a pessoa chegou por um link com hash, limpa a URL sem recarregar.
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}
