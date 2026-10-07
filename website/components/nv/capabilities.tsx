"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { capabilities } from "@/lib/content";
export function Capabilities() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="software"
      className="capabilities"
    >
      {capabilities.map((c) => (
        <AccordionItem key={c.id} id={c.id} value={c.id}>
          <AccordionTrigger className="capability-title">
            <span>{c.title}</span>
            <small>{c.label}</small>
          </AccordionTrigger>
          <AccordionContent className="capability-description">
            {c.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
