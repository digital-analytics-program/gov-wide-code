Feature: gas() custom event API

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: gas() sends a virtual pageview
    When I load the test site
    And I execute script "window.gas('send', 'pageview', '/virtual/page')"
    Then a "page_view" event is sent to DAP with parameters
      | page_location | http://localhost/virtual/page |
      | page_title    | DAP test site                      |

  Scenario: gas() sends a virtual pageview with a custom title
    When I load the test site
    And I execute script "window.gas('send', 'pageview', '/virtual/page', 'My Custom Title')"
    Then a "page_view" event is sent to DAP with parameters
      | page_location | http://localhost/virtual/page |
      | page_title    | My Custom Title                    |

  Scenario: gas() sends a custom event
    When I load the test site
    And I execute script "window.gas('send', 'event', 'test_category', 'test_action', 'test_label', 1)"
    Then a "dap_event" event is sent to DAP with parameters
      | event_category  | test_category |
      | event_action    | test_action   |
      | event_label     | test_label    |
      | event_value     | 1             |
      | non_interaction | false         |

  Scenario: gas() sends a custom event with only category and action
    When I load the test site
    And I execute script "window.gas('send', 'event', 'only_category', 'only_action')"
    Then a "dap_event" event is sent to DAP with parameters
      | event_category  | only_category |
      | event_action    | only_action   |
      | event_label     |               |
      | event_value     | 0             |
      | non_interaction | false         |
