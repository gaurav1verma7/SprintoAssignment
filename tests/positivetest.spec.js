import { test, expect } from "@playwright/test";
import { PageConstants } from "../constants/PageConstants";
import { HomePage } from "../pages/homePage";
import { Common } from "../pages/common";
import { InternationalTrip } from "../pages/InternationalTrip";
import { TripFaresAndFlights } from "../pages/TripFaresAndFlights";
import fs from "fs";
const SCREENSHOT_DIR = "./resources/screenshotReports";

test("verify the fare price on makeMyTrip", async function ({
  page,
}, testInfo) {
  const homePage = new HomePage(page);
  const common = new Common(page);
  const internationalTripPage = new InternationalTrip(page);
  const tripFaresAndFlights = new TripFaresAndFlights(page);
  let thumb = await page.locator(PageConstants.CSS_THUMB).first();
  let slider = await page.locator(PageConstants.CSS_SLIDER).first();
  await homePage.open(PageConstants.URL_MAKE_MY_TRIP);

  await homePage.clickFlight();
  await common.isElementByTextPresent(PageConstants.TEXT_ONE_WAY);
  await homePage.clickRoundTrip();

  await homePage.clickAndSelectFrom(PageConstants.TEXT_BENGALURU_INDIA);
  await homePage.clickToandSelectInternationTrip();
  await common.isElementByTextPresent(PageConstants.TEXT_ROUND_TRIP);
  await common.isElementByTextPresent(PageConstants.TEXT_BENGALURU_INDIA);
  await internationalTripPage.clickAndSelectToCity(PageConstants.TEXT_DUBAI);
  await internationalTripPage.clickAndSelectDatesAndDeparture(
    PageConstants.TEXT_DECEMBER,
    10,
    thumb,
    slider
  );
  await internationalTripPage.applyDatesAndDepartureandSearch();
  await tripFaresAndFlights.verifyAtleastOneFlightIsPresent();
  const flightMinPrice =
    await tripFaresAndFlights.findMedianPriceAndOptimalDate(
      PageConstants.CSS_FAREPRICE_LIST,
      PageConstants.TEXT_DECEMBER,
      2024
    );
  await tripFaresAndFlights.waitUntilFlightWithFareVisible(flightMinPrice);
});

test.afterEach(async function ({ page }, testInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `${SCREENSHOT_DIR}/${testInfo.title.replace(
      /\s/g,
      "_"
    )}_failed.png`;
    const screenshotBuffer = await page.screenshot();
    fs.writeFileSync(screenshotPath, screenshotBuffer);
  }
});
