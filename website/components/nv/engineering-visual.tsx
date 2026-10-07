import { monogramPath } from "./brand";
const focus: Record<string, [string, string, string]> = {
  software: ["INTERFACE", "REGRAS DE NEGÓCIO", "PERSISTÊNCIA"],
  "crm-erp": ["OPERAÇÃO", "CLIENTES · PROCESSOS", "INFORMAÇÃO"],
  web: ["NAVEGAÇÃO", "CONTEÚDO · EXPERIÊNCIA", "ESTRUTURA"],
  integrations: ["SISTEMAS", "APIs · CONEXÕES", "DADOS EM TRÂNSITO"],
  automation: ["ENTRADA", "ETAPAS · REGRAS", "RESULTADO"],
  platforms: ["USUÁRIOS", "MÓDULOS · ACESSOS", "DADOS COMPARTILHADOS"],
};

function ApplicationModules({ active }: { active: string }) {
  if (active === "crm-erp")
    return (
      <g stroke="currentColor">
        <path d="M125 214H475V254H125ZM125 227H475M125 241H475M234 214V254M376 214V254" />
        <path d="M137 220h58M247 220h75M389 220h62M137 234h74M247 234h58M389 234h39M137 248h49M247 248h87M389 248h61" />
      </g>
    );
  if (active === "automation")
    return (
      <g stroke="currentColor">
        <path d="M222 234H247M350 234H375" />
        {[125, 250, 375].map((x, i) => (
          <g key={x}>
            <rect x={x} y="216" width="97" height="36" rx="2" />
            <text x={x + 12} y="238">
              {["ENTRADA", "REGRA", "AÇÃO"][i]}
            </text>
          </g>
        ))}
      </g>
    );
  if (active === "integrations")
    return (
      <g stroke="currentColor">
        <path d="M145 234H225M375 234H455" />
        <rect x="225" y="213" width="150" height="43" rx="2" />
        <text x="250" y="239">
          API / CONEXÃO
        </text>
        <circle cx="140" cy="234" r="8" />
        <circle cx="460" cy="234" r="8" />
      </g>
    );
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} className="engineering-module">
          <rect
            x={125 + i * 121}
            y="216"
            width="105"
            height="35"
            rx="2"
            stroke="currentColor"
          />
          <path
            d={`M${139 + i * 121} 229h25M${139 + i * 121} 238h58`}
            stroke="currentColor"
          />
        </g>
      ))}
    </>
  );
}

export function EngineeringVisual({
  active = "software",
}: {
  active?: string;
}) {
  const labels = focus[active] ?? focus.software;
  return (
    <figure className="engineering-visual" data-capability={active}>
      <div className="engineering-visual-top">
        <span>NV SOLUTIONS</span>
        <span>ARQUITETURA EM CAMADAS</span>
      </div>
      <svg viewBox="0 0 600 470" fill="none" aria-hidden="true">
        <g className="engineering-grid" stroke="currentColor" opacity=".14">
          <path d="M0 90H600M0 190H600M0 290H600M0 390H600M100 0V470M200 0V470M300 0V470M400 0V470M500 0V470" />
          <path d="M45 405 300 40 555 405Z" />
        </g>
        <g className="engineering-route" stroke="currentColor">
          <path
            data-engineering-path=""
            d="M70 120H105M300 160V197M300 270V307M495 235H550V120H495M300 384V420H75V235H105"
          />
          <circle cx="300" cy="179" r="3" fill="currentColor" />
          <circle cx="300" cy="289" r="3" fill="currentColor" />
          <circle cx="550" cy="175" r="3" fill="currentColor" />
        </g>
        <g data-engineering-layer="" className="engineering-ui">
          <path
            d="m105 85 315-18 75 20v73H105Z"
            fill="var(--surface)"
            stroke="currentColor"
          />
          {active === "web" ? (
            <g stroke="currentColor">
              <path d="M125 117H290M125 127H265M125 138H235" />
              <rect x="395" y="118" width="75" height="25" rx="1" />
              <path d="M320 117h52v26h-52Z" />
            </g>
          ) : (
            <path
              d="M105 107H495M126 122H174V142H126ZM187 123H335M187 138H290M365 121H470V143H365Z"
              stroke="currentColor"
            />
          )}
          <circle cx="119" cy="97" r="2" fill="currentColor" />
          <circle cx="129" cy="97" r="2" fill="currentColor" />
          <text x="131" y="57">
            {labels[0]}
          </text>
        </g>
        <g data-engineering-layer="" className="engineering-application">
          <path
            d="m105 197 315-18 75 18v73H105Z"
            fill="var(--surface)"
            stroke="currentColor"
          />
          <ApplicationModules active={active} />
          <text x="131" y="187">
            {labels[1]}
          </text>
        </g>
        <g data-engineering-layer="" className="engineering-data">
          <path
            d="m105 307 315-18 75 18v77H105Z"
            fill="var(--surface)"
            stroke="currentColor"
          />
          <ellipse cx="167" cy="329" rx="23" ry="7" stroke="currentColor" />
          <path
            d="M144 329v29c0 10 46 10 46 0v-29M144 344c0 10 46 10 46 0M215 333H365M215 347H330M215 361H350"
            stroke="currentColor"
          />
          <path
            d="M414 328 431 345 414 362M453 328 436 345 453 362"
            stroke="currentColor"
          />
          <text x="131" y="297">
            {labels[2]}
          </text>
        </g>
        <g
          className="engineering-endpoints"
          fill="var(--background)"
          stroke="currentColor"
        >
          <rect x="38" y="100" width="32" height="40" rx="2" />
          <path d="M45 111h18M45 120h12M45 129h18" />
          <rect x="540" y="67" width="40" height="40" rx="2" />
          <path d="m549 87 7-7 7 7-7 7Z" />
          <rect x="49" y="220" width="26" height="30" rx="2" />
          <path d="M56 229h12M56 239h12" />
        </g>
        <g className="engineering-core" fill="currentColor">
          <path d={monogramPath} transform="translate(255 420) scale(.85)" />
        </g>
      </svg>
      <figcaption>
        <span>Da experiência às conexões.</span>
        <small>Uma representação da nossa engenharia.</small>
      </figcaption>
    </figure>
  );
}
