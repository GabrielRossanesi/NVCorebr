import type { Metadata } from "next";
export const siteOrigin = (() => {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const u = new URL(value);
    return /^https?:$/.test(u.protocol) ? u.origin : undefined;
  } catch {
    return undefined;
  }
})();
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = siteOrigin ? new URL(path, siteOrigin).href : undefined;
  return {
    title: title.startsWith("NV Core") ? title : `${title} — NV Core`,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      siteName: "NV Core",
      ...(url ? { url } : {}),
    },
    twitter: { card: "summary", title, description },
  };
}
export const publicRoutes = [
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
