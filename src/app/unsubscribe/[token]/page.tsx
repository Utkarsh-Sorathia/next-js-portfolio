import UnsubscribePageClient from "./UnsubscribePageClient";

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <UnsubscribePageClient token={token} />;
}