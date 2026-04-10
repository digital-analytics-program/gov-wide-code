Feature: GA4 beacon contains expected parameters

  Background:
    Given I load an empty browser
    And I set the browser to intercept outbound requests
    And DAP is configured for agency "GSA"

  Scenario: GA4 beacon includes the page URL and title
    When I load the test site
    And I wait 5 seconds
    Then there is a GA4 request with parameters
      | dl | http://localhost:8080/ |
      | dt | DAP test site          |

  Scenario: GA4 beacon includes the document referrer when navigating from another page
    When I load the test site
    And I load the test page "404.html"
    And I wait 5 seconds
    Then there is a GA4 request with parameters
      | dl | http://localhost:8080/404.html |
      | dr | http://localhost:8080/         |
