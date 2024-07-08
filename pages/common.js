import { test, expect } from "@playwright/test";
import { PageConstants } from "../constants/PageConstants";

export class Common {
  constructor(page) {
    this.page = page;
  }
  async isElementByTextPresent(text) {
    const elementWithText = await this.page.locator(`text=${text}`).first();
    await expect(elementWithText).toBeVisible();
  }
  async changeSlider(thumb, slider, requiredNum, totalNum) {
    let targetPercentage = (requiredNum * 100) / totalNum;
    const thumbBoundingBox = await thumb.boundingBox();
    const sliderBoundingBox = await slider.boundingBox();

    if (thumbBoundingBox === null || sliderBoundingBox === null) {
      throw new Error("Could not retrieve bounding boxes for thumb or slider.");
    }
    const startPoint = {
      x: thumbBoundingBox.x + thumbBoundingBox.width / 2,
      y: thumbBoundingBox.y + thumbBoundingBox.height / 2,
    };
    const endPoint = {
      x:
        sliderBoundingBox.x +
        sliderBoundingBox.width * (targetPercentage / 100),
      y: startPoint.y,
    };
    await this.page.mouse.move(startPoint.x, startPoint.y);
    await this.page.mouse.down();
    await this.page.mouse.move(endPoint.x, endPoint.y, { steps: 10 });
    await this.page.mouse.up();
  }
  async getFirstDayOfMonth(monthName, year, dayName) {
    const daysOfWeek = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const monthsOfYear = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };
    const dayNumber = daysOfWeek[dayName];
    if (dayNumber === undefined) {
      throw new Error("Invalid day name provided.");
    }
    const monthNumber = monthsOfYear[monthName];
    if (monthNumber === undefined) {
      throw new Error("Invalid month name provided.");
    }
    for (let day = 1; day <= 7; day++) {
      const date = new Date(year, monthNumber, day);
      if (date.getDay() === dayNumber) {
        return date.getDate();
      }
    }
    throw new Error("Something went wrong. Please check the input values.");
  }

  async findMedian(arr) {
    if (arr.length === 0) {
      throw new Error("Array is empty");
    }
    const sortedArr = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 === 0) {
      return Math.floor((sortedArr[mid - 1] + sortedArr[mid]) / 2);
    } else {
      return sortedArr[mid];
    }
  }

  async convertStringFaretoNumber(formattedString) {
    let cleanedString = formattedString.replace(/[₹,]/g, "");
    let numberValue = parseFloat(cleanedString);
    if (isNaN(numberValue)) {
      throw new Error(
        `Invalid number conversion for string: ${formattedString}`
      );
    }
    return numberValue;
  }
  async captureScreenShot(testInfo, SCREENSHOT_DIR) {
    const screenshotPath = `${SCREENSHOT_DIR}/${testInfo.project.toLowerCase()}_${testInfo.title.replace(
      /\s/g,
      "_"
    )}_failed.png`;
    await this.page.screenshot({ path: screenshotPath });
  }
  async textNotPresent(text) {
    await expect(this.page.locator("body")).not.toHaveText(text);
  }
}
