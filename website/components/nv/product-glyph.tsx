import type { ProductId } from "@/lib/content";
export function ProductGlyph({
  id,
  className = "",
}: {
  id: ProductId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`product-glyph glyph-${id} ${className}`}
      fill="none"
      aria-hidden="true"
    >
      {id === "hub" && (
        <g stroke="currentColor">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={70 + i * 22}
              y={70 + i * 22}
              width={260 - i * 44}
              height={260 - i * 44}
              rx="3"
              transform={`rotate(${i * 15} 200 200)`}
              opacity={0.3 + i * 0.2}
            />
          ))}
          <path d="M200 28V130M200 270V372M28 200H130M270 200H372" />
          <rect
            x="163"
            y="163"
            width="74"
            height="74"
            fill="currentColor"
            fillOpacity=".08"
          />
          <circle cx="200" cy="200" r="6" fill="currentColor" />
        </g>
      )}
      {id === "med" && (
        <g stroke="currentColor">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M40 ${140 + i * 26}C100 ${25 + i * 26} 155 ${310 + i * 12} 210 ${190 + i * 12}S300 ${20 + i * 26} 360 ${140 + i * 26}`}
              opacity={0.2 + i * 0.18}
              strokeWidth={i === 4 ? 2 : 1}
            />
          ))}
          <circle cx="210" cy="238" r="8" fill="currentColor" />
          <path d="M210 238V340H345" opacity=".4" />
        </g>
      )}
      {id === "lex" && (
        <g stroke="currentColor">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${65 + i * 12} ${65 + i * 30}H${275 + i * 12}V${110 + i * 30}H${65 + i * 12}Z`}
              opacity={0.25 + i * 0.12}
            />
          ))}
          <path d="M35 45V350H365M345 35V320H45" opacity=".25" />
          <path d="M95 175H145M257 175H315" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}
