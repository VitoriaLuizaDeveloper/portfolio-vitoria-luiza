import type { ReactNode } from "react";

/**
 * The one horizontal container every section uses. On desktop it's anchored
 * right after the side menu (whose gutter <main> reserves) with a fixed gap, so
 * the distance menu → content is identical on every screen width; on mobile it's
 * a plain centered column.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 sm:px-8 md:ml-0 md:max-w-7xl md:pr-12 md:pl-10 lg:pl-12 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
