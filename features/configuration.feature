Feature: A site can load the DAP code with varying levels of customization

  Background:
    Given I load an empty browser

  Scenario: Load a DAP-enabled page with no customization
    When I load the test site with default DAP parameters
    Then DAP is configured with default parameters

  Scenario: Load a DAP-enabled page with customization
    When I load the test site with custom DAP parameters
    Then DAP is configured with custom parameters