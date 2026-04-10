Feature: DAP tracks YouTube video interactions

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"
    And DAP is configured with YouTube tracking enabled
    And I mock the YouTube IFrame API

  Scenario: Starting a video sends a video_start event
    When I load the test page "youtube.html"
    And I wait 1 seconds
    And I simulate YouTube video "7b-fcRQ2Q7k" playing from the beginning
    Then a "video_start" event is sent to DAP with parameters
      | video_provider | youtube     |
      | video_id       | 7b-fcRQ2Q7k |
      | video_title    | Test Video  |
      | video_percent  | 0           |

  Scenario: Pausing a video sends a video_pause event
    When I load the test page "youtube.html"
    And I wait 1 seconds
    And I simulate YouTube video "7b-fcRQ2Q7k" playing from the beginning
    And I simulate YouTube video "7b-fcRQ2Q7k" pausing
    Then a "video_pause" event is sent to DAP with parameters
      | video_provider | youtube     |
      | video_id       | 7b-fcRQ2Q7k |

  Scenario: Resuming a paused video sends a video_play event
    When I load the test page "youtube.html"
    And I wait 1 seconds
    And I simulate YouTube video "7b-fcRQ2Q7k" playing from the beginning
    And I simulate YouTube video "7b-fcRQ2Q7k" pausing
    And I set the YouTube video "7b-fcRQ2Q7k" current time to 25%
    And I simulate YouTube video "7b-fcRQ2Q7k" playing
    Then a "video_play" event is sent to DAP with parameters
      | video_provider | youtube     |
      | video_id       | 7b-fcRQ2Q7k |
      | video_percent  | 25          |

  Scenario: Completing a video sends a video_complete event
    When I load the test page "youtube.html"
    And I wait 1 seconds
    And I simulate YouTube video "7b-fcRQ2Q7k" playing from the beginning
    And I simulate YouTube video "7b-fcRQ2Q7k" completing
    Then a "video_complete" event is sent to DAP with parameters
      | video_provider | youtube     |
      | video_id       | 7b-fcRQ2Q7k |

  Scenario: Video progress is reported at milestone percentages
    When I load the test page "youtube.html"
    And I wait 1 seconds
    And I simulate YouTube video "7b-fcRQ2Q7k" playing from the beginning
    And I set the YouTube video "7b-fcRQ2Q7k" current time to 30%
    And I wait 2 seconds
    Then a "video_progress" event is sent to DAP with parameters
      | video_provider | youtube     |
      | video_id       | 7b-fcRQ2Q7k |
