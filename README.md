## Digital Analytics Program government-wide code

Provides a JavaScript file for US federal agencies to link or embed in their websites to participate in the Digital Analytics Program.

The most current version of DAP GA code is:

* [`Universal-Federated-Analytics.js`](Universal-Federated-Analytics.js) (full)
* [`Universal-Federated-Analytics-Min.js`](Universal-Federated-Analytics-Min.js) (minified)

### Central hosting

The central URLs for the Digital Analytics Program JS snippet are:

* `https://dap.digitalgov.gov/Universal-Federated-Analytics.js` (full)
* `https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js` (minified)

Agencies are encouraged to use the following HTML snippet to participate in the Digital Analytics Program:

```html
<!-- We participate in the US government's analytics program. See the data at analytics.usa.gov. -->
<script async id="_fed_an_ua_tag" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js"></script>
```

#### Transport security

The centrally hosted DAP JS is only available over HTTPS. Making any request over HTTP will be immediately redirected to HTTPS.

Additionally, an [HTTP Strict Transport Security](https://https.cio.gov/hsts/) header is set with a length of 1 year, and is prepared for preloading into major web browsers. As of this writing, that header looks like this:

```
Strict-Transport-Security: max-age=31536000;preload
```

Browsers that support HSTS and which have observed this HSTS policy (either from a prior visit or through HSTS preloading) will not issue HTTP requests to `dap.digitalgov.gov` at all, even if instructed.

Together, HTTPS and HSTS offer a strong, necessary level of transport security and integrity.

#### Data integrity

The `dap.digitalgov.gov` domain is currently served by Akamai. Akamai's servers are configured to automatically watch for changes to this repository.

In other words, `dap.digitalgov.gov` serves the **current public version of the DAP code** as versioned in this repository's `master` branch.

Once the code is updated in this repository, the version on `dap.digitalgov.gov` will be **automatically updated within an hour**.

This means that, assuming GitHub's systems are not compromised in some way, **all** changes to the code that appears on `dap.digitalgov.gov` should be publicly reflected in [this repository's commit history](https://github.com/digital-analytics-program/gov-wide-code/commits/master).

#### Access controls

This repository is maintained in its own GitHub organization, `digital-analytics-program`, and is operated by the Digital Analytics Program team.

Only Digital Analytics Program staff have been granted write access to this repository.

**All members of the digital-analytics-program GitHub organization are required to have two-factor authentication enabled.**
