# DAP's YouTube tracker works by registering event listener callbacks for each of the page's YouTube videos using the YouTube iframe API.
# youtube_tracking.feature unit tests the registered callbacks to check that DAP responds correctly to various events.
# In contrast, this integration test confirms that the YouTube iframe API has actually registered DAP's callbacks
Feature: DAP successfully integrates with the YouTube iframe API

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"
    And DAP is configured with YouTube tracking enabled

  # video_start would be a better test but onError is the only YouTube IFrame API event to trigger reliably in the CI environment
  # In any case, this test confirms that DAP has successfully registered its callbacks with the YouTube iframe API
  Scenario: Attempting to play a private YouTube video sends a video_error event to DAP
    When I load the test page "youtube.html"
    And I wait for the YouTube iframe API to load
    And I play YouTube video "zt4t5kOHBig"
    And I wait 3 seconds
    Then a "video_error" event is sent to DAP with parameters
      | videotitle |     |
