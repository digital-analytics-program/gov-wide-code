import { Then } from "@cucumber/cucumber";
import * as chai from 'chai'
const expect = chai.expect;

const TEST_PROPERTY_ID = "G-9TNNMGP8WJ";

/**
 * Converts the string values from the Cucumber data table to match the types of the actual values in the DAP config/event objects.
 */
function convertDataTableTypesToMatchActual(table, actual) {
  return Object.fromEntries(
    Object.entries(table.rowsHash()).map(([k, v]) => {
      const actualValue = actual[k];
      if (typeof actualValue === 'number') return [k, Number(v)];
      if (typeof actualValue === 'boolean') return [k, v === 'true'];
      return [k, v];
    })
  );
}

Then("DAP will set custom dimensions for the DAP property", async function (table) {
  const configCommand = await this.page.evaluate((propertyId) => {
    return window.mockDataLayer.find(item => item[0] === 'config' && item[1] === propertyId);
  }, TEST_PROPERTY_ID);
  expect(configCommand).to.exist;
  const expected = convertDataTableTypesToMatchActual(table, configCommand["2"]);
  expect(configCommand["2"]).to.containSubset(expected);
});

Then("DAP will set the {string} dimension to a string matching {string}", async function (key, regex) {
  const configCommand = await this.page.evaluate((propertyId) => {
    return window.mockDataLayer.find(item => item[0] === 'config' && item[1] === propertyId);
  }, TEST_PROPERTY_ID);
  expect(configCommand["2"][key]).to.match(new RegExp(regex));
});

Then("DAP will set custom dimensions for the property {string}", async function (propertyId, table) {
  const configCommand = await this.page.evaluate((propertyId) => {
    return window.mockDataLayer.find(item => item[0] === 'config' && item[1] === propertyId);
  }, propertyId);
  expect(configCommand).to.exist;
  const expected = convertDataTableTypesToMatchActual(table, configCommand["2"]);
  expect(configCommand["2"]).to.containSubset(expected);
});

Then("DAP will configure property {string} without custom dimensions", async function (propertyId) {
  const configCommand = await this.page.evaluate((propertyId) => {
    return window.mockDataLayer.find(item => item[0] === 'config' && item[1] === propertyId);
  }, propertyId);
  expect(configCommand["2"]).to.not.include.keys("agency", "subagency", "script_source", "version", "protocol", "hostname_dimension", "using_parallel_tracker");
});

Then("the {string} property belongs to the {string} group", async function (propertyId, groupName) {
  const configEvents = await this.page.evaluate((propertyId) => {
    return window.mockDataLayer.filter(item => item[0] === 'config' && item[1] === propertyId);
  }, propertyId);
  expect(configEvents).to.not.be.empty;
  const groups = configEvents.flatMap(config => config[2]?.groups ?? []);
  expect(groups).to.include(groupName);
});

Then("the {string} property does not belong to the {string} group", async function (property, group) {
  const configEvents = await this.page.evaluate((id) => {
    return window.mockDataLayer.filter(item => item[0] === 'config' && item[1] === id);
  }, property);
  expect(configEvents).to.not.be.empty;
  const groups = configEvents.flatMap(config => config[2]?.groups ?? []);
  expect(groups).to.not.include(group);
});

Then("a {string} event is sent to DAP with parameters", async function (eventName, table) {
  const event = await this.page.evaluate((eventName) => {
    return window.mockDataLayer.find(item => item[0] === 'event' && item[1] === eventName);
  }, eventName);
  expect(event).to.exist;
  const expected = convertDataTableTypesToMatchActual(table, event[2]);
  expect(event["2"]).to.containSubset(expected);
});

Then("no {string} event is sent to DAP", async function (eventName) {
  const event = await this.page.evaluate((eventName) => {
    return window.mockDataLayer.find(item => item[0] === 'event' && item[1] === eventName);
  }, eventName);
  expect(event).to.be.undefined;
});

Then("there are {int} {string} events sent to DAP", async function (count, eventName) {
  const events = await this.page.evaluate((name) => {
    return window.mockDataLayer.filter(item => item[0] === 'event' && item[1] === name);
  }, eventName);
  expect(events).to.have.lengthOf(count);
});

