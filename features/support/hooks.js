import { After } from "@cucumber/cucumber";

After(async function () {
  if (this.browser) {
    this.browser.close();
  }
  delete this.browser;
  delete this.page;
});
