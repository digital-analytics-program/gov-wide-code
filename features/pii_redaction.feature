Feature: DAP redacts PII when appropriate

  Background:
    Given I load an empty browser
    And DAP is configured for agency "GSA"

  Scenario: Email addresses are redacted from event parameters
    When I load the test site
    And I execute script "window.gas4('error', {type: 'form', url: 'user@example.com'})"
    Then a "error" event is sent to DAP with parameters
      | type | form             |
      | url  | [REDACTED_EMAIL] |

  Scenario: SSNs are redacted from event parameters
    When I load the test site
    And I execute script "window.gas4('error', {type: 'form', url: '123-45-6789'})"
    Then a "error" event is sent to DAP with parameters
      | type | form           |
      | url  | [REDACTED_SSN] |

  Scenario: Phone numbers are redacted from event parameters
    When I load the test site
    And I execute script "window.gas4('error', {type: 'form', url: '202-555-1234'})"
    Then a "error" event is sent to DAP with parameters
      | type | form           |
      | url  | [REDACTED_TEL] |

  Scenario: Dates of birth are redacted from event parameters when labeled with dob=
    When I load the test site
    And I execute script "window.gas4('error', {type: 'form', url: 'dob=1990-01-15'})"
    Then a "error" event is sent to DAP with parameters
      | type | form           |
      | url  | [REDACTED_DOB] |

  Scenario: Passwords are redacted from event parameters when labeled with password=
    When I load the test site
    And I execute script "window.gas4('error', {type: 'form', url: 'password=mysecret123'})"
    Then a "error" event is sent to DAP with parameters
      | type | form                |
      | url  | [REDACTED_PASSWORD] |

  Scenario: ZIP codes are redacted from event parameters when labeled with zip=
    When I load the test site
    And I execute script "window.gas4('error', {type: 'form', url: 'zip=20001'})"
    Then a "error" event is sent to DAP with parameters
      | type | form           |
      | url  | [REDACTED_ZIP] |

  Scenario: Non-PII data is not redacted from event parameters
    When I load the test site
    And I execute script "window.gas4('error', {type: 'validation', url: '/contact/submit'})"
    Then a "error" event is sent to DAP with parameters
      | type | validation      |
      | url  | /contact/submit |

  Scenario: PII redaction applies to parameters in config calls for DAP property
    Given the page URL has query parameter "search" set to "user@example.com"
    When I load the test site
    Then DAP will set custom dimensions for the DAP property
        | page_location  | http://dap-test-site.local/?query=[REDACTED_EMAIL] |

  Scenario: PII redaction applies to parameters in config calls for parallel tracking properties
    Given the page URL has query parameter "search" set to "user@example.com"
    And DAP is configured with parallel GA4 property "G-111111"
    When I load the test site
    Then DAP will set custom dimensions for the property "G-111111"
      | page_location  | http://dap-test-site.local/?query=[REDACTED_EMAIL] |
