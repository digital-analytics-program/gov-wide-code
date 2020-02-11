// this line is a test change for PR CI

const {
  _URIHandler,
  _isExcludedReferrer,
  _cleanBooleanParam,
  _isValidUANum,
  _cleanDimensionValue
} = require('./Universal-Federated-Analytics-v2.js');

/* name: _URIHandler
 * usage: to unify parameter name of search to be passed to GA */
test('_URIHandler: no matching search params', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/shirt-blue?size=large#details';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/shirt-blue?size=large#details');
});
test('_URIHandler: match search param "q"', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/search?q=shirts';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/search?query=shirts');
});
test('_URIHandler: match search param "querytext"', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/search?querytext=shirts';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/search?query=shirts');
});
test('_URIHandler: match search param "nasaInclude"', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/search?nasaInclude=shirts';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/search?query=shirts');
});
test('_URIHandler: match search param "k"', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/search?k=shirts';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/search?query=shirts');
});
test('_URIHandler: match search param "qt"', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/search?qt=shirts';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/search?query=shirts');
});
test('_URIHandler: replace only the first instance of a search param with "query"', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/search?q=shirts&qt=blue#details';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/search?query=shirts&qt=blue#details');
});
test('_URIHandler: replace search param when it is not the first query param', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/search?page=5&querytext=shirts';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/search?page=5&query=shirts');
});
test('_URIHandler: ignore case when matching search param', () => {
  var searchParams = 'q|querytext|nasaInclude|k|qt';
  var pageName = '/store/search?NaSaInClUdE=shirts';
  expect(_URIHandler(searchParams, pageName)).toBe('/store/search?query=shirts');
});

/* name: _isExcludedReferrer
 * usage: to manually handle Referral Exclusion programmatically */
test('_isExcludedReferrer: subdomain-based, not excluded', () => {
  var referrer = 'https://www.google.com/';
  var subdomainBased = true;
  var cookieDomain = 'usa.gov';
  expect(_isExcludedReferrer(referrer, subdomainBased, cookieDomain)).toBe(false);
});
test('_isExcludedReferrer: subdomain-based, is excluded', () => {
  var referrer = 'https://login.usa.gov/';
  var subdomainBased = true;
  var cookieDomain = 'usa.gov';
  expect(_isExcludedReferrer(referrer, subdomainBased, cookieDomain)).toBe(true);
});
test('_isExcludedReferrer: not subdomain-based, not excluded', () => {
  var referrer = 'https://usps.com/';
  var subdomainBased = false;
  var cookieDomain = 'usa.gov';
  expect(_isExcludedReferrer(referrer, subdomainBased, cookieDomain)).toBe(false);
});
test('_isExcludedReferrer: not subdomain-based, is excluded', () => {
  var referrer = 'https://usa.gov/';
  var subdomainBased = false;
  var cookieDomain = 'usa.gov';
  expect(_isExcludedReferrer(referrer, subdomainBased, cookieDomain)).toBe(true);
});

/* name: _cleanBooleanParam
 * usage: to map several string values to boolean values */
test('_cleanBooleanParam: no match, does not map', () => {
  var paramValue = 'hello';
  expect(_cleanBooleanParam(paramValue)).toBe('hello');
});
test('_cleanBooleanParam: "true" -> true', () => {
  var paramValue = 'true';
  expect(_cleanBooleanParam(paramValue)).toBe(true);
});
test('_cleanBooleanParam: "on" -> true', () => {
  var paramValue = 'on';
  expect(_cleanBooleanParam(paramValue)).toBe(true);
});
test('_cleanBooleanParam: "yes" -> true', () => {
  var paramValue = 'yes';
  expect(_cleanBooleanParam(paramValue)).toBe(true);
});
test('_cleanBooleanParam: "1" -> true', () => {
  var paramValue = '1';
  expect(_cleanBooleanParam(paramValue)).toBe(true);
});
test('_cleanBooleanParam: "false" -> false', () => {
  var paramValue = 'false';
  expect(_cleanBooleanParam(paramValue)).toBe(false);
});
test('_cleanBooleanParam: "off" -> false', () => {
  var paramValue = 'off';
  expect(_cleanBooleanParam(paramValue)).toBe(false);
});
test('_cleanBooleanParam: "no" -> false', () => {
  var paramValue = 'no';
  expect(_cleanBooleanParam(paramValue)).toBe(false);
});
test('_cleanBooleanParam: "0" -> false', () => {
  var paramValue = '0';
  expect(_cleanBooleanParam(paramValue)).toBe(false);
});

