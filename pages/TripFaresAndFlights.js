import { test, expect } from "@playwright/test";
import { PageConstants } from "../constants/PageConstants";
import { Common } from "./common";

export class TripFaresAndFlights {
  constructor(page) {
    this.page = page;
    this.common = new Common(page);
  }

  async findMedianPriceAndOptimalDate(dateFareSelectors, monthName, year) {
    await this.page.waitForSelector(dateFareSelectors, { timeout: 10000 });
    const dateFareElements = await this.page.locator(dateFareSelectors);
    const count = await dateFareElements.count();
    if (count === 0) {
      console.error("No elements found with the provided selector.");
      return;
    }
    const dateFareArray = [];
    let minimumFare = Number.MAX_VALUE;
    let minIndex = 0;

    for (let i = 0; i < count; i++) {
      const fare = await dateFareElements
        .nth(i)
        .locator(PageConstants.CSS_FAREPRICE)
        .innerText();
      try {
        if (fare === "-") {
          dateFareArray.push(0);
        } else {
          let ithPrice = await this.common.convertStringFaretoNumber(fare);
          dateFareArray.push(ithPrice);
          if (ithPrice < minimumFare) {
            minimumFare = ithPrice;
            minIndex = i;
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    if (dateFareArray.length === 0) {
      throw new Error("No valid fare values found");
    }
    let medianFare = await this.common.findMedian(dateFareArray);
    let sunday =
      (await this.common.getFirstDayOfMonth(monthName, year, "Sunday")) - 1;
    let saturday =
      (await this.common.getFirstDayOfMonth(monthName, year, "Saturday")) - 1;
    let price = 0;
    while (sunday < count) {
      if (dateFareArray[sunday] < medianFare && dateFareArray[sunday] != 0) {
        price = dateFareArray[sunday];
        minIndex = sunday;
      }
      sunday = sunday + 7;
    }
    while (saturday < count) {
      if (
        dateFareArray[saturday] < medianFare &&
        dateFareArray[saturday] < price &&
        dateFareArray[saturday] != 0
      ) {
        price = dateFareArray[saturday];
        minIndex = saturday;
      }
      saturday = saturday + 7;
    }
    if (price == 0) {
      price = minimumFare;
    }
    await dateFareElements.nth(minIndex).click();
    const optimalPrice = dateFareElements
      .nth(minIndex)
      .locator(PageConstants.CSS_FAREPRICE)
      .innerText();

    console.log(
      "suitalbe fare price is: " +
        optimalPrice +
        " and date is : " +
        minIndex +
        1
    );
    return optimalPrice;
  }

  async waitUntilFlightWithFareVisible(flightFare) {
    const locator = this.page
      .locator(PageConstants.TAG_SPAN)
      .filter({ hasText: flightFare });
    await locator.first().waitFor({ state: "visible" });
  }

  async verifyAtleastOneFlightIsPresent() {
    this.common.textNotPresent(PageConstants.TEXT_NO_FLIGHTS_FOUND);
    this.common.textNotPresent(PageConstants.TEXT_UNABLE_TO_FIND_FLIGHTS);
  }
}
