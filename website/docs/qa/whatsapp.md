# Revisão do contato por WhatsApp

07/10/2026 · Build de produção local em `http://127.0.0.1:5175`.

- Build, TypeScript e lint passaram.
- 13 verificações de validação e composição: e-mail opcional, produto obrigatório para a intenção correspondente, ausência de campos vazios ou de outra intenção, número correto, acentos, símbolos e quebras de linha.
- As nove rotas retornam 200 e incluem o botão global para `5511958846541`. O antigo POST `/api/contact` retorna 404.
- Desktop 1440×900: botão fixo com 58×58 px; mobile 390×844: 54×54 px. Sem overflow horizontal.
- Produto NV Med pré-selecionado pela URL aparece na mensagem. Campos inválidos impedem a abertura e recebem feedback; o primeiro recebe foco.
- Mensagem inspecionada no link do navegador com nome fictício de QA e sem e-mail. Não foi enviada uma mensagem ao destinatário.
- Menu mobile fica acima do botão e fecha com Escape. Nenhum erro ou aviso novo no console.

Evidências: `whatsapp-contact-1440.jpg`, `whatsapp-contact-390.jpg` e `automated.json`.
