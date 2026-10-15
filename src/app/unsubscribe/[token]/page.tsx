import type { Metadata } from "next";
import UnsubscribePageClient from "./UnsubscribePageClient";
import { isLightDesign } from "@/config/design";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // The light design reuses this page; .lt-legacy flips its dark-only text colours.
  return isLightDesign ? (
    <div className="lt-legacy">
      <UnsubscribePageClient token={token} />
    </div>
  ) : (
    <UnsubscribePageClient token={token} />
  );
}