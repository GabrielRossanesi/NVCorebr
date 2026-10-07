# Sistema de marca NV

## Arquitetura

NV Core é a empresa. NV Products agrupa produtos próprios. NV Solutions identifica a divisão de engenharia para clientes. Novas marcas NV recebem um nome, uma cor e um sinal geométrico; não uma identidade completamente separada.

| Marca | Cor | Símbolo | Linguagem |
|---|---|---|---|
| Core | #6ba7ff | Monograma NV interligado | Núcleo e convergência |
| Solutions | #afbcce | Chevrons de construção | Camadas de arquitetura |
| Hub | #86aaff | Nós conectados | Matriz e conexão |
| Med | #65dac5 | Continuidade dupla | Fluxo e contexto |
| Lex | #dbb989 | Planos paralelos | Precisão e estrutura |

Base comum navy #080e18, superfície #101c2c e texto #f1f5fb. Med evita a cruz hospitalar; Lex evita símbolos de advocacia tradicional. Os sinais compartilham construção geométrica e proporções.

Manrope variável: leitura. Space Grotesk variável: títulos e marcas. Duas fontes, um único subset latin; arquivos servidos pelo próprio website.

## Uso dos arquivos

Cada pasta em public/brand possui 8 SVGs:

- symbol e reduced: símbolo sem wordmark.
- wordmark-light: letras claras para fundo escuro.
- wordmark-dark: letras escuras para fundo claro.
- lockup-light e lockup-dark: símbolo e wordmark horizontal.
- favicon e app-icon: versão quadrada.

Todos os wordmarks exportados estão convertidos em curvas, sem dependência de fonte instalada. A nomenclatura light/dark descreve a cor das letras, não o fundo. Preserve proporções e área livre equivalente à altura da letra n ao redor da marca. Não distorça, adicione sombra ou aplique gradiente aos lockups.

## Escala e expansão

Sinal reduzido: usar a partir de 24 px; favicon simplificado é adequado a 16/32 px. Lockup: mínimo recomendado 100 px de largura. No código, Brand centraliza os sinais; lib/content.ts centraliza produtos.

Para adicionar NV Pay, NV Sign ou outro produto confirmado:

1. Adicionar o identificador em BrandName e ProductId.
2. Definir sinal próprio derivado das geometrias e cor com contraste suficiente.
3. Adicionar conteúdo confirmado no data layer e uma rota dedicada.
4. Adicionar a rota no sitemap e gerar novamente os SVGs.

scripts/generate-brand.py gera os assets a partir dos sinais do componente e da fonte licenciada. Requer fonttools e brotli na pasta local .tooling/python. A licença OFL é incluída no kit.

## Movimento

Fast 160 ms, standard 320 ms, slow 700 ms, cinematic 1100 ms. Easing CSS cubic-bezier(.22,1,.36,1), GSAP power3.out; wipe power3.inOut. As conexões acompanham o scroll; a formação do símbolo ocorre uma vez. O scroll permanece nativo. Não há pinning obrigatório, cursor substituto ou bloqueio de leitura.
