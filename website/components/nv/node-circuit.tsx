// Normalized perimeter: one offset unit is exactly one lap, at any node size.
export function NodeCircuit() {
  return (
    <svg className="node-circuit" fill="none" aria-hidden="true">
      <g
        data-node-orbit
        opacity="0"
        stroke="var(--node-color)"
        strokeLinecap="round"
      >
        {[
          { length: 0.14, width: 6, opacity: 0.12 },
          { length: 0.09, width: 2.8, opacity: 0.35 },
          { length: 0.045, width: 1.4, opacity: 0.75 },
          { length: 0.014, width: 1, opacity: 1 },
        ].map(({ length, width, opacity }, i) => (
          <rect
            key={length}
            x="0.5"
            y="0.5"
            rx="2.5"
            pathLength="1"
            data-node-perimeter
            strokeDasharray={`${length} ${1 - length}`}
            strokeDashoffset="0"
            strokeWidth={width}
            strokeOpacity={opacity}
            stroke={i === 3 ? "#edf5ff" : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
