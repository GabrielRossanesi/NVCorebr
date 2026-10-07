import Link from "next/link";
import { Brand, monogramPath, symbolPaths } from "./brand";

export function Convergence() {
  return (
    <section className="convergence wrap" aria-labelledby="convergence-title">
      <div className="convergence-art" aria-hidden="true">
        <svg viewBox="0 0 1120 350" fill="none">
          <g className="convergence-grid" stroke="var(--border)">
            <path d="M0 175H1120M560 0V350" />
            <circle cx="560" cy="175" r="130" />
            <circle cx="560" cy="175" r="170" strokeDasharray="2 10" />
          </g>
          <g className="convergence-sources">
            <g color="var(--hub)">
              <path
                d={symbolPaths.hub}
                transform="translate(85 70) scale(.45)"
                fill="currentColor"
              />
              <path
                data-converge-path=""
                d="M147 85H300L448 155"
                stroke="currentColor"
              />
              <text x="85" y="120">
                NV HUB
              </text>
            </g>
            <g color="var(--med)">
              <path
                d={symbolPaths.med}
                transform="translate(940 70) scale(.45)"
                fill="currentColor"
              />
              <path
                data-converge-path=""
                d="M933 85H820L672 155"
                stroke="currentColor"
              />
              <text x="940" y="120">
                NV MED
              </text>
            </g>
            <g color="var(--lex)">
              <path
                d={symbolPaths.lex}
                transform="translate(940 260) scale(.45)"
                fill="currentColor"
              />
              <path
                data-converge-path=""
                d="M933 275H820L672 195"
                stroke="currentColor"
              />
              <text x="940" y="309">
                NV LEX
              </text>
            </g>
            <g color="var(--solutions)">
              <path
                d={symbolPaths.solutions}
                transform="translate(85 260) scale(.45)"
                fill="currentColor"
              />
              <path
                data-converge-path=""
                d="M147 275H300L448 195"
                stroke="currentColor"
              />
              <text x="85" y="309">
                NV SOLUTIONS
              </text>
            </g>
          </g>
          <g className="convergence-symbol" fill="var(--nv-blue)">
            <path d={monogramPath} transform="translate(432 98) scale(2.45)" />
          </g>
        </svg>
        <span>TUDO VOLTA PARA O MESMO NÚCLEO</span>
      </div>
      <div className="convergence-copy">
        <p className="section-label">O próximo capítulo</p>
        <h2 id="convergence-title">
          A sua próxima evolução
          <br />
          precisa de um bom núcleo.
        </h2>
        <p>
          Produtos próprios. Engenharia para o seu negócio.
          <br />
          Dois caminhos para construir com a NV.
        </p>
      </div>
      <div className="convergence-actions">
        <Link className="button primary" href="/contact?intent=software">
          Construir com a NV Solutions
        </Link>
        <Link className="text-link" href="/products">
          Conhecer os produtos NV
        </Link>
      </div>
      <span className="convergence-signature">
        <Brand symbolOnly /> DESIGN + PRODUTO + ENGENHARIA
      </span>
    </section>
  );
}
