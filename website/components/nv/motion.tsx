"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { track } from "@/lib/analytics";
import { coreConnectionMotion } from "./core-connection-motion";
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
          pointer: "(hover: hover) and (pointer: fine)",
          motion: forceReduced
            ? "not all"
            : "(prefers-reduced-motion: no-preference)",
          reduce: forceReduced ? "all" : "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { motion: animate, desktop, pointer } = ctx.conditions ?? {};
          const cleanups: (() => void)[] = [];
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
          const response = diagram?.querySelector(".core-response");
          if (diagram)
            cleanups.push(coreConnectionMotion(diagram, gsap, !desktop));
          if (diagram && response && pointer && desktop) {
            const xTo = gsap.quickTo(response, "x", {
              duration: 0.55,
              ease: motion.ease,
            });
            const yTo = gsap.quickTo(response, "y", {
              duration: 0.55,
              ease: motion.ease,
            });
            const move = (event: Event) => {
              const e = event as PointerEvent;
              const bounds = diagram.getBoundingClientRect();
              xTo(((e.clientX - bounds.left) / bounds.width - 0.5) * 16);
              yTo(((e.clientY - bounds.top) / bounds.height - 0.5) * 12);
            };
            const reset = () => {
              xTo(0);
              yTo(0);
            };
            diagram.addEventListener("pointermove", move);
            diagram.addEventListener("pointerleave", reset);
            cleanups.push(() => {
              diagram.removeEventListener("pointermove", move);
              diagram.removeEventListener("pointerleave", reset);
            });
          }
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
          const ecosystem = main.querySelector(".ecosystem-map");
          if (ecosystem)
            gsap.from(
              ecosystem.querySelectorAll(
                ".ecosystem-branches > div,.ecosystem-children a",
              ),
              {
                y: desktop ? 24 : 10,
                stagger: 0.08,
                duration: 0.65,
                ease: motion.ease,
                scrollTrigger: {
                  trigger: ecosystem,
                  start: "top 75%",
                  end: "bottom 85%",
                  scrub: 0.4,
                },
              },
            );
          main
            .querySelectorAll<HTMLElement>(".engineering-visual")
            .forEach((visual) => {
              if (
                visual.closest(".capability-inline") ||
                !visual.getClientRects().length
              )
                return;
              const layers = visual.querySelectorAll(
                "[data-engineering-layer]",
              );
              gsap.from(layers, {
                x: (i: number) => (i - 1) * (desktop ? 22 : 8),
                y: desktop ? 32 : 12,
                stagger: 0.08,
                duration: 0.7,
                ease: motion.ease,
                scrollTrigger: {
                  trigger: visual,
                  start: "top 85%",
                  end: "center 55%",
                  scrub: 0.35,
                },
              });
            });
          let stageTween: ReturnType<typeof gsap.to> | undefined;
          const engineeringChange = ctx.add("engineeringChange", () => {
            const persistent = main.querySelector<HTMLElement>(
              ".engineering-stage .engineering-visual",
            );
            const stage = persistent?.getClientRects().length
              ? persistent
              : main.querySelector(".capability-inline .engineering-visual");
            if (!stage) return;
            stageTween?.revert();
            stageTween = gsap.fromTo(
              stage.querySelectorAll("[data-engineering-layer]"),
              { x: (i: number) => (i - 1) * 10 },
              {
                x: 0,
                duration: 0.42,
                stagger: 0.045,
                ease: motion.ease,
                clearProps: "transform",
              },
            );
          });
          const onEngineering: EventListener = () => engineeringChange();
          document.addEventListener("nv:engineering", onEngineering);
          cleanups.push(() =>
            document.removeEventListener("nv:engineering", onEngineering),
          );
          const capabilities = main.querySelector(".capabilities");
          if (capabilities) {
            let resizeTimer: ReturnType<typeof setTimeout>;
            const observer = new ResizeObserver(() => {
              clearTimeout(resizeTimer);
              resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
            });
            observer.observe(capabilities);
            cleanups.push(() => {
              clearTimeout(resizeTimer);
              observer.disconnect();
            });
          }
          main
            .querySelectorAll<HTMLElement>(".product-scene")
            .forEach((scene) => {
              const parts = scene.querySelectorAll("[data-scene-part]");
              const article = scene.closest<HTMLElement>("[data-product]");
              const showcase =
                article?.closest<HTMLElement>(".product-showcase");
              const setActive = () => {
                if (showcase && article)
                  showcase.dataset.activeProduct = article.dataset.product;
              };
              gsap.from(parts, {
                x: (i: number) => (i % 2 ? 1 : -1) * (desktop ? 22 : 8),
                y: (i: number) => (i < 2 ? 1 : -1) * (desktop ? 30 : 10),
                scale: desktop ? 0.94 : 0.98,
                stagger: 0.08,
                ease: "none",
                scrollTrigger: {
                  trigger: article ?? scene,
                  start: "top 85%",
                  end: "center 55%",
                  scrub: 0.45,
                  onEnter: setActive,
                  onEnterBack: setActive,
                },
              });
            });
          const convergence = main.querySelector(".convergence-art");
          if (convergence) {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: convergence,
                start: "top 85%",
                end: "bottom 60%",
                scrub: 0.4,
              },
            });
            convergence
              .querySelectorAll<SVGPathElement>("[data-converge-path]")
              .forEach((line, i) => {
                const length = line.getTotalLength();
                timeline.fromTo(
                  line,
                  { strokeDasharray: length, strokeDashoffset: length },
                  { strokeDashoffset: 0, duration: 0.6, ease: "none" },
                  i * 0.1,
                );
              });
            timeline.from(
              convergence.querySelector(".convergence-symbol"),
              { scale: 0.85, transformOrigin: "center", duration: 0.7 },
              0.2,
            );
          }
          const lifecycle = main.querySelector(".lifecycle");
          if (lifecycle)
            gsap.from(lifecycle.querySelectorAll("li"), {
              y: 14,
              stagger: 0.08,
              duration: 0.6,
              scrollTrigger: {
                trigger: lifecycle,
                start: "top 85%",
                once: true,
              },
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
              { x: 12, scale: 0.94, autoAlpha: 1 },
              {
                x: -8,
                scale: 1,
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
            cleanups.forEach((cleanup) => cleanup());
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
        <Brand
          name={
            path === "/products/hub"
              ? "hub"
              : path === "/products/med"
                ? "med"
                : path === "/products/lex"
                  ? "lex"
                  : path === "/solutions"
                    ? "solutions"
                    : "core"
          }
          symbolOnly
        />
        <span className="transition-rail" />
      </div>
    </>
  );
}
