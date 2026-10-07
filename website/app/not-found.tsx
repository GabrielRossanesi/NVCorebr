import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="wrap page-opening not-found">
      <p className="section-label">404 / Fora do núcleo</p>
      <h1>
        Essa conexão
        <br />
        não existe.
      </h1>
      <p>
        A página pode ter mudado de endereço. Explore o ecossistema ou volte
        para o início.
      </p>
      <div className="actions">
        <Link href="/" className="button primary">
          Voltar à NV Core
        </Link>
        <Link href="/products" className="text-link">
          Explorar produtos
        </Link>
      </div>
    </main>
  );
}
