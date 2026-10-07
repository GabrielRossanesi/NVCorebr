"use client";
import { useEffect, useRef, useState } from "react";
import { EngineeringVisual } from "./engineering-visual";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { capabilities } from "@/lib/content";
export function Capabilities() {
  const [active, setActive] = useState("software");
  const revealActive = useRef(false);
  useEffect(() => {
    const syncHash = () => {
      const id = location.hash.slice(1);
      if (capabilities.some((c) => c.id === id)) setActive(id);
    };
    let anchorFrame = 0;
    const frame = requestAnimationFrame(() => {
      syncHash();
      anchorFrame = requestAnimationFrame(() => {
        const id = location.hash.slice(1);
        if (
          document.documentElement.dataset.scrollTarget === "0" &&
          capabilities.some((c) => c.id === id)
        ) {
          document
            .getElementById(id)
            ?.scrollIntoView({ block: "start", behavior: "instant" });
        }
      });
    });
    window.addEventListener("hashchange", syncHash);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(anchorFrame);
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);
  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent("nv:engineering", { detail: active }),
    );
    if (!revealActive.current) return;
    revealActive.current = false;
    const frame = requestAnimationFrame(() => {
      if (innerWidth > 800) return;
      const target = document.getElementById(active);
      const headerHeight =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .height ?? 80;
      const top = target?.getBoundingClientRect().top;
      // Keep the selected heading visible when the preceding panel collapses.
      if (top !== undefined && top < headerHeight + 16) {
        window.scrollTo({
          top: Math.max(0, scrollY + top - headerHeight - 24),
          behavior: "instant",
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);
  return (
    <div className="engineering-studio">
      <div className="engineering-stage">
        <EngineeringVisual active={active} />
        <p className="engineering-active" aria-live="polite">
          <span>EM FOCO</span>
          {capabilities.find((c) => c.id === active)?.title}
        </p>
      </div>
      <Accordion
        type="single"
        value={active}
        onValueChange={(value) => {
          if (!value) return;
          revealActive.current = true;
          setActive(value);
        }}
        className="capabilities"
      >
        {capabilities.map((c) => (
          <AccordionItem key={c.id} id={c.id} value={c.id}>
            <AccordionTrigger className="capability-title">
              <span>{c.title}</span>
              <small>{c.label}</small>
            </AccordionTrigger>
            <AccordionContent className="capability-description">
              {c.description}
              {active === c.id && (
                <div className="capability-inline">
                  <EngineeringVisual active={active} />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
