import {Given, Then} from "@cucumber/cucumber";
import * as chai from 'chai'
const expect = chai.expect;

Given("DAP will set custom dimensions", async function (table) {
  const configCommand = await this.page.evaluate(() => {
    return window.dataLayer.find(item => item[0] === 'config');
  });
  expect(configCommand["0"]).to.equal("config");
  expect(configCommand["1"]).to.equal("G-9TNNMGP8WJ");
  expect(configCommand["2"]).to.include(table.rowsHash());
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