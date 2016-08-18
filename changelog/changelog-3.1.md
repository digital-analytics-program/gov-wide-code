## DAP Version 3.1

These Release Notes cover changes to the GSA Digital Analytics Program (DAP) Federated JavaScript code file (i.e. Universal-Federated-Analytics.js) in this 3.1 release.
Note that in this 3.1 release, the ability to implement the GSA DAP code from within Google Tag Manager (GTM) has been added.

### What happened to DAP 3.0?
During the production of DAP 3.0, items that had been deemed originally out of
scope (such as upgrading the YouTube API) were incorporated. The public release
includes items that were originally scoped as a 3.1 release.

###Features Summary
Features Now Incorporated into the DAP UA Code
1. Google Tag Manager (GTM) Compatibility
2. Forcing HTTPS (Google Analytics and YouTube)
3. Asynchronous Loading Support
4. Site Topic Parameter
5. Site Platform Parameter
6. Enabling Cross Sub-Domain Tracking
7. YouTube API Update

### Features Enhanced
1. gas Function: Updated the gas function to enable users to send custom
events with only two parameters (Event Category and Event Action).
2. YouTube Tracking Updates: This is a bug fix to eliminate a potential conflict
between the YouTube tracker and other scripts on the agencies’ websites.

### Features Removed
The DAP Code offers agencies the capability to send data to their own Google
Analytics property, as long as that property UA ID is implemented via the DAP
Code using the pua parameter. Agencies can also choose which custom
dimension slot number they would like to send custom dimension data like
Agency and Sub-Agency to (i.e. slot 4 instead of slot 1 in Google Analytics), or
disable these custom dimension values from being sent to their property.
However, a bug was discovered where when agencies use these features to
choose a different slot or disable these custom dimensions, it also impacts the
main GSA DAP Google Analytics property. This can result in these custom
dimensions not being included or being sent to the wrong slot in the GSA DAP
property. To fix this bug, the ability for agencies to change slot numbers of the
custom dimensions or disable the custom dimensions reported to the main GSA
DAP property has been removed. Agencies will continue have the power to
decide on which slot to report custom dimensions or disable custom
dimensions for their site-specific GA account only.

### Features Newly Implemented
1. Google Tag Manager (GTM) Compatibility​: Now the deployment of the
Federated code through Google Tag Manager is supported.
2. Forcing HTTPS​: The analytics.js and youtube.com/iframe_api libraries will be
forced to always load via https on all pages, even in cases when the host
page is not secure (i.e. http). In previous versions of the DAP code, these
libraries were called using a relative protocol. If the agency site host pages
were secure they would have been called using https, but if the host pages
were not secure they would have been called using http.
3. Asynchronous Loading Support​: An option to load the DAP code
asynchronously, which will prevent potential render blocking when
referencing the DAP code from central hosting on dap.digitalgov.gov.
4. Site Platform Parameter​: The capability for agencies to provide which web
platform they are using and pass this value to GA as a custom dimension.
Examples might include: Drupal, Wordpress, Federalist, etc. This is an
optional feature, and agencies are encouraged to strategize and standardize
the use of these parameters with the agency DAP POC.
5. Site Topic Parameter​: Similarly to the site platform, now agencies are able
to pass their site topic with the DAP code implementation. Examples of site
topics might include: Health, Finance, Environment, etc. This is an optional
feature, and agencies are encouraged to strategize and standardize the use
of these parameters with the agency DAP POC.
6. Cross Subdomain Tracking​: The default setup of Google Analytics and the
Federated code is designed to track content and visitor data for a single
domain, such as www.usa.gov. This means a new referral campaign will be
created whenever users navigate across domains and subdomains.
With the new Universal Analytics’ referral exclusion list, the DAP code needed
to be updated to match how GA works and to ignore referral subdomains,
which share the same hostname defined in the sdor parameter. This update
was incorporated in this release.
7. YouTube API Update​: In order to track embedded YouTube video
interaction events, previous versions of the DAP code utilized the YouTube
JavaScript Player API, which is now deprecated. This release of the DAP code
instead utilizes the recommend YouTube iFrame Player API.

### Known Issues
Issue #1​: The Federated code is designed to work on all government sites whether
they already have inline site specific GA trackers or not. There is only one scenario
that is not fully supported by the Federated code, which is when a Universal
Analytics tracking code (that is using a custom/non-default tracking object) is added
right after the Federated code. In this specific scenario the Federated code will fail
in reporting the first page hit and will be able to track normally all the consecutive
hits.
Supported Scenarios:
● UA Site Specific before the Federated code (Default Tracking Object)
● UA Site Specific after the Federated code (Default Tracking Object)
● UA Site Specific before the Federated code (Custom Tracking Object)
● Classic GA Site Specific before the Federated code
● Classic GA Site Specific after the Federated code

Issue #2​: The Federated tracking code doesn’t fully support the older versions of
Microsoft Internet Explorer. While the Federated tracking code works with all
known browsers, some features (e.g. the YouTube tracker) may not work properly
on IE 8 and earlier versions because of YouTube API limitations.
