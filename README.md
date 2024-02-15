## Digital Analytics Program Government-wide Code

Provides a JavaScript file for US federal agencies to link or embed in their websites to participate in the Digital Analytics Program.
The latest code collects both DAP Universal Analytics and GA4 data as part of the same tag.

The latest version of DAP GA code contains dual tracking code for both Universal Analytics (UA) and GA4: 

* [`Universal-Federated-Analytics.js`](Universal-Federated-Analytics.js) (full DAP GA4)
* [`Universal-Federated-Analytics-Min.js`](Universal-Federated-Analytics-Min.js) (minified DAP GA4)
* [`Federated.js.map`](Federated.js.map) (source map)

### Participating in the DAP

On September 22, 2023, the Office of Management and Budget (OMB) released a memorandum on ["Delivering a Digital-First Public Experience"](https://www.whitehouse.gov/wp-content/uploads/2023/09/M-23-22-Delivering-a-Digital-First-Public-Experience.pdf), which requires federal agencies to implement the DAP javascript code on all public-facing federal websites. The requirement was originally introduced on November 8, 2016, in the OMB memorandum M-17-06 "Policies for Federal Agency Public Websites and Digital Services."

The Digital Analytics Program offers a central hosting server for its minified JavaScript file at `https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js`. As of August 2018, the file is gzipped and served compressed by default, but will be served uncompressed where `Accept-Encoding: gzip` is not present in the viewer.

Agencies are encouraged to use the following HTML snippet to participate in the Digital Analytics Program:

```html
<!-- We participate in the US government's analytics program. See the data at analytics.usa.gov. -->
<script async type="text/javascript" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=AGENCY" id="_fed_an_ua_tag"></script>
```

Replace `AGENCY` with your agency's standard abbreviation, such as DHS or EPA.

For more details about the DAP script capabilities, steps for adding DAP code to your website (including implementing with a tag manager), using custom parameters, DAP training etc., please refer to:
* [DAP Universal Analytics/GA4 Dual Tracking Release Notes](https://github.com/digital-analytics-program/gov-wide-code/blob/master/documentation/GSA%20DAP%206.9%20-%20Release%20Notes.pdf)
* [DAP Universal Analytics/GA4 Dual Tracking Quick Guide](https://github.com/digital-analytics-program/gov-wide-code/blob/master/documentation/GSA%20DAP%206.9%20Quick%20Guide.pdf)
* [DAP Universal Analytics/GA4 Dual Tracking Capabilities Summary](https://github.com/digital-analytics-program/gov-wide-code/blob/master/documentation/GSA%20DAP%206.9%20-%20DAP%20Code%20Capabilities%20Summary%20and%20Reference.docx.pdf)
* [Guide to the Digital Analytics Program](https://digital.gov/guide/dap/add-your-site-dap/#participating-in-the-program)


#### Known implementation limitations

The Federated DAP code is designed to work on all government sites, whether they
already have inline, site-specific/independent GA tracking or not. Specific
supported scenarios include:

* UA/GA4 Site Specific before the Federated code (Default Tracking Object)
* UA/GA4 Site Specific after the Federated code (Default Tracking Object)
* UA/GA4 Site Specific before the Federated code (Custom Tracking Object)
* GA4 Site Specific after the Federated code (Custom Tracking Object)
* Classic GA Site Specific before the Federated code
* Classic GA Site Specific after the Federated code

*Limitation:* There is one scenario where the Federated DAP
Analytics code fails: when an agency Universal Analytics tracking code (not DAP)
uses a custom/non-default tracking object and it is added right after the Federated
code. In this specific scenario, the Federated code will fail in reporting the first page
hit and will be able to track normally all the consecutive hits. 

*Limitation:* The Federated DAP code doesn’t fully support older versions of
Microsoft Internet Explorer. While the Federated DAP code works with all known
browsers, some features (e.g. the YouTube tracker) may not work properly on
Internet Explorer 8 and earlier versions due to limitations in the YouTube API.

#### Transport security

The centrally hosted DAP JS is **only available over HTTPS**. Agencies should use only `https://` URLs, not protocol-relative URLs.

Additionally, an [HTTP Strict Transport Security](https://https.cio.gov/hsts/) header is set with a length of 1 year, and is prepared for preloading into major web browsers. As of this writing, that header looks like this:

```
Strict-Transport-Security: max-age=31536000;preload
```

Browsers that support HSTS and which have observed this HSTS policy (either from a prior visit or through HSTS preloading) will not issue HTTP requests to `dap.digitalgov.gov` at all, even if instructed.

Together, HTTPS and HSTS offer a strong, necessary level of transport security and integrity.

#### Data integrity

The `dap.digitalgov.gov` domain is currently served by a third party content delivery network (CDN) that serves the current JavaScript referenced in the `master` branch of this GitHub repository.

Before any change of the JavaScript being served by the CDN, the owners of this repository will update the file located in the `master` branch of the repo.

This means that, barring the compromise of GitHub's systems or the CDN's systems, all changes to the code that appears on `dap.digitalgov.gov` should be publicly reflected in [this repository's commit history](https://github.com/digital-analytics-program/gov-wide-code/commits/master).

#### Appropriate Placement

The Digital Analytics Program Javascript code is intended to be implemented on "public-facing" federal government webpages. Public-facing web pages are defined as those that can be accessed by the general public and not internal government personnel.

#### Authenticated or "Priviledged" Pages

Authenticated or “priviledged” public-facing pages require elevated privacy and security measures to prevent collection sensitive and PII information inadvertently placed in URL strings. The DAP script tag implementation on public-facing authenticated pages is only allowed on a case by case basis and after it is approved by the GSA DAP. The use of the DAP script on authenticated pages without the approval of DAP will result in suspension of web analytics data collection and reporting. To learn more about using DAP on authenticated public-facing pages, contact DAP at @dap@gsa.gov.

This decision tree may help:

![Decision Tree](/documentation/DAP-critera.png)

#### Access controls

This repository is maintained in its own GitHub organization, `digital-analytics-program`, and is operated by the Digital Analytics Program team.

Only Digital Analytics Program staff have been granted write access to this repository.

**All members of the digital-analytics-program GitHub organization are required to have two-factor authentication enabled.**
