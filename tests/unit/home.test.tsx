import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "@/app/(default)/page";

test("renders the Turkish home page with an accessible heading and About link", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Altın Şemsiye Vakfı" }),
  ).toBeVisible();
  expect(
    screen.getByRole("link", { name: "Daha fazla bilgi" }),
  ).toHaveAttribute("href", "/tr/about/");
});
