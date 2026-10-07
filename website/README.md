# NV Core

Website institucional em **Next.js 16.3.4, React 19 e TypeScript**, com App Router, GSAP/ScrollTrigger, Radix e SVGs próprios. A pasta original estava vazia. Nenhum deploy, registro remoto, alteração de DNS ou push foi realizado.

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

`verify.mjs` requer uma prévia em execução e build em `.next`. Os testes de contato simulam o destino, sem transmitir dados a terceiros. `npm run format` formata o código da aplicação.

## Rotas e estrutura

`/` · `/solutions` · `/products` · `/products/hub` · `/products/med` · `/products/lex` · `/projects` · `/about` · `/contact`.

Também existem `/api/contact`, `/robots.txt`, `/sitemap.xml` e 404. Páginas institucionais são pré-renderizadas; contato usa SSR para ler a intenção na URL. `next/link` mantém URL, histórico, prefetch e navegação sem recarregar o documento.

- `app`: rotas, metadata, layouts e endpoint.
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
- `CONTACT_WEBHOOK_URL`: endpoint HTTPS que aceita o JSON validado. Sem destino: resposta 503, mensagem preservada e opção de baixar o briefing; sucesso nunca é simulado.
- `CONTACT_WEBHOOK_TOKEN`: token opcional, apenas no servidor.

Payload enviado: intent, name, email, company, product, context, message, consent, source e receivedAt. O endpoint deve retornar 2xx somente após aceitar a entrega. Honeypot e relógio do navegador não são encaminhados. O token fica no header do servidor.

O endpoint verifica campos, consentimento, origem, tamanho via stream, tempo mínimo e honeypot, com timeout de 8 segundos no destino. Quando servido atrás de Cloudflare, usa o IP do proxy para um limite complementar de 5 tentativas/minuto por processo. Antes do lançamento, configurar rate limiting distribuído no gateway e confiar somente em headers fornecidos pelo proxy. O limite em memória não substitui esse controle.

Nenhum dado pessoal fica em localStorage. O briefing baixado permanece no dispositivo. Definir privacidade, retenção e responsável pelo atendimento junto ao serviço escolhido.

## Conteúdo e analytics

Produtos têm `contentStatus: awaiting-product-details`. Cases aparecem somente com conteúdo real e `approved: true`. Não existem clientes, métricas, features, screenshots ou depoimentos inventados.

`lib/analytics.ts` emite eventos locais `nv:analytics`, sem SDK, cookies ou IDs fictícios. Conectar um provedor aprovado nessa camada. Nunca incluir dados do formulário nos eventos.

## Movimento

GSAP e ScrollTrigger são importados após hidratação, com escopo por `main` e `matchMedia`. Cleanup reverte timelines, triggers e listeners ao mudar de rota. Next.js controla a navegação; ScrollHistory registra posições por entrada, e a memória de scroll do GSAP é limpa entre rotas. Conteúdo permanece legível sem animação; reduced motion desativa os triggers. Em desenvolvimento, `?qa-motion=reduce` exercita o mesmo ramo sem alterar preferências do sistema; esse override não funciona em produção.
