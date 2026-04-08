Feature: gapim is not a supported API

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Calling gapim() to send a virtual pageview without a title throws a ReferenceError
    When I load the test site
    Then executing script "gapim('send', 'pageview', '/virtual/page')" throws a ReferenceError

  Scenario: Calling gapim() to send a virtual pageview with a title throws a ReferenceError
    When I load the test site
    Then executing script "gapim('send', 'pageview', '/virtual/page', 'My Title')" throws a ReferenceError

  Scenario: Calling gapim() to send an event throws a ReferenceError
    When I load the test site
    Then executing script "gapim('send', 'event', 'category', 'action')" throws a ReferenceError
