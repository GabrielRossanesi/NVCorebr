import type { gsap as GSAP } from "gsap";

const timings = [
  { delay: 3.2, travel: 2.7, interval: 4.9, intensity: 0.82 },
  { delay: 5.4, travel: 3.1, interval: 6.3, intensity: 0.72 },
  { delay: 4.3, travel: 2.9, interval: 7.1, intensity: 0.76 },
  { delay: 7.1, travel: 3.3, interval: 5.8, intensity: 0.68 },
] as const;

function signalCycle(
  gsap: typeof GSAP,
  track: Element,
  node: HTMLElement | null,
  options: {
    duration: number;
    intensity: number;
    compact: boolean;
    repeat?: number;
    repeatDelay?: number;
    paused?: boolean;
    emission: "--node-emission" | "--node-interaction";
  },
) {
  const travel = track.querySelector("[data-signal-travel]");
  const arrival = track.querySelector("[data-signal-arrival]");
  const paths = travel?.querySelectorAll<SVGPathElement>(
    "[data-signal-length]",
  );
  if (!travel || !arrival || !paths?.length) return;
  const { duration, intensity, compact, emission } = options;
  const pathLength = paths[0].getTotalLength();
  const cycle = gsap.timeline({
    repeat: options.repeat ?? 0,
    repeatDelay: options.repeatDelay ?? 0,
    paused: options.paused ?? false,
  });
  cycle
    .set(travel, { opacity: 0 })
    .set(arrival, { opacity: 0, attr: { r: 3 } })
    .to(travel, { opacity: intensity, duration: 0.25, ease: "sine.out" }, 0);
  if (node)
    cycle
      .set(node, { [emission]: 0 }, 0)
      .to(node, { [emission]: intensity * 0.7, duration: 0.09 }, 0)
      .to(node, { [emission]: 0, duration: 0.4, ease: "sine.out" }, 0.09);
  paths.forEach((path) => {
    const length = Number(path.dataset.signalLength) * pathLength;
    // Only dash offset moves: even at a corner the signal stays on the SVG path.
    cycle.set(
      path,
      {
        attr: {
          "stroke-dasharray": String(length) + " " + String(pathLength * 2),
        },
      },
      0,
    );
    cycle.fromTo(
      path,
      { attr: { "stroke-dashoffset": length + pathLength * 0.02 } },
      {
        attr: { "stroke-dashoffset": length - pathLength },
        duration,
        ease: "none",
        immediateRender: false,
      },
      0,
    );
    cycle.to(
      path,
      {
        attr: { "stroke-dashoffset": length - pathLength * 1.1 },
        duration: 0.22,
        ease: "none",
      },
      duration,
    );
  });
  cycle
    .to(travel, { opacity: 0, duration: 0.22, ease: "sine.in" }, duration)
    .to(arrival, { opacity: intensity * 0.42, duration: 0.08 }, duration)
    .to(
      arrival,
      {
        opacity: 0,
        attr: { r: compact ? 5 : 7 },
        duration: 0.24,
        ease: "sine.out",
      },
      duration + 0.08,
    );
  return cycle;
}

export function coreConnectionMotion(
  diagram: Element,
  gsap: typeof GSAP,
  compact: boolean,
) {
  const master = gsap.timeline({ paused: true });
  const interactions: ReturnType<typeof GSAP.timeline>[] = [];
  const activeInteractions = new Set<ReturnType<typeof GSAP.timeline>>();
  const listeners: (() => void)[] = [];
  let visible = false;
  diagram
    .querySelectorAll<HTMLElement>("[data-core-signal]")
    .forEach((signal, i) => {
      const timing = timings[i];
      if (!timing) return;
      const node = diagram.querySelector<HTMLElement>(
        ".node-" + signal.dataset.coreSignal,
      );
      const cycle = signalCycle(gsap, signal, node, {
        duration: timing.travel * (compact ? 1.15 : 1),
        intensity: timing.intensity * (compact ? 0.65 : 1),
        compact,
        repeat: -1,
        repeatDelay: timing.interval * (compact ? 1.6 : 1),
        emission: "--node-emission",
      });
      if (cycle) master.add(cycle, timing.delay);
      const interactionTrack = signal.querySelector(
        "[data-signal-interaction]",
      );
      if (!node || !interactionTrack) return;
      const interactive = signalCycle(gsap, interactionTrack, node, {
        duration: timing.travel * 0.8,
        intensity: compact ? 0.72 : 0.96,
        compact,
        paused: true,
        emission: "--node-interaction",
      });
      if (!interactive) return;
      interactions.push(interactive);
      interactive.eventCallback("onComplete", () =>
        activeInteractions.delete(interactive),
      );
      const send = () => {
        // One reusable extra signal per connection; repeated entries never build a queue.
        if (!visible || document.hidden || activeInteractions.has(interactive))
          return;
        activeInteractions.add(interactive);
        interactive.restart();
      };
      const enter = (event: PointerEvent) => {
        if (event.pointerType !== "touch") send();
      };
      const focus = () => {
        if (node.matches(":focus-visible")) send();
      };
      node.addEventListener("pointerenter", enter);
      node.addEventListener("focus", focus);
      listeners.push(() => {
        node.removeEventListener("pointerenter", enter);
        node.removeEventListener("focus", focus);
      });
    });

  const syncVisibility = () => {
    const running = visible && !document.hidden;
    master.paused(!running);
    activeInteractions.forEach((run) => run.paused(!running));
    diagram.setAttribute("data-pulse-state", running ? "running" : "paused");
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      syncVisibility();
    },
    { threshold: 0.15 },
  );
  observer.observe(diagram);
  document.addEventListener("visibilitychange", syncVisibility);
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", syncVisibility);
    listeners.forEach((remove) => remove());
    interactions.forEach((run) => run.kill());
    master.kill();
    diagram.removeAttribute("data-pulse-state");
  };
}
