"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { track } from "@/lib/analytics";
export const motion = {
  fast: 0.16,
  standard: 0.32,
  slow: 0.7,
  cinematic: 1.1,
  ease: "power3.out",
} as const;
let lastAnimatedRoute: string | undefined;
export function Motion({ route }: { route: string }) {
  const path = usePathname();
  const anchor = useRef<HTMLSpanElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (path !== route) return;
    const changed =
      lastAnimatedRoute !== undefined && lastAnimatedRoute !== path;
    lastAnimatedRoute = path;
    track("navigation", { path });
    if (path.startsWith("/products/"))
      track("product_view", { product: path.split("/").pop() ?? "" });
    if (path === "/solutions") track("solution_view");
    let cancelled = false;
    let dispose: undefined | (() => void);
    const frame = requestAnimationFrame(async () => {
      const main = anchor.current?.closest("main");
      if (!main) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.clearScrollMemory("manual");
      const mm = gsap.matchMedia(main);
      let introPlayed = false;
      let transitionPlayed = false;
      // Local QA exercises the same reduced-motion branch without changing OS preferences.
      const forceReduced =
        process.env.NODE_ENV === "development" &&
        new URLSearchParams(location.search).get("qa-motion") === "reduce";
      mm.add(
        {
          desktop: "(min-width: 1000px) and (min-height: 700px)",
          motion: forceReduced
            ? "not all"
            : "(prefers-reduced-motion: no-preference)",
          reduce: forceReduced ? "all" : "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { motion: animate, desktop } = ctx.conditions ?? {};
          main.dataset.motionMode = animate ? "full" : "reduced";
          if (!animate) {
            main.dataset.motionTriggers = "0";
            main.dataset.motionTotalTriggers = String(
              ScrollTrigger.getAll().length,
            );
            return;
          }
          if (!introPlayed) {
            introPlayed = true;
            const title = main.querySelector("h1");
            if (title)
              gsap.from(title, {
                y: 18,
                opacity: 0.4,
                duration: motion.slow,
                ease: motion.ease,
                clearProps: "all",
              });
            const layers = main.querySelectorAll(".core-layer");
            if (layers.length) {
              const intro = gsap.timeline({
                defaults: { duration: motion.slow, ease: motion.ease },
              });
              intro
                .addLabel("connect")
                .from(layers, { opacity: 0, stagger: 0.045 }, "connect")
                .from(
                  main.querySelectorAll(".diagram-node"),
                  { y: 6, opacity: 0, stagger: 0.06 },
                  "connect+=0.2",
                );
            }
          }
          const diagram = main.querySelector(".core-diagram");
          const core = diagram?.querySelector(".core-layers");
          if (diagram && core && desktop)
            gsap.to(core, {
              y: 36,
              ease: "none",
              scrollTrigger: {
                trigger: diagram,
                start: "top 20%",
                end: "bottom top",
                scrub: 0.5,
              },
            });
          main
            .querySelectorAll<SVGPathElement>("[data-nv-line]")
            .forEach((line) => {
              const length = line.getTotalLength();
              gsap.fromTo(
                line,
                { strokeDasharray: length, strokeDashoffset: length },
                {
                  strokeDashoffset: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: line.closest(".ecosystem-map"),
                    start: "top 85%",
                    end: "center 45%",
                    scrub: 0.4,
                  },
                },
              );
            });
          const process = main.querySelector(".process-rail");
          if (process && desktop)
            gsap.fromTo(
              process,
              { scaleY: 0 },
              {
                scaleY: 1,
                transformOrigin: "top",
                ease: "none",
                scrollTrigger: {
                  trigger: process.parentElement,
                  start: "top 65%",
                  end: "bottom 75%",
                  scrub: true,
                },
              },
            );
          if (changed && !transitionPlayed && overlay.current) {
            transitionPlayed = true;
            const colors: Record<string, string> = {
              hub: "#86aaff",
              med: "#65dac5",
              lex: "#dbb989",
              solutions: "#afbcce",
            };
            overlay.current.style.setProperty(
              "--transition-accent",
              colors[path.split("/").pop() ?? ""] ?? "#6ba7ff",
            );
            gsap.fromTo(
              overlay.current,
              { scaleX: 1, autoAlpha: 1 },
              {
                scaleX: 0,
                autoAlpha: 0,
                transformOrigin: "right center",
                duration: motion.standard,
                ease: "power3.inOut",
              },
            );
          }
          main.dataset.motionTriggers = String(
            ScrollTrigger.getAll().filter((trigger) =>
              main.contains(trigger.trigger ?? null),
            ).length,
          );
          main.dataset.motionTotalTriggers = String(
            ScrollTrigger.getAll().length,
          );
          return () => {
            main.dataset.motionTriggers = "0";
          };
        },
      );
      if (changed) {
        // ScrollHistory restores history entries without animated scroll.
        main.focus({ preventScroll: true });
      }
      void document.fonts.ready.then(() => {
        if (!cancelled && Number(main.dataset.motionTriggers) > 0) {
          ScrollTrigger.clearScrollMemory("manual");
          ScrollTrigger.refresh();
        }
      });
      const cta = (event: MouseEvent) => {
        const target = (event.target as Element).closest<HTMLAnchorElement>(
          "a.button,a.text-link",
        );
        if (target)
          track("cta_click", {
            path,
            target: target.getAttribute("href") ?? "",
          });
      };
      main.addEventListener("click", cta);
      dispose = () => {
        main.removeEventListener("click", cta);
        mm.revert();
        ScrollTrigger.clearScrollMemory("manual");
      };
      main.dataset.motionReady = "true";
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      dispose?.();
    };
  }, [path, route]);
  return (
    <>
      <span ref={anchor} hidden aria-hidden="true" />
      <div ref={overlay} className="route-wipe" aria-hidden="true">
        <Brand symbolOnly />
        <span className="transition-rail" />
      </div>
    </>
  );
}
