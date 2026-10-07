import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { Brand } from "@/components/nv/brand";
import { ProductScene } from "@/components/nv/product-scene";
import { Cta } from "@/components/nv/cta";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "NV Hub | Produto próprio da NV Core",
  "Gestão comercial e operacional para agências e consultorias: Central de Leads, clientes, propostas e planner da equipe. Um produto da NV Core.",
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
            Da Central de Leads ao planner da equipe. Gestão comercial e
            operacional para agências, consultorias e empresas de serviços.
          </p>
          <Link
            className="button product-button"
            href="/contact?intent=product&product=hub"
          >
            Converse sobre o NV Hub
          </Link>
        </div>
        <ProductScene id="hub" />
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
            A operação fica mais clara quando suas etapas se conectam.
          </p>
          <p>
            O Kanban organiza o avanço dos leads. Clientes e propostas dão
            continuidade ao trabalho comercial. O planner reúne tarefas e
            publicações em visões de agenda e calendário.
          </p>
          <Link className="text-link" href="/about">
            Conheça a empresa por trás do produto
          </Link>
        </div>
      </section>
      <section className="wrap product-modules" aria-label="Dentro do NV Hub">
        <article>
          <span>01 / COMERCIAL</span>
          <h3>Central de Leads</h3>
          <p>
            Kanban, lista e acompanhamento das etapas do primeiro contato à
            conversão.
          </p>
        </article>
        <article>
          <span>02 / CONTEXTO</span>
          <h3>Clientes & propostas</h3>
          <p>Cadastros e propostas fazem parte da mesma rotina comercial.</p>
        </article>
        <article>
          <span>03 / OPERAÇÃO</span>
          <h3>Planner da equipe</h3>
          <p>
            Tarefas e publicações. Dia, semana e mês para organizar o próximo
            passo.
          </p>
        </article>
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
