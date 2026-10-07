import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { resolve } from "node:path";

// Local production transfer inventory; not a Lighthouse or field-vitals score.
const origin = process.env.QA_ORIGIN ?? "http://127.0.0.1:5175";
const report = [];
for (const route of ["/", "/solutions", "/products", "/products/hub", "/products/med", "/products/lex", "/about", "/projects", "/contact"]) {
  const response = await fetch(new URL(route, origin));
  if (!response.ok) throw new Error(`${route}: ${response.status}`);
  const html = await response.text();
  const paths = [...new Set([...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+\.(?:js|css))"/g)].map(match => match[1]))];
  const files = paths.map(path => {
    const buffer = readFileSync(resolve(".next/static", path.split("/_next/static/")[1]));
    return { path, bytes: buffer.length, gzip: gzipSync(buffer).length };
  });
  report.push({ route, htmlBytes: Buffer.byteLength(html), htmlGzip: gzipSync(html).length, scriptCount: files.filter(f => f.path.endsWith(".js")).length, scriptGzip: files.filter(f => f.path.endsWith(".js")).reduce((sum, f) => sum + f.gzip, 0), styles: files.filter(f => f.path.endsWith(".css")) });
}
writeFileSync("docs/qa/v2-transfer.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
