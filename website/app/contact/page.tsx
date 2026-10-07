import { Motion } from "@/components/nv/motion";
import { ContactForm } from "@/components/nv/contact-form";
import { intentions } from "@/lib/contact";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Contato | Vamos construir juntos",
  "Conte seu desafio à NV Core. Converse sobre software, sistemas de gestão, web, integrações ou produtos próprios.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const intent =
    typeof params.intent === "string" &&
    intentions.some((i) => i.id === params.intent)
      ? params.intent
      : "software";
  const product =
    typeof params.product === "string" &&
    ["hub", "med", "lex"].includes(params.product)
      ? params.product
      : "";
  return (
    <main id="main" tabIndex={-1}>
      <section className="wrap contact-opening">
        <div className="contact-intro">
          <p className="section-label">Uma conversa com o núcleo</p>
          <h1>
            O que vamos
            <br />
            construir?
          </h1>
          <p className="opening-description">
            Um sistema, uma integração, um produto.
            <br />
            Comece pelo que o seu negócio precisa.
          </p>
          <div className="contact-principle">
            <span className="small-core" aria-hidden="true" />
            <p>
              Não precisa chegar com todas as respostas.
              <br />
              Um bom projeto começa com as perguntas certas.
            </p>
          </div>
        </div>
        <ContactForm
          key={intent + ":" + product}
          initialIntent={intent}
          initialProduct={product}
        />
      </section>
      <Motion route="/contact" />
    </main>
  );
}
