import type { Metadata } from "next";
import UnsubscribePageClient from "./UnsubscribePageClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <UnsubscribePageClient token={token} />;
}