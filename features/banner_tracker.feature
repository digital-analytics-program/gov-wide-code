Feature: DAP tracks clicks on any 'Official website of the US government' banner

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Clicking the USA banner button fires official_usa_site_banner_click
    When I load the test site
    And I click on element with selector "#banner-button"
    Then a "official_usa_site_banner_click" event is sent to DAP with parameters
      | link_text | Here's how you know |
      | section   | header        |