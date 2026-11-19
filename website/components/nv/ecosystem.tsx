import Link from "next/link";
import { Brand } from "./brand";
export function Ecosystem({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`ecosystem-map${compact ? " ecosystem-compact" : ""}`}>
      <div className="ecosystem-core" aria-hidden={compact || undefined}>
        <Brand />
        {!compact && <span>Um núcleo de engenharia</span>}
      </div>
      <svg
        className="ecosystem-lines"
        viewBox="0 0 1000 180"
        fill="none"
        aria-hidden="true"
      >
        <path
          data-nv-line=""
          d="M500 0V65H250V180M500 65H750V180"
          stroke="#5e87bc"
          strokeWidth="1"
        />
      </svg>
      <div className="ecosystem-branches">
        <div>
          <Link className="ecosystem-branch" href="/products">
            <span>NV Products</span>
            <h3>
              {compact ? (
                "Produtos próprios"
              ) : (
                <>
                  A nossa visão,
                  <br />
                  em forma de produto.
                </>
              )}
            </h3>
          </Link>
          {compact && (
            <p className="ecosystem-service">
              Conheça os produtos para operação empresarial, saúde e jurídico.
            </p>
          )}
          <div className="ecosystem-children">
            {(["hub", "med", "lex"] as const).map((id) => (
              <Link href={`/products/${id}`} key={id}>
                <Brand name={id} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Link className="ecosystem-branch" href="/solutions">
            <Brand name="solutions" />
            <h3>
              {compact ? (
                "Software sob medida"
              ) : (
                <>
                  O seu negócio,
                  <br />
                  com a nossa engenharia.
                </>
              )}
            </h3>
          </Link>
          <p className="ecosystem-service">
            {compact ? (
              "Contrate desenvolvimento de sistemas, plataformas e integrações para sua empresa."
            ) : (
              <>
                Software, sistemas de gestão, plataformas,
                <br />
                web, integrações e automações.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
