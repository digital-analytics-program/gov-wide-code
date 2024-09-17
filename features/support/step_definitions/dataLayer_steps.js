import { Then } from "@cucumber/cucumber";
import * as chai from 'chai'
const expect = chai.expect;

Then("DAP is configured with default parameters", async function () {
  const config = await this.page.evaluate(() => {
    return window.dataLayer.find(item => item[0] === 'config');
  });
  expect(config).to.deep.equal(
    {
      "0": "config",
      "1": "G-9TNNMGP8WJ",
      "2": {
        "cookie_expires": "63072000",
        "page_location": "http://localhost:8080/",
        "page_title": "DAP test site",
        "agency": "HHS",
        "site_platform": "unspecified:localhost",
        "site_topic": "unspecified:localhost",
        "subagency": "LOCALHOST",
        "script_source": "http://localhost:8080/universal-federated-analytics-min.js",
        "version": "20240712 v8.2 - ga4",
        "protocol": "http:",
        "using_parallel_tracker": "no"
      }
    }
  );
});

Then("DAP is configured with custom parameters", async function () {
  const config = await this.page.evaluate(() => {
    return window.dataLayer.find(item => item[0] === 'config');
  });
  expect(config).to.deep.equal(
    {
      "0": "config",
      "1": "G-9TNNMGP8WJ",
      "2": {
        "cookie_expires": "15768000",
        "page_location": "http://localhost:8080/",
        "page_title": "DAP test site",
        "agency": "GSA",
        "site_platform": "standard-site",
        "site_topic": "comp,educ,soc|sm|2023-12-04+(ai+education+and+ai+in+education)",
        "subagency": "TTS",
        "script_source": "http://localhost:8080/universal-federated-analytics-min.js",
        "version": "20240712 v8.2 - ga4",
        "protocol": "http:",
        "using_parallel_tracker": "no"
      }
    }
  );
});

Then("the file download is reported to DAP with interaction type {string}", async function (interactionType) {
  const event = await this.page.evaluate(() => {
    return window.dataLayer.find(item => item[0] === 'event' && item[1] === 'file_download');
  });
  expect(event).to.deep.equal(
    {
      '0': 'event',
      '1': 'file_download',
      '2': {
        "interaction_type": interactionType,
        "send_to": 'GSA_GA4_ENOR0',
        "event_name_dimension": 'file_download',
        "file_extension": "zip",
        "file_name": "/about.zip",
        "link_domain": "localhost",
        "link_id": "internaldownload",
        "link_text": "/about.zip",
        "link_url": "http://localhost:8080/about.zip",
      }
    }
  );
});

Then("the file download is not reported to DAP", async function () {
  const event = await this.page.evaluate(() => {
    return window.dataLayer.find(item => item[0] === 'event' && item[1] === 'file_download');
  });
  expect(event).to.be.undefined;
});