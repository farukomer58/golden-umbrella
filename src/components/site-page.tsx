import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n";

export default function SitePage({
  locale,
  page = "home",
}: {
  locale: Locale;
  page?: "home" | "about";
}) {
  const dictionary = getDictionary(locale);
  return (
    <>
      <a className="skip-link" href="#content">
        {dictionary.skip}
      </a>
      <header>
        <Link href={`/${locale}/`}>{dictionary.name}</Link>
        <nav aria-label={dictionary.navigation}>
          <Link href={`/${locale}/`}>{dictionary.home}</Link>
          <Link href={`/${locale}/about/`}>{dictionary.about}</Link>
        </nav>
        <nav aria-label={dictionary.languages}>
          {locales.map((language) => (
            <Link
              key={language}
              href={`/${language}/${page === "about" ? "about/" : ""}`}
              hrefLang={language}
              aria-current={language === locale ? "page" : undefined}
            >
              {getDictionary(language).language}
            </Link>
          ))}
        </nav>
      </header>
      <main id="content">
        <h1>{page === "home" ? dictionary.name : dictionary.about}</h1>
        <p>{page === "home" ? dictionary.welcome : dictionary.aboutText}</p>
        {page === "home" && (
          <Link href={`/${locale}/about/`}>{dictionary.learnMore}</Link>
        )}
      </main>
      <footer>{dictionary.draft}</footer>
    </>
  );
}
