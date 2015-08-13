## Digital Analytics Program government-wide code

Provides a JavaScript file for US federal agencies to link or embed in their websites to participate in the Digital Analytics Program.

The most current version of DAP GA code is:

* [`Universal-Federated-Analytics.js`](Universal-Federated-Analytics.js) (full)
* [`Universal-Federated-Analytics-Min.js`](Universal-Federated-Analytics-Min.js) (minified)

### Participating in the DAP

The central URLs for the Digital Analytics Program JS snippet are:

* `https://dap.digitalgov.gov/Universal-Federated-Analytics.js` (full)
* `https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js` (minified)

Agencies are encouraged to use the following HTML snippet to participate in the Digital Analytics Program:

```html
<!-- We participate in the US government's analytics program. See the data at analytics.usa.gov. -->
<script src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js" id="_fed_an_ua_tag"></script>
```

For more details on implementing the DAP script on your site, please refer to the [DAP Implementation Instructions](http://www.digitalgov.gov/services/dap/analytics-tool-instructions/) and the [Implementation Guide](https://www.digitalgov.gov/files/2015/02/GSA-DAP-UA-Code-Quick-Guide-15-01-30-v1-02_mvf.pdf).

Please note that there are required parts of the script tag syntax, such as `id=_fed_an_ua_tag` as well as `agency` & `subagency` parameters.

#### Transport security

The centrally hosted DAP JS is **only available over HTTPS**. Plain HTTP requests will not be successfully redirected, and data collection will not function. Agencies should use only `https://` URLs, not protocol-relative URLs.

Additionally, an [HTTP Strict Transport Security](https://https.cio.gov/hsts/) header is set with a length of 1 year, and is prepared for preloading into major web browsers. As of this writing, that header looks like this:

```
Strict-Transport-Security: max-age=31536000;preload
```

Browsers that support HSTS and which have observed this HSTS policy (either from a prior visit or through HSTS preloading) will not issue HTTP requests to `dap.digitalgov.gov` at all, even if instructed.

Together, HTTPS and HSTS offer a strong, necessary level of transport security and integrity.

#### Data integrity

The `dap.digitalgov.gov` domain is currently served by a content delivery network that automatically serves the current JavaScript versioned in the `master` branch of this git repository.

**There is no intermediate manual step** between committing to `master` and updating the code on `dap.digitalgov.gov`, though there may be a delay between a commit and a live update.

This means that, assuming GitHub's systems are not compromised in some way, **all** changes to the code that appears on `dap.digitalgov.gov` should be publicly reflected in [this repository's commit history](https://github.com/digital-analytics-program/gov-wide-code/commits/master).

#### Access controls

This repository is maintained in its own GitHub organization, `digital-analytics-program`, and is operated by the Digital Analytics Program team.

Only Digital Analytics Program staff have been granted write access to this repository. All Digital Analytics Program staff with any membership in this GitHub organization are required to have two-factor authentication enabled.
