# Discovery e decisões

A pasta estava vazia em 07/10/2026. Não existiam stack, Git, funcionalidades, screenshots, SEO, documentação de produto ou assets para preservar. O briefing é a única fonte factual.

## Skills aplicadas
- Sites building: setup portable e estrutura Vinext / React / TypeScript; trabalho local.
- [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md): leitura integral, composição característica do núcleo, tipografia deliberada, layouts distintos, movimento concentrado, sem dashboards fictícios.
- [GSAP oficiais](https://github.com/greensock/gsap-skills): core, timeline, scrolltrigger, react, performance. Não estavam instaladas; fontes oficiais consultadas integralmente. Transform/opacity, matchMedia, escopo, cleanup e reduced motion.
- Morales UI premium: hierarquia, estados e tokens; marca Morales não aplicada.
- Accessibility review: semântica, contraste, teclado, foco e formulários.
- React best practices: efeitos limpos, estado localizado, tipagem e componentes.

## Tese visual
NV como ponto de conexão. Monograma interligado em camadas de engenharia. Navy #080e18, superfície #101c2c, texto #f1f5fb, azul #6ba7ff. Hub: conexão azul; Med: continuidade teal #65dac5; Lex: camadas champagne #dbb989; Solutions: estrutura prata #afbcce. Manrope para leitura, Space Grotesk para expressão; fontes variáveis locais em latin.

Home assimétrica → manifesto → diagrama navegável → exploração cromática → engenharia → projetos próprios → fechamento. Layouts próprios: Hub matriz, Med continuidade, Lex composição editorial.

Não publicar funcionalidades, clientes, resultados, depoimentos ou canais não confirmados. Dados incompletos têm contentStatus explícito. Cases só aparecem com approved=true.


## Correção fundamentada de runtime
O build Vinext beta falhou na navegação interna (prefetch e clique) apesar de SSR direto funcionar. A aplicação foi mantida em App Router e ativou Next.js 16.3.4 já instalado. A navegação do build Next foi verificada no navegador. Arquivos históricos do starter foram preservados após a revisão automática bloquear a remoção ampla; scripts ativos usam apenas Next.js.
