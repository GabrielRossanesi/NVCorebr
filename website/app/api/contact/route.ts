import { contactSchema } from "@/lib/contact";
import { allowContact } from "@/lib/contact-rate-limit";
const MAX_BODY = 16000;
function response(message: string, status: number) {
  return Response.json(
    { message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") ?? new URL(request.url).host;
  let sameOrigin = !origin;
  if (origin) {
    try {
      const source = new URL(origin);
      // Node adapters can normalize request.url to localhost.
      sameOrigin =
        ["http:", "https:"].includes(source.protocol) && source.host === host;
    } catch {
      sameOrigin = false;
    }
  }
  if (request.headers.get("sec-fetch-site") === "cross-site" || !sameOrigin)
    return response("Não foi possível validar a origem do contato.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return response("Formato de contato inválido.", 415);
  if (!allowContact(request))
    return Response.json(
      {
        message:
          "Muitas tentativas. Aguarde um minuto antes de tentar novamente.",
      },
      {
        status: 429,
        headers: { "Retry-After": "60", "Cache-Control": "no-store" },
      },
    );
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY)
    return response("A mensagem excede o tamanho permitido.", 413);
  let raw: string;
  try {
    const reader = request.body?.getReader();
    if (!reader) return response("Mensagem vazia.", 400);
    const decoder = new TextDecoder();
    let bytes = 0;
    raw = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY) {
        await reader.cancel();
        return response("A mensagem excede o tamanho permitido.", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return response("Não foi possível ler a mensagem.", 400);
  }
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return response("Formato de contato inválido.", 400);
  }
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success)
    return response("Revise os campos do formulário e tente novamente.", 422);
  const data = parsed.data;
  const age = Date.now() - data.startedAt;
  if (age < 2000 || age > 86400000)
    return response("Aguarde alguns segundos e tente enviar novamente.", 422);
  const destination = process.env.CONTACT_WEBHOOK_URL;
  if (!destination)
    return response(
      "O envio está temporariamente indisponível. Sua mensagem foi preservada: salve o briefing e tente novamente mais tarde.",
      503,
    );
  let url: URL;
  try {
    url = new URL(destination);
    if (url.protocol !== "https:") throw new Error("Invalid destination");
  } catch {
    return response("O envio está temporariamente indisponível.", 503);
  }
  const { website: honeypot, startedAt: timestamp, ...payload } = data;
  void honeypot;
  void timestamp;
  try {
    const result = await fetch(url, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...payload,
        source: "nv-core-website",
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!result.ok)
      return response(
        "Não foi possível entregar a mensagem. Tente novamente ou salve o briefing.",
        502,
      );
    return response("Mensagem recebida.", 200);
  } catch {
    return response(
      "Não foi possível entregar a mensagem. Tente novamente ou salve o briefing.",
      502,
    );
  }
}