/* name: _isValidUANum
 * usage: to check if a string is a valid UA */
test('_isValidUANum: valid UAN "ua-11111-1"', () => {
  var uan = 'ua-11111-1';
  expect(_isValidUANum(uan)).toBe(true);
});
test('_isValidUANum: valid UAN uppercase "UA-11111-1"', () => {
  var uan = 'UA-11111-1';
  expect(_isValidUANum(uan)).toBe(true);
});
test('_isValidUANum: invalid UAN "11111-1"', () => {
  var uan = '11111-1';
  expect(_isValidUANum(uan)).toBe(false);
});
test('_isValidUANum: invalid UAN "ua11111-1"', () => {
  var uan = 'ua11111-1';
  expect(_isValidUANum(uan)).toBe(false);
});
test('_isValidUANum: invalid UAN "ua-11111-"', () => {
  var uan = 'ua-11111-';
  expect(_isValidUANum(uan)).toBe(false);
});
test('_isValidUANum: invalid UAN "ua-11111"', () => {
  var uan = 'ua-11111';
  expect(_isValidUANum(uan)).toBe(false);
});
test('_isValidUANum: invalid UAN "ua--11111-1"', () => {
  var uan = 'ua--11111-1';
  expect(_isValidUANum(uan)).toBe(false);
});
test('_isValidUANum: invalid UAN "ua111111"', () => {
  var uan = 'ua111111';
  expect(_isValidUANum(uan)).toBe(false);
});
test('_isValidUANum: invalid UAN "ua-11111e-1"', () => {
  var uan = 'ua-11111e-1';
  expect(_isValidUANum(uan)).toBe(false);
});

/* name: _cleanDimensionValue
 * usage: make sure the dimension slot number is passed correctly */
test('_cleanDimensionValue: valid "dimension1"', () => {
  var paramValue = 'dimension1';
  expect(_cleanDimensionValue(paramValue)).toBe('dimension1');
});
test('_cleanDimensionValue: valid "dimension10"', () => {
  var paramValue = 'dimension10';
  expect(_cleanDimensionValue(paramValue)).toBe('dimension10');
});
test('_cleanDimensionValue: valid "dimension100"', () => {
  var paramValue = 'dimension100';
  expect(_cleanDimensionValue(paramValue)).toBe('dimension100');
});
test('_cleanDimensionValue: valid "dimension200"', () => {
  var paramValue = 'dimension200';
  expect(_cleanDimensionValue(paramValue)).toBe('dimension200');
});
test('_cleanDimensionValue: valid "1"', () => {
  var paramValue = '1';
  expect(_cleanDimensionValue(paramValue)).toBe('dimension' + paramValue);
});
test('_cleanDimensionValue: valid "10"', () => {
  var paramValue = '10';
  expect(_cleanDimensionValue(paramValue)).toBe('dimension' + paramValue);
});
test('_cleanDimensionValue: valid "100"', () => {
  var paramValue = '100';
  expect(_cleanDimensionValue(paramValue)).toBe('dimension' + paramValue);
});
test('_cleanDimensionValue: valid "200"', () => {
  var paramValue = '200';
  expect(_cleanDimensionValue(paramValue)).toBe('dimension' + paramValue);
});
test('_cleanDimensionValue: invalid "dimension0"', () => {
  var paramValue = 'dimension0';
  expect(_cleanDimensionValue(paramValue)).toBe('');
});
test('_cleanDimensionValue: invalid "dimension201"', () => {
  var paramValue = 'dimension201';
  expect(_cleanDimensionValue(paramValue)).toBe('');
});
test('_cleanDimensionValue: invalid "0"', () => {
  var paramValue = '0';
  expect(_cleanDimensionValue(paramValue)).toBe('');
});
test('_cleanDimensionValue: invalid "201"', () => {
  var paramValue = '201';
  expect(_cleanDimensionValue(paramValue)).toBe('');
});
test('_cleanDimensionValue: invalid "abc"', () => {
  var paramValue = 'abc';
  expect(_cleanDimensionValue(paramValue)).toBe('');
});
test('_cleanDimensionValue: invalid false', () => {
  var paramValue = false;
  expect(_cleanDimensionValue(paramValue)).toBe(undefined);
});
