## Digital Analytics Program (DAP) - a Federal Government-wide Analytics Solution

DAP provides a JavaScript file for US federal agencies to link or embed in their website(s) to participate in the Digital Analytics Program. Participating agencies are granted access to the reporting portal with real-time and historical summary and detailed-level data by GSA's DAP team. DAP top-level summary real-time and historical data are also reported publicly on https://analytics.usa.gov/ 

### DAP Participation is a Requirement

On September 22, 2023, the Office of Management and Budget (OMB) released a memorandum on ["Delivering a Digital-First Public Experience"](https://www.whitehouse.gov/wp-content/uploads/2023/09/M-23-22-Delivering-a-Digital-First-Public-Experience.pdf), which requires federal agencies to implement the DAP javascript code on all public-facing federal websites. The requirement was originally introduced on November 8, 2016, in the OMB memorandum M-17-06 "Policies for Federal Agency Public Websites and Digital Services."

### DAP Code

DAP offers a central hosting server for its minified JavaScript file at `https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js`. As of August 2018, the file is gzipped and served compressed by default, but will be served uncompressed where `Accept-Encoding: gzip` is not present in the viewer. 

The latest version 8.1 of DAP GA code contains GA4 tracking only. DAP UA data collection and reporting was removed on June 24, 2024 in prepration for a global sunset of UA on July 1, 2024.

* [`Universal-Federated-Analytics.js`](Universal-Federated-Analytics.js) (full)
* [`Universal-Federated-Analytics-Min.js`](Universal-Federated-Analytics-Min.js) (minified)
* [`Federated.js.map`](Federated.js.map) (source map)

### DAP Code Implementation

Agencies should use the following HTML snippet to participate in the Digital Analytics Program. Note: replace `AGENCY` with their agency's standard acronym (e.g. DHS, EPA, GSA, DOC etc.)

```
<!-- We participate in the US government's analytics program. See the data at analytics.usa.gov. -->
<script async type="text/javascript" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=AGENCY" id="_fed_an_ua_tag"></script>
```

### DAP Documentation and Resources

For more details about the DAP script capabilities, steps for adding DAP code to your website (including implementing with a tag manager), using custom parameters, DAP training etc., please refer to:
* [DAP GA4 Release Notes](https://github.com/digital-analytics-program/gov-wide-code/wiki/DAP-Release-Notes)
* [DAP GA4 Technical Quick Guide](https://github.com/digital-analytics-program/gov-wide-code/wiki/DAP-Quick-Technical-Guide)
* [DAP GA4 Tracking Capabilities Summary](https://github.com/digital-analytics-program/gov-wide-code/wiki/DAP-Code-Capabilities-Summary)
* [DAP GA4 Custom Events Implementation Example](https://github.com/digital-analytics-program/gov-wide-code/wiki/DAP-Custom-Event-Tracking)
* [DAP Wiki: a one-stop place for DAP technical instructions and training resources](https://github.com/digital-analytics-program/gov-wide-code/wiki)
* [Digital.gov Guide to the Digital Analytics Program](https://digital.gov/guide/dap/add-your-site-dap/#participating-in-the-program)

#### Known implementation limitations

The Federated DAP code is designed to work on all government sites, whether they
already have inline, site-specific/independent GA tracking or not. Specific
supported scenarios include:

* GA4 Site Specific before the Federated code (Default Tracking Object)
* GA4 Site Specific after the Federated code (Default Tracking Object)
* GA4 Site Specific before the Federated code (Custom Tracking Object)
* GA4 Site Specific after the Federated code (Custom Tracking Object)
* Classic GA Site Specific before the Federated code
* Classic GA Site Specific after the Federated code

*Limitation:* There is one scenario where the Federated DAP
Analytics code fails: when an agency Universal Analytics tracking code (not DAP)
uses a custom/non-default tracking object and it is added right after the Federated
code. In this specific scenario, the Federated code will fail in reporting the first page
hit and will be able to track normally all the consecutive hits.

#### Browser support

The DAP code is written to be compatible with a broad range of browsers [supports](.browserslistrc) supported by the [Google Tag Manager (GTM)](https://developers.google.com/tag-platform/support/supported-browsers). NOTE: As of July 2024, [GTM and DAP no longer support Internet Explorer](https://support.google.com/tagmanager/answer/4620708#july2nd). On browsers not supported by DAP, user visits to websites may record limited to no analytics events.

#### Transport security

The centrally hosted DAP JS is **only available over HTTPS**. Agencies should use only `https://` URLs, not protocol-relative URLs.

Additionally, an [HTTP Strict Transport Security](https://https.cio.gov/hsts/) header is set with a length of 1 year, and is prepared for preloading into major web browsers. As of this writing, that header looks like this:

```
Strict-Transport-Security: max-age=31536000;preload
```

Browsers that support HSTS and which have observed this HSTS policy (either from a prior visit or through HSTS preloading) will not issue HTTP requests to `dap.digitalgov.gov` at all, even if instructed.

Together, HTTPS and HSTS offer a strong, necessary level of transport security and integrity.

#### Content Security Policy

A Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks to your website, including Cross-Site Scripting (XSS) and data injection attacks. In order to incorporate the DAP JS into your site which includes a Content Security Policy, add the DAP domain and necessary Google domains to your allowed script sources. Also add the Google Analytics domain to your allowed connect sources. Example follows:

```
Content-Security-Policy: script-src https://dap.digitalgov.gov https://www.google-analytics.com https://www.googletagmanager.com; connect-src https://www.google-analytics.com;
```

This whitelists the DAP domain and necessary Google domains as trusted sources for JavaScript downloads to your site. In order to make your CSP as restrictive and secure as possible, use `script-src` rather than `default-src` to only permit JavaScript to be included from these domains and no other file types. The `connect-src` directive allows the DAP JavaScript code to connect to the Google Analytics domain in order to send analytics data from your site to Google Analytics.

#### Data integrity

The `dap.digitalgov.gov` domain is currently served by a third party content delivery network (CDN) that serves the current JavaScript referenced in the `master` branch of this GitHub repository.

Before any change of the JavaScript being served by the CDN, the owners of this repository will update the file located in the `master` branch of the repo.

This means that, barring the compromise of GitHub's systems or the CDN's systems, all changes to the code that appears on `dap.digitalgov.gov` should be publicly reflected in [this repository's commit history](https://github.com/digital-analytics-program/gov-wide-code/commits/master).

#### Appropriate Placement

The Digital Analytics Program Javascript code must be applied to public-facing websites. Public-facing websites are defined as websites whose primary intended users are not Federal government employees or contractors.

#### Authenticated or "Priviledged" Pages

Agencies are expected to add DAP code to sign-in pages that serve as the entry point to authenticated content on public-facing sites. Implementation of the DAP code beyond this entry point on authenticated pages is permitted on a case-by-case basis only, with DAP's approval and testing as a prerequisite.

This decision tree may help:

![Decision Tree](/documentation/DAP%20Code%20Placement%20Decision%20Tree%20(2).png)

#### Access controls

This repository is maintained in its own GitHub organization, `digital-analytics-program`, and is operated by the Digital Analytics Program team.

Only Digital Analytics Program staff have been granted write access to this repository.

**All members of the digital-analytics-program GitHub organization are required to have two-factor authentication enabled.**
