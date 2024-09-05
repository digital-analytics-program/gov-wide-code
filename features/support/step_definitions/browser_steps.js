import { Given, When, Then } from "@cucumber/cucumber";
import puppeteer from 'puppeteer';
import path from 'path';
import * as chai from 'chai'
import * as fs from 'fs'
const expect = chai.expect;

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

Given("I load an empty browser", async function () {
  this.browser = await puppeteer.launch();
  this.page = await this.browser.newPage();
});

Given("I set the browser to intercept outbound requests", async function () {
  await this.page.setRequestInterception(true);
  this.requests = [];
  this.responses = [];

  this.page.on('request', (request) => {
    this.requests.push({ method: request.method(), headers: request.headers(), url: request.url() });
    request.continue();
  });

  this.page.on('response', (response) => {
    this.responses.push(response);
  })
});

When("I set the page content with {string} HTML file", async function (fileName) {
  await this.page.setContent(fs.readFileSync(path.join(__dirname, `..`, fileName), 'utf8'));
});

// This is still in progress. GA requests don't currently occur after clicking a button element.
When("I click on element with selector {string}", async function (elementSelector) {
  await this.page.locator(elementSelector).click();
  await delay(2000)
})

Then("there are no unexpected requests", function () {
  this.requests.forEach((request) => {
    let isAllowed = false;
    if (request.url.includes('https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js') || request.url.includes("https://www.googletagmanager.com/gtag/js?id=G-CSLL4ZEK4L")) {
      isAllowed = true;
    }
    expect(isAllowed).to.equal(true)
  })
})

