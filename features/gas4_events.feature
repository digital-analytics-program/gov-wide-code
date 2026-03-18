Feature: gas4 helper events are sent to DAP

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Clicking the official USA banner reports the banner event
    When I load the test site
    And I click on element with selector "#banner-button"
    Then the dataLayer contains the event "official_usa_site_banner_click"
      | link_text | Here’s how you know |
      | section | header |

  Scenario: Submitting the form interaction example reports a form_submit event
    When I load the test site
    And I click the submit button in the "gas4()" example of the "gas4() - Form Interaction" section
    Then the dataLayer contains the event "form_submit"
      | form_name | <form_name> |
      | form_id | <form_id> |
      | form_destination | <form_destination> |
      | section | <section> |
      | form_submit_text | <form_submit_text> |

  Scenario: Unsupported gas4 event names fall back to dap_event
    When I load the test site
    And I click link 1 in the "Incorrect Event Name" example of the "gas4() - Social click" section
    Then the dataLayer contains the event "dap_event"
      | link_text | <link_text> |
      | link_domain | <link_domain> |
      | link_url | <link_url> |
      | link_id | <link_id> |
      | link_classes | <link_classes> |
      | social_network | <social_network> |
      | content_type | <content_type> |
      | section | <section> |

  Scenario: gas4 page view reports the provided page title and location
    When I load the test site
    And I call gas4 "page_view" with parameters
      | page_location | /priority-one?page=1 |
      | page_title | Priority One |
    Then the dataLayer contains the event "page_view"
      | page_location | http://localhost/priority-one |
      | page_title | Priority One |

  Scenario: gas4 view_search_results emits the provided search term
    When I load the test site
    And I call gas4 "view_search_results" with parameters
      | search_term | analytics |
    Then the dataLayer contains the event "view_search_results"
      | search_term | analytics |

  Scenario: gas4 with an empty parameter object does not emit an event
    When I load the test site
    And I call gas4 "share" with an empty parameter object
    Then the dataLayer does not contain the event "share"

  Scenario: gas4 with malformed arguments does not emit an event
    When I load the test site
    And I call gas4 with malformed arguments
    Then the dataLayer does not contain the event "share"
