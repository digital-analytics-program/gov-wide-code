Feature: A site can load the DAP code with varying levels of customization

  Background:
    Given I load an empty browser

  Scenario: Load a DAP-enabled page with agency and subagency
    Given DAP is configured for agency "HHS"
    And DAP is configured for subagency "CDC"
    When I load the test site
    Then DAP will set custom dimensions
      | agency | HHS |
      | subagency | CDC |

  Scenario: Load a DAP-enabled page with agency and site topic and site platform
    Given DAP is configured for agency "GSA"
    And DAP is configured with site topic "Analytics"
    And DAP is configured with site platform "Cloud.gov"
    When I load the test site
    Then DAP will set custom dimensions
    | agency | GSA |
    | site_topic | analytics |
    | site_platform | cloud.gov |