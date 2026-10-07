"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main id="main" tabIndex={-1} className="wrap page-opening">
      <h1>
        A conexão
        <br />
        foi interrompida.
      </h1>
      <p>Não foi possível carregar esta página. Tente novamente.</p>
      <button className="button primary" onClick={reset}>
        Tentar novamente
      </button>
    </main>
  );
}
