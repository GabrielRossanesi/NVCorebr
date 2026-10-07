import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { CoreDiagram } from "@/components/nv/core-diagram";
import { Ecosystem } from "@/components/nv/ecosystem";
import { ProductExplorer } from "@/components/nv/product-explorer";
import { Capabilities } from "@/components/nv/capabilities";
import { Cta } from "@/components/nv/cta";
import { Brand } from "@/components/nv/brand";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "NV Core | Produtos próprios. Engenharia sob medida.",
  "Uma empresa de tecnologia que cria produtos próprios e desenvolve soluções digitais. Conheça o ecossistema NV e a NV Solutions.",
  "/",
);
export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="intro-label">
            <span className="small-core" />
            Products & engineering
          </p>
          <h1>
            Tecnologia
            <br />
            com um
            <br />
            núcleo próprio.
          </h1>
          <p className="hero-description">
            Criamos produtos. Construímos soluções. <br />
            Uma empresa de tecnologia, do primeiro{" "}
            <br className="desktop-break" />
            conceito à próxima evolução.
          </p>
          <div className="actions">
            <Link className="button primary" href="/solutions">
              Conheça a NV Solutions
            </Link>
            <Link className="text-link" href="/products">
              Explore nossos produtos
            </Link>
          </div>
        </div>
        <CoreDiagram />
        <div className="hero-bottom">
          <span>Produtos próprios. Engenharia sob medida.</span>
          <a href="#ecosystem">
            Conheça o núcleo <span className="scroll-line" />
          </a>
        </div>
      </section>
      <section id="ecosystem" className="section wrap manifesto">
        <p className="section-label">O ecossistema NV</p>
        <h2>
          Um núcleo.
          <br />
          Múltiplas possibilidades.
        </h2>
        <div>
          <p className="lead">
            Projetar, desenvolver, operar e evoluir. Essa é a nossa forma de
            construir tecnologia.
          </p>
          <p>
            A mesma capacidade de engenharia que move nossos produtos também dá
            forma às soluções para o seu negócio.
          </p>
        </div>
        <Ecosystem />
      </section>
      <section className="section wrap home-products">
        <div className="section-heading">
          <div>
            <p className="section-label">NV Products</p>
            <h2>
              A nossa visão
              <br />
              ganha identidade.
            </h2>
          </div>
          <p>
            Produtos próprios. Contextos diferentes.
            <br />
            Explore as conexões do núcleo NV.
          </p>
        </div>
        <ProductExplorer />
      </section>
      <section className="section wrap split-section">
        <div>
          <Brand name="solutions" />
          <h2>
            O que a sua
            <br />
            empresa precisa
            <br />
            construir?
          </h2>
          <p>
            Aplicamos nossa experiência de produto a sistemas, plataformas e
            experiências digitais para o seu negócio.
          </p>
          <Link href="/solutions" className="text-link">
            Explore a NV Solutions
          </Link>
        </div>
        <Capabilities />
      </section>
      <section className="section wrap home-engineering">
        <div className="engineering-heading">
          <p className="section-label">No centro, engenharia.</p>
          <h2>
            O que você vê
            <br />é só o começo.
          </h2>
          <p>
            Uma interface clara depende de uma estrutura bem pensada. Produto,
            design, dados e integrações fazem parte da mesma construção.
          </p>
        </div>
        <div className="engineering-stack">
          <div>
            <span>Experiência</span>
            <p>Interfaces que fazem sentido para quem usa.</p>
          </div>
          <div>
            <span>Aplicação</span>
            <p>Regras, fluxos e software para o negócio.</p>
          </div>
          <div>
            <span>Conexões</span>
            <p>APIs, dados e integrações entre sistemas.</p>
          </div>
          <div className="engineering-stack-core">
            <Brand />
            <span>Um núcleo para construir e evoluir.</span>
          </div>
        </div>
      </section>
      <section className="section wrap home-work">
        <p className="section-label">O que construímos</p>
        <h2>
          Produtos que carregam
          <br />a nossa assinatura.
        </h2>
        <div className="work-brands">
          {(["hub", "med", "lex"] as const).map((id) => (
            <Link key={id} href={`/products/${id}`}>
              <Brand name={id} />
              <span>
                {id === "hub"
                  ? "Produto próprio"
                  : id === "med"
                    ? "Tecnologia para saúde"
                    : "Tecnologia para o jurídico"}
              </span>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/projects">
          Conheça nosso trabalho
        </Link>
      </section>
      <Cta title="A sua próxima evolução precisa de um bom núcleo." />
      <Motion route="/" />
    </main>
  );
}
