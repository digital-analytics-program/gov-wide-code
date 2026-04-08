# DAP's GA4 property is configured to disable most enhanced measurement events.
# The DAP code takes over responsibility for tracking these events, rather than relying on gtag's implementation.
# This test feature verifies DAP's alternative implementation of outbound click and file download tracking.
Feature: Downloads and outbound link clicks are tracked when autotracking is enabled

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Clicking an email link fires email_click when autotracking is enabled
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I click on element with selector "a[href='mailto:test@domain.com']"
    Then a "email_click" event is sent to DAP with parameters
    | link_text | mailto:[REDACTED_EMAIL] |
    | link_domain | domain.com                |
    | outbound | true                     |
    | interaction_type | Mouse Click              |

  Scenario: Clicking an email link does not fire email_click when autotracking is disabled
    Given DAP is configured with autotracking disabled
    When I load the test site
    And I click on element with selector "a[href='mailto:test@domain.com']"
    Then no "email_click" event is sent to DAP

  Scenario: Clicking a telephone link fires telephone_click when autotracking is enabled
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I click on element with selector "a[href='tel:+1437-925-1855']"
    Then a "telephone_click" event is sent to DAP with parameters
    | link_text | Telephone [REDACTED_TEL] |
    | interaction_type | Mouse Click              |

  Scenario: Clicking a telephone link does not fire telephone_click when autotracking is disabled
    Given DAP is configured with autotracking disabled
    When I load the test site
    And I click on element with selector "a[href='tel:+1437-925-1855']"
    Then no "telephone_click" event is sent to DAP

  Scenario: Clicking an outbound link sends a click event when autotracking is enabled
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I click on element with selector "a[href='http://www.gsa.gov/travelpolicy']"
    Then a "click" event is sent to DAP with parameters
      | link_url         | http://gsa.gov/travelpolicy |
      | link_domain      | gsa.gov                         |
      | link_text        | http://gsa.gov/travelpolicy |
      | outbound         | true                            |
      | interaction_type | Mouse Click                     |

  Scenario: Clicking an outbound link does not fire event when autotracking is disabled
    Given DAP is configured with autotracking disabled
    When I load the test site
    And I click on element with selector "a[href='http://www.gsa.gov/travelpolicy']"
    Then no "click" event is sent to DAP

  Scenario: Clicking a file download link reports the download when autotracking is enabled
    When I load the test site
    And I click on a file to download it
    Then a "file_download" event is sent to DAP with parameters
    | file_name        | /about.zip                    |
    | file_extension   | zip                          |
    | link_text        | /about.zip            |
    | link_id          | internalDownload                |
    | link_url         | http://dap-test-site.local/about.zip |
    | link_domain      | dap-test-site.local                 |
    | interaction_type | Mouse Click                  |

  Scenario: Pressing Enter on a file download link reports the download when autotracking is enabled
    When I load the test site
    And I highlight and press Enter on a file to download it
    Then a "file_download" event is sent to DAP with parameters
      | file_name        | /about.zip                    |
      | file_extension   | zip                          |
      | link_text        | /about.zip            |
      | link_id          | internalDownload                |
      | link_url         | http://dap-test-site.local/about.zip |
      | link_domain      | dap-test-site.local                 |
      | interaction_type | Enter Key Keystroke                  |

  Scenario: File downloads are not tracked when autotracking is disabled
    Given DAP is configured with autotracking disabled
    When I load the test site
    And I click on a file to download it
    Then no "file_download" event is sent to DAP
