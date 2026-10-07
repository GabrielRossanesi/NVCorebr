export default function Loading() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="wrap page-opening route-loading"
      aria-busy="true"
    >
      <p role="status">Carregando o ecossistema NV…</p>
      <span className="loading-line" aria-hidden="true" />
    </main>
  );
}
