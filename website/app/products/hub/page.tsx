import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { Brand } from "@/components/nv/brand";
import { ProductScene } from "@/components/nv/product-scene";
import { Cta } from "@/components/nv/cta";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "NV Hub | Produto próprio da NV Core",
  "Gestão comercial e operacional para agências, consultorias e empresas de serviços. Conheça o NV Hub e veja um recorte demonstrativo do produto.",
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
            Gestão comercial e operacional para agências, consultorias e
            empresas de serviços. A cena ilustra o modo de demonstração.
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
            O produto reúne rotinas de clientes e de equipe em um só lugar.
            Os recursos disponíveis variam conforme as permissões da organização.
          </p>
          <Link className="text-link" href="/about">
            Conheça a empresa por trás do produto
          </Link>
        </div>
      </section>
      <section className="wrap product-modules" aria-label="Dentro do NV Hub">
        <article>
          <span>MODO DE DEMONSTRAÇÃO</span>
          <h3>Central de Leads</h3>
          <p>
            A versão demonstrativa apresenta Kanban, lista e etapas de
            acompanhamento de leads.
          </p>
        </article>
        <article>
          <span>02 / CONTEXTO</span>
          <h3>Clientes</h3>
          <p>
            Cadastro e consulta de clientes. O fluxo de propostas é exibido no
            modo de demonstração.
          </p>
        </article>
        <article>
          <span>03 / OPERAÇÃO</span>
          <h3>Planner da equipe</h3>
          <p>
            Tarefas em visões de dia, semana e mês. Publicações dependem de
            habilitação na organização.
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
