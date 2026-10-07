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
  const currentHash = useRef("");
  const restoreFrame = useRef(0);

  useEffect(() => {
    const previousMode = history.scrollRestoration;
    history.scrollRestoration = "manual";
    currentHash.current = location.hash;
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
      const newFragment =
        currentPath.current === location.pathname &&
        currentHash.current !== location.hash &&
        (!state?.key || state.key === currentKey.current);
      currentHash.current = location.hash;
      if (newFragment) {
        // A new fragment entry can inherit the source history state. It is an
        // anchor navigation, not a request to restore that source position.
        const key = crypto.randomUUID();
        currentKey.current = key;
        pending.current = null;
        cancelAnimationFrame(restoreFrame.current);
        restoreFrame.current = requestAnimationFrame(() => {
          const target = document.getElementById(location.hash.slice(1));
          if (target)
            target.scrollIntoView({ block: "start", behavior: "instant" });
          else if (!location.hash)
            window.scrollTo({ top: 0, behavior: "instant" });
          const position = { x: scrollX, y: scrollY };
          remember(key, position);
          history.replaceState(
            { ...history.state, nvScroll: { key, position } },
            "",
          );
        });
        return;
      }
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
    currentHash.current = location.hash;
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
    if (
      (initial || !entry) &&
      location.hash &&
      (!entry || entry.position.y === 0)
    ) {
      cancelAnimationFrame(restoreFrame.current);
      restoreFrame.current = requestAnimationFrame(() => {
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ block: "start", behavior: "instant" });
      });
    } else if (entry) {
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
