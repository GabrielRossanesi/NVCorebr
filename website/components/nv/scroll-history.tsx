"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Position = { x: number; y: number };
type Entry = { key: string; position: Position };
const positions = new Map<string, Position>();

function remember(key: string, position: Position) {
  positions.set(key, position);
  if (positions.size > 60) positions.delete(positions.keys().next().value!);
}

// Native restoration can run before an RSC page is committed. Restore only
// after the destination main exists, while preserving Next's history state.
export function ScrollHistory() {
  const pathname = usePathname();
  const currentKey = useRef<string | null>(null);
  const pending = useRef<Entry | null>(null);
  const currentPath = useRef(pathname);
  const restoreFrame = useRef(0);

  useEffect(() => {
    const previousMode = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const save = (writeState: boolean) => {
      if (!currentKey.current) return;
      const position = { x: scrollX, y: scrollY };
      remember(currentKey.current, position);
      if (writeState)
        history.replaceState(
          { ...history.state, nvScroll: { key: currentKey.current, position } },
          "",
        );
    };
    const restore = (entry: Entry) => {
      cancelAnimationFrame(restoreFrame.current);
      restoreFrame.current = requestAnimationFrame(() => {
        window.scrollTo({
          left: entry.position.x,
          top: entry.position.y,
          behavior: "instant",
        });
      });
    };
    const click = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (
        link &&
        link.origin === location.origin &&
        !event.metaKey &&
        !event.ctrlKey &&
        event.button === 0
      )
        save(true);
    };
    const pop = (event: PopStateEvent) => {
      save(false);
      const state = event.state?.nvScroll as Entry | undefined;
      const entry = {
        key: state?.key ?? crypto.randomUUID(),
        position: (state?.key && positions.get(state.key)) ||
          state?.position || { x: 0, y: 0 },
      };
      pending.current = entry;
      document.documentElement.dataset.scrollPopTarget = String(
        entry.position.y,
      );
      if (currentPath.current === location.pathname) {
        currentKey.current = entry.key;
        pending.current = null;
        restore(entry);
      }
    };
    const unload = () => save(true);
    document.addEventListener("click", click, true);
    window.addEventListener("popstate", pop, true);
    window.addEventListener("beforeunload", unload);
    return () => {
      cancelAnimationFrame(restoreFrame.current);
      history.scrollRestoration = previousMode;
      document.removeEventListener("click", click, true);
      window.removeEventListener("popstate", pop, true);
      window.removeEventListener("beforeunload", unload);
    };
  }, []);

  useEffect(() => {
    currentPath.current = pathname;
    const initial = currentKey.current === null;
    const entry =
      pending.current ??
      (initial ? (history.state?.nvScroll as Entry | undefined) : undefined);
    const key = entry?.key ?? crypto.randomUUID();
    currentKey.current = key;
    pending.current = null;
    document.documentElement.dataset.scrollTarget = String(
      entry?.position.y ?? 0,
    );
    document.documentElement.dataset.scrollRestoreMode =
      history.scrollRestoration;
    history.replaceState(
      {
        ...history.state,
        nvScroll: { key, position: entry?.position ?? { x: 0, y: 0 } },
      },
      "",
    );
    if (entry) {
      cancelAnimationFrame(restoreFrame.current);
      restoreFrame.current = requestAnimationFrame(() => {
        window.scrollTo({
          left: entry.position.x,
          top: entry.position.y,
          behavior: "instant",
        });
      });
    }
  }, [pathname]);
  return null;
}
