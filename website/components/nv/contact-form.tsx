"use client";

import { useRef, useState, type FormEvent } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { intentions, contactSchema, type ContactPayload } from "@/lib/contact";
import { formatContactMessage, whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { WhatsappIcon } from "./whatsapp-button";

export function ContactForm({
  initialIntent = "software",
  initialProduct = "",
}: {
  initialIntent?: string;
  initialProduct?: string;
}) {
  const [intent, setIntent] = useState(initialIntent);
  const [product, setProduct] = useState(initialProduct);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    context: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const started = useRef(false);
  const link = useRef<HTMLAnchorElement>(null);
  const contextLabel =
    intent === "integrations"
      ? "Quais sistemas precisam se conectar?"
      : intent === "crm-erp"
        ? "Qual processo você precisa organizar?"
        : intent === "web"
          ? "Já existe um site? Informe o endereço, se houver."
          : "Qual é o contexto do projeto?";
  const messageUrl = whatsappUrl(
    formatContactMessage({
      ...fields,
      intent: intent as ContactPayload["intent"],
      product: product as ContactPayload["product"],
    }),
  );

  function start() {
    if (!started.current) {
      started.current = true;
      track("contact_start", { intent });
    }
  }
  function update(field: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setFeedback("");
  }
  function validate() {
    const parsed = contactSchema.safeParse({ ...fields, intent, product });
    if (parsed.success) {
      setErrors({});
      setFeedback("");
      return true;
    }
    const next: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      next[String(issue.path[0])] = issue.message;
    });
    setErrors(next);
    setFeedback("Revise os campos indicados para continuar.");
    requestAnimationFrame(() =>
      document
        .getElementById(`contact-${parsed.error.issues[0]?.path[0]}`)
        ?.focus(),
    );
    return false;
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    link.current?.click();
  }
  function error(name: string) {
    return errors[name] ? (
      <p className="field-error" id={`error-${name}`}>
        {errors[name]}
      </p>
    ) : null;
  }

  return (
    <form className="contact-form" onSubmit={submit} onFocus={start} noValidate>
      <fieldset className="intent-fieldset">
        <legend>
          <span>01</span>O que você quer construir?
        </legend>
        <RadioGroup
          value={intent}
          onValueChange={(value) => {
            setIntent(value);
            setFeedback("");
            setErrors({});
          }}
          aria-label="O que você quer construir"
          className="intent-options"
        >
          {intentions.map((item) => (
            <label
              key={item.id}
              className={intent === item.id ? "selected" : ""}
            >
              <RadioGroupItem value={item.id} id={`intent-${item.id}`} />
              <span>{item.label}</span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>
      <fieldset className="details-fieldset">
        <legend>
          <span>02</span>Vamos conhecer o seu contexto.
        </legend>
        <div className="form-grid">
          <div>
            <label htmlFor="contact-name">Seu nome</label>
            <Input
              id="contact-name"
              name="name"
              value={fields.name}
              onChange={(event) => update("name", event.target.value)}
              autoComplete="name"
              required
              maxLength={120}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "error-name" : undefined}
            />
            {error("name")}
          </div>
          <div>
            <label htmlFor="contact-email">
              E-mail <span>(opcional)</span>
            </label>
            <Input
              id="contact-email"
              name="email"
              value={fields.email}
              onChange={(event) => update("email", event.target.value)}
              type="email"
              autoComplete="email"
              maxLength={254}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "error-email" : undefined}
            />
            {error("email")}
          </div>
          <div className="form-full">
            <label htmlFor="contact-company">
              Empresa <span>(opcional)</span>
            </label>
            <Input
              id="contact-company"
              name="company"
              value={fields.company}
              onChange={(event) => update("company", event.target.value)}
              autoComplete="organization"
              maxLength={160}
            />
          </div>
          {intent === "product" ? (
            <div className="form-full">
              <label htmlFor="contact-product">Qual produto?</label>
              <Select
                value={product}
                onValueChange={(value) => {
                  setProduct(value);
                  setErrors((current) => ({ ...current, product: "" }));
                }}
              >
                <SelectTrigger
                  id="contact-product"
                  className="nv-select"
                  aria-invalid={!!errors.product}
                  aria-describedby={
                    errors.product ? "error-product" : undefined
                  }
                >
                  <SelectValue placeholder="Escolha um produto" />
                </SelectTrigger>
                <SelectContent>
                  {["hub", "med", "lex"].map((id) => (
                    <SelectItem key={id} value={id}>
                      NV {id[0].toUpperCase() + id.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error("product")}
            </div>
          ) : (
            <div className="form-full">
              <label htmlFor="contact-context">
                {contextLabel} <span>(opcional)</span>
              </label>
              <Input
                id="contact-context"
                name="context"
                value={fields.context}
                onChange={(event) => update("context", event.target.value)}
                maxLength={500}
              />
            </div>
          )}
          <div className="form-full">
            <label htmlFor="contact-message">
              {intent === "product"
                ? "O que você gostaria de conhecer?"
                : "Conte o que precisa mudar."}
            </label>
            <Textarea
              id="contact-message"
              name="message"
              value={fields.message}
              onChange={(event) => update("message", event.target.value)}
              required
              minLength={20}
              maxLength={4000}
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "error-message" : "message-hint"
              }
            />
            <small id="message-hint">
              De 20 a 4.000 caracteres. Não inclua informações confidenciais.
            </small>
            {error("message")}
          </div>
        </div>
        <div className="form-actions">
          <a
            ref={link}
            className="button primary"
            href={messageUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="whatsapp-hint"
            onClick={(event) => {
              if (!validate()) {
                event.preventDefault();
                return;
              }
              track("whatsapp_open", { source: "contact_form", intent });
            }}
          >
            <WhatsappIcon />
            Continuar no WhatsApp
          </a>
          <span>Uma conversa direta com a NV.</span>
        </div>
        <p className="whatsapp-hint" id="whatsapp-hint">
          A mensagem será preenchida no WhatsApp em uma nova aba. Você revisa e
          confirma o envio por lá.
        </p>
      </fieldset>
      <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
      {feedback && (
        <div className="form-feedback" role="alert">
          <p>{feedback}</p>
        </div>
      )}
      <noscript>
        Você também pode conversar pelo botão de WhatsApp no canto da página.
      </noscript>
    </form>
  );
}
