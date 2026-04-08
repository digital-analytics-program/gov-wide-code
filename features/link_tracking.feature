Feature: Link click tracking with autotracker

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"
    And DAP is configured with autotracking enabled

  Scenario: Clicking the USA banner button fires official_usa_site_banner_click
    When I load the test site
    And I click on element with selector "#banner-button"
    Then a "official_usa_site_banner_click" event is sent to DAP with parameters
    | link_text | Here’s how you know |
    | section   | header        |

  Scenario: Clicking an external email link fires email_click
    When I load the test site
    And I click on element with selector "a[href='mailto:test@domain.com']"
    Then a "email_click" event is sent to DAP with parameters
    | link_text | mailto:[REDACTED_EMAIL] |

  Scenario: Clicking a telephone link fires telephone_click
    When I load the test site
    And I click on element with selector "a[href='tel:+1437-925-1855']"
    Then a "telephone_click" event is sent to DAP with parameters
    | link_text | Telephone [REDACTED_TEL] |

  Scenario: Clicking a file download link reports the download
    When I load the test site
    And I click on a file to download it
    Then the file download is reported to DAP with interaction type "Mouse Click"

  Scenario: Pressing Enter on a file download link reports the download
    When I load the test site
    And I highlight and press Enter on a file to download it
    Then the file download is reported to DAP with interaction type "Keyboard"

  Scenario: File downloads are not tracked when autotracking is disabled
    Given DAP is configured with autotracking disabled
    When I load the test site
    And I click on a file to download it
    Then the file download is not reported to DAP
