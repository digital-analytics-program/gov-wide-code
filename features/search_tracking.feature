Feature: DAP reports site searches as view_search_results events

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Page URL with q parameter sends a view_search_results event
    Given the page URL has query parameter "q" set to "searchterm"
    When I load the test site
    Then a "view_search_results" event is sent to DAP with parameters
      | search_term | searchterm |

  Scenario: Page URL with a custom search parameter sends a view_search_results event
    Given DAP is configured with custom search parameter "mysearch"
    And the page URL has query parameter "mysearch" set to "searchterm"
    When I load the test site
    Then a "view_search_results" event is sent to DAP with parameters
      | search_term | searchterm |
