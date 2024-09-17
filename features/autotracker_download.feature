Feature: Downloads are reported to DAP when autotracking is enabled

  Background:
    Given I load an empty browser

  Scenario: User clicks to download file with autotracker on
    When I load the test site with autotracker enabled
    And I click on a file to download it
    Then the file download is reported to DAP with interaction type "mouse click"

  Scenario: User presses Enter to download file with autotracker on
    When I load the test site with autotracker enabled
    And I highlight and press Enter on a file to download it
    Then the file download is reported to DAP with interaction type "enter key keystroke"

  Scenario: User clicks to download file with autotracker off
    When I load the test site with autotracker disabled
    And I click on a file to download it
    Then the file download is not reported to DAP