"use client";

import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/content";
import { Brand } from "./brand";

export function ProductShowcaseRail() {
  const rail = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const articles = rail.current
      ?.closest(".product-showcase")
      ?.querySelectorAll<HTMLElement>("[data-product]");
    if (!articles?.length) return;

    let observer: IntersectionObserver;
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
        Math.max(Math.round(innerHeight * 0.35), scrollPadding + scrollMargin + 8),
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

    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
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
