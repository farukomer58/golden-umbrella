import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = getDictionary(lang);
  return { title: dictionary.name, description: dictionary.welcome };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
