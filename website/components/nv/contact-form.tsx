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
import { Checkbox } from "@/components/ui/checkbox";
import { intentions, contactSchema } from "@/lib/contact";
import { track } from "@/lib/analytics";
type Status = "idle" | "sending" | "success" | "error";
export function ContactForm({
  initialIntent = "software",
  initialProduct = "",
}: {
  initialIntent?: string;
  initialProduct?: string;
}) {
  const [intent, setIntent] = useState(initialIntent);
  const [product, setProduct] = useState(initialProduct);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const [canExport, setCanExport] = useState(false);
  const startedAt = useRef(0);
  const started = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const contextLabel =
    intent === "integrations"
      ? "Quais sistemas precisam se conectar?"
      : intent === "crm-erp"
        ? "Qual processo você precisa organizar?"
        : intent === "web"
          ? "Já existe um site? Informe o endereço, se houver."
          : "Qual é o contexto do projeto?";
  function start() {
    if (!started.current) {
      started.current = true;
      startedAt.current = Date.now();
      track("contact_start", { intent });
    }
  }
  function brief() {
    if (!form.current) return "";
    const data = new FormData(form.current);
    return `Briefing NV Core\n\nInteresse: ${intentions.find((i) => i.id === intent)?.label}\nProduto: ${product || "—"}\nNome: ${data.get("name")}\nE-mail: ${data.get("email")}\nEmpresa: ${data.get("company") || "—"}\nContexto: ${data.get("context") || "—"}\n\n${data.get("message")}`;
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([brief()], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "briefing-nv-core.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    start();
    const data = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      intent,
      product,
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      context: data.get("context") ?? "",
      message: data.get("message"),
      website: data.get("website") ?? "",
      consent,
      startedAt: startedAt.current,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        next[String(i.path[0])] = i.message;
      });
      setErrors(next);
      setFeedback("Revise os campos indicados para continuar.");
      setStatus("error");
      setCanExport(false);
      const first = parsed.error.issues[0]?.path[0];
      requestAnimationFrame(() =>
        document.getElementById(`contact-${first}`)?.focus(),
      );
      return;
    }
    setErrors({});
    setStatus("sending");
    setFeedback("");
    setCanExport(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(12000),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setStatus("error");
        setFeedback(
          result.message ?? "Não foi possível enviar. Tente novamente.",
        );
        setCanExport(true);
        return;
      }
      setStatus("success");
      setFeedback(
        "Sua mensagem foi recebida. A NV responderá pelo e-mail informado.",
      );
      track("contact_submit", { intent, result: "success" });
    } catch {
      setStatus("error");
      setFeedback(
        "A conexão foi interrompida. Sua mensagem continua no formulário. Tente novamente ou salve o briefing.",
      );
      setCanExport(true);
    }
  }
  if (status === "success")
    return (
      <div className="contact-success" role="status">
        <span className="success-mark" aria-hidden="true">
          ✓
        </span>
        <h2>A conversa começou.</h2>
        <p>{feedback}</p>
        <button
          className="button"
          onClick={() => {
            setStatus("idle");
            setFeedback("");
            setConsent(false);
            started.current = false;
          }}
        >
          Iniciar outra conversa
        </button>
      </div>
    );
  function error(name: string) {
    return errors[name] ? (
      <p className="field-error" id={`error-${name}`}>
        {errors[name]}
      </p>
    ) : null;
  }
  return (
    <form
      ref={form}
      className="contact-form"
      onSubmit={submit}
      onFocus={start}
      noValidate
      aria-busy={status === "sending"}
    >
      <fieldset disabled={status === "sending"} className="intent-fieldset">
        <legend>
          <span>01</span>O que você quer construir?
        </legend>
        <RadioGroup
          value={intent}
          onValueChange={(v) => {
            setIntent(v);
            setStatus("idle");
            setFeedback("");
            setErrors({});
          }}
          aria-label="O que você quer construir"
          className="intent-options"
        >
          {intentions.map((i) => (
            <label key={i.id} className={intent === i.id ? "selected" : ""}>
              <RadioGroupItem value={i.id} id={`intent-${i.id}`} />
              <span>{i.label}</span>
            </label>
          ))}
        </RadioGroup>
      </fieldset>
      <fieldset disabled={status === "sending"} className="details-fieldset">
        <legend>
          <span>02</span>Vamos conhecer o seu contexto.
        </legend>
        <div className="form-grid">
          <div>
            <label htmlFor="contact-name">Seu nome</label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "error-name" : undefined}
            />
            {error("name")}
          </div>
          <div>
            <label htmlFor="contact-email">E-mail</label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
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
              autoComplete="organization"
              maxLength={160}
            />
          </div>
          {intent === "product" ? (
            <div className="form-full">
              <label htmlFor="contact-product">Qual produto?</label>
              <Select value={product} onValueChange={setProduct}>
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
                  {["hub", "med", "lex"].map((p) => (
                    <SelectItem key={p} value={p}>
                      NV {p[0].toUpperCase() + p.slice(1)}
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
              <Input id="contact-context" name="context" maxLength={500} />
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
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <label className="consent-label">
          <Checkbox
            id="contact-consent"
            checked={consent}
            onCheckedChange={(v) => setConsent(v === true)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "error-consent" : "privacy-note"}
          />
          <span>
            Autorizo o uso dos dados informados para responder a esta conversa.
          </span>
        </label>
        {error("consent")}
        <details className="privacy-note" id="privacy-note">
          <summary>Como os dados são usados</summary>
          <p>
            Nome, e-mail, empresa e mensagem são utilizados para responder ao
            seu contato. O formulário não salva os dados neste navegador. Você
            pode solicitar a exclusão na própria conversa.
          </p>
        </details>
        <div className="form-actions">
          <button
            className="button primary"
            disabled={status === "sending"}
            type="submit"
          >
            {status === "sending" ? "Enviando mensagem…" : "Enviar mensagem"}
          </button>
          <span>A conversa começa pelo seu contexto.</span>
        </div>
      </fieldset>
      <div
        className="form-feedback"
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {feedback && <p>{feedback}</p>}
        {canExport && (
          <button className="text-link" type="button" onClick={download}>
            Salvar meu briefing
          </button>
        )}
      </div>
      <noscript>Ative o JavaScript para validar e enviar a mensagem.</noscript>
    </form>
  );
}
