import { Brand } from "./brand";
export function Lifecycle() {
  return (
    <figure className="lifecycle">
      <div className="lifecycle-center">
        <Brand symbolOnly />
        <span>O ciclo continua.</span>
      </div>
      <ol>
        {["Projetar", "Desenvolver", "Operar", "Evoluir"].map((step, i) => (
          <li key={step}>
            <span>0{i + 1}</span>
            {step}
            <span aria-hidden="true">↗</span>
          </li>
        ))}
      </ol>
      <figcaption>O produto conecta todas as etapas.</figcaption>
    </figure>
  );
}
