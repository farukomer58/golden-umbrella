import "server-only";

export const locales = ["nl", "en", "tr"] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  nl: () => import("@/dictionaries/nl.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  tr: () => import("@/dictionaries/tr.json").then((m) => m.default),
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}