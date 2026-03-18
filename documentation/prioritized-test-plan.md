# Prioritized Test Plan for `Universal-Federated-Analytics.js`

## Priority 1

These cover the highest-value public behavior with the least setup risk.

1. `gas()` legacy API
   - `gas('send','pageview', ...)` emits `page_view`
   - `gas('send','pageview', ..., title)` uses explicit title
   - `gas('send','event', ...)` emits `dap_event`
   - `gas('send','event', ...)` defaults `event_value` to `0` when missing or invalid
   - `gas('send','event', ..., nonInteraction=true)` maps `non_interaction`
   - invalid `gas()` calls do not emit unexpected events

2. `gas4()` core helper coverage
   - `gas4('page_view', {...})` emits `page_view`
   - unsupported `gas4()` name falls back to `dap_event`
   - supported event with empty params object still emits event
   - `gas4()` with malformed args does not emit
   - `gas4('view_search_results', ...)` explicit call emits expected event

3. Autotracker link classifications
   - internal `mailto:` emits `email_click`
   - external `mailto:` emits `email_click`
   - formatted telephone link emits `telephone_click`
   - invalid or ignored telephone link does not emit
   - generic external link emits `click`
   - social share link emits `share`

4. Existing config behavior hardening
   - agency-only config sets expected defaults
   - omitted site topic/platform fall back to `unspecified:<domain>`
   - autotracker toggle off suppresses tracked click classes beyond downloads

## Priority 2

These cover important user-visible functionality but need a bit more page interaction logic.

1. `gas4()` event family matrix
   - `social_click`
   - `share`
   - `navigation_click`
   - `accordion_click`
   - `faq_click`
   - `cta_click`
   - `content_view`
   - `sort`
   - `filter`
   - `error`
   - `was_this_helpful_submit`

2. Parameter-shape resilience
   - “incorrect parameter” examples still emit the supported event name
   - emitted payload preserves only provided keys
   - invalid event name plus valid payload falls back to `dap_event`

3. Search and querystring handling
   - page URL with search param emits `view_search_results`
   - search term is preserved in event payload
   - non-search query params are scrubbed from tracked page location
   - allowlisted agency query params remain in tracked page location
   - disallowed query params are removed

4. Dynamic DOM tracking
   - dynamically inserted links are tracked by autotracker
   - dynamic downloadable link emits `file_download`

## Priority 3

These are valuable but slower, more brittle, or likely to need harness work.

1. HTML5 media tracking
   - video start
   - video pause
   - video progress milestone
   - video complete
   - audio start/pause/progress/complete if applicable on page

2. YouTube tracking
   - YouTube enabled loads tracker and emits `video_start`
   - emits `video_play`
   - emits `video_pause`
   - emits `video_progress`
   - emits `video_complete`
   - handles player error with `video_error`

3. Environment/config toggles
   - `youtube=true` enables YouTube tracking
   - `htmlvideo=false` suppresses HTML5 media tracking
   - `webvitals=true` or homepage conditions inject/report vitals behavior
   - dev env switches GA property ID as expected
   - production/staging query handling stays correct

4. Parallel/custom-dimension variants
   - parallel tracker custom dimension mapping
   - alternate dimension names via query params
   - script source / protocol / hostname dimensions present when expected

## Priority 4

These are lower ROI or better suited to unit-style tests around pure helpers.

1. URL/PII sanitization internals
   - scrub email-like values from URLs
   - scrub phone-like values
   - nested querystring redaction
   - allowed-querystring merging behavior
   - object-to-query / query-to-object round trips where relied upon

2. Defensive/error-tolerance paths
   - malformed URLs do not break tracking
   - missing `dataLayer` initialization path recovers
   - bad media state changes do not throw
   - missing banner element is harmless

## Recommended Rollout

1. Add `10-15` Priority 1 scenarios first.
2. Add `10-12` Priority 2 scenarios next.
3. Decide whether media/video coverage belongs in Cucumber or a thinner harness.
4. Cover the remaining helper/sanitization logic with lower-level tests if possible.
