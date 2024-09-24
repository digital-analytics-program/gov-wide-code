Feature: Test the outgoing requests sent by a basic page with DAP code loaded

  Background:
    Given I load an empty browser
    And I set the browser to intercept outbound requests
    And DAP is configured for agency "GSA"

  Scenario: Loading the page with the DAP code without further action
    When I load the test site
    And I wait 5 seconds
    Then there is a GA4 request
    But there are no unexpected requests

  Scenario: Loading the page with the DAP code and clicking a button
    When I load the test site
    And I click on element with selector "#banner-button"
    And I wait 5 seconds
    Then there is a GA4 request
    But there are no unexpected requests
