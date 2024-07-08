import { test, expect } from "@playwright/test";
import { PageConstants } from "../constants/PageConstants";
import { Common } from "./common";
export class InternationalTrip {
  constructor(page) {
    this.page = page;
    this.common = new Common(page);
  }
  async clickAndSelectToCity(cityName) {
    await this.page
      .getByText(PageConstants.TEXT_TO_ANYWHERE, { exact: true })
      .click();
    await this.page
      .getByRole("textbox", { name: PageConstants.TEXT_ENTER_CITY })
      .waitFor({ state: "visible", timeout: 1000 });
    await this.page
      .getByRole("textbox", { name: PageConstants.TEXT_ENTER_CITY })
      .type(PageConstants.TEXT_DUBAI);
    await this.page.getByText(PageConstants.TEXT_DUBAI).click();
  }
  async clickAndSelectDatesAndDeparture(monthName, numOfDays, thumb, slider) {
    await this.page.getByText("DATES & DURATION").click();
    await this.page.getByText(monthName).click();
    await this.common.changeSlider(thumb, slider, numOfDays, 30);
  }
  async applyDatesAndDepartureandSearch() {
    await this.page
      .getByRole("button", { name: PageConstants.BTN_APPLY })
      .click();
    await this.page
      .getByRole("button", { name: PageConstants.BTN_SEARCH })
      .click();
  }
}
