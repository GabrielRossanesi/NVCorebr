"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Brand } from "./brand";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
const links = [
  ["/products", "Produtos"],
  ["/solutions", "Soluções"],
  ["/projects", "Projetos"],
  ["/about", "A empresa"],
];
export function SiteHeader() {
  const path = usePathname();
  const menuNavigated = useRef(false);
  return (
    <header
      className={`site-header wrap theme-${path.startsWith("/products/") ? path.split("/").pop() : path === "/solutions" ? "solutions" : "core"}`}
    >
      <Link href="/" aria-label="NV Core, início">
        <Brand />
      </Link>
      <nav aria-label="Navegação principal">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              path === href || path.startsWith(href + "/") ? "page" : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <Link
        className="header-contact"
        href="/contact"
        aria-current={path === "/contact" ? "page" : undefined}
      >
        Vamos conversar
        <span className="contact-square" />
      </Link>
      <div className="mobile-menu">
        <Sheet>
          <SheetTrigger
            className="menu-trigger"
            aria-label="Abrir menu"
            onClick={() => {
              menuNavigated.current = false;
            }}
          >
            <span />
            <span />
          </SheetTrigger>
          <SheetContent
            className="nv-menu"
            showCloseButton={false}
            aria-modal="true"
            onCloseAutoFocus={(event) => {
              if (menuNavigated.current) {
                event.preventDefault();
                document
                  .querySelector<HTMLElement>("main")
                  ?.focus({ preventScroll: true });
              }
            }}
          >
            <div className="menu-heading">
              <Brand />
              <SheetClose className="menu-close" aria-label="Fechar menu">
                Fechar <span aria-hidden="true">×</span>
              </SheetClose>
            </div>
            <SheetTitle className="sr-only">Menu NV Core</SheetTitle>
            <SheetDescription className="sr-only">
              Explore produtos, soluções e a empresa.
            </SheetDescription>
            <nav aria-label="Navegação mobile">
              {[...links, ["/contact", "Contato"]].map(([href, label]) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    onClick={() => {
                      menuNavigated.current = true;
                    }}
                    aria-current={path === href ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="menu-products">
              <p>Dentro do núcleo</p>
              {["hub", "med", "lex"].map((id) => (
                <SheetClose asChild key={id}>
                  <Link
                    href={`/products/${id}`}
                    onClick={() => {
                      menuNavigated.current = true;
                    }}
                  >
                    NV {id[0].toUpperCase() + id.slice(1)}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <p className="menu-signature">
              Produtos próprios.
              <br />
              Engenharia sob medida.
            </p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
