import { Given, When, Then } from "@cucumber/cucumber";
import puppeteer from 'puppeteer';
import * as chai from 'chai'
const expect = chai.expect;

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

Given("I load an empty browser", async function () {
  this.browser = await puppeteer.launch();
  this.page = await this.browser.newPage();

  if (process.env.VERBOSE == 'true') {
    // Log page events to the node console
    this.page
      .on('console', message =>
        console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
      .on('pageerror', ({ message }) => console.log(message))
      .on('response', response =>
        console.log(`${response.status()} ${response.url()}`))
      .on('requestfailed', request =>
        console.log(`${request.failure().errorText} ${request.url()}`))
  }
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

When("I wait {int} seconds", async function (delaySeconds) {
  await delay(delaySeconds * 1000);
});

Then("there is a GA4 request", function () {
  const ga4Request = this.requests.find(request => {
    try {
      const url = new URL(request.url);
      return url.host === "www.google-analytics.com" && url.pathname === "/g/collect";
    } catch (e) {
      return false;
    }
  });
  expect(ga4Request).to.exist;
});

Then("there are no unexpected requests", function () {
  const requestURLs = this.requests.map((request) => {
    return (new URL(request.url)).host;
  });

  const allowedURLs = [
    "localhost:8080",
    "d3vtlq0ztv2u27.cloudfront.net",
    "dap.digitalgov.gov",
    "www.googletagmanager.com",
    "www.google-analytics.com"
  ];

  requestURLs.forEach((requestURL) => {
    expect(allowedURLs).to.include(requestURL);
  })
})
