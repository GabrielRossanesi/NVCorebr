import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { CoreDiagram } from "@/components/nv/core-diagram";
import { Ecosystem } from "@/components/nv/ecosystem";
import { ProductShowcase } from "@/components/nv/product-showcase";
import { Capabilities } from "@/components/nv/capabilities";
import { Convergence } from "@/components/nv/convergence";
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
            Criamos produtos. Construímos soluções.
            <br />
            Uma empresa de tecnologia, do primeiro
            <br className="desktop-break" /> conceito à próxima evolução.
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
      <section className="section wrap home-solutions">
        <div className="section-heading">
          <div>
            <Brand name="solutions" />
            <h2>
              O que a sua empresa
              <br />
              precisa construir?
            </h2>
          </div>
          <div>
            <p>
              Aplicamos nossa experiência de produto a sistemas, plataformas e
              experiências digitais para o seu negócio.
            </p>
            <Link href="/solutions" className="text-link">
              Explore a NV Solutions
            </Link>
          </div>
        </div>
        <Capabilities />
      </section>
      <section className="section wrap home-products">
        <div className="section-heading">
          <div>
            <p className="section-label">
              NV Products / A nossa visão ganha identidade
            </p>
            <h2>
              Produtos que carregam
              <br />a nossa assinatura.
            </h2>
          </div>
          <p>
            Contextos diferentes.
            <br />A mesma capacidade de construir.
          </p>
        </div>
        <ProductShowcase />
        <Link className="text-link showcase-work-link" href="/projects">
          Conheça nosso trabalho
        </Link>
      </section>
      <Convergence />
      <Motion route="/" />
    </main>
  );
}
