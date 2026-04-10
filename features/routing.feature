Feature: DAP sends custom events to the correct GA4 properties

  Scenario: DAP sends custom events to base property and parallel properties
    Given I load an empty browser
    And DAP is configured for agency "GSA"
    And DAP is configured with parallel GA4 property "G-1111111111"
    When I load the test site
    And I execute script "window.gas4('error', {type: '404', url: '/missing-page'})"
    Then a "error" event is sent to DAP with parameters
      | send_to | GSA_GA4_ENOR0,GSA_GA4_ENOR1 |
    And the "G-9TNNMGP8WJ" property belongs to the "GSA_GA4_ENOR0" group
    And the "G-1111111111" property belongs to the "GSA_GA4_ENOR1" group

  Scenario: DAP does not send custom events to other properties on the page
    Given I load an empty browser
    And DAP is configured for agency "GSA"
    When I load the test page "agency-tracking-before.html"
    And I execute script "window.gas4('error', {type: '404', url: '/missing-page'})"
    Then a "error" event is sent to DAP with parameters
      | send_to | GSA_GA4_ENOR0 |
    And the "G-9TNNMGP8WJ" property belongs to the "GSA_GA4_ENOR0" group
    And the "G-SITEOWN1" property does not belong to the "GSA_GA4_ENOR0" group