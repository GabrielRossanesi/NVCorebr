"use client";

import { track } from "@/lib/analytics";
import { whatsappUrl, whatsappDisplayNumber } from "@/lib/whatsapp";

export function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.55 2 2.08 6.45 2.08 11.93c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.37a9.95 9.95 0 0 0 4.78 1.22h.01c5.49 0 9.96-4.45 9.96-9.93A9.85 9.85 0 0 0 19.08 4.9 9.9 9.9 0 0 0 12.04 2Zm0 18.18a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.12.82.83-3.03-.2-.31a8.22 8.22 0 0 1-1.27-4.4 8.27 8.27 0 0 1 8.28-8.26 8.2 8.2 0 0 1 5.85 2.42 8.19 8.19 0 0 1 2.43 5.84c0 4.55-3.71 8.25-8.28 8.25Z" />
      <path d="M16.85 14.25c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.35-1.59-1.51-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.52-.44-.45-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26s.98 2.62 1.12 2.8c.14.18 1.93 2.94 4.67 4.12.65.28 1.16.44 1.55.56.65.2 1.24.17 1.71.11.52-.08 1.6-.66 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32Z" />
    </svg>
  );
}

export function WhatsappButton() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar com a NV no WhatsApp, ${whatsappDisplayNumber} (abre em nova aba)`}
      onClick={() => track("whatsapp_open", { source: "floating_button" })}
    >
      <WhatsappIcon />
      <span className="whatsapp-float-label" aria-hidden="true">
        Vamos conversar
      </span>
    </a>
  );
}
