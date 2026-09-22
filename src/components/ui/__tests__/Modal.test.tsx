import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useState } from "react";

import { Modal } from "@/components/ui/Modal";

/** Harness com um gatilho real: é dele que o foco sai e é para ele que volta. */
function Harness({ onClose }: { onClose?: () => void } = {}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        abrir
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
        closeLabel="Fechar"
        label="Recomendação de Fulana"
      >
        <a href="https://example.com">primeiro</a>
        <a href="https://example.org">último</a>
      </Modal>
    </>
  );
}

describe("<Modal />", () => {
  it("não renderiza nada enquanto está fechado", () => {
    render(<Harness />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("anuncia um nome acessível e trava o scroll do fundo", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByText("abrir"));

    expect(screen.getByRole("dialog", { name: "Recomendação de Fulana" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("leva o foco para o diálogo ao abrir", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByText("abrir"));

    expect(document.activeElement).toBe(screen.getByRole("dialog"));
  });

  it("fecha no Escape e devolve o foco para quem abriu", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    const trigger = screen.getByText("abrir");
    await user.click(trigger);
    await user.keyboard("{Escape}");

    // O diálogo ainda está no DOM aqui: quem o remove é a animação de saída do
    // AnimatePresence. O que importa é que o foco e o scroll já voltaram.
    expect(onClose).toHaveBeenCalled();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("");
  });

  it("mantém o Tab girando dentro do diálogo", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByText("abrir"));

    const close = screen.getByRole("button", { name: "Fechar" });
    const last = screen.getByText("último");

    // A partir do diálogo, Tab entra no primeiro focável (o botão de fechar).
    await user.tab();
    expect(document.activeElement).toBe(close);

    // Do último, Tab volta para o começo em vez de escapar para a página.
    last.focus();
    await user.tab();
    expect(document.activeElement).toBe(close);

    // Shift+Tab no primeiro faz o caminho inverso.
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(last);
  });
});
