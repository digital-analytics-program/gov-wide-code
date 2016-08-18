
## DAP Version 2.0

#### Bugs Fixed

* Change Event Category label to "Download" (from "Downloads")
* Google Analytics tracking not occurring for particular versions of Internet Explorer (versions 8 and 9 reported)
* Reporting of 404 errors via a (virtual) pageview

#### Features

* The YouTube API change; code was adjusted to accommodate the change
* Update to how the SetDomain function handles domains and subdomain reporting
* Update the code to use the `attachEvent` method instead of the `addeventListener` and to use `document.readyState === "complete"` instead of DOMContentLoaded for browsers that don’t support the `addeventListener` and `DOMContentLoaded` methods (i.e. IE 8 and older)

#### SetDomain Function Changes

A new option was added for the `sdor` parameter:

* Agencies can now set the specific level of sub-domains they wish to track separately or together
* The previous values still function properly
* In addition, DAP UA Code v1.04 consistently sets the 1st-level domain to `www.domain.gov` cookie rather than `domain.gov` cookie

The prior version of the Federated code had two settings when it comes to sub-domains:

1. Track sub-domains individually (default)
2. Track sub-domains together

The SetDomain setting will impact both the domain cookie (cross-domain tracking) and the AutoTracker outbound links function.

Previously, the settings only allowed for scenarios where users move between 2-level sub-domains. Now, the code will report for users moving from 2-level to 3-or 4-level sub-domains. The code also consistently sets the 1st-level domain to `www.domain.gov`, rather than to the root.

New logic:

**i. The "auto" option (currently set to "true"):**

This is what is set by "default", i.e. if nothing is defined, "auto" will be used. The "auto" setting tells the script to use the current JavaScript value `location.hostname` for the GA cookie domain (i.e. `site.com` or `domain.site.com`) as well as for the AutoTracker outbound links function, i.e. any links outside the current hostname will be treated as an external link.

Example: Tracking domains/sub-domains individually (`sdor=auto` or `sdor=true`)

Where current hostname = nih.gov:

```
setDomain="auto"
```

Anything outside nih.gov is treated as outbound (i.e. external):

* nidcr.nih.gov (external)
* nimh.nih.gov (external)
* t.sub.nidcr.nih.gov (external)

**ii. `_setDomainName('custom value')` option (currently set to "false"):**

This option is defining a custom value for setDomainName. This is what you should do on a case where you have sub-domains involved and you want to track them together. All sub-domains of the current domain will be linked and links between these portals will be considered internal links.

Example 1: Tracking sub-domains together (`sdor=irs.gov`)

```
setDomain="irs.gov"
```

* irs.gov (internal)
* money.irs.gov (internal)
* tax.money.irs.gov (internal)

Example 2: Tracking sub-domains together (`sdor=nidcr.nih.gov`)

```
setDomain="nidcr.nih.gov"
```

* nidcr.nih.gov (internal)
* sub.nidcr.nih.gov (internal)

#### Possible Impact on Data

* Possible increase in New Sessions for a short period of time.
* Possible increases in the number of new users (because returning users may get recorded as new for the first visit after the code update).
* Possible increase or decrease (depending on the sub-domain settings) on the number of pages per session and average session duration.
* Disappearance of "Downloads" events because of the change of Event Category naming convention to "Download".
