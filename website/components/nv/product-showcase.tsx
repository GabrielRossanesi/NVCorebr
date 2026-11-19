import Link from "next/link";
import { products } from "@/lib/content";
import { Brand } from "./brand";
import { ProductScene } from "./product-scene";
import { ProductShowcaseRail } from "./product-showcase-rail";

export function ProductShowcase() {
  return (
    <div className="product-showcase">
      <ProductShowcaseRail />
      <div className="showcase-products">
        {products.map((p) => (
          <article
            className={`showcase-product theme-${p.id}`}
            id={`showcase-${p.id}`}
            aria-label={p.name}
            tabIndex={-1}
            data-product={p.id}
            key={p.id}
          >
            <div className="showcase-heading">
              <h3>
                <Brand name={p.id} />
              </h3>
              <p className="showcase-category">{p.category}</p>
            </div>
            <div className="showcase-caption">
              <div>
                <p>{p.description}</p>
                <p className="showcase-audience">{p.audience}</p>
                {p.contentStatus === "prototype" && (
                  <p className="showcase-audience">Protótipo demonstrativo</p>
                )}
              </div>
              <Link className="text-link" href={`/products/${p.id}`}>
                Conheça o {p.name}
              </Link>
            </div>
            <ProductScene id={p.id} />
          </article>
        ))}
      </div>
    </div>
  );
}
