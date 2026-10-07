import { Motion } from "@/components/nv/motion";
import Link from "next/link";
import { Brand } from "@/components/nv/brand";
import { ProductGlyph } from "@/components/nv/product-glyph";
import { Cta } from "@/components/nv/cta";
import { caseStudies, products } from "@/lib/content";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Projetos | O trabalho da NV Core",
  "Explore o ecossistema de produtos próprios da NV Core e a perspectiva de engenharia da NV Solutions.",
  "/projects",
);
export default function Projects() {
  const cases = caseStudies.filter((c) => c.approved);
  return (
    <main id="main" tabIndex={-1}>
      <section className="wrap page-opening projects-opening">
        <p className="section-label">O que construímos</p>
        <h1>
          Engenharia que
          <br />
          ganha identidade.
        </h1>
        <p className="opening-description">
          Nosso ecossistema de produtos próprios é uma das expressões da NV
          Core. Conheça as marcas e seus contextos.
        </p>
      </section>
      <section className="wrap project-index" aria-label="Produtos próprios">
        {products.map((p) => (
          <Link
            className={`project-entry theme-${p.id}`}
            key={p.id}
            href={`/products/${p.id}`}
          >
            <div className="project-visual">
              <ProductGlyph id={p.id} />
            </div>
            <div className="project-caption">
              <Brand name={p.id} />
              <span>{p.category}</span>
              <small>Produto próprio / NV Core</small>
            </div>
          </Link>
        ))}
      </section>
      <section className="section wrap selected-work">
        <div>
          <p className="section-label">NV Solutions / Cases</p>
          <h2>
            Histórias de
            <br />
            construção.
          </h2>
        </div>
        {cases.length ? (
          cases.map((c) => (
            <article key={c.slug}>
              <h3>{c.title}</h3>
              <dl>
                <dt>Desafio</dt>
                <dd>{c.challenge}</dd>
                <dt>Solução</dt>
                <dd>{c.solution}</dd>
                <dt>Tecnologia</dt>
                <dd>{c.technologies.join(", ")}</dd>
                <dt>Resultado</dt>
                <dd>{c.result}</dd>
              </dl>
            </article>
          ))
        ) : (
          <div className="case-empty">
            <span className="case-empty-symbol" aria-hidden="true" />
            <h3>Os próximos cases serão apresentados aqui.</h3>
            <p>
              Projetos, desafios e resultados serão publicados quando houver
              conteúdo aprovado para divulgação.
            </p>
            <Link className="text-link" href="/solutions">
              Explore a capacidade da NV Solutions
            </Link>
          </div>
        )}
      </section>
      <Cta title="O próximo projeto pode começar com o seu desafio." />
      <Motion route="/projects" />
    </main>
  );
}
