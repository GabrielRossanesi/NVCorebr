# NV Core

Website institucional em **Next.js 16.3.4, React 19 e TypeScript**, com App Router, GSAP/ScrollTrigger, Radix e SVGs próprios. Repositório: https://github.com/GabrielRossanesi/NVCorebr. A V1 publicada tem integração Vercel com main; esta rodada V2 permanece local, sem push ou deploy.

## Executar

Node >= 22.13.0:

```powershell
cd "E:\0. Projetos\NV Core\website"
npm install
npm run dev
```

Desenvolvimento: http://127.0.0.1:5173. Produção local:

```powershell
npm run build
npm start
```

Prévia compilada: http://127.0.0.1:5175. Se o npm do PATH falhar neste computador, use `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js"` seguido do comando npm desejado.

## Verificar

```powershell
npm run typecheck
npm run lint
npm run build
$env:QA_ORIGIN = "http://127.0.0.1:5175"
npm run verify
```

`verify.mjs` requer uma prévia em execução e build em `.next`. Os testes de contato verificam a validação e a mensagem formatada para WhatsApp, sem transmitir mensagens a terceiros. `npm run format` formata o código da aplicação.

## Rotas e estrutura

`/` · `/solutions` · `/products` · `/products/hub` · `/products/med` · `/products/lex` · `/projects` · `/about` · `/contact`.

Também existem `/robots.txt`, `/sitemap.xml` e 404. Páginas institucionais são pré-renderizadas; contato usa SSR para ler a intenção na URL. `next/link` mantém URL, histórico, prefetch e navegação sem recarregar o documento.

- `app`: rotas, metadata e layouts.
- `components/nv`: identidade, navegação, diagrama, produtos, contato e movimento.
- `components/ui`: primitives acessíveis do starter.
- `lib/content.ts`: produtos, capacidades e estrutura tipada de cases.
- `public/brand`: 40 SVGs com letras em curvas, regras, licença e preview.
- `public/downloads/nv-brand-kit.zip`: pacote de marcas.
- `docs`: discovery, marca, relatório e evidências de QA.

## Por que Next.js

O starter inicial de Sites usava Vinext beta. O QA do build revelou erros de prefetch e clique no roteador de produção, além de restauração inadequada de rolagem. Foi necessário ativar o Next.js já instalado. O código App Router, design e componentes foram preservados. Os antigos arquivos Vite/Worker, exemplos e dependências do starter permanecem como material histórico, sem participar dos scripts ativos; a revisão automática bloqueou sua remoção ampla. Eles não são necessários para executar, compilar ou publicar esta aplicação Next.js.

## Configuração antes da publicação

Copie `.env.example` para `.env.local` no desenvolvimento. No host, configure:

- `NEXT_PUBLIC_SITE_URL`: origem pública verificada; recompilar após definir. Sem ela: noindex, nenhum canonical fictício, sitemap vazio e robots bloqueia indexação.

## Contato por WhatsApp

O formulário valida os campos no navegador e abre uma nova aba com a mensagem preenchida para **+55 (11) 95884-6541**. O visitante revisa e confirma o envio no WhatsApp. Nome e mensagem são obrigatórios; e-mail, empresa e contexto são opcionais. Interesse e produto selecionado compõem o texto.

O botão flutuante aparece em todas as páginas e abre uma conversa com uma saudação. Número, URL e formatação ficam centralizados em `lib/whatsapp.ts`. Não há endpoint de contato, webhook ou serviço de entrega para configurar. Os campos não são persistidos no navegador e os eventos de analytics não incluem o conteúdo do formulário.

## Conteúdo e analytics

Hub e Med têm `contentStatus: verified-code`, com funções verificadas por pesquisa somente leitura nos repositórios reais. Lex mantém `awaiting-product-details`: o repositório encontrado está vazio. As interfaces reconstruídas usam dados demonstrativos fictícios, identificados na composição. Cases aparecem somente com conteúdo real e `approved: true`. Não são inventados clientes, resultados ou depoimentos.

Pesquisa e proveniência: [Product Research](docs/PRODUCT-RESEARCH.md). Entrega e QA da V2: [V2 Delivery](docs/V2-DELIVERY.md).

`lib/analytics.ts` emite eventos locais `nv:analytics`, sem SDK, cookies ou IDs fictícios. Conectar um provedor aprovado nessa camada. Nunca incluir dados do formulário nos eventos.

## Movimento

GSAP e ScrollTrigger são importados após hidratação, com escopo por `main` e `matchMedia`. Cleanup reverte timelines, triggers e listeners ao mudar de rota. Next.js controla a navegação; ScrollHistory registra posições por entrada, e a memória de scroll do GSAP é limpa entre rotas. Conteúdo permanece legível sem animação; reduced motion desativa os triggers. Em desenvolvimento, `?qa-motion=reduce` exercita o mesmo ramo sem alterar preferências do sistema; esse override não funciona em produção.
