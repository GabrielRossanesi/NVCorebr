import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { Brand } from "@/components/nv/brand";
import { ProductScene } from "@/components/nv/product-scene";
import { Cta } from "@/components/nv/cta";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "NV Med | Tecnologia para saúde",
  "Escalas por unidade e setor, cobertura por turno e acompanhamento documental. Conheça o NV Med, produto próprio da NV Core para a operação médica.",
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
            Escalas por unidade e setor, cobertura por turno e acompanhamento
            documental. Tecnologia para quem organiza a operação médica.
          </p>
          <Link
            href="/contact?intent=product&product=med"
            className="button product-button"
          >
            Conheça o NV Med
          </Link>
        </div>
        <ProductScene id="med" />
      </section>
      <section className="section wrap med-editorial">
        <p className="section-label">Dentro do ecossistema NV</p>
        <h2>
          Uma identidade própria.
          <br />A mesma origem.
        </h2>
        <div className="med-text">
          <p className="lead">
            Ver a escala é entender a cobertura da operação.
          </p>
          <p>
            Visões semanal e mensal organizam unidades, setores e profissionais.
            Estados de cobertura destacam vagas e conflitos de horário. A
            documentação médica acompanha recebimento, análise e validade.
          </p>
          <Link
            className="text-link"
            href="/contact?intent=product&product=med"
          >
            Conversar sobre o produto
          </Link>
        </div>
      </section>
      <section className="wrap med-flow" aria-label="Dentro do NV Med">
        <div>
          <span>UNIDADE → SETOR → TURNO</span>
          <h3>Contexto antes de complexidade.</h3>
          <p>
            Filtros e diferentes visões ajudam a ler a escala no nível de
            detalhe necessário.
          </p>
        </div>
        <div className="coverage-legend">
          <span>
            <i />
            Completo
          </span>
          <span>
            <i />
            Vaga aberta
          </span>
          <span>
            <i />
            Confirmação pendente
          </span>
          <small>Estados presentes na interface do produto.</small>
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
