import { Motion } from "@/components/nv/motion";
import { Brand } from "@/components/nv/brand";
import { Ecosystem } from "@/components/nv/ecosystem";
import { Lifecycle } from "@/components/nv/lifecycle";
import { Cta } from "@/components/nv/cta";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "A empresa | Design, produto e engenharia",
  "Conheça a NV Core, empresa de tecnologia que cria e opera produtos próprios e desenvolve soluções digitais para outras empresas.",
  "/about",
);
export default function About() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="wrap page-opening about-opening">
        <div>
          <p className="section-label">A NV Core</p>
          <h1>
            Construir.
            <br />
            Operar.
            <br />
            Evoluir.
          </h1>
        </div>
        <div className="about-side">
          <div className="about-mark">
            <Brand symbolOnly />
          </div>
          <p className="lead">
            Somos uma empresa de tecnologia. Criamos produtos próprios e
            desenvolvemos soluções digitais para outras empresas.
          </p>
        </div>
      </section>
      <section className="section wrap about-manifesto">
        <p className="section-label">O que está no centro</p>
        <h2>
          O produto não termina
          <br />
          quando o código
          <br />
          fica pronto.
        </h2>
        <p>
          Projetar, desenvolver, operar e evoluir são partes do mesmo trabalho.
          É essa visão que conecta NV Products e NV Solutions.
        </p>
        <Lifecycle />
      </section>
      <section className="section wrap principles">
        <article>
          <h3>
            Clareza
            <br />
            antes da complexidade.
          </h3>
          <p>
            Design e engenharia começam por entender o problema. As decisões
            técnicas precisam fazer sentido para quem utiliza a solução.
          </p>
        </article>
        <article>
          <h3>
            Produto
            <br />
            como perspectiva.
          </h3>
          <p>
            Ter produtos próprios traz a responsabilidade de pensar além do
            lançamento: uso, manutenção e evolução fazem parte do caminho.
          </p>
        </article>
        <article>
          <h3>
            Um núcleo.
            <br />
            Diferentes contextos.
          </h3>
          <p>
            Cada produto e cada solução têm sua identidade. O que os conecta é a
            forma de construir tecnologia.
          </p>
        </article>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <h2>A visão vira ecossistema.</h2>
          <p>
            Produtos próprios e engenharia sob medida. Duas frentes que
            compartilham o mesmo núcleo.
          </p>
        </div>
        <Ecosystem />
      </section>
      <Cta title="Sua próxima construção pode fazer parte desta história." />
      <Motion route="/about" />
    </main>
  );
}
