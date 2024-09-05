Feature: Test a basic page with DAP code loaded

  Background:
    Given I load an empty browser
    And I set the browser to intercept outbound requests

  Scenario: Loading the page with the DAP code without further action
    When I set the page content with "static_page_with_dap.html" HTML file
    Then there are no unexpected requests

  Scenario: Loading the page with the DAP code and clicking a button
    When I set the page content with "static_page_with_dap.html" HTML file
    And I click on element with selector "#test-button"
    Then there are no unexpected requests
