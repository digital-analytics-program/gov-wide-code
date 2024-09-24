import { When } from "@cucumber/cucumber";

When("I click on a file to download it", async function () {
  await this.page.locator('#internalDownload').click();
});

When("I highlight and press Enter on a file to download it", async function () {
  await this.page.focus('#internalDownload');
  await this.page.keyboard.press('Enter');
});

When("I click on element with selector {string}", async function (elementSelector) {
  await this.page.locator(elementSelector).click();
});