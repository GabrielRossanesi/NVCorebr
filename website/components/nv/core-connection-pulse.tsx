// Same circuit geometry as connector-lines, reversed from each origin to Core.
const connections = [
  { name: "hub", path: "M28 70H80V198H130", entry: [130, 198] },
  { name: "med", path: "M615 85H560V195H475", entry: [475, 195] },
  { name: "lex", path: "M100 450H310V362", entry: [310, 362] },
  { name: "solutions", path: "M620 470H595V330H500", entry: [500, 330] },
] as const;

const signalLayers = [
  { length: 0.085, width: 6, opacity: 0.045 },
  { length: 0.055, width: 2.8, opacity: 0.16 },
  { length: 0.028, width: 1.5, opacity: 0.5 },
  { length: 0.009, width: 1, opacity: 0.85 },
] as const;

function SignalTrack({
  path,
  entry,
}: {
  path: string;
  entry: readonly [number, number];
}) {
  return (
    <>
      <g data-signal-travel opacity="0" strokeLinecap="round">
        {signalLayers.map(({ length, width, opacity }, i) => (
          <path
            key={length}
            d={path}
            data-signal-length={length}
            strokeDasharray="0 1000"
            strokeWidth={width}
            strokeOpacity={opacity}
            stroke={i === 3 ? "#dfeaff" : undefined}
          />
        ))}
      </g>
      <circle
        data-signal-arrival
        cx={entry[0]}
        cy={entry[1]}
        r="3"
        stroke="var(--core)"
        strokeWidth="1"
        fill="var(--core)"
        fillOpacity=".08"
        opacity="0"
      />
    </>
  );
}

export function CoreConnectionPulse() {
  return (
    <g className="connection-pulses" pointerEvents="none">
      {connections.map(({ name, path, entry }) => (
        <g key={name} data-core-signal={name} stroke={`var(--${name})`}>
          <path
            className="connection-highlight"
            d={path}
            opacity="0"
            strokeWidth="1.25"
          />
          <SignalTrack path={path} entry={entry} />
        </g>
      ))}
    </g>
  );
}
