**These Release Notes cover changes to the GSA Digital Analytics Program (DAP) Federated JavaScript code file (i.e. Universal-Federated-Analytics.js) in this 4.0 release.**

## Features Summary

### Features Now Incorporated into the DAP UA Code
1. XHR Transport Mechanism

### Features Enhanced
1. Style Cleanup: Inspired by Pull Request #67 on the Gov Wide Code GitHub
repository, some styling changes have been updated to improve consistency.
2. Alternate Tag Snippet: In order to address Issue #72 in the Gov Wide Code
GitHub repository, we realized that an alternate method for adding the Gov Wide
Code was needed. This alternate method enables easier dynamic use of
parameters (for example, when you only want to enable the YouTube tracking
parameter on certain pages). We’ve updated our code and documentation to
support this case. See “Dynamically Inject DAP Library” on page 10 of the Quick
Guide for details.

### Features Newly Implemented
1. XHR Transport Mechanism: By default, Google Analytics uses an image based
transport mechanism for sending hits to Google’s servers. We updated the DAP
code in this release to default to the XHR transport mechanism instead. This
update enables DAP users to apply CSP policies geared towards protecting
against content injection attacks targeting <img> tags, without having to make
special allowances for Google Analytics hostnames. If users would like to change
the transport mechanism of DAP to image or beacon, they can do so using a new
supported parameter. Special thanks to the Login.gov team and Eric Mill for
raising this request and providing additional context.

## Known Issues

### Issue #1: The Federated code is designed to work on all government sites whether they
already have inline site specific GA trackers or not. There is only one scenario that is not
fully supported by the Federated code, which is when a Universal Analytics tracking
code (that is using a custom/non-default tracking object) is added right after the
Federated code. In this specific scenario the Federated code will fail in reporting the first
page hit and will be able to track normally all the consecutive hits.
Supported Scenarios:
* UA Site Specific before the Federated code (Default Tracking Object)
* UA Site Specific after the Federated code (Default Tracking Object)
* UA Site Specific before the Federated code (Custom Tracking Object)
* Classic GA Site Specific before the Federated code
* Classic GA Site Specific after the Federated code

### Issue #2: The Federated tracking code doesn’t fully support the older versions of
Microsoft Internet Explorer. While the Federated tracking code works with all known
browsers, some features (e.g. the YouTube tracker) may not work properly on IE 8 and
earlier versions because of YouTube API limitations.
