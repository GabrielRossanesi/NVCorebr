import Link from "next/link";
import { monogramPath } from "./brand";
export function CoreDiagram() {
  return (
    <div
      className="core-diagram"
      aria-label="NV Core conecta NV Hub, NV Med, NV Lex e NV Solutions"
    >
      <div className="diagram-caption">
        <span>O ponto de conexão.</span>
        <span>NV / Core</span>
      </div>
      <svg
        className="core-drawing"
        viewBox="0 0 640 520"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="core-stroke"
            x1="40"
            y1="0"
            x2="460"
            y2="460"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9ac6ff" />
            <stop offset=".5" stopColor="#4c8bff" />
            <stop offset="1" stopColor="#163963" />
          </linearGradient>
          <linearGradient id="core-fill" x1="0" y1="0" x2="0" y2="60">
            <stop stopColor="#2561b5" stopOpacity=".15" />
            <stop offset="1" stopColor="#102745" stopOpacity=".05" />
          </linearGradient>
        </defs>
        <g className="construction-grid" stroke="#7f9ec3" strokeOpacity=".13">
          <path d="M0 120H640M0 260H640M0 400H640M100 0V520M320 0V520M540 0V520" />
          <circle cx="320" cy="260" r="205" />
          <circle cx="320" cy="260" r="255" strokeDasharray="3 8" />
          <path d="M85 495L555 25M60 0L580 520" />
        </g>
        <g
          className="core-layers"
          stroke="url(#core-stroke)"
          strokeWidth=".55"
          strokeLinejoin="round"
        >
          {[6, 5, 4, 3, 2, 1, 0].map((i) => (
            <path
              key={i}
              className="core-layer"
              d={monogramPath}
              fill={i === 0 ? "url(#core-fill)" : "none"}
              transform={`translate(${86 + i * 9} ${134 + i * 12}) scale(4.05)`}
              opacity={1 - i * 0.12}
            />
          ))}
        </g>
        <g className="connector-lines" stroke="#608bbc" strokeOpacity=".6">
          <path d="M130 198H80V70H28M475 195H560V85H615M310 362V450H100M500 330H595V470H620" />
        </g>
        <g fill="#87b8ff">
          <circle cx="130" cy="198" r="3" />
          <circle cx="475" cy="195" r="3" />
          <circle cx="310" cy="362" r="3" />
          <circle cx="500" cy="330" r="3" />
        </g>
      </svg>
      <Link href="/products/hub" className="diagram-node node-hub">
        <span className="node-square" />
        NV Hub
      </Link>
      <Link href="/products/med" className="diagram-node node-med">
        <span className="node-square" />
        NV Med
      </Link>
      <Link href="/products/lex" className="diagram-node node-lex">
        <span className="node-square" />
        NV Lex
      </Link>
      <Link href="/solutions" className="diagram-node node-solutions">
        <span className="node-square" />
        NV Solutions
      </Link>
      <div className="diagram-footnote">Design + produto + engenharia</div>
    </div>
  );
}
