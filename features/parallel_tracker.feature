Feature: A site can use the DAP code with their own parallel GA4 property

  Background:
    Given I load an empty browser

   Scenario: Load a page with parallel GA4 property configured but no custom dimensions
     Given DAP is configured for agency "HHS"
     And DAP is configured for subagency "CDC"
     And DAP is configured with parallel GA4 property "G-111111"
     When I load the test site
     Then DAP will set custom dimensions for the DAP property
           | agency | HHS |
           | subagency | CDC |
           | using_parallel_tracker | pga4 |
     And DAP will configure parallel property "G-111111" without custom dimensions

  Scenario: Load a page with parallel GA4 property configured and custom dimensions enabled
    Given DAP is configured for agency "HHS"
    And DAP is configured for subagency "CDC"
    And DAP is configured with parallel GA4 property "G-111111"
    And DAP is configured to set custom dimensions on the parallel tracker
    When I load the test site
    Then DAP will set custom dimensions for the DAP property
      | agency | HHS |
      | subagency | CDC |
      | using_parallel_tracker | pga4 |
    And DAP will set custom dimensions for the parallel property "G-111111"
      | agency | HHS |
      | subagency | CDC |
      | script_source          | http://localhost:8080/universal-federated-analytics-min.js |
      | version                | 20250702 v8.7 - ga4                                        |
      | protocol               | http:                                                      |
      | hostname_dimension     | localhost                                                  |
      | using_parallel_tracker | pga4                                                         |

  Scenario: Load a page with invalid measurement ID for parallel GA4 property
    Given DAP is configured for agency "HHS"
    And DAP is configured with parallel GA4 property "GTM-ABCDE"
    When I load the test site
    Then DAP will set custom dimensions for the DAP property
      | agency | HHS |
      | using_parallel_tracker | no |
    And DAP will not configure parallel property "GTM-ABCDE"

