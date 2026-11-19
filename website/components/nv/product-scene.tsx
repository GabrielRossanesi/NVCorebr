import { Brand, monogramPath } from "./brand";
import { ProductGlyph } from "./product-glyph";
import type { ProductId } from "@/lib/content";
import { ProductInterface } from "./product-interface";

const signatures = {
  hub: {
    title: "Conexão",
    word: "CONNECT",
    caption: "Recorte da versão de demonstração (sandbox) · dados fictícios",
  },
  med: {
    title: "Continuidade",
    word: "FLOW",
    caption: "Interface reconstruída · dados demonstrativos fictícios",
  },
  lex: {
    title: "Estrutura",
    word: "STRUCTURE",
    caption: "Composição da identidade NV Lex",
  },
};

/** Editorial reconstructions for Hub and Med, brand composition for Lex. */
export function ProductScene({
  id,
  compact = false,
}: {
  id: ProductId;
  compact?: boolean;
}) {
  const signature = signatures[id];
  return (
    <figure
      className={`product-scene scene-${id} theme-${id} ${compact ? "scene-compact" : ""}`}
    >
      <div className="scene-topline" aria-hidden="true">
        <span>NV / {id.toUpperCase()}</span>
        <span>{signature.word}</span>
      </div>
      <div className="scene-canvas" aria-hidden="true">
        <div className="scene-plane scene-plane-back" data-scene-part="" />
        <div className="scene-plane scene-plane-front" data-scene-part="" />
        <div className="scene-axis axis-horizontal" />
        <div className="scene-axis axis-vertical" />
        {id === "lex" ? (
          <div className="scene-glyph" data-scene-part="">
            <ProductGlyph id={id} />
          </div>
        ) : (
          <ProductInterface id={id} />
        )}
        <div className="scene-core" data-scene-part="">
          <svg viewBox="0 0 106 60" fill="currentColor">
            <path d={monogramPath} />
          </svg>
          <span>ORIGEM / NV CORE</span>
        </div>
        <div className="scene-satellite satellite-a" data-scene-part="">
          <Brand name={id} symbolOnly />
        </div>
        <div className="scene-satellite satellite-b" data-scene-part="">
          <span>{signature.title}</span>
        </div>
      </div>
      <figcaption>
        <small>{signature.caption}</small>
      </figcaption>
    </figure>
  );
}
