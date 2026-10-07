import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { Brand } from "@/components/nv/brand";
import { ProductGlyph } from "@/components/nv/product-glyph";
import { Cta } from "@/components/nv/cta";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "NV Med | Tecnologia para saúde",
  "NV Med é o produto próprio da NV Core voltado ao setor de saúde. Conheça sua origem e converse com a NV.",
  "/products/med",
);
export default function Med() {
  return (
    <main id="main" tabIndex={-1} className="theme-med">
      <section className="wrap page-opening med-opening">
        <div className="med-title">
          <Link className="back-link" href="/products">
            Ecossistema NV
          </Link>
          <Brand name="med" />
          <h1>
            Tecnologia.
            <br />
            No contexto
            <br />
            da saúde.
          </h1>
          <p className="opening-description">
            Um produto próprio voltado ao setor de saúde. A perspectiva de
            engenharia da NV Core em um ecossistema com necessidades próprias.
          </p>
          <Link
            href="/contact?intent=product&product=med"
            className="button product-button"
          >
            Conheça o NV Med
          </Link>
        </div>
        <div className="med-continuity">
          <span>NV Med / Continuidade</span>
          <ProductGlyph id="med" />
          <p>
            Saúde é o contexto.
            <br />
            Tecnologia é o núcleo.
          </p>
        </div>
      </section>
      <section className="section wrap med-editorial">
        <p className="section-label">Dentro do ecossistema NV</p>
        <h2>
          Uma identidade própria.
          <br />A mesma origem.
        </h2>
        <div className="med-text">
          <p className="lead">
            O NV Med é desenvolvido pela NV Core para o setor de saúde.
          </p>
          <p>
            Seu escopo, funcionalidades e aplicações serão apresentados com a
            documentação do produto. Converse com a NV para conhecer o produto e
            seu contexto.
          </p>
          <Link
            className="text-link"
            href="/contact?intent=product&product=med"
          >
            Conversar sobre o produto
          </Link>
        </div>
      </section>
      <section className="wrap product-siblings">
        <p>Explore o núcleo</p>
        <Link href="/products/hub">
          <Brand name="hub" />
          <span>Produto próprio NV</span>
        </Link>
        <Link href="/products/lex">
          <Brand name="lex" />
          <span>Tecnologia para o jurídico</span>
        </Link>
      </section>
      <Cta
        title="O seu contexto merece uma conversa."
        description="Conte sua relação com o setor de saúde e o que você quer conhecer sobre o NV Med."
        href="/contact?intent=product&product=med"
        label="Conversar com a NV"
      />
      <Motion route="/products/med" />
    </main>
  );
}
