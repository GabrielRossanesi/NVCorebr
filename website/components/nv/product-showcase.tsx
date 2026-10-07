import Link from "next/link";
import { products } from "@/lib/content";
import { Brand } from "./brand";
import { ProductScene } from "./product-scene";

export function ProductShowcase() {
  return (
    <div className="product-showcase" data-active-product="hub">
      <nav className="showcase-rail" aria-label="Produtos nesta seção">
        <span className="rail-label">O MESMO NÚCLEO</span>
        <Brand symbolOnly />
        <div>
          {products.map((p, i) => (
            <a
              key={p.id}
              href={`#showcase-${p.id}`}
              data-product-link={p.id}
              className={`theme-${p.id}`}
            >
              <small>0{i + 1}</small>
              <span>{p.name}</span>
              <span className="rail-dot" aria-hidden="true" />
            </a>
          ))}
        </div>
        <span className="rail-note">
          Três identidades.
          <br />
          Uma origem.
        </span>
      </nav>
      <div className="showcase-products">
        {products.map((p, i) => (
          <article
            className={`showcase-product theme-${p.id}`}
            id={`showcase-${p.id}`}
            data-product={p.id}
            key={p.id}
          >
            <div className="showcase-heading">
              <span className="showcase-number">0{i + 1} / NV PRODUCTS</span>
              <Brand name={p.id} />
              <h3>{p.category}</h3>
            </div>
            <ProductScene id={p.id} />
            <div className="showcase-caption">
              <p>{p.description}</p>
              <Link className="text-link" href={`/products/${p.id}`}>
                Explore o {p.name}
              </Link>
            </div>
            {i < products.length - 1 && (
              <div className="showcase-return" aria-hidden="true">
                <span />
                <Brand symbolOnly />
                <span />
                <small>NV CORE / O MESMO NÚCLEO. OUTRO CONTEXTO.</small>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
