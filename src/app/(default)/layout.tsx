import type { Metadata } from "next";
import "../globals.css";
import { getDictionary } from "@/lib/i18n";

const dictionary = getDictionary("tr");
export const metadata: Metadata = {
  title: dictionary.name,
  description: dictionary.welcome,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
