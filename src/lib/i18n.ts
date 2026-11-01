import en from "@/dictionaries/en.json";
import nl from "@/dictionaries/nl.json";
import tr from "@/dictionaries/tr.json";

export const locales = ["tr", "nl", "en"] as const;
export type Locale = (typeof locales)[number];
export type Dictionary = typeof tr;
const dictionaries: Record<Locale, Dictionary> = { tr, nl, en };

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
