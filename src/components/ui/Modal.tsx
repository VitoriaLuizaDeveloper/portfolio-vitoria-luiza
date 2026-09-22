"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  onClose,
  children,
  closeLabel,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
  /** Nome acessível do diálogo — sem ele o leitor de tela anuncia só "dialog". */
  label: string;
}) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // `onClose` costuma ser uma arrow inline no chamador, ou seja, uma função nova
  // a cada render. Guardá-la numa ref mantém o efeito de abertura dependente só
  // de `open` — senão qualquer re-render com o modal aberto rodaria a limpeza,
  // devolvendo o foco para trás e liberando o scroll no meio da leitura.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    // document.body only exists after mount; this flips the portal target on
    // the client without ever running (or mismatching) during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    // Quem abriu o diálogo recebe o foco de volta quando ele fecha; sem isso a
    // navegação por teclado recomeçaria do topo da página.
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      // Enquanto o diálogo está aberto, o Tab circula dentro dele: o que está
      // atrás está inerte para o mouse, e precisa estar para o teclado também.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || current === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="glass relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6 sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/60 text-muted transition-colors hover:text-foreground"
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
