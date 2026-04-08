import { Then } from "@cucumber/cucumber";
import * as chai from 'chai'
const expect = chai.expect;

Then("the DAP property config has script_source set to the DAP script URL", async function () {
  const { scriptSrc, configuredSrc } = await this.page.evaluate(() => {
    const dapScript = Array.from(document.scripts).find(s => s.src.includes('universal-federated-analytics'));
    const config = window.dataLayer.find(item => item[0] === 'config' && item[1] === "G-9TNNMGP8WJ");
    return { scriptSrc: dapScript?.src, configuredSrc: config?.["2"]?.script_source };
  });
  expect(scriptSrc).to.exist;
  expect(configuredSrc).to.equal(scriptSrc);
});

Then("the DAP property config has version matching {string}", async function (pattern) {
  const configCommand = await this.page.evaluate(() => {
    return window.dataLayer.find(item => item[0] === 'config' && item[1] === "G-9TNNMGP8WJ");
  });
  expect(configCommand["2"].version).to.match(new RegExp(pattern));
});

Then("the config call for the DAP property has {string} containing {string}", async function (key, substring) {
  const configCommand = await this.page.evaluate(() => {
    return window.dataLayer.find(item => item[0] === 'config' && item[1] === "G-9TNNMGP8WJ");
  });
  expect(configCommand["2"][key]).to.include(substring);
});

Then("DAP will set custom dimensions for the DAP property", async function (table) {
  const configCommand = await this.page.evaluate(() => {
    return window.dataLayer.find(item => item[0] === 'config' && item[1] === "G-9TNNMGP8WJ");
  });
  expect(configCommand["2"]).to.include(table.rowsHash());
});

Then("DAP will set custom dimensions for the parallel property {string}", async function (propertyId, table) {
  const configCommand = await this.page.evaluate((id) => {
    return window.dataLayer.find(item => item[0] === 'config' && item[1] === id);
  }, propertyId);
  expect(configCommand["2"]).to.include(table.rowsHash());
});

Then("DAP will configure parallel property {string} without custom dimensions", async function (propertyId) {
  const configCommand = await this.page.evaluate((id) => {
    return window.dataLayer.find(item => item[0] === 'config' && item[1] === id);
  }, propertyId);
  expect(configCommand["2"]).to.not.include.keys("agency", "subagency", "script_source", "version", "protocol", "hostname_dimension", "using_parallel_tracker");
});

Then("DAP will not configure parallel property {string}", async function (propertyId) {
  const configCommand = await this.page.evaluate((id) => {
    return window.dataLayer.find(item => item[0] === 'config' && item[1] === id);
  }, propertyId);
  expect(configCommand).to.be.undefined;
});

Then("the {string} property belongs to the {string} group", async function (property, group) {
  const configEvents = await this.page.evaluate((id) => {
    return window.dataLayer.filter(item => item[0] === 'config' && item[1] === id);
  }, property);
  expect(configEvents).to.not.be.empty;
  const groups = configEvents.map(config => config["2"].groups || []).flat();
  expect(groups).to.include(group);
});

Then("the {string} property does not belong to the {string} group", async function (property, group) {
  const configEvents = await this.page.evaluate((id) => {
    return window.dataLayer.filter(item => item[0] === 'config' && item[1] === id);
  }, property);
  expect(configEvents).to.not.be.empty;
  const groups = configEvents.map(config => config["2"].groups || []).flat();
  expect(groups).to.not.include(group);
});

Then("the {string} group has members", async function (groupName, table) {
  const matchingIds = await this.page.evaluate(() => {
    let groupData = null;
    window.dataLayer.push(['get', 'G-9TNNMGP8WJ', 'groups', (val) => { groupData = val; }]);
    return groupData;
  }, groupName);
  expect(matchingIds).to.have.members(table.raw().flat());
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
        "link_id": "internalDownload",
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

Then("a {string} event is sent to DAP with parameters", async function (eventName, table) {
  const event = await this.page.evaluate((name) => {
    return window.dataLayer.find(item => item[0] === 'event' && item[1] === name);
  }, eventName);
  expect(event).to.exist;
  expect(event["2"]).to.include(table.rowsHash());
});
