import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import SitePage from "@/components/site-page";
import en from "@/dictionaries/en.json";
import nl from "@/dictionaries/nl.json";
import tr from "@/dictionaries/tr.json";

test("dictionaries have complete, nonempty translations", () => {
  for (const dictionary of [en, nl, tr]) {
    expect(Object.keys(dictionary).sort()).toEqual(Object.keys(tr).sort());
    for (const value of Object.values(dictionary))
      expect(value.trim().length).toBeGreaterThan(0);
  }
});

test("Dutch About content and language navigation preserve the page", () => {
  render(<SitePage locale="nl" page="about" />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Over ons" }),
  ).toBeVisible();
  const languages = screen.getByRole("navigation", { name: "Talen" });
  expect(
    within(languages).getByRole("link", { name: "Nederlands" }),
  ).toHaveAttribute("aria-current", "page");
  expect(
    within(languages).getByRole("link", { name: "English" }),
  ).toHaveAttribute("href", "/en/about/");
  expect(
    within(languages).getByRole("link", { name: "Türkçe" }),
  ).toHaveAttribute("href", "/tr/about/");
});
