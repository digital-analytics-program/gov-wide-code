Feature: Downloads are reported to DAP when autotracking is enabled

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: User clicks to download file with autotracker on
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I click on a file to download it
    Then the file download is reported to DAP with interaction type "Mouse Click"

  Scenario: User presses Enter to download file with autotracker on
    Given DAP is configured with autotracking enabled
    When I load the test site
    And I highlight and press Enter on a file to download it
    Then the file download is reported to DAP with interaction type "Enter Key Keystroke"

  Scenario: User clicks to download file with autotracker off
    Given DAP is configured with autotracking disabled
    When I load the test site
    And I click on a file to download it
    Then the file download is not reported to DAP
