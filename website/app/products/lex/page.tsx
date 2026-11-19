import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { Brand } from "@/components/nv/brand";
import { ProductScene } from "@/components/nv/product-scene";
import { Cta } from "@/components/nv/cta";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "NV Lex | Tecnologia para o jurídico",
  "NV Lex é o produto da NV Core voltado ao setor jurídico. Conheça a identidade e o estágio demonstrativo do projeto.",
  "/products/lex",
);
export default function Lex() {
  return (
    <main id="main" tabIndex={-1} className="theme-lex">
      <section className="wrap page-opening lex-opening">
        <div>
          <Link className="back-link" href="/products">
            Ecossistema NV
          </Link>
          <Brand name="lex" />
          <p className="lex-category">Protótipo demonstrativo</p>
          <h1>
            Um novo contexto
            <br />
            para a tecnologia.
            <br />O jurídico.
          </h1>
        </div>
        <div className="lex-side">
          <ProductScene id="lex" />
          <p>
            NV Lex é o produto próprio da NV Core voltado ao setor jurídico.
          </p>
          <Link
            href="/contact?intent=product&product=lex"
            className="button product-button"
          >
            Converse sobre o NV Lex
          </Link>
        </div>
      </section>
      <section className="section wrap lex-editorial">
        <div className="lex-rule" aria-hidden="true" />
        <h2>
          Precisão como
          <br />
          linguagem.
        </h2>
        <div>
          <p className="lead">
            Tecnologia aplicada a um setor com identidade própria.
          </p>
          <p>
            O protótipo demonstra fluxos de cadastro e consulta de processos e
            clientes com dados fictícios. A apresentação mostra a identidade do
            produto e seu estágio atual.
          </p>
          <Link className="text-link" href="/about">
            A engenharia por trás da marca
          </Link>
        </div>
      </section>
      <section className="wrap product-siblings">
        <p>Outras conexões NV</p>
        <Link href="/products/hub">
          <Brand name="hub" />
          <span>Produto próprio NV</span>
        </Link>
        <Link href="/products/med">
          <Brand name="med" />
          <span>Tecnologia para saúde</span>
        </Link>
      </section>
      <Cta
        title="Vamos falar sobre tecnologia para o jurídico."
        description="Conte o seu contexto e o que você gostaria de conhecer sobre o NV Lex."
        href="/contact?intent=product&product=lex"
        label="Iniciar uma conversa"
      />
      <Motion route="/products/lex" />
    </main>
  );
}
