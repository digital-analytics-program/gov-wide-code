Feature: DAP modifies page_location for 404 pages

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Page title containing "404" sets page_location to a vpv404 path
    When I load the test page "404.html"
    Then the config call for the DAP property has "page_location" containing "/vpv404/"

  Scenario: Page title containing "not found" sets page_location to a vpv404 path
    When I load the test page "not-found.html"
    Then the config call for the DAP property has "page_location" containing "/vpv404/"

  Scenario: 404 page without a referrer does not append a referrer to page_location
    When I load the test page "404.html"
    Then the config call for the DAP property has "page_location" containing "/vpv404/404.html"

  Scenario: 404 page with a referrer appends the referrer to page_location
    When I load the test site
    And I load the test page "404.html"
    Then the config call for the DAP property has "page_location" containing "/vpv404/"
    And the config call for the DAP property has "page_location" containing "http://localhost:8080/"
