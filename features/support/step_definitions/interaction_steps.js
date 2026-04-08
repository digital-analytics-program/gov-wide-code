import { When } from "@cucumber/cucumber";

When("I execute script {string}", async function (script) {
  await this.page.evaluate((s) => eval(s), script);
});

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

When("I click on link with href {string} and wait for new page to load", async function (href) {
  await Promise.all([
    this.page.waitForNavigation(),
    this.page.locator(`a[href='${href}']`).click()
  ]);
});