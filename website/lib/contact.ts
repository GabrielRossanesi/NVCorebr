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
    email: z
      .string()
      .trim()
      .max(254)
      .refine(
        (value) => !value || z.string().email().safeParse(value).success,
        "Informe um e-mail válido.",
      )
      .optional()
      .default(""),
    company: z.string().trim().max(160).optional().default(""),
    product: z.enum(["hub", "med", "lex", ""]).optional().default(""),
    context: z.string().trim().max(500).optional().default(""),
    message: z
      .string()
      .trim()
      .min(20, "Conte um pouco mais: use pelo menos 20 caracteres.")
      .max(4000, "Use até 4.000 caracteres."),
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
