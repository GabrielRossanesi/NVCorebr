import { Motion } from "@/components/nv/motion";
import { ProductExplorer } from "@/components/nv/product-explorer";
import { Ecosystem } from "@/components/nv/ecosystem";
import { Cta } from "@/components/nv/cta";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Produtos | Ecossistema NV",
  "NV Hub, NV Med e NV Lex: os produtos próprios da NV Core, conectados por um único núcleo de engenharia.",
  "/products",
);
export default function Products() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="wrap page-opening products-opening">
        <p className="section-label">NV Products</p>
        <h1>
          Ideias próprias.
          <br />O mesmo núcleo.
        </h1>
        <p className="opening-description">
          NV Hub, NV Med e NV Lex. Produtos com identidades próprias,
          construídos pela NV Core.
        </p>
      </section>
      <section
        className="wrap products-explore-section"
        aria-label="Produtos NV"
      >
        <h2 className="sr-only">Explore os produtos</h2>
        <ProductExplorer />
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <h2>Parte de algo maior.</h2>
          <p>
            Cada produto tem seu contexto. Todos compartilham a visão de design,
            produto e engenharia da NV Core.
          </p>
        </div>
        <Ecosystem />
      </section>
      <Cta
        title="Quer conhecer um produto NV?"
        description="Diga qual produto interessa à sua empresa e inicie uma conversa com o núcleo."
        href="/contact?intent=product"
        label="Conversar sobre produtos"
      />
      <Motion route="/products" />
    </main>
  );
}
