import assert from "node:assert/strict";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";
import ts from "typescript";

const temp = resolve(".tooling/verify");
mkdirSync(temp, { recursive: true });
function compile(source, destination, replacements = []) {
  let input = readFileSync(source, "utf8");
  for (const [from, to] of replacements) input = input.replaceAll(from, to);
  writeFileSync(
    resolve(temp, destination),
    ts.transpileModule(input, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
  );
}
compile("lib/contact.ts", "contact.mjs");
compile("lib/contact-rate-limit.ts", "contact-rate-limit.mjs");
compile("app/api/contact/route.ts", "route.mjs", [
  ["@/lib/contact-rate-limit", "./contact-rate-limit.mjs"],
  ["@/lib/contact", "./contact.mjs"],
]);
compile("lib/site.ts", "site.mjs");
compile("app/sitemap.ts", "sitemap.mjs", [["@/lib/site", "./site.mjs"]]);
compile("app/robots.ts", "robots.mjs", [["@/lib/site", "./site.mjs"]]);
const { POST } = await import(pathToFileURL(resolve(temp, "route.mjs")).href);
const base = {
  intent: "software",
  name: "Teste QA",
  email: "qa@example.test",
  company: "",
  product: "",
  context: "",
  message: "Mensagem de teste para validar o formulário.",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
};
function request(data = base, headers = {}) {
  return new Request("https://nv.example.test/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://nv.example.test",
      ...headers,
    },
    body: JSON.stringify(data),
  });
}
const savedUrl = process.env.CONTACT_WEBHOOK_URL,
  savedToken = process.env.CONTACT_WEBHOOK_TOKEN,
  realFetch = globalThis.fetch;
