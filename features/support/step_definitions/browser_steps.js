import { Given, When, Then } from "@cucumber/cucumber";
import puppeteer from 'puppeteer';
import * as chai from 'chai'
const expect = chai.expect;

chai.config.showDiff = true;
chai.config.truncateThreshold = 0;

/**
 * Returns a promise that resolves after the specified number of milliseconds.
 */
function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

Given("I load an empty browser", async function () {
  this.browser = await puppeteer.launch({
    args: [
      '--host-resolver-rules=MAP dap-test-site.local 127.0.0.1:8080',
    ]
  });
  this.page = await this.browser.newPage();

  if (process.env.VERBOSE === 'true') {
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

  // Google's gtag library treats the dataLayer as mostly but not entirely append only.
  // For instance, gtag('config', 'G-XXXX', { 'groups': 'group1' }) configures the property with the specified groups, but removes the groups object from the dataLayer.
  // So, tests must be run against a mock of dataLayer.push, not directly against the dataLayer itself.
  await this.page.evaluateOnNewDocument(() => {
    window.mockDataLayer = [];
    window.dataLayer = window.dataLayer || [];
    const originalPush = window.dataLayer.push;
    window.dataLayer.push = function (argumentObj) {
      window.mockDataLayer.push(structuredClone(Array.from(argumentObj)));
      return originalPush.call(this, argumentObj);
    }
  });
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

Then("there are no unexpected requests", function () {
  const requestURLs = this.requests.map((request) => {
    return (new URL(request.url)).host;
  });

  // Should be no calls to www.youtube.com in default configuration (youtube tracking is opt-in)
  const allowedURLs = [
    "dap-test-site.local",
    "d3vtlq0ztv2u27.cloudfront.net",
    "dap.digitalgov.gov",
    "www.googletagmanager.com",
    "www.google-analytics.com"
  ];

  requestURLs.forEach((requestURL) => {
    expect(allowedURLs).to.include(requestURL);
  })
})
