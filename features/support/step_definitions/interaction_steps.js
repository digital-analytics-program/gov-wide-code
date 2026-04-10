import { When, Then } from "@cucumber/cucumber";
import * as chai from 'chai';
const expect = chai.expect;

When("I execute script {string}", async function (script) {
  await this.page.evaluate((s) => eval(s), script);
});

Then("executing script {string} throws a ReferenceError", async function (script) {
  const result = await this.page.evaluate((s) => {
    try { eval(s); return null; } catch (e) { return e.constructor.name; }
  }, script);
  expect(result).to.equal('ReferenceError');
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

When("I send a GA4 test beacon with post data {string}", async function (data) {
  await this.page.evaluate((beaconData) => {
    window.navigator.sendBeacon(
      'https://www.google-analytics.com/g/collect?v=2&tid=G-9TNNMGP8WJ',
      beaconData
    );
  }, data);
});

When("I send a GA4 test beacon to property {string} with post data {string}", async function (propertyId, data) {
  await this.page.evaluate((id, beaconData) => {
    window.navigator.sendBeacon(
      `https://www.google-analytics.com/g/collect?v=2&tid=${id}`,
      beaconData
    );
  }, propertyId, data);
});