Feature: DAP modifies page_location for 404 pages

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Page title containing "404" sets page_location to a vpv404 path
    When I load the test page "404.html"
    Then DAP will set custom dimensions for the DAP property
    | page_location | http://dap-test-site.local/vpv404/404.html |

  Scenario: Page title containing "not found" sets page_location to a vpv404 path
    When I load the test page "not-found.html"
    Then DAP will set custom dimensions for the DAP property
      | page_location | http://dap-test-site.local/vpv404/not-found.html |

  Scenario: 404 page with a referrer appends the referrer to page_location
    When I load the test site
    And I click on link with href "/404.html" and wait for new page to load
    Then DAP will set custom dimensions for the DAP property
      | page_location | http://dap-test-site.local/vpv404/404.html/http://dap-test-site.local/ |
