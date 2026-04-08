Feature: gas4() custom event API

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: gas4() sends a virtual page_view event
    When I load the test site
    And I execute script "window.gas4('page_view', {page_location: '/virtual/page', page_title: 'Virtual Page'})"
    Then a "page_view" event is sent to DAP with parameters
      | page_location | http://dap-test-site.local/virtual/page |
      | page_title    | Virtual Page                            |

  Scenario: gas4() sends a virtual page_view event setting default page title
    When I load the test site
    And I execute script "window.gas4('page_view', {page_location: '/virtual/page'})"
    Then a "page_view" event is sent to DAP with parameters
      | page_location | http://dap-test-site.local/virtual/page |
      | page_title    | DAP test site                            |

  Scenario: gas4() sends a file_download event
    When I load the test site
    And I execute script "window.gas4('file_download', {file_name: '/test.pdf', file_extension: 'pdf', link_text: 'Download Test PDF', link_id: 'download-link', link_url: 'https://example.gov/test.pdf', link_domain: 'example.gov', interaction_type: 'Mouse Click'})"
    Then a "file_download" event is sent to DAP with parameters
      | file_name        | /test.pdf                    |
      | file_extension   | pdf                          |
      | link_text        | Download Test PDF            |
      | link_id          | download-link                |
      | link_url         | https://example.gov/test.pdf |
      | link_domain      | example.gov                  |
      | interaction_type | Mouse Click                  |

  Scenario: gas4() sends a form_start event
    When I load the test site
    And I execute script "window.gas4('form_start', {form_id: 'contact-form', form_name: 'Contact Form', form_destination: '/thank-you', section: 'body'})"
    Then a "form_start" event is sent to DAP with parameters
      | form_id          | contact-form |
      | form_name        | Contact Form |
      | form_destination | /thank-you   |
      | section          | body         |

  Scenario: gas4() sends a form_progress event
    When I load the test site
    And I execute script "window.gas4('form_progress', {form_id: 'contact-form', percent_scrolled: '50'})"
    Then a "form_progress" event is sent to DAP with parameters
      | form_id          | contact-form |
      | percent_scrolled | 50           |

  Scenario: gas4() sends a form_submit event
    When I load the test site
    And I execute script "window.gas4('form_submit', {form_step: 3, form_submit_text: 'Submit'})"
    Then a "form_submit" event is sent to DAP with parameters
      | form_step        | 3        |
      | form_submit_text          | Submit         |

  Scenario: gas4() sends a content_view event
    When I load the test site
    And I execute script "window.gas4('content_view', {content_type: 'article', content_id: '123'})"
    Then a "content_view" event is sent to DAP with parameters
      | content_type | article |
      | content_id   | 123     |

  Scenario: gas4() sends a share event
    When I load the test site
    And I execute script "window.gas4('share', {method: 'twitter', content_type: 'page', item_id: '123'})"
    Then a "share" event is sent to DAP with parameters
      | method       | twitter |
      | content_type | page    |
      | item_id      | 123     |

  Scenario: gas4() sends a social_click event
    When I load the test site
    And I execute script "window.gas4('social_click', {link_url: 'https://twitter.com', social_network: 'twitter'})"
    Then a "social_click" event is sent to DAP with parameters
      | link_url       | https://twitter.com |
      | social_network | twitter             |

  Scenario: gas4() sends an image_click event
    When I load the test site
    And I execute script "window.gas4('image_click', {link_id: 'hero-image', link_url: '/about'})"
    Then a "image_click" event is sent to DAP with parameters
      | link_id  | hero-image |
      | link_url | /about     |

  Scenario: gas4() sends a cta_click event
    When I load the test site
    And I click on element with selector "::-p-text(Learn More)"
    Then a "cta_click" event is sent to DAP with parameters
      | link_text    | <link_text>    |
      | link_domain  | <link_domain>  |
      | link_url     | <link_url>     |
      | link_id      | <link_id>      |
      | link_classes | <link_classes> |
      | outbound     | <outbound>     |
      | section      | <section>      |

  Scenario: gas4() sends a navigation_click event
    When I load the test site
    And I click on element with selector "a[href='#home']"
    Then a "navigation_click" event is sent to DAP with parameters
      | link_text    | <link_text>    |
      | link_domain  | <link_domain>  |
      | link_url     | <link_url>     |
      | link_id      | <link_id>      |
      | link_classes | <link_classes> |
      | outbound     | <outbound>     |
      | section      | <section>      |
      | menu_type    | <menu_type>    |

  Scenario: gas4() sends a was_this_helpful_submit event
    When I load the test site
    And I execute script "window.gas4('was_this_helpful_submit', {selection: 'yes', section: 'footer'})"
    Then a "was_this_helpful_submit" event is sent to DAP with parameters
      | selection | yes    |
      | section   | footer |

  Scenario: gas4() sends a faq_click event
    When I load the test site
    And I click on element with selector "button::-p-text(FAQ)"
    Then a "faq_click" event is sent to DAP with parameters
      | selection | selection 1 |
      | section   | <section>   |

  Scenario: gas4() sends an accordion_click event
    When I load the test site
    And I click on element with selector "button::-p-text(Accordion)"
    Then a "accordion_click" event is sent to DAP with parameters
      | selection | selection 1 |
      | section   | <section>   |

  Scenario: gas4() sends an error event
    When I load the test site
    And I execute script "window.gas4('error', {type: '404', url: '/missing-page'})"
    Then a "error" event is sent to DAP with parameters
      | type | 404           |
      | url  | /missing-page |

  Scenario: gas4() sends a filter event
    When I load the test site
    And I execute script "window.gas4('filter', {filter_selection: 'date', section: 'results'})"
    Then a "filter" event is sent to DAP with parameters
      | filter_selection | date    |
      | section          | results |

  Scenario: gas4() sends a sort event
    When I load the test site
    And I execute script "window.gas4('sort', {sort_selection: 'newest', section: 'results'})"
    Then a "sort" event is sent to DAP with parameters
      | sort_selection | newest  |
      | section        | results |

  Scenario: gas4() with an invalid event name falls back to dap_event
    When I load the test site
    And I execute script "window.gas4('not_a_valid_event', {some_param: 'value'})"
    Then a "dap_event" event is sent to DAP with parameters
      | some_param | value |
