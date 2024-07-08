import { test, expect } from "@playwright/test";
import { PageConstants } from "../constants/PageConstants";
import { HomePage } from "../pages/homePage";
import { Common } from "../pages/common";
import { InternationalTrip } from "../pages/InternationalTrip";
import { TripFaresAndFlights } from "../pages/TripFaresAndFlights";
import fs from "fs";
const SCREENSHOT_DIR = "./resources/screenshotReports";

let homePage;
let common;
let internationalTripPage;
let tripFaresAndFlights;
let thumb;
let slider;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  common = new Common(page);
  internationalTripPage = new InternationalTrip(page);
  tripFaresAndFlights = new TripFaresAndFlights(page);
  thumb = await page.locator(PageConstants.CSS_THUMB).first();
  slider = await page.locator(PageConstants.CSS_SLIDER).first();
  await homePage.open(PageConstants.URL_MAKE_MY_TRIP);
});

test("Verify International Trip Planning Feature", async () => {
  await homePage.clickFlight();
  await common.isElementByTextPresent(PageConstants.TEXT_ONE_WAY);
  await homePage.clickRoundTrip();
  await homePage.clickAndSelectFrom(PageConstants.TEXT_BENGALURU_INDIA);
  await homePage.clickToandSelectInternationalTrip();
  await common.isElementByTextPresent(PageConstants.TEXT_ROUND_TRIP);
  await common.isElementByTextPresent(PageConstants.TEXT_BENGALURU_INDIA);
  await internationalTripPage.clickAndSelectToCity(PageConstants.TEXT_DUBAI);
  await internationalTripPage.clickAndSelectDatesAndDeparture(
    PageConstants.TEXT_DECEMBER,
    10,
    thumb,
    slider
  );
  await internationalTripPage.applyDatesAndDeparture();
  await internationalTripPage.searchFlight();
  await tripFaresAndFlights.verifyAtleastOneFlightIsPresent();
  const flightMinPrice =
    await tripFaresAndFlights.findMedianPriceAndOptimalDate(
      PageConstants.CSS_FAREPRICE_LIST,
      PageConstants.TEXT_DECEMBER,
      PageConstants.TEXT_YEAR_2024
    );
  await tripFaresAndFlights.waitUntilFlightWithFareVisible(flightMinPrice);
});

// Smoke Test Cases
test("Navigate to flight Page", async function ({ page }) {
  await homePage.clickFlight();
});
test("Choose Planning a Trip Internationally funtionality", async function ({
  page,
}) {
  await homePage.clickRoundTrip();
  await homePage.clickToandSelectInternationalTrip();
  await common.isElementByTextPresent(PageConstants.TEXT_ROUND_TRIP);
  await common.isElementByTextPresent(PageConstants.TEXT_DATES_DURATION);
});
test("search flights without 'to city' ", async function ({ page }) {
  await homePage.clickToandSelectInternationalTrip();
  await internationalTripPage.searchFlight();
  await common.isElementByTextPresent(PageConstants.TEXT_TO_ANYWHERE);
});

test("Choose Planning a Trip Internationally funtionality in Round Trip", async function ({
  page,
}) {
  await homePage.clickRoundTrip();
  await homePage.clickAndSelectFrom(PageConstants.TEXT_BENGALURU_INDIA);
  await homePage.clickToandSelectInternationalTrip();
  await common.isElementByTextPresent(PageConstants.TEXT_ROUND_TRIP);
  await common.isElementByTextPresent(PageConstants.TEXT_BENGALURU_INDIA);
  await common.isElementByTextPresent(PageConstants.TEXT_DATES_DURATION);
});

test("Choose Planning a Trip Internationally funtionality in One Way Trip", async function ({
  page,
}) {
  await homePage.clickAndSelectFrom(PageConstants.TEXT_BENGALURU_INDIA);
  await homePage.clickToandSelectInternationalTrip();
  await common.isElementByTextPresent(PageConstants.TEXT_BENGALURU_INDIA);
  await common.isElementByTextPresent(PageConstants.TEXT_DEPARTURE);
  await common.isElementByTextPresent(PageConstants.TEXT_ONE_WAY);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `${SCREENSHOT_DIR}/${testInfo.title.replace(
      /\s/g,
      "_"
    )}_failed.png`;
    const screenshotBuffer = await page.screenshot();
    fs.writeFileSync(screenshotPath, screenshotBuffer);
  }
});
