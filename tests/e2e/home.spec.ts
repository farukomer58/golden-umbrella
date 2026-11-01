import { expect, test } from "@playwright/test";

test("the real home page renders and supports localized navigation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Altın Şemsiye Vakfı" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await page.getByRole("link", { name: "Daha fazla bilgi" }).click();
  await expect(page).toHaveURL(/\/tr\/about\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Hakkımızda" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Nederlands" }).click();
  await expect(page).toHaveURL(/\/nl\/about\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Over ons" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "nl");
});

test("exported English About page supports direct navigation", async ({
  page,
}) => {
  await page.goto("/en/about/");
  await expect(
    page.getByRole("heading", { level: 1, name: "About us" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("unknown routes return a real 404", async ({ page }) => {
  const response = await page.goto("/missing-page/");
  expect(response?.status()).toBe(404);
});
