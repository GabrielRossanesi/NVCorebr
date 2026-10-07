export type AnalyticsEvent =
  | "cta_click"
  | "product_view"
  | "solution_view"
  | "contact_start"
  | "contact_submit"
  | "product_cta"
  | "navigation";
export function track(
  event: AnalyticsEvent,
  properties: Record<string, string> = {},
) {
  if (typeof window !== "undefined")
    window.dispatchEvent(
      new CustomEvent("nv:analytics", { detail: { event, properties } }),
    );
}
// Connect an approved provider here. Never include form content or personal data.
