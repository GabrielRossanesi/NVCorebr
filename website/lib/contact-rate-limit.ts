// Best-effort per Worker isolate; use a distributed gateway limit before launch.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const MAX_ENTRIES = 512;
const buckets = new Map<string, { count: number; expires: number }>();
export function allowContact(request: Request, now = Date.now()): boolean {
  const ip = request.headers.get("cf-connecting-ip");
  // Cloudflare supplies this header. Other hosts must enforce rate limiting upstream.
  if (!ip || !/^([0-9a-f:.]){3,64}$/i.test(ip)) return true;
  const bucket = buckets.get(ip);
  if (bucket && bucket.expires > now) {
    bucket.count++;
    return bucket.count <= MAX_REQUESTS;
  }
  for (const [key, value] of buckets)
    if (value.expires <= now) buckets.delete(key);
  if (buckets.size >= MAX_ENTRIES) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }
  buckets.set(ip, { count: 1, expires: now + WINDOW_MS });
  return true;
}
