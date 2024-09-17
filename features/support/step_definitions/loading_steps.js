import {When} from "@cucumber/cucumber";

When("I load the test site with default DAP parameters", async function () {
  await this.page.goto("http://localhost:8080?agency=HHS");
});

When("I load the test site with custom DAP parameters", async function () {
  await this.page.goto("http://localhost:8080?agency=GSA&Subagency=TTS&sitetopic=comp,educ,soc|sm|2023-12-04 (AI education and AI in education)&siteplatform=standard-site&cto=6");
});

When("I load the test site with autotracker enabled", async function () {
  // autotracker enabled by default
  await this.page.goto("http://localhost:8080");
});

When("I load the test site with autotracker disabled", async function () {
  await this.page.goto("http://localhost:8080?autotracker=false");
});