import { intentions, type ContactPayload } from "./contact";

export const whatsappNumber = "5511958846541";
export const whatsappDisplayNumber = "+55 (11) 95884-6541";
export const whatsappDefaultMessage =
  "Olá, NV Core! Gostaria de conversar com vocês.";

export function whatsappUrl(message = whatsappDefaultMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatContactMessage(data: ContactPayload) {
  const lines = [
    "Olá, NV Core! Gostaria de conversar com vocês.",
    "",
    `*Interesse:* ${intentions.find((item) => item.id === data.intent)?.label ?? data.intent}`,
    ...(data.intent === "product" && data.product
      ? [
          `*Produto:* NV ${data.product[0].toUpperCase() + data.product.slice(1)}`,
        ]
      : []),
    `*Nome:* ${data.name.trim()}`,
    ...(data.email?.trim() ? [`*E-mail:* ${data.email.trim()}`] : []),
    ...(data.company?.trim() ? [`*Empresa:* ${data.company.trim()}`] : []),
    ...(data.intent !== "product" && data.context?.trim()
      ? [`*Contexto:* ${data.context.trim()}`]
      : []),
    "",
    "*Mensagem:*",
    data.message.trim(),
  ];
  return lines.join("\n");
}
