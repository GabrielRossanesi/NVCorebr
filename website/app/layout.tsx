import type { Metadata } from "next";
import { SiteHeader } from "@/components/nv/site-header";
import { SiteFooter } from "@/components/nv/site-footer";
import { ScrollHistory } from "@/components/nv/scroll-history";
import { pageMetadata, siteOrigin } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  ...pageMetadata(
    "NV Core",
    "Produtos próprios e engenharia sob medida. Conheça NV Hub, NV Med, NV Lex e a NV Solutions.",
    "/",
  ),
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/brand/core/app-icon.svg",
  },
  robots: siteOrigin
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NV Core",
    description:
      "Empresa de tecnologia que desenvolve produtos próprios e soluções digitais.",
    ...(siteOrigin
      ? { url: siteOrigin, logo: `${siteOrigin}/brand/core/lockup-light.svg` }
      : {}),
  };
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <ScrollHistory />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
