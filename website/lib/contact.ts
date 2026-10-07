import { z } from "zod";
export const intentions = [
  { id: "software", label: "Desenvolver um sistema" },
  { id: "crm-erp", label: "Criar um CRM / ERP" },
  { id: "web", label: "Desenvolver um site" },
  { id: "integrations", label: "Integrar sistemas" },
  { id: "idea", label: "Construir uma ideia de produto" },
  { id: "product", label: "Conhecer um produto NV" },
  { id: "other", label: "Outro assunto" },
] as const;
export const contactSchema = z
  .object({
    intent: z.enum([
      "software",
      "crm-erp",
      "web",
      "integrations",
      "idea",
      "product",
      "other",
    ]),
    name: z.string().trim().min(2, "Informe seu nome.").max(120),
    email: z.string().trim().email("Informe um e-mail válido.").max(254),
    company: z.string().trim().max(160).optional().default(""),
    product: z.enum(["hub", "med", "lex", ""]).optional().default(""),
    context: z.string().trim().max(500).optional().default(""),
    message: z
      .string()
      .trim()
      .min(20, "Conte um pouco mais: use pelo menos 20 caracteres.")
      .max(4000, "Use até 4.000 caracteres."),
    consent: z.literal(true, {
      errorMap: () => ({
        message: "Autorize o uso dos dados para responder à conversa.",
      }),
    }),
    website: z.string().max(0, "Não foi possível validar o formulário."),
    startedAt: z.number().finite().positive(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.intent === "product" && !data.product)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["product"],
        message: "Escolha o produto que deseja conhecer.",
      });
  });
export type ContactPayload = z.infer<typeof contactSchema>;
