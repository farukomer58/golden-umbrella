import { notFound } from "next/navigation";
import SitePage from "@/components/site-page";
import { isLocale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <SitePage locale={lang} />;
}
