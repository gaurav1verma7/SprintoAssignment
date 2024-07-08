import { BasePage } from "./basePage";
import { test, expect } from "@playwright/test";
import { PageConstants } from "../constants/PageConstants";
export class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async clickFlight() {
    await this.page
      .getByRole("link", { name: PageConstants.TEXT_FLIGHT, exact: true })
      .click();
  }

  async clickRoundTrip() {
    await this.page.getByText(PageConstants.TEXT_ROUND_TRIP).click();
  }

  async clickAndSelectFrom(cityName) {
    await this.page.getByText(PageConstants.TEXT_FROM, { exact: true }).click();
    await this.page.getByPlaceholder(PageConstants.TEXT_FROM).type(cityName);
    await this.page.getByText(cityName, { exact: true }).click();
  }

  async clickToandSelectInternationTrip() {
    await this.page.getByText(PageConstants.TEXT_TO, { exact: true }).click();
    await this.page
      .getByText(PageConstants.TEXT_PLANNING_INTERNATIONAL)
      .click();
  }
}