try {
  delete process.env.CONTACT_WEBHOOK_URL;
  assert.equal(
    (
      await POST(
        request(base, {
          Host: "127.0.0.1:5175",
          Origin: "http://127.0.0.1:5175",
        }),
      )
    ).status,
    503,
    "Validate host from Node adapter",
  );
  assert.equal(
    (await POST(request())).status,
    503,
    "Unconfigured contact cannot claim success",
  );
  assert.equal(
    (await POST(request({ ...base, email: "invalid" }))).status,
    422,
  );
  assert.equal((await POST(request({ ...base, consent: false }))).status, 422);
  assert.equal((await POST(request({ ...base, website: "spam" }))).status, 422);
  assert.equal(
    (await POST(request({ ...base, startedAt: Date.now() }))).status,
    422,
  );
  assert.equal(
    (await POST(request({ ...base, intent: "product", product: "" }))).status,
    422,
  );
  assert.equal(
    (await POST(request(base, { Origin: "https://other.example.test" })))
      .status,
    403,
  );
  assert.equal(
    (await POST(request(base, { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await POST(request({ ...base, message: "x".repeat(17000) }))).status,
    413,
  );
  process.env.CONTACT_WEBHOOK_URL = "https://contact.example.test/receive";
  process.env.CONTACT_WEBHOOK_TOKEN = "test-token";
  let forwarded;
  globalThis.fetch = async (url, init) => {
    forwarded = {
      url: String(url),
      payload: JSON.parse(init.body),
      headers: init.headers,
    };
    return new Response("ok");
  };
  assert.equal((await POST(request())).status, 200);
  assert.equal(forwarded.payload.email, base.email);
  assert.equal(forwarded.payload.website, undefined);
  assert.equal(forwarded.payload.startedAt, undefined);
  assert.equal(forwarded.headers.Authorization, "Bearer test-token");
  globalThis.fetch = async () => new Response("failure", { status: 500 });
  assert.equal((await POST(request())).status, 502);
  globalThis.fetch = async () => {
    throw new Error("network");
  };
  assert.equal((await POST(request())).status, 502);
  process.env.CONTACT_WEBHOOK_URL = "http://contact.example.test";
  assert.equal((await POST(request())).status, 503);
  for (let i = 0; i < 5; i++)
    assert.equal(
      (await POST(request(base, { "cf-connecting-ip": "192.0.2.1" }))).status,
      503,
    );
  assert.equal(
    (await POST(request(base, { "cf-connecting-ip": "192.0.2.1" }))).status,
    429,
  );
} finally {
  globalThis.fetch = realFetch;
  if (savedUrl === undefined) delete process.env.CONTACT_WEBHOOK_URL;
  else process.env.CONTACT_WEBHOOK_URL = savedUrl;
  if (savedToken === undefined) delete process.env.CONTACT_WEBHOOK_TOKEN;
  else process.env.CONTACT_WEBHOOK_TOKEN = savedToken;
}
process.env.NEXT_PUBLIC_SITE_URL = "https://nv.example.test";
const { pageMetadata } = await import(
  pathToFileURL(resolve(temp, "site.mjs")).href
);
assert.equal(
  pageMetadata("Med", "Descrição", "/products/med").alternates.canonical,
  "https://nv.example.test/products/med",
);
assert.equal(
  (await import(pathToFileURL(resolve(temp, "sitemap.mjs")).href)).default()
    .length,
  9,
);
assert.equal(
  (await import(pathToFileURL(resolve(temp, "robots.mjs")).href)).default()
    .sitemap,
  "https://nv.example.test/sitemap.xml",
);

const origin = process.env.QA_ORIGIN ?? "http://127.0.0.1:5173";
const routes = [
  "/",
  "/solutions",
  "/products",
  "/products/hub",
  "/products/med",
  "/products/lex",
  "/projects",
  "/about",
  "/contact",
];
const titles = new Set();
for (const path of routes) {
  const r = await fetch(new URL(path, origin));
  assert.equal(r.status, 200, path);
  const html = await r.text(),
    title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title, path + " title");
  assert.ok(!titles.has(title), "Unique title " + path);
  titles.add(title);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, path + " single h1");
  assert.match(html, /lang="pt-BR"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /name="description"/);
  assert.match(html, /application\/ld\+json/);
}
assert.equal((await fetch(new URL("/robots.txt", origin))).status, 200);
assert.equal((await fetch(new URL("/sitemap.xml", origin))).status, 200);
assert.equal((await fetch(new URL("/unavailable-page", origin))).status, 404);

function luminance(hex) {
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
const contrast = (a, b) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);
const pairs = [
  ["body", "#a1afc3", "#080e18"],
  ["text", "#f1f5fb", "#080e18"],
  ["Med", "#65dac5", "#0c1a1d"],
  ["Lex", "#dbb989", "#080e18"],
  ["button", "#111e32", "#c8ddff"],
  ["error", "#ffb5a5", "#080e18"],
  ["input border", "#6c7d97", "#0c1625"],
];
const ratios = pairs.map(([label, a, b]) => {
  const ratio = contrast(a, b);
  assert.ok(ratio >= (label === "input border" ? 3 : 4.5), label);
  return { label, ratio: Number(ratio.toFixed(2)) };
});
const chunks = resolve(".next/static/chunks");
const sizes = readdirSync(chunks)
  .filter((n) => n.endsWith(".js") || n.endsWith(".css"))
  .map((name) => {
    const file = resolve(chunks, name);
    return {
      name,
      bytes: statSync(file).size,
      gzip: gzipSync(readFileSync(file)).length,
    };
  })
  .sort((a, b) => b.bytes - a.bytes);
const report = {
  date: "2026-10-07",
  routes,
  contactScenarios: 15,
  contactAssertions: 24,
  metadataTests: 3,
  contrast: ratios,
  largestChunks: sizes.slice(0, 8),
};
mkdirSync("docs/qa", { recursive: true });
writeFileSync("docs/qa/automated.json", JSON.stringify(report, null, 2));
console.log(
  "PASS: contact validation/delivery; 9 SSR routes; metadata, robots, sitemap, 404; contrast.",
);
console.log(JSON.stringify(report.largestChunks, null, 2));
