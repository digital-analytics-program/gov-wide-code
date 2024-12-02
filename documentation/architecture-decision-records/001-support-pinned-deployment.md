# 1. Publish DAP as an NPM package and promote self-hosting

## Status

Proposed

## Context

When the DAP code was first released in 2013, the only way to include it on a site was to manually copy the JS file from the DAP Git repo to the site's own hosting infrastructure. In 2015, the DAP team [started hosting](https://digital.gov/2015/08/14/secure-central-hosting-for-the-digital-analytics-program/) the DAP script on a team-managed CDN and, since then, we have encouraged users to load DAP from this centrally hosted location. We've always acknowledged that self-hosting is still an option, but the documentation "strongly recommends" that users adopt the centrally hosted approach "to allow the DAP team to seamlessly push the latest versions of the DAP code to agencies". Currently, almost half of DAP-enabled websites self-host the DAP code - notably, the ones who self-host arguably are the most security conscious of our users (most .mil sites, for instance).

Because DAP is required to be installed on every public-facing, non-authenticated federal website, a compromise of the CDN hosting the DAP code would have wide-ranging security effects. Since the DAP team is responsible for managing that CDN, we would no doubt be held at least partly responsible for such a compromise. Since around 2018, browsers have universally supported a technology called [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity), which can detect when a file downloaded from a CDN has been altered from its original published state and block the file from loading. Recently, the DAP team has received inquiries about SRI support from several of our customers. Unfortunately, given current technology, the only way to take advantage of SRI's guarantees is to pin your site to a specific version of the third-party library that you are including. This places the user back facing the same tradeoff that they face with self-hosting - if you pin your site to a specific version of DAP, then you can be assured of the code's integrity, but you no longer automatically receive security fixes. Former leaders of the DAP team have acknowledged this trade-off but have emphasized the difficulty in getting the thousands of DAP-enabled websites to update their DAP dependencies on a regular basis, which has lead them to favor the centrally-hosted approach.

This ADR proposes that we re-examine this security trade-off (code integrity vs. automated security updates) and recommends that we start to give more weight to the code integrity risk. This recommendation reflects a change in circumstances since the original decision was made in 2015:
1. New tools for semi-automatically managing dependency updates have been introduced and become popular since 2015 (exp., Dependabot, acquired by GitHub in 2019) and, for teams who are willing to integrate such tools, dependency rot is not inevitable.
2. Of the 40 releases since 2015, only X% have included security updates. DAP is a small codebase with no external dependencies - it's not overly hubristic to think that we could mostly avoid releasing versions containing security flaws.

## Decision

We will:
1. Publish the DAP library as an NPM package, providing a way to "self-host" that can be managed by automated dependency management tools like Dependabot.
2. Continue to offer the DAP library as a dynamic download on our CDN, because not to do so would break many, many sites.
3. Update our documentation to describe the tradeoffs of each deployment option instead of pushing a single recommendation for the centrally-hosted option.

### Other Options Considered

As mentioned above, Subresource Integrity is an alternative strategy for guaranteeing code integrity and one that some of our users have asked about. To support SRI, we would need to add versioned URL's in our CDN and publish an integrity hash with each release. Then the user's site would load DAP with a tag like:
````
<script
  async
  type="text/javascript"
  id="_fed_an_ua_tag"
  src="https://dap.digitalgov.gov/8.4.0/Universal-Federated-Analytics-Min.js?agency=GSA"
  integrity="sha384-oQnH00RIpS8knvsqCwBGQ8tRzR0hA1l/ZWvuWTHJnODXyxsM9p1485KnouST5GHb"
  crossorigin="anonymous"
></script>
````

Subresource integrity has pros and cons vs. npm-managed self-hosting:

Pros of SRI:
- For a very simple static site that has no build process, including the DAP third-party script tag is easier than introducing npm and other build tools.

Cons of SRI:
- There's no way for Dependabot or a similar tool to manage version numbers in the URL of a script tag.
- Without self-hosting, there's no easy way to security scan the referenced library as part of your own site's build process.

Our recommendation is to publish DAP as an NPM package as a first step and then add support for SRI if there continues to be a demand for it.

## Consequences

The expected consequence of this change is that more sites will start doing the equivalent of self-hosting DAP and thus more sites will be using older versions of DAP.

The benefit is that, with more teams using pinned, verified versions of DAP, we will have a better security story to tell in case the DAP CDN is ever compromised. The more security-conscious of our users will be pleased that we've made it easier for them to "self-host".

The downside includes all of the reasons we've encouraged sites to use the dynamic centrally-hosted version - self-hosted installations don't automatically receive new features and fixes (including security fixes). We will need to think more carefully about our support for our "self-hosted" users:
- Do everything we can to ensure that DAP users are notified of new releases
   - Publish GitHub releases that users can subscribe to be notified about
   - Packaging for npm means that users can use Dependabot to manage updates
- Release new features in batches so that users don't have update constantly to get new features
- Test releases thoroughly so that users don't have to update to fix versions very often
- Think carefully about backwards compatibility when planning releases
- Take SemVer and release notes seriously