"use client";

import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/content";
import { Brand } from "./brand";

export function ProductShowcaseRail() {
  const rail = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const nav = rail.current;
    const showcase = nav?.closest(".product-showcase");
    if (!nav || !showcase) return;
    const articles = [
      ...showcase.querySelectorAll<HTMLElement>("[data-product]"),
    ];
    if (!articles.length) return;

    let observer: IntersectionObserver;
    let focusFrame = 0;
    const observe = () => {
      observer?.disconnect();
      const scrollPadding = parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      );
      const scrollMargin = parseFloat(
        getComputedStyle(articles[0]).scrollMarginTop,
      );
      // Track the upper reading area, including where fragment links land.
      const top = Math.min(
        innerHeight - 1,
        Math.max(
          Math.round(innerHeight * 0.35),
          scrollPadding + scrollMargin + 8,
        ),
      );
      observer = new IntersectionObserver(
        (entries) => {
          const current = entries.find((entry) => entry.isIntersecting);
          setActive(
            (current?.target as HTMLElement | undefined)?.dataset.product,
          );
        },
        { rootMargin: `-${top}px 0px -${innerHeight - top - 1}px 0px` },
      );
      articles.forEach((article) => observer.observe(article));
    };

    const restoreFragmentFocus = () => {
      cancelAnimationFrame(focusFrame);
      const focused = document.activeElement;
      if (
        focused !== document.body &&
        !articles.some((article) => article === focused)
      )
        return;
      const target = articles.find(
        (article) => `#${article.id}` === location.hash,
      );
      if (!target) return;

      // Read the viewport after ScrollHistory restores the previous position.
      focusFrame = requestAnimationFrame(() => {
        const bounds = target.getBoundingClientRect();
        const headerBottom =
          document.querySelector(".site-header")?.getBoundingClientRect()
            .bottom ?? 0;
        const focusTarget =
          bounds.bottom > headerBottom && bounds.top < innerHeight
            ? target
            : nav.querySelector<HTMLAnchorElement>(`a[href="#${target.id}"]`);
        focusTarget?.focus({ preventScroll: true });
      });
    };

    observe();
    window.addEventListener("resize", observe);
    window.addEventListener("hashchange", restoreFragmentFocus);
    return () => {
      cancelAnimationFrame(focusFrame);
      observer.disconnect();
      window.removeEventListener("resize", observe);
      window.removeEventListener("hashchange", restoreFragmentFocus);
    };
  }, []);

  return (
    <nav ref={rail} className="showcase-rail" aria-label="Produtos nesta seção">
      <Brand symbolOnly />
      <div>
        {products.map((p) => (
          <a
            key={p.id}
            href={`#showcase-${p.id}`}
            data-product-link={p.id}
            className={`theme-${p.id}`}
            aria-current={active === p.id ? "location" : undefined}
          >
            <span>{p.name}</span>
            <span className="rail-dot" aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  );
}
