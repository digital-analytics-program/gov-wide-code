## Digital Analytics Program government-wide code

Provides a JavaScript file for US federal agencies to link or embed in their websites to participate in the Digital Analytics Program.

The most current version of DAP GA code is:

* [`Universal-Federated-Analytics.js`](Universal-Federated-Analytics.js) (full)
* [`Universal-Federated-Analytics-Min.js`](Universal-Federated-Analytics-Min.js) (minified)

### Participating in the DAP

The Digital Analytics Program offers a central hosting server for its JavaScript files at `dap.digitalgov.gov`.

Agencies are encouraged to use the following HTML snippet to participate in the Digital Analytics Program:

```html
<!-- We participate in the US government's analytics program. See the data at analytics.usa.gov. -->
<script async type="text/javascript" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=AGENCY" id="_fed_an_ua_tag"></script>
```

Replace `AGENCY` with your agency's standard abbreviation, such as DHS or EPA.

For more details on implementing the DAP script on your site, including adding other custom parameters, please refer to:
* [DAP Implementation Instructions](https://www.digitalgov.gov/services/dap/analytics-tool-instructions/)
* [Implementation Guide](https://www.digitalgov.gov/files/2014/05/DAP_v3.1_QuickGuide_Aug2016-1.pdf)
* [Code Capabilities Summary](https://www.digitalgov.gov/files/2014/05/DAP_v3.1_CodeSummary_Aug2016-1-1.pdf)
* [Version 3.1 Release Notes](https://www.digitalgov.gov/files/2014/05/DAP_v3.1_ReleaseNotes_Aug2016-1.pdf)

#### Tracking dynamically generated content

Links that are added dynamically to an agency website may be added to the
site after the Digital Analytics Program tracking code has completely loaded.
As a result, these dynamically added links may not be included in the auto
tracking functionality. The solution below outlines a way to re-trigger the
auto tracking functionality once the dynamically loaded links have been
completely added.

##### How to retrigger the auto tracking functionality

The `_initAutoTracker()` function is what the Digital Analytics Program uses to
generate automatic link event tracking. This function should be called once
all links have been added to the page. Note that the below code is an
example, to demonstrate a technical concept. Actual execution on agency
sites may vary.

In the below example, we assume the agency has an existing function,
`addDynamicLinks()`, that normally adds links to the agency site.

```html
<script>
function addDynamicLinks() {
  console.log('Here is where links would be added!');

  // If _initAutoTracker doesn't exist, it's because the DAP
  // script is still being loaded asynchronously; that's fine,
  // since it will automatically call _initAutoTracker() once
  // it loads.

  if (typeof _initAutoTracker === 'function') {
    _initAutoTracker();
  }
}

addDynamicLinks();
</script>
```

#### Transport security

The centrally hosted DAP JS is **only available over HTTPS**. Plain HTTP requests will not be successfully redirected, and data collection will not function. Agencies should use only `https://` URLs, not protocol-relative URLs.

Additionally, an [HTTP Strict Transport Security](https://https.cio.gov/hsts/) header is set with a length of 1 year, and is prepared for preloading into major web browsers. As of this writing, that header looks like this:

```
Strict-Transport-Security: max-age=31536000;preload
```

Browsers that support HSTS and which have observed this HSTS policy (either from a prior visit or through HSTS preloading) will not issue HTTP requests to `dap.digitalgov.gov` at all, even if instructed.

Together, HTTPS and HSTS offer a strong, necessary level of transport security and integrity.

#### Data integrity

The `dap.digitalgov.gov` domain is currently served by a third party content delivery network (CDN) that automatically serves the current JavaScript versioned in the `master` branch of this GitHub repository.

**There is no intermediate manual step** between committing to `master` and updating the code on `dap.digitalgov.gov`, though there may be a delay between a commit and a live update.

This means that, barring the compromise of GitHub's systems or the CDN's systems, **all** changes to the code that appears on `dap.digitalgov.gov` should be publicly reflected in [this repository's commit history](https://github.com/digital-analytics-program/gov-wide-code/commits/master).

#### Access controls

This repository is maintained in its own GitHub organization, `digital-analytics-program`, and is operated by the Digital Analytics Program team.

Only Digital Analytics Program staff have been granted write access to this repository.

**All members of the digital-analytics-program GitHub organization are required to have two-factor authentication enabled.**
