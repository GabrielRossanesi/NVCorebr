import Link from "next/link";
export function Cta({
  title = "O próximo passo do seu negócio pode começar aqui.",
  description = "Conte o que você precisa construir. A NV Solutions parte do seu desafio.",
  href = "/contact",
  label = "Converse com a NV",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="closing wrap">
      <span className="closing-core" aria-hidden="true" />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link className="button primary" href={href}>
        {label}
      </Link>
    </section>
  );
}
