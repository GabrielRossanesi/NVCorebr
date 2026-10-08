import type { gsap as GSAP } from "gsap";

const timings = [
  { delay: 1.2, orbit: 3.25, travel: 1.3, pause: 0.65, intensity: 0.88 },
  { delay: 2.1, orbit: 3.65, travel: 1.45, pause: 0.8, intensity: 0.82 },
  { delay: 2.8, orbit: 3.45, travel: 1.6, pause: 0.7, intensity: 0.84 },
  { delay: 3.5, orbit: 3.85, travel: 1.5, pause: 0.9, intensity: 0.8 },
] as const;

export function coreConnectionMotion(
  diagram: Element,
  gsap: typeof GSAP,
  compact: boolean,
) {
  const master = gsap.timeline({ paused: true });
  const cleanups: (() => void)[] = [];
  let visible = false;

  diagram
    .querySelectorAll<HTMLElement>("[data-core-signal]")
    .forEach((signal, i) => {
      const timing = timings[i];
      const node = diagram.querySelector<HTMLElement>(
        ".node-" + signal.dataset.coreSignal,
      );
      const orbit = node?.querySelector("[data-node-orbit]");
      const perimeter = orbit?.querySelectorAll("[data-node-perimeter]");
      const travel = signal.querySelector("[data-signal-travel]");
      const paths = travel?.querySelectorAll<SVGPathElement>(
        "[data-signal-length]",
      );
      const arrival = signal.querySelector("[data-signal-arrival]");
      const highlight = signal.querySelector(".connection-highlight");
      if (
        !timing ||
        !node ||
        !orbit ||
        !perimeter?.length ||
        !travel ||
        !paths?.length ||
        !arrival
      )
        return;

      const intensity = timing.intensity * (compact ? 0.85 : 1);
      const transmission = timing.orbit + 0.2;
      const end = transmission + timing.travel;
      const pathLength = paths[0].getTotalLength();
      // A single repeating cycle owns the lap, emission, transmission and arrival.
      const cycle = gsap.timeline({ repeat: -1, repeatDelay: timing.pause });
      cycle
        .set(
          node,
          { attr: { "data-energy-phase": "orbit" }, "--node-emission": 0 },
          0,
        )
        .set(travel, { opacity: 0 }, 0)
        .set(arrival, { opacity: 0, attr: { r: 3 } }, 0)
        .set(orbit, { opacity: compact ? 0.85 : 1 }, 0)
        .fromTo(
          node,
          { "--node-energy": 0.38, "--node-status": 1 },
          {
            "--node-energy": 0.68,
            "--node-status": 0.72,
            duration: timing.orbit / 2,
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut",
            immediateRender: false,
          },
          0,
        )
        .set(node, { attr: { "data-energy-phase": "emission" } }, timing.orbit)
        .to(orbit, { opacity: 0, duration: 0.2 }, timing.orbit)
        .to(node, { "--node-emission": 0.9, duration: 0.12 }, timing.orbit)
        .to(
          node,
          { "--node-emission": 0, duration: 0.3, ease: "sine.out" },
          timing.orbit + 0.12,
        )
        .set(
          node,
          { attr: { "data-energy-phase": "transmission" } },
          transmission,
        )
        .to(travel, { opacity: intensity, duration: 0.12 }, transmission);

      perimeter.forEach((segment) => {
        // Align the end of every segment to the bright head; the longer layers trail behind.
        const length = Number(
          segment.getAttribute("stroke-dasharray")?.split(" ")[0],
        );
        cycle.fromTo(
          segment,
          { attr: { "stroke-dashoffset": length } },
          {
            attr: { "stroke-dashoffset": length - 1 },
            duration: timing.orbit,
            ease: "none",
            immediateRender: false,
          },
          0,
        );
      });
      paths.forEach((path) => {
        const length = Number(path.dataset.signalLength) * pathLength;
        cycle.set(
          path,
          {
            attr: {
              "stroke-dasharray": String(length) + " " + String(pathLength * 2),
            },
          },
          transmission,
        );
        cycle.fromTo(
          path,
          { attr: { "stroke-dashoffset": length + pathLength * 0.02 } },
          {
            attr: { "stroke-dashoffset": length - pathLength },
            duration: timing.travel,
            ease: "none",
            immediateRender: false,
          },
          transmission,
        );
        cycle.to(
          path,
          {
            attr: { "stroke-dashoffset": length - pathLength * 1.1 },
            duration: 0.2,
            ease: "none",
          },
          end,
        );
      });
      cycle
        .set(node, { attr: { "data-energy-phase": "arrival" } }, end)
        .to(travel, { opacity: 0, duration: 0.2 }, end)
        .to(arrival, { opacity: intensity * 0.55, duration: 0.08 }, end)
        .to(
          arrival,
          {
            opacity: 0,
            attr: { r: compact ? 5 : 7 },
            duration: 0.24,
            ease: "sine.out",
          },
          end + 0.08,
        )
        .set(node, { attr: { "data-energy-phase": "rest" } }, end + 0.32);
      master.add(cycle, timing.delay);

      let hovered = false;
      let speedTween: ReturnType<typeof gsap.to> | undefined;
      let highlightTween: ReturnType<typeof gsap.to> | undefined;
      const engage = () => {
        const active = hovered || node.matches(":focus-visible");
        speedTween?.kill();
        highlightTween?.kill();
        // Hover changes this same cycle's speed; it cannot spawn another signal.
        speedTween = gsap.to(cycle, {
          timeScale: active ? 1.2 : 1,
          duration: 0.3,
          ease: "sine.out",
        });
        if (highlight)
          highlightTween = gsap.to(highlight, {
            opacity: active ? 0.32 : 0,
            duration: 0.3,
          });
      };
      const enter = (event: PointerEvent) => {
        if (event.pointerType !== "touch") {
          hovered = true;
          engage();
        }
      };
      const leave = () => {
        hovered = false;
        engage();
      };
      node.addEventListener("pointerenter", enter);
      node.addEventListener("pointerleave", leave);
      node.addEventListener("focus", engage);
      node.addEventListener("blur", engage);
      cleanups.push(() => {
        node.removeEventListener("pointerenter", enter);
        node.removeEventListener("pointerleave", leave);
        node.removeEventListener("focus", engage);
        node.removeEventListener("blur", engage);
        speedTween?.kill();
        highlightTween?.kill();
        if (highlight instanceof SVGElement)
          highlight.style.removeProperty("opacity");
      });
    });

  const syncVisibility = () => {
    const running = visible && !document.hidden;
    master.paused(!running);
    diagram.setAttribute("data-pulse-state", running ? "running" : "paused");
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      syncVisibility();
    },
    { threshold: [0, 0.15] },
  );
  observer.observe(diagram);
  document.addEventListener("visibilitychange", syncVisibility);
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", syncVisibility);
    cleanups.forEach((cleanup) => cleanup());
    master.kill();
    diagram.removeAttribute("data-pulse-state");
  };
}
