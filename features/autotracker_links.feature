Feature: Autotracker reports supported non-download link interactions

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Autotracker reports external mail links
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I click link 1 with text "mailto:test@domain.com" in the "Email Click" section
    Then the dataLayer contains the event "email_click"
      | link_url | [REDACTED_EMAIL] |
      | link_domain | domain.com |
      | link_text | mailto:[REDACTED_EMAIL] |
      | outbound | true |
      | interaction_type | Mouse Click |

  Scenario: Autotracker reports formatted telephone links
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I click link 1 with text "Telephone +1437-925-1855" in the "Telephone Click" section
    Then the dataLayer contains the event "telephone_click"
      | link_url | [REDACTED_TEL] |
      | link_text | Telephone [REDACTED_TEL] |
      | interaction_type | Mouse Click |

  Scenario: Autotracker reports generic external clicks
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I click link 1 with text "http://www.gsa.gov/travelpolicy" in the "External Links" section
    Then the dataLayer contains the event "click"
      | link_domain | gsa.gov |
      | outbound | true |
      | interaction_type | Mouse Click |

  Scenario: Autotracker reports addtoany share links
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I add an external share link to the page
    And I click the injected link with selector "#dynamicShareLink"
    Then the dataLayer contains the event "share"
      | method | facebook |
      | content_name | Travel Policy |
      | shared_via | add to any: facebook |
      | content_type | content |
      | content_url | https://gsa.gov/travelpolicy |
      | outbound | true |
      | interaction_type | Mouse Click |

  Scenario: Autotracker disabled suppresses generic external clicks
    Given DAP is configured with autotracking disabled
    When I load the test site
    And I click link 1 with text "http://www.gsa.gov/travelpolicy" in the "External Links" section
    Then the dataLayer does not contain the event "click"
