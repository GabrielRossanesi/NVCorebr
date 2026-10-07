/** Editorial reconstructions of verified UI. All records below are fictional. */
export function ProductInterface({ id }: { id: "hub" | "med" }) {
  if (id === "hub")
    return (
      <div className="interface-composition interface-hub" aria-hidden="true">
        <div className="interface-panel" data-scene-part="">
          <div className="interface-bar">
            <strong>NV Hub</strong>
            <span>Operações conectadas</span>
            <i />
          </div>
          <div className="interface-body">
            <aside className="interface-sidebar">
              <span>COMERCIAL</span>
              <b>Central de Leads</b>
              <span>Clientes</span>
              <span>Propostas</span>
              <span className="sidebar-group">OPERAÇÕES</span>
              <span>Planner</span>
            </aside>
            <div className="interface-content">
              <div className="interface-heading">
                <div>
                  <small>COMERCIAL</small>
                  <h4>Central de Leads</h4>
                </div>
                <span className="ui-view">Kanban</span>
              </div>
              <div className="lead-board">
                {[
                  {
                    title: "Novo",
                    name: "Empresa Exemplo A",
                    tag: "Primeiro contato",
                    number: "01",
                  },
                  {
                    title: "Em Atendimento",
                    name: "Empresa Exemplo B",
                    tag: "Contexto do projeto",
                    number: "02",
                  },
                  {
                    title: "Qualificado",
                    name: "Empresa Exemplo C",
                    tag: "Próxima conversa",
                    number: "03",
                  },
                ].map((column) => (
                  <div className="lead-column" key={column.title}>
                    <div className="lead-column-title">
                      <i />
                      <b>{column.title}</b>
                      <span>1</span>
                    </div>
                    <div className="lead-card">
                      <small>DEMONSTRAÇÃO / {column.number}</small>
                      <strong>{column.name}</strong>
                      <span>{column.tag}</span>
                      <div className="lead-card-footer">
                        <i />
                        Equipe Exemplo
                      </div>
                    </div>
                    <div className="lead-placeholder" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="interface-detail planner-fragment" data-scene-part="">
          <div>
            <small>PLANNER OPERACIONAL</small>
            <strong>Agenda do dia</strong>
            <span>Tarefas · Publicações</span>
          </div>
          <div className="planner-row">
            <i />
            <span>
              Revisar proposta demonstrativa
              <small>Equipe Exemplo · Comercial</small>
            </span>
            <b>09:00</b>
          </div>
          <div className="planner-row">
            <i />
            <span>
              Organizar a próxima entrega
              <small>Equipe Exemplo · Operações</small>
            </span>
            <b>14:00</b>
          </div>
        </div>
      </div>
    );
  return (
    <div className="interface-composition interface-med" aria-hidden="true">
      <div className="interface-panel" data-scene-part="">
        <div className="interface-bar">
          <strong>NV Med</strong>
          <span>Gestão de escalas</span>
          <i />
        </div>
        <div className="interface-content">
          <div className="interface-heading">
            <div>
              <small>OPERAÇÃO MÉDICA</small>
              <h4>Escalas</h4>
            </div>
            <span className="ui-view">Semana</span>
          </div>
          <div className="schedule-filter">
            <span>Unidade Exemplo</span>
            <span>Todos os setores</span>
            <span>Turno diurno</span>
          </div>
          <div className="schedule-matrix">
            <div className="schedule-head">Unidade · setor · turno</div>
            {["Seg", "Ter", "Qua"].map((day) => (
              <div className="schedule-head" key={day}>
                {day}
              </div>
            ))}
            {["A", "B"].map((sector, row) => (
              <div className="schedule-row" key={sector}>
                <div className="schedule-label">
                  <strong>Setor {sector}</strong>
                  <span>Unidade Exemplo</span>
                  <small>07:00 — 19:00</small>
                </div>
                {[0, 1, 2].map((day) => (
                  <div
                    className={`shift-cell ${row === 1 && day === 1 ? "shift-open" : ""}`}
                    key={day}
                  >
                    <span className="shift-status">
                      {row === 1 && day === 1 ? "Vaga aberta" : "Completo"}
                    </span>
                    <strong>
                      {row === 1 && day === 1 ? "1 / 2" : "2 / 2"}
                    </strong>
                    <small>Profissionais fictícios</small>
                    <div className="shift-avatars">
                      <i>A</i>
                      <i>{row === 1 && day === 1 ? "+" : "B"}</i>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="interface-detail document-fragment" data-scene-part="">
        <small>DOCUMENTAÇÃO MÉDICA</small>
        <strong>Acompanhamento documental</strong>
        <div>
          <span>Documento demonstrativo A</span>
          <b className="document-approved">Aprovado</b>
        </div>
        <div>
          <span>Documento demonstrativo B</span>
          <b className="document-review">Em análise</b>
        </div>
      </div>
    </div>
  );
}
