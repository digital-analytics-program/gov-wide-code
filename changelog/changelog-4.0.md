**These Release Notes cover changes to the GSA Digital Analytics Program (DAP) Federated JavaScript code file (i.e. Universal-Federated-Analytics.js) in this 4.0 release.**

## Features Summary

### Features Now Incorporated into the DAP UA Code
1. Script Source URL (DAP Code Location) Tracking
2. URL Protocol Tracking
3. Event Interaction Type Tracking
4. Source Mapping

### Features Enhanced
1. Use of Operators: Uses of == were updated to ===, and uses of != were updated to !==.
2. _defineCookieDomain() Function: Updated to remove unnecessary “else if” statement.
3. Instances of “dounbleclick” updated to “doubleclick”: This error did not impact functionality or performance in previous versions of DAP. It has been corrected in this version.

### Features Newly Implemented
1. Script Source URL (DAP Code Location) Tracking: The location of the DAP code itself is now stored as a custom dimension called Script Source URL. Example value: https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js
2. URL Protocol Tracking: The protocol of the current page is now stored as a custom dimension called URL Protocol. Example value: https 
3. Event Interaction Type Tracking: For events such as outbound links, email links, and document download links, in addition to tracking these interactions automatically, the DAP code now also passes a value into an Interaction Type custom dimension indicating either “Mouse Click” or “Enter Key Keystroke”. Previously, using the Enter key to open a link was not tracked at all.
4. Source Mapping: Source mapping capabilities have been added to the DAP code, a feature which developers can use to better inspect DAP in various developer tools. 

## Known Issues
### Issue #1: 
The Federated code is designed to work on all government sites whether they already have inline site specific GA trackers or not. There is only one scenario that is not fully supported by the Federated code, which is when a Universal Analytics tracking code (that is using a custom/non-default tracking object) is added right after the Federated code. In this specific scenario the Federated code will fail in reporting the first page hit and will be able to track normally all the consecutive hits. 
Supported Scenarios:

* UA Site Specific before the Federated code (Default Tracking Object)
* UA Site Specific after the Federated code (Default Tracking Object)
* UA Site Specific before the Federated code (Custom Tracking Object)
* Classic GA Site Specific before the Federated code 
* Classic GA Site Specific after the Federated code 


### Issue #2: 
The Federated tracking code doesn’t fully support the older versions of Microsoft Internet Explorer. While the Federated tracking code works with all known browsers, some features (e.g. the YouTube tracker) may not work properly on IE 8 and earlier versions because of YouTube API limitations.
