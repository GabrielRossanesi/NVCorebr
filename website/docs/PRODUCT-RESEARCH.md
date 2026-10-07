# Product Research — NV Core V2

Análise somente leitura em 7 de outubro de 2026, pelo conector GitHub disponível no ambiente. Nenhum checkout dos produtos, alteração, commit, push, consulta a banco de produção ou acesso a arquivos de ambiente. A implementação está exclusivamente na NV Core, sem dependências entre repositórios.

## NV Hub

Fonte: [GabrielRossanesi/NV-Hub](https://github.com/GabrielRossanesi/NV-Hub), commit `575abead4302b7d49117977abda80d2d0098ad91`.

Foram examinados README, design system, logo, dashboard, Central de Leads, propostas, ações de clientes, store, documentação e componente do planner operacional. O produto atende gestão comercial e operacional de agências, consultorias e empresas de serviços recorrentes.

Utilizado na apresentação:

- **Central de Leads:** Kanban com as colunas reais Novo, Em Atendimento e Qualificado. O componente filtra e renderiza os leads por status; o store implementa atualização do status. O recorte mostra três das sete colunas, sem sugerir que sejam as únicas.
- **Planner operacional:** estrutura de agenda com tarefas e publicações; filtros e visões Dia/Semana/Mês confirmados no componente e documentação. Não foi atribuído arrastar e soltar, que aparece como evolução futura na documentação.
- **Clientes e propostas:** cadastro/consulta de clientes e criação/listagem de propostas verificados no código; mencionados como módulos, sem representar integrações externas como validadas em produção.
- **Identidade:** nome NV Hub, assinatura “Operações conectadas” do logo, superfícies neutras escuras e dourado `#D8AA58` do design system. O azul institucional do Hub foi preservado fora da interface.

Referências principais, fixadas ao commit analisado:

- [Central de Leads](https://github.com/GabrielRossanesi/NV-Hub/blob/575abead4302b7d49117977abda80d2d0098ad91/app/leads/page.tsx)
- [Store e transições de status](https://github.com/GabrielRossanesi/NV-Hub/blob/575abead4302b7d49117977abda80d2d0098ad91/lib/store.ts)
- [Planner](https://github.com/GabrielRossanesi/NV-Hub/blob/575abead4302b7d49117977abda80d2d0098ad91/components/ui/operational-planner.tsx)
- [Escopo do planner](https://github.com/GabrielRossanesi/NV-Hub/blob/575abead4302b7d49117977abda80d2d0098ad91/docs/operational-planner.md)
- [Propostas](https://github.com/GabrielRossanesi/NV-Hub/blob/575abead4302b7d49117977abda80d2d0098ad91/app/propostas/page.tsx)
- [Clientes](https://github.com/GabrielRossanesi/NV-Hub/blob/575abead4302b7d49117977abda80d2d0098ad91/app/clientes/actions.ts)
- [Design system](https://github.com/GabrielRossanesi/NV-Hub/blob/575abead4302b7d49117977abda80d2d0098ad91/docs/design-system.md)
- [Logo](https://github.com/GabrielRossanesi/NV-Hub/blob/575abead4302b7d49117977abda80d2d0098ad91/components/ui/logo.tsx)

## NV Med

Fonte: [GabrielRossanesi/NV-Med](https://github.com/GabrielRossanesi/NV-Med), commit `71c487398cd670b0d2de405d3f97782ea6d8680e`.

Foram examinados README, tokens, sidebar, dashboard, páginas de escalas e documentos, calendário, store, serviços Supabase e regras de agenda/documentos. O contexto confirmado é organização da operação médica, sem atribuir prontuário ou funcionalidades clínicas de atendimento.

Utilizado na apresentação:

- **Escalas:** matriz semanal por unidade, setor e turno; contagem de profissionais necessários/alocados, estados de cobertura e filtros. O recorte editorial usa poucos dias e dois setores, mantendo a estrutura da interface real. No celular, dois dias e uma camada documental separada facilitam a leitura.
- **Cobertura:** Completo, Vaga aberta e Confirmação pendente são estados reais. A verificação de conflitos compara intervalos de horário de um mesmo profissional; a recorrência está implementada nas regras de agenda. O site menciona somente a detecção de conflitos, sem criar indicadores de eficiência ou alegar ausência de falhas.
- **Documentação médica:** acompanhamento dos estados Aprovado e Em análise, recebimento e validade, confirmados na página e nas funções de compliance. Nenhuma promessa de certificação ou garantia regulatória.
- **Identidade:** teal `#2DD4BF`, superfícies `#050607` / `#101418` e linguagem de organização, continuidade e contexto. Sem cruz, estetoscópio, paciente ou foto médica genérica.

O README ainda descreve um protótipo local. O código atual contém gravação de escalas e documentos por serviços Supabase, incluindo upsert e tratamento de erros. A pesquisa verifica a implementação; não comprova disponibilidade, implantação ou funcionamento desses serviços externos. O texto público não faz essas alegações.

Referências principais:

- [Matriz de escalas](https://github.com/GabrielRossanesi/NV-Med/blob/71c487398cd670b0d2de405d3f97782ea6d8680e/src/components/schedule/ScheduleCalendarView.tsx)
- [Página de escalas](https://github.com/GabrielRossanesi/NV-Med/blob/71c487398cd670b0d2de405d3f97782ea6d8680e/src/app/(dashboard)/escala/page.tsx)
- [Regras de agenda](https://github.com/GabrielRossanesi/NV-Med/blob/71c487398cd670b0d2de405d3f97782ea6d8680e/src/lib/scheduling.ts)
- [Documentação médica](https://github.com/GabrielRossanesi/NV-Med/blob/71c487398cd670b0d2de405d3f97782ea6d8680e/src/app/(dashboard)/documentos/page.tsx)
- [Estados documentais](https://github.com/GabrielRossanesi/NV-Med/blob/71c487398cd670b0d2de405d3f97782ea6d8680e/src/lib/documentCompliance.ts)
- [Store](https://github.com/GabrielRossanesi/NV-Med/blob/71c487398cd670b0d2de405d3f97782ea6d8680e/src/store/useStore.ts)
- [Serviços](https://github.com/GabrielRossanesi/NV-Med/blob/71c487398cd670b0d2de405d3f97782ea6d8680e/src/services/supabaseService.ts)
- [Tokens](https://github.com/GabrielRossanesi/NV-Med/blob/71c487398cd670b0d2de405d3f97782ea6d8680e/src/app/globals.css)

## NV Lex

Foi localizado [GabrielRossanesi/nvlex](https://github.com/GabrielRossanesi/nvlex). O repositório está vazio: a consulta da árvore retornou HTTP 409, “Git Repository is empty”. Não há commit, tela, README, módulo ou funcionalidade verificável nessa fonte.

A identidade institucional existente foi preservada e refinada por composição de planos e alinhamentos. Ela está identificada como composição da identidade, não como interface do produto. Não foram inventados processos, dashboards, automações ou recursos jurídicos. Foi solicitada a localização de outra fonte de código; essa é a pendência real para evoluir Lex com o mesmo grau de prova visual de Hub e Med.

## Assets, dados e independência

Não foram encontrados screenshots de produto nas árvores analisadas de Hub e Med. Os logos úteis estão no código; os símbolos da família NV Core existentes foram preservados. Nenhum asset remoto foi copiado.

As novas interfaces são reconstruções próprias em HTML/CSS/SVG, em `components/nv/product-interface.tsx`, inseridas por `ProductScene` no showcase e nas páginas. Fontes e proporções foram adaptadas editorialmente ao site institucional; não são screenshots nem réplicas pixel a pixel.

Todos os registros foram criados especificamente para demonstração: Empresa Exemplo A/B/C, Equipe Exemplo, Unidade Exemplo, Setor A/B, Profissionais fictícios e Documento demonstrativo A/B. Horários e contagens são fictícios e não representam produção. O aviso “Interface reconstruída · dados demonstrativos fictícios” aparece junto às composições.

Não foram reutilizados nomes, e-mails, documentos, identificadores, credenciais, URLs internas, dados médicos/jurídicos, números comerciais ou configurações dos produtos. Nenhum `.env`, secret ou token foi trazido para a NV Core.
