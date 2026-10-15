// Which site design to render. The light "bento" redesign is the default;
// set NEXT_PUBLIC_SITE_DESIGN=dark (e.g. in Vercel) to bring back the original
// dark site without any code change. Read at build time.
export type SiteDesign = "light" | "dark";

export const SITE_DESIGN: SiteDesign =
  process.env.NEXT_PUBLIC_SITE_DESIGN === "dark" ? "dark" : "light";

export const isLightDesign = SITE_DESIGN === "light";

// Browser UI colour (mobile address bar etc.) for the active design.
export const THEME_COLOR = isLightDesign ? "#f4f4f2" : "#000000";
