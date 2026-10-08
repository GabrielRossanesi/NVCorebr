"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const navigation = useRef<HTMLElement>(null);
  const indicatorFrame = useRef(0);
  const resetIndicator = () => {
    cancelAnimationFrame(indicatorFrame.current);
    navigation.current?.removeAttribute("data-nav-engaged");
    navigation.current?.removeAttribute("data-nav-entering");
  };
  useEffect(() => {
    const nav = navigation.current;
    const reset = () => {
      cancelAnimationFrame(indicatorFrame.current);
      nav?.removeAttribute("data-nav-engaged");
      nav?.removeAttribute("data-nav-entering");
    };
    reset();
    window.addEventListener("resize", reset);
    return () => {
      reset();
      window.removeEventListener("resize", reset);
    };
  }, [path]);
  const moveIndicator = (link: HTMLAnchorElement) => {
    const nav = navigation.current;
    if (!nav) return;
    // Measure only on entry/focus. No pointermove or per-frame layout reads.
    const bounds = nav.getBoundingClientRect();
    const item = link.getBoundingClientRect();
    const entering = !nav.hasAttribute("data-nav-engaged");
    if (entering) nav.setAttribute("data-nav-entering", "");
    nav.style.setProperty(
      "--nav-center",
      `${item.left - bounds.left + item.width / 2}px`,
    );
    nav.style.setProperty("--nav-width", String(item.width));
    cancelAnimationFrame(indicatorFrame.current);
    if (!entering) {
      nav.removeAttribute("data-nav-entering");
      return;
    }
    indicatorFrame.current = requestAnimationFrame(() => {
      nav.setAttribute("data-nav-engaged", "");
      // Paint the initial center without travel before enabling inter-link movement.
      indicatorFrame.current = requestAnimationFrame(() => {
        nav.removeAttribute("data-nav-entering");
      });
    });
  };
  return (
    <header
      className={`site-header wrap theme-${path.startsWith("/products/") ? path.split("/").pop() : path === "/solutions" ? "solutions" : "core"}`}
    >
      <Link href="/" aria-label="NV Core, início">
        <Brand />
      </Link>
      <nav
        ref={navigation}
        className="header-navigation"
        aria-label="Navegação principal"
        onPointerLeave={() => {
          const focused =
            navigation.current?.querySelector<HTMLAnchorElement>(
              "a:focus-visible",
            );
          if (focused) moveIndicator(focused);
          else resetIndicator();
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            resetIndicator();
        }}
      >
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch")
                moveIndicator(event.currentTarget);
            }}
            onFocus={(event) => {
              if (event.currentTarget.matches(":focus-visible"))
                moveIndicator(event.currentTarget);
            }}
            aria-current={
              path === href || path.startsWith(href + "/") ? "page" : undefined
            }
          >
            {label}
          </Link>
        ))}
        <span className="nav-hover-indicator" aria-hidden="true" />
      </nav>
      <Link
        className="header-contact"
        href="/contact"
        aria-current={path === "/contact" ? "page" : undefined}
      >
        <span className="contact-label">Vamos conversar</span>
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
                    aria-current={
                      path === href || path.startsWith(href + "/")
                        ? "page"
                        : undefined
                    }
                  >
                    <span>{label}</span>
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
                    aria-current={
                      path === `/products/${id}` ? "page" : undefined
                    }
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
