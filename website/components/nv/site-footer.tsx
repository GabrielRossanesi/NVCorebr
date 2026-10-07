import Link from "next/link";
import { Brand } from "./brand";
export function SiteFooter() {
  return (
    <footer className="footer wrap">
      <div className="footer-epilogue" aria-hidden="true">
        <span>NV CORE</span>
        <span>PRODUTO · DESIGN · ENGENHARIA</span>
        <span>O NÚCLEO CONTINUA.</span>
      </div>
      <div className="footer-top">
        <Link href="/" aria-label="NV Core, início">
          <Brand />
        </Link>
        <p>
          O próximo passo
          <br />
          começa no núcleo.
        </p>
        <Link className="text-link" href="/contact">
          Vamos construir juntos
        </Link>
      </div>
      <div className="footer-columns">
        <div>
          <p>
            Uma empresa de tecnologia.
            <br />
            Produtos próprios e soluções
            <br />
            digitais para outras empresas.
          </p>
        </div>
        <nav aria-label="Produtos no rodapé">
          <h2>Produtos</h2>
          <Link href="/products/hub">NV Hub</Link>
          <Link href="/products/med">NV Med</Link>
          <Link href="/products/lex">NV Lex</Link>
          <Link href="/products">Ecossistema</Link>
        </nav>
        <nav aria-label="Soluções no rodapé">
          <h2>NV Solutions</h2>
          <Link href="/solutions#software">Software</Link>
          <Link href="/solutions#crm-erp">CRM / ERP</Link>
          <Link href="/solutions#web">Web</Link>
          <Link href="/solutions#integrations">APIs & integrações</Link>
          <Link href="/solutions#automation">Automações</Link>
        </nav>
        <nav aria-label="Empresa no rodapé">
          <h2>Empresa</h2>
          <Link href="/about">A NV Core</Link>
          <Link href="/projects">Projetos</Link>
          <Link href="/contact">Contato</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} NV Core</small>
        <span>Design, produto e engenharia. No mesmo núcleo.</span>
        <a href="#main">Voltar ao início</a>
      </div>
    </footer>
  );
}
