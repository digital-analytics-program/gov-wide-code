Feature: gas legacy helper calls are reported to DAP

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: gas pageview without title reports the current document title
    When I load the test site
    And I click link 1 with text "Pageview without title" in the "gas() - Custom Events / Pageviews / Custom Dimensions / Custom Metrics (Federated Only)" section
    Then the dataLayer contains the event "page_view"
      | page_location | http://localhost/dir/virtual-page?query=term |
      | page_title | DAP test site |

  Scenario: gas pageview with title reports the provided page title
    When I load the test site
    And I click link 1 with text "Pageview with title" in the "gas() - Custom Events / Pageviews / Custom Dimensions / Custom Metrics (Federated Only)" section
    Then the dataLayer contains the event "page_view"
      | page_location | http://localhost/dir/virtual-page |
      | page_title | virtual page title |

  Scenario: gas event reports a dap_event payload
    When I load the test site
    And I click link 1 with text "Event" in the "gas() - Custom Events / Pageviews / Custom Dimensions / Custom Metrics (Federated Only)" section
    Then the dataLayer contains the event "dap_event"
      | event_category | category event |
      | event_action | action event |
      | event_label | label event |
      | event_value | 10 |

  Scenario: gas event supports non-interaction events
    When I load the test site
    And I click link 1 with text "Custom Dimension" in the "gas() - Custom Events / Pageviews / Custom Dimensions / Custom Metrics (Federated Only)" section
    Then the dataLayer contains the event "dap_event"
      | event_category | custom dimension |
      | event_action | slot 9 |
      | event_label | dimension value |
      | event_value | 0 |
      | non_interaction | true |

  Scenario: invalid gas calls do not emit a dap_event
    When I load the test site
    And I call gas with invalid arguments
    Then the dataLayer does not contain the event "dap_event"
