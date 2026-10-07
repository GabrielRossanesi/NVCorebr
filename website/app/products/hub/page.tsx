import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { Brand } from "@/components/nv/brand";
import { ProductGlyph } from "@/components/nv/product-glyph";
import { Cta } from "@/components/nv/cta";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "NV Hub | Produto próprio da NV Core",
  "Conheça o NV Hub, produto próprio do ecossistema NV Core. Converse com a NV para saber mais sobre o produto.",
  "/products/hub",
);
export default function Hub() {
  return (
    <main id="main" tabIndex={-1} className="theme-hub">
      <section className="wrap page-opening hub-opening">
        <div>
          <Link className="back-link" href="/products">
            Ecossistema NV
          </Link>
          <Brand name="hub" />
          <h1>
            Visão própria.
            <br />
            Conexão com
            <br />o núcleo.
          </h1>
          <p className="opening-description">
            NV Hub é um produto próprio da NV Core.
            <br />
            Design, produto e engenharia na mesma origem.
          </p>
          <Link
            className="button product-button"
            href="/contact?intent=product&product=hub"
          >
            Converse sobre o NV Hub
          </Link>
        </div>
        <div className="hub-matrix">
          <ProductGlyph id="hub" />
          <span className="matrix-top">NV Products</span>
          <span className="matrix-bottom">Hub / Core connection</span>
        </div>
      </section>
      <section className="section wrap product-statement">
        <span className="statement-glyph">
          <Brand symbolOnly name="hub" />
        </span>
        <h2>
          Um produto.
          <br />
          Toda a perspectiva
          <br />
          da NV Core.
        </h2>
        <div>
          <p className="lead">
            O NV Hub faz parte do nosso ecossistema de produtos próprios.
          </p>
          <p>
            Para entender a aplicação do produto ao seu contexto, converse com a
            NV. A apresentação detalhada de escopo e funcionalidades será
            disponibilizada com a documentação do produto.
          </p>
          <Link className="text-link" href="/about">
            Conheça a empresa por trás do produto
          </Link>
        </div>
      </section>
      <section className="wrap product-siblings">
        <p>No mesmo ecossistema</p>
        <Link href="/products/med">
          <Brand name="med" />
          <span>Tecnologia para saúde</span>
        </Link>
        <Link href="/products/lex">
          <Brand name="lex" />
          <span>Tecnologia para o jurídico</span>
        </Link>
      </section>
      <Cta
        title="Vamos falar sobre o NV Hub."
        description="Conte o contexto da sua empresa e o que você deseja conhecer."
        href="/contact?intent=product&product=hub"
        label="Iniciar uma conversa"
      />
      <Motion route="/products/hub" />
    </main>
  );
}
