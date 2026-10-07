import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { Brand } from "@/components/nv/brand";
import { Capabilities } from "@/components/nv/capabilities";
import { Cta } from "@/components/nv/cta";
import { processSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "NV Solutions | Engenharia para o seu negócio",
  "Sistemas personalizados, CRM, ERP, plataformas, web, APIs, integrações e automações. A engenharia da NV Core aplicada ao seu negócio.",
  "/solutions",
);
export default function Solutions() {
  return (
    <main id="main" tabIndex={-1} className="theme-solutions">
      <section className="solutions-opening wrap page-opening">
        <div>
          <Brand name="solutions" />
          <h1>
            O seu desafio.
            <br />A nossa
            <br />
            engenharia.
          </h1>
          <p className="opening-description">
            A capacidade de construir e operar produtos próprios, aplicada ao
            que o seu negócio precisa.
          </p>
          <Link href="/contact?intent=software" className="button primary">
            Conte seu projeto
          </Link>
        </div>
        <div
          className="architecture-visual"
          aria-label="Arquitetura: experiência, aplicação, dados e integrações"
        >
          <div className="architecture-layer">
            <span>Experiência</span>
            <strong>Design que orienta.</strong>
          </div>
          <div className="architecture-layer">
            <span>Aplicação</span>
            <strong>Software que conecta.</strong>
          </div>
          <div className="architecture-layer">
            <span>Dados & integrações</span>
            <strong>Estrutura que sustenta.</strong>
          </div>
          <div className="architecture-base">
            <Brand symbolOnly name="solutions" />
            <span>NV Core engineering</span>
          </div>
        </div>
      </section>
      <section className="section wrap split-section">
        <div>
          <p className="section-label">Capacidades</p>
          <h2>
            Construído para
            <br />o seu contexto.
          </h2>
          <p>
            Uma solução começa pelo problema. Explore o que podemos desenvolver
            com a sua empresa.
          </p>
        </div>
        <Capabilities />
      </section>
      <section className="section wrap process-section">
        <div className="process-intro">
          <p className="section-label">Do entendimento à evolução</p>
          <h2>
            Engenharia é<br />
            um processo.
            <br />
            Não uma entrega.
          </h2>
          <p>
            Design, arquitetura e desenvolvimento fazem parte da mesma conversa.
            Cada etapa cria as condições para a próxima.
          </p>
        </div>
        <div className="process-timeline">
          <span className="process-rail" aria-hidden="true" />
          <ol className="process-list">
            {processSteps.map((step, i) => (
              <li key={step.title}>
                <span className="process-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section wrap engineering-note">
        <h2>
          A experiência de produto
          <br />
          faz diferença na solução.
        </h2>
        <p>
          Construir nossos próprios produtos significa lidar com o ciclo
          inteiro: decisões de design, arquitetura, desenvolvimento, operação e
          evolução. Essa perspectiva acompanha o trabalho da NV Solutions.
        </p>
        <Link className="text-link" href="/products">
          Conheça o ecossistema de produtos
        </Link>
      </section>
      <Cta />
      <Motion route="/solutions" />
    </main>
  );
}
