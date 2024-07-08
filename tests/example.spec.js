// import { test, expect } from "@playwright/test";

// test("test", async ({ page }) => {
//   await page.goto("https://www.makemytrip.com/");
//   await page.getByRole("link", { name: "Flights", exact: true }).click();
//   await page.getByText("One Way", { exact: true }).click();
//   await page
//     .locator("li")
//     .filter({ hasText: "Round Trip" })
//     .locator("span")
//     .click();
//   await page.getByText("From", { exact: true }).click();
//   await page.getByPlaceholder("From").fill("Bengaluru");
//   await page.getByText("Bengaluru", { exact: true }).click();
//   await page.getByText("To", { exact: true }).click();

//   await page.getByText("Planning an international").click();
//   await page.locator("span").filter({ hasText: "Round Trip" }).click();
//   await page
//     .locator("div")
//     .filter({ hasText: /^Bengaluru, India$/ })
//     .locator("span")
//     .click();

//   await page
//     .locator("div")
//     .filter({ hasText: /^TOANYWHERE$/ })
//     .locator("span")
//     .click();
//   await page.getByRole("textbox", { name: "Enter City" }).fill("Dubai");
//   await page
//     .getByText("Dubai, United Arab EmiratesDubai InternationalDXB")
//     .click();
//   await page.getByText("DEPARTURE").click();
//   await page.getByText("December,").click();
//   await page.getByRole("button", { name: "Apply" }).click();
//   await page.getByRole("button", { name: "Search" }).click();
//   await page.getByText("27", { exact: true }).click();
//   const page1Promise = page.waitForEvent("popup");
//   await page.getByRole("link", { name: "VIEW FLIGHTS" }).first().click();
//   const page1 = await page1Promise;
// });
