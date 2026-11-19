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
            Desenvolvemos produtos próprios e criamos sistemas, plataformas e
            integrações sob medida para empresas.
          </p>
          <div className="actions">
            <Link className="button primary" href="/solutions">
              Ver soluções sob medida
            </Link>
            <Link className="text-link" href="/products">
              Explore os produtos NV
            </Link>
          </div>
        </div>
        <CoreDiagram />
        <div className="hero-bottom">
          <span>Produtos próprios. Engenharia sob medida.</span>
          <a href="#ecosystem">
            Produtos e soluções <span className="scroll-line" />
          </a>
        </div>
      </section>
      <section id="ecosystem" className="section wrap home-ecosystem">
        <h2>Duas formas de trabalhar com a NV Core</h2>
        <Ecosystem compact />
      </section>
      <section className="section wrap home-products">
        <div className="section-heading">
          <h2>Produtos NV</h2>
        </div>
        <ProductShowcase />
        <Link className="text-link showcase-work-link" href="/projects">
          Veja o portfólio de produtos
        </Link>
      </section>
      <section className="section wrap home-solutions">
        <div className="section-heading">
          <div>
            <Brand name="solutions" />
            <h2>Desenvolvimento sob medida</h2>
          </div>
          <div>
            <p>
              Da descoberta à evolução, desenvolvemos software para os processos
              da sua empresa.
            </p>
            <Link href="/solutions" className="text-link">
              Conheça os serviços da NV Solutions
            </Link>
          </div>
        </div>
        <Capabilities />
      </section>
      <Convergence />
      <Motion route="/" />
    </main>
  );
}
