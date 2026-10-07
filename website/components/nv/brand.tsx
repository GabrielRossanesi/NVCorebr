export type BrandName = "core" | "solutions" | "hub" | "med" | "lex";
export const brandNames = {
  core: "Core",
  solutions: "Solutions",
  hub: "Hub",
  med: "Med",
  lex: "Lex",
};
export const monogramPath =
  "M8 52V8h10l26 32V8h10l16 32L86 8h12L76 52H64L54 26v26H44L20 22v30Z";
export const symbolPaths: Record<BrandName, string> = {
  core: monogramPath,
  solutions: "M4 30 29 5h14L18 30l25 25H29ZM63 5h14l25 25-25 25H63l25-25Z",
  hub: "M8 8h20v20H8ZM78 8h20v20H78ZM43 34h20v20H43ZM28 16h50v4H28ZM16 28h4v18h23v4H16ZM86 28h4v22H63v-4h23Z",
  med: "M4 37C22 9 32 9 47 30s27 21 55-9v12C74 62 60 48 47 39S22 20 4 49ZM4 17C22-3 36 0 49 17s25 23 53-6v8C75 48 62 36 49 24S22 9 4 26Z",
  lex: "M8 8h74l12 10H20ZM8 25h74l12 10H20ZM8 42h74l12 10H20Z",
};
export function Brand({
  name = "core",
  symbolOnly = false,
  className = "",
}: {
  name?: BrandName;
  symbolOnly?: boolean;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`NV ${brandNames[name]}`}
      className={`brand brand-${name} ${className}`}
    >
      <svg
        className="brand-symbol"
        viewBox="0 0 106 60"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={symbolPaths[name]} />
      </svg>
      {!symbolOnly && (
        <span aria-hidden="true" className="brand-wordmark">
          nv<span>{brandNames[name].toLowerCase()}</span>
        </span>
      )}
    </span>
  );
}
