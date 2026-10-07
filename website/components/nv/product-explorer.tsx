"use client";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { products } from "@/lib/content";
import { Brand } from "./brand";
import { ProductGlyph } from "./product-glyph";
import { track } from "@/lib/analytics";
export function ProductExplorer() {
  const [active, setActive] = useState("hub");
  return (
    <Tabs
      value={active}
      onValueChange={(v) => {
        setActive(v);
        track("product_view", { product: v, surface: "explorer" });
      }}
      className={`product-explorer theme-${active}`}
    >
      <TabsList
        className="product-tabs"
        variant="line"
        aria-label="Explore os produtos NV"
      >
        {products.map((p) => (
          <TabsTrigger value={p.id} key={p.id}>
            <Brand name={p.id} />
          </TabsTrigger>
        ))}
      </TabsList>
      {products.map((p) => (
        <TabsContent value={p.id} key={p.id} className="product-stage">
          <div className="product-stage-copy">
            <span className="product-category">{p.category}</span>
            <h3>{p.description}</h3>
            <p>
              {p.id === "hub"
                ? "Parte do ecossistema de produtos próprios da NV Core."
                : `A engenharia do núcleo NV aplicada ao ${p.id === "med" ? "setor de saúde" : "setor jurídico"}.`}
            </p>
            <Link
              className="button product-button"
              href={`/products/${p.id}`}
              onClick={() => track("product_cta", { product: p.id })}
            >
              Conheça o {p.name}
            </Link>
          </div>
          <div className="product-stage-visual">
            <ProductGlyph id={p.id} />
            <span>{p.name} / Dentro do núcleo</span>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
