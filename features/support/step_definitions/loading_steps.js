import { Given, When } from "@cucumber/cucumber";

import DAPConfig from "../dapconfig.js";

Given("DAP is configured for agency {string}", function (agency) {
  this.dapConfig = new DAPConfig(agency);
});

Given("DAP is configured for subagency {string}", function (subagency) {
  this.dapConfig.subagency = subagency;
});

Given("DAP is configured with site topic {string}", function (sitetopic) {
  this.dapConfig.sitetopic = sitetopic;
});

Given("DAP is configured with site platform {string}", function (siteplatform) {
  this.dapConfig.siteplatform = siteplatform;
});

Given("DAP is configured with parallel GA4 property {string}", function (parallel_id) {
  this.dapConfig.pga4 = parallel_id;
});

Given("DAP is configured to set custom dimensions on the parallel tracker", function () {
  this.dapConfig.parallelcd = true;
});

Given("DAP is configured with cookie timeout of {int} months", function (months) {
  this.dapConfig.cto = months;
});

Given("DAP is configured with custom search parameter {string}", function (param) {
  this.dapConfig.sp = param;
});

Given("DAP is configured with YouTube tracking enabled", function () {
  this.dapConfig.yt = true;
});

Given("DAP is configured with autotracking enabled", function () {
  this.dapConfig.autotracker = true;
});

Given("DAP is configured with autotracking disabled", function () {
  this.dapConfig.autotracker = false;
});

Given("the page URL has query parameter {string} set to {string}", function (key, value) {
  this.pageParams = this.pageParams || {};
  this.pageParams[key] = value;
});

When("I load the test site", async function () {
  const params = new URLSearchParams(this.pageParams).toString();
  const url = `http://dap-test-site.local?${this.dapConfig.toQueryParams()}${params ? '&' + params : ''}`;
  await this.page.goto(url);
});

When("I load the test page {string}", async function (path) {
  const params = new URLSearchParams(this.pageParams).toString();
  const url = `http://dap-test-site.local/${path}?${this.dapConfig.toQueryParams()}${params ? '&' + params : ''}`;
  await this.page.goto(url);
});
