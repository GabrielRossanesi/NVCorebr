# Relatório de entrega — NV Core

07/10/2026 · Implementação local concluída para revisão. **Código versionado no GitHub. Nenhum deploy ou alteração de DNS foi realizado.**

Prévia compilada: http://127.0.0.1:5175. Código em `website/`; instruções em `README.md`.

## Implementado

| Rota            | Experiência                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`             | Hero assimétrico com núcleo NV em camadas; manifesto; ecossistema navegável; exploração cromática de produtos; capacidades interativas; arquitetura de engenharia; produtos próprios; CTA. |
| `/solutions`    | Divisão de engenharia, arquitetura em camadas, seis capacidades em accordion e processo de discovery até evolução.                                                                         |
| `/products`     | Arquitetura Products/Solutions e navegação entre três identidades.                                                                                                                         |
| `/products/hub` | Matriz de conexões, identidade azul e composição própria.                                                                                                                                  |
| `/products/med` | Continuidade, teal e narrativa institucional de tecnologia para saúde.                                                                                                                     |
| `/products/lex` | Planos champagne e composição editorial de tecnologia para o jurídico.                                                                                                                     |
| `/about`        | Visão, filosofia, relação entre produto/design/engenharia e ecossistema.                                                                                                                   |
| `/projects`     | Produtos próprios confirmados e estrutura tipada para cases reais; sem cases fictícios publicados.                                                                                         |
| `/contact`      | Sete intenções, campos adaptativos, produto pré-selecionado por URL, validação no navegador e mensagem formatada para WhatsApp, revisada pelo visitante antes do envio.                    |

Header sticky, menu mobile em dialog, footer do ecossistema, botão flutuante de WhatsApp em todas as páginas, 404, loading e error boundary. Nenhum perfil social ou canal de atendimento foi inventado.

## Brand system

- **Core:** monograma NV interligado, azul elétrico moderado, linguagem de núcleo técnico.
- **Solutions:** chevrons estruturais prata; construção e engenharia.
- **Hub:** módulos conectados em azul; conexão com o núcleo.
- **Med:** ondas de continuidade teal; sem cruz médica ou estética hospitalar.
- **Lex:** planos paralelos champagne e wordmark mais espaçado; sem balança ou martelo.

Manrope variável para leitura e Space Grotesk variável para títulos. Submarcas têm símbolos, pesos e espaçamentos próprios, mantendo a família tipográfica e a geometria NV. Existem **40 SVGs** organizados, com símbolos, versões reduzidas, wordmarks e lockups claros/escuros, app icons e favicons. Letras exportadas em curvas. Regras de expansão em `BRAND-SYSTEM.md`; preview em `/brand/preview.html`; pacote em `/downloads/nv-brand-kit.zip`.

## Motion

GSAP + ScrollTrigger com importação posterior à hidratação, escopo por main e matchMedia:

- Timeline de conexão das camadas do núcleo e stagger nos nós navegáveis.
- Parallax curto do núcleo em desktop.
- Desenho das conexões do ecossistema conforme o scroll.
- Progresso vertical do processo de engenharia em desktop.
- Transição de rota de 320 ms com símbolo NV e cor da divisão/produto.
- Estados de hover/focus/seleção, accordion, tabs e menu.

Tokens fast 160 ms, standard 320 ms, slow 700 ms, cinematic 1100 ms. Mobile elimina parallax e progresso do processo. Reduced motion desativa triggers e mantém todo conteúdo acessível. Nenhum scroll hijack ou pinning longo. Cleanup reverte matchMedia, timelines e listeners; cache de rolagem do ScrollTrigger é limpo entre rotas. O histórico guarda somente coordenadas e identificadores de entrada, limitado a 60 posições em memória.

## Arquitetura

Next.js 16.3.4, React 19, TypeScript, App Router, Tailwind 4 e primitives Radix. Páginas institucionais pré-renderizadas, contato SSR com composição da mensagem no navegador. Metadata, OG/Twitter, idioma pt-BR e Organization em JSON-LD. Canonical e sitemap dependem da origem pública real. A prévia permanece noindex até essa origem ser configurada.

O starter inicial usava Vinext beta. Seu bundle de produção falhou em prefetch e clique de links. A correção fundamentada foi ativar o Next.js já instalado, mantendo o código App Router e toda a interface. Os scripts `dev/build/start` usam Next.js. Arquivos históricos de Vite/Worker e exemplos foram preservados após a revisão automática bloquear a remoção ampla; não participam do runtime ativo.

Dados de produto e cases ficam em `lib/content.ts`. Cases exigem conteúdo real e aprovação. Analytics usa eventos locais `nv:analytics` e nenhuma credencial ou ID fictício. Headers de resposta incluem nosniff, política de referência, restrição de iframe e permissions policy.

Contato: validação Zod no navegador, mensagem formatada e link para +55 (11) 95884-6541. E-mail opcional. Endpoint, webhook, honeypot e rate limiter do contato removidos. O envio é confirmado no WhatsApp pelo visitante.

## Performance

- SVG/CSS em vez de raster pesado ou WebGL sem função.
- Duas fontes variáveis latin, locais, com font-display swap.
- GSAP e ScrollTrigger em chunks separados; animações usam transform/opacity.
- Fronteiras client restritas à interação; páginas institucionais pré-renderizadas.
- Tailwind limitado aos componentes ativos, conforme [documentação oficial](https://tailwindcss.com/docs/detecting-classes-in-source-files).
- CSS caiu de 159.504 para cerca de 65.718 bytes: redução de **58,8%**. Gzip final: cerca de **13,3 KB**.
- GSAP: 70,6 KB bruto / 27,3 KB gzip; ScrollTrigger: 43,4 KB / 17,5 KB gzip. São chunks sob demanda, não tamanhos totais de página.

Tamanhos reproduzíveis em `qa/automated.json`. Não foi produzida pontuação Lighthouse nem medição de Core Web Vitals em dispositivos físicos ou rede móvel; não há métricas de campo inventadas.

## QA

Navegador in-app Chromium, build compilado local. Evidências em `docs/qa`.

| Resolução | Cobertura                                                  |
| --------- | ---------------------------------------------------------- |
| 1920×1080 | Home, composição ampla e resize.                           |
| 1440×900  | Nove rotas, screenshots, conteúdo, formulário e navegação. |
| 1366×768  | Home e primeira viewport de notebook.                      |
| 768×1024  | Nove rotas, composição tablet e formulário.                |
| 390×844   | Nove rotas, menu, touch targets e composições mobile.      |

Nenhum overflow horizontal nas amostras. Todas as rotas têm um h1 e metadata própria. HTTP 200 nas nove rotas e endpoints SEO; 404 em rota inexistente. Build e TypeScript passaram; lint final terminou sem erros.

Interações verificadas: tabs por teclado, foco contido e retorno de foco no menu, Escape, sete intenções e seleção de produto, validação vazia com foco no primeiro campo inválido, composição do link com acentos e quebras de linha, navegação rápida, deep link, reload interno, back/forward, resize, scroll das conexões e ramo reduced motion. O ramo de redução foi exercitado por override exclusivo de desenvolvimento, sem alterar preferências do sistema.

Contato por WhatsApp: **13 assertions** de validação, número, codificação e formatação; botão global nas nove rotas e endpoint removido com resposta 404. Nenhum teste transmitiu mensagens a terceiros. Evidências da revisão em `qa/whatsapp-contact-1440.jpg` e `qa/whatsapp-contact-390.jpg`.

Contraste calculado: texto principal 17,67:1; secundário 8,69:1; botão 12,14:1; erro 11,42:1; borda de input 4,34:1. Esta é uma revisão básica; não equivale a certificação de acessibilidade com leitores de tela/dispositivos físicos.

### Problemas encontrados e corrigidos

1. Importação inicial de fonte incompatível com o pacote: fontes locais WOFF2 referenciadas corretamente.
2. Animação no layout global interferia na hidratação: movida para o main de cada página.
3. Transforms SVG deslocavam o monograma: camadas SVG reveladas por opacity; transforms aplicados aos elementos apropriados.
4. Quebra de título Hub: hierarquia e quebras revistas no desktop/mobile.
5. Borda de campos com contraste insuficiente: token ajustado.
6. Roteador Vinext de produção quebrado: runtime Next.js validado.
7. Restauração de scroll em forward: registro por entrada e limpeza da memória do ScrollTrigger. Cenário final: Med 0 → Home 2405 → Med 0 → reload 0.
8. Host normalizado no adaptador Node bloqueava contato local: verificação pelo host da requisição e teste de regressão.
9. CSS de exemplos não usados: geração limitada às fontes ativas.

Não foram observados erros JavaScript novos no console durante a rodada final. A revisão de WhatsApp valida erros de preenchimento e foco no primeiro campo inválido. Contagens globais de ScrollTrigger no ciclo Home → Med → Home → Med: 2 → 0 → 2 → 0; sem triggers órfãos no cenário exercitado.

## Pendências reais antes de publicação

1. Definir origem pública, recompilar e autorizar o deploy; sitemap e canonical serão gerados a partir dela.
2. Conectar analytics apenas se houver um provedor escolhido. A arquitetura já está preparada.

A limpeza dos arquivos históricos do starter foi bloqueada pela revisão automática por considerar ampla a exclusão de infraestrutura, banco, exemplos e scripts. Todos foram preservados. Essa limpeza é opcional e não bloqueia execução ou build.

## Conteúdo necessário

1. **NV Hub:** público, problema, funcionalidades aprovadas, situação de disponibilidade, acesso/demo e screenshots reais.
2. **NV Med e NV Lex:** escopo, funcionalidades, público específico, disponibilidade e screenshots/documentação reais.
3. **Cases:** cliente com autorização, desafio, solução, tecnologia e resultados verificáveis.
4. **Institucional, se houver:** história factual, equipe, contatos oficiais, links sociais e dados que possam ser publicados.

As páginas já usam conteúdo institucional neutro e campos pendentes explícitos no data layer. Não foram criadas funcionalidades, métricas, certificações, clientes ou depoimentos fictícios.

## Checklist final

- [x] Home completa
- [x] NV Solutions completa
- [x] Products completa
- [x] NV Hub completa com conteúdo institucional disponível
- [x] NV Med completa com conteúdo institucional disponível
- [x] NV Lex completa com conteúdo institucional disponível
- [x] About completa
- [x] Projects/Cases com estrutura pronta e informações confirmadas
- [x] Contact completa com mensagem formatada para WhatsApp
- [x] Brand system e logos/submarcas criados
- [x] SVGs organizados e kit exportado
- [x] Header responsivo, menu mobile e footer
- [x] GSAP, ScrollTrigger e page transitions
- [x] Deep links e browser back/forward
- [x] Responsividade e mobile revisados individualmente
- [x] Reduced motion e acessibilidade básica
- [x] SEO técnico e metadata por rota
- [x] Sitemap/robots conforme configuração de origem
- [x] Assets otimizados
- [x] Build e TypeScript sem erros
- [x] Lint sem erros
- [x] Sem erros JavaScript no console na rodada final
- [x] Sem ScrollTriggers órfãos no ciclo testado
- [x] Sem overflow horizontal nas resoluções testadas
- [x] QA visual realizado e performance revisada
- [x] Nenhum cliente, métrica ou feature inventado
- [x] Nenhum deploy realizado sem autorização
