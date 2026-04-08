Feature: A site can load the DAP code with varying levels of customization

  Background:
    Given I load an empty browser

  Scenario: Load a DAP-enabled page with agency and subagency
    Given DAP is configured for agency "HHS"
    And DAP is configured for subagency "CDC"
    When I load the test site
    Then DAP will set custom dimensions for the DAP property
      | agency | HHS |
      | subagency | CDC |

  Scenario: Load a DAP-enabled page with agency and site topic and site platform
    Given DAP is configured for agency "GSA"
    And DAP is configured with site topic "Analytics"
    And DAP is configured with site platform "Cloud.gov"
    When I load the test site
    Then DAP will set custom dimensions for the DAP property
    | agency | GSA |
    | site_topic | analytics |
    | site_platform | cloud.gov |

  Scenario: Load a DAP-enabled page and check the built-in customer dimensions
    Given DAP is configured for agency "GSA"
    When I load the test site
    Then DAP will set custom dimensions for the DAP property
      | protocol               | http:     |
      | hostname_dimension     | localhost |
      | using_parallel_tracker | no        |
    And the DAP property config has script_source set to the DAP script URL
    And the DAP property config has version matching "\d{8} v\d+\.\d+ - ga4"

  Scenario: Setting cto configures the cookie expiration in the config call
    Given DAP is configured for agency "GSA"
    And DAP is configured with cookie timeout of 1 months
    When I load the test site
    Then DAP will set custom dimensions for the DAP property
      | cookie_expires         | 2628000     |