import type { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 sm:px-8 md:max-w-7xl md:pr-12 md:pl-10 lg:pl-12 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
