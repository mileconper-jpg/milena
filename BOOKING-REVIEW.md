# Live Calendly integration review

Preview: http://127.0.0.1:3100/book-a-call
French: http://127.0.0.1:3100/fr/prendre-rendez-vous
Brazilian Portuguese: http://127.0.0.1:3100/pt/agendar-conversa

## What changed

The existing booking experience now uses the three approved live event URLs. The layout and homepage structure are retained. Booking descriptions and “Book this call” labels were updated in all six website languages. The final contact CTA now says “Book a call” rather than suggesting all conversations last 30 minutes. The separate project enquiry journey still produces an email draft addressed to milena@milenapereira.co; the visible email and approved LinkedIn link remain intact.

## Central configuration

All URLs live in `lib/site-config.mjs`:

- Brand & Product Development, 30 minutes: https://calendly.com/milenapereira/brand-product-development
- Manufacturer & Business Development, 30 minutes: https://calendly.com/milenapereira/manufacturer-business-development
- Introduction / Partnership, 20 minutes: https://calendly.com/milenapereira/introduction-partnership

The optional general URL remains null because it is not needed. Locale overrides remain empty. All six languages use the same three approved event URLs.

## How it works

The existing client component progressively enhances ordinary event links into the official Calendly inline widget. Next.js loads the Calendly script only when a category is selected. One embed is present at a time, with `resize: true` so Calendly adjusts the height. The container reserves responsive space while loading. Each iframe has a descriptive accessible title.

Selection is stored in the URL fragment: #brand, #manufacturer or #intro. Browser back/forward and refresh restore the selected state. Keyboard activation works. Without JavaScript, the category link opens its real Calendly event directly. A clearly labelled external Calendly link remains available beside the embed if loading fails. An email enquiry is still offered separately.

Calendly remains responsible for calendar conflicts, availability, minimum notice, buffers, meeting limits, invitee details, confirmation and Teams conferencing. No website scheduling backend, API keys, analytics dependency or new tracking scripts were added. No existing event-tracking mechanism was found, so analytics integration was not introduced.

Official embed reference: https://calendly.com/help/advanced-calendly-embed-for-developers

## Important live availability finding

On 22 September 2026, all three events loaded but showed no available times in September or October. October was the end of the selectable booking horizon during testing. Consequently date/time selection, invitee-details submission, final confirmation and Teams invitation generation could not be verified. No booking was submitted and no meeting was created.

Please check each event's availability, booking horizon and connected-calendar conflicts in Calendly. The website does not override these settings. Once times are available, the remaining steps should be checked before public launch. The Calendly cookie notice and its own event copy are managed by Calendly, not the website language dictionaries.

## SEO and copy

The approved 21 canonical sitemap URLs and existing robots configuration are unchanged. All six booking routes remain noindex, follow and are excluded from the sitemap. Self-canonicals and the approved search-language alternatives are retained. No structured-data or LinkedIn changes were made in this task. Website-controlled visible copy contains no em dashes; factual claims and unrelated approved copy were preserved.

## Exact files changed in this task

1. `lib/site-config.mjs`: three live event URL values.
2. `components/BookingOptions.js`: progressive event links, descriptive labels, selection history and automatic embed resizing.
3. `content/booking.js`: requested descriptions and booking CTAs in six languages.
4. `content/homepage.js`: final booking CTA labels in EN, FR and PT-BR.
5. `app/globals.css`: responsive initial embed height.
6. `tests/booking.test.mjs`: assert the exact approved events across all languages.
7. `README.md`: current configuration and integration documentation.
8. `BOOKING-REVIEW.md`: this review.

Earlier uncommitted editorial, SEO and redesign files were preserved. No commit, push, deployment, DNS/domain change, Vercel configuration change or email configuration change was performed.

## Validation completed

- All 14 automated tests pass, including SEO, booking configuration, intake validation and zero-em-dash checks.
- All three homepage-to-booking-to-event journeys load the exact approved Calendly destinations.
- Keyboard activation, direct page access, refresh and browser back/forward checked.
- Desktop live embed loaded without console or hydration errors in the initial inspection.
- Real mobile embed checked at 320, 375, 390, 430 and 768 pixels: no horizontal overflow in the site or iframe. Calendly adjusted its height to its content, avoiding an inner vertical scrollbar in the checked availability states.
- Blocked-script fallback and JavaScript-disabled links pass.
- Source diff whitespace checks pass.
- Live booking confirmation remains unverified for the availability reason above.

## Final production validation

The production build passed. Its initial failures were local filesystem timeouts caused by iCloud-offloaded installed dependency files. Generated cache was refreshed and missing Next.js files restored from the integrity-verified archive of the same installed version, 16.3.5. Package manifests and dependency versions were unchanged.

The production browser audit passed across all 90 localized content pages, 96 internal links and 360 viewport checks, with no reported application JavaScript errors. It verified exactly 21 approved sitemap URLs, crawlable robots, canonical URLs, approved hreflang relationships and noindex, follow for every booking route. Existing LinkedIn links retain the supplied destination and secure external-link attributes.

## Screenshots

Saved outside the repository in:
`/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/calendly-review/`

- [desktop-selection.png](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/calendly-review/desktop-selection.png)
- [desktop-calendar.png](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/calendly-review/desktop-calendar.png)
- [mobile-selection.png](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/calendly-review/mobile-selection.png)
- [mobile-calendar.png](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/calendly-review/mobile-calendar.png)

These show the real Calendly availability state, including its current lack of open times. No simulated calendar or invented availability is displayed.

All 18 localized enquiry form flows passed validation, draft generation, copy/edit and long-email checks without sending anything.

## Booking simplification (current implementation)

The entire conversation row is now the selector. There is no separate “Book this call” button or intermediate confirmation. Selecting a row replaces the choices with the corresponding inline calendar, focuses the selected conversation, and scrolls to it while respecting reduced-motion preferences. “Change conversation” returns directly to the three choices.

Contextual Book a Call links on Brands use `?type=brand`; Manufacturers and Presentation Collections use `?type=manufacturer`. `?type=introduction` opens the third event. These presets work on localized booking routes. The main navigation, homepage and footer retain the generic choice screen. Refresh and browser back/forward preserve the correct state; previous hash links remain supported. Event URLs, Calendly settings, sitemap and indexing rules were not changed.

Changed in this simplification: `components/BookingOptions.js`, `components/Site.js`, `content/booking.js`, `app/globals.css`, `README.md`, `BOOKING-REVIEW.md`.

Validation: production build and all 14 existing tests passed. All three generic selectors, all three contextual pages, Change conversation, refresh and browser back/forward passed in the production browser. Responsive checks passed at 320, 375, 390 and 430px. No console or hydration errors were reported. Sitemap remains 21 URLs; booking query URLs remain noindex, follow with clean canonical URLs. Calendly still showed no times in the inspected availability state; no bookings were made.

Latest screenshots:

- [desktop-choices](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/booking-simple/desktop-choices.png)
- [brand-calendar](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/booking-simple/brand-calendar.png)
- [manufacturer-contextual](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/booking-simple/manufacturer-contextual.png)
- [mobile-choices](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/booking-simple/mobile-choices.png)
- [mobile-calendar](/Users/milenapereira/.codex/visualizations/2026/09/18/01a0b4d5-2390-7bc1-b350-d02b90b86d0c/booking-simple/mobile-calendar.png)


## Inline-only booking update (current)

Removed the selected-event heading, Open in Calendly link and Email a request link from the selected state. A conversation row now leads directly to the auto-loading inline calendar, with only Change conversation above it. Row links use internal preset URLs, including when opened in a new tab; they never send visitors to calendly.com. The official Calendly script still manages the iframe and automatic height. A minimal loading message clears when the active Calendly iframe reports event_type_viewed; messages are checked against both origin and iframe source. Failure text asks visitors to reload rather than directing them elsewhere.

The current third preset is `?type=partnership`; earlier `introduction`/`intro` links still work. Generic links retain the three choices, with no numbering or separate action buttons. The Brand and Manufacturer presets and contextual links remain unchanged. The website-controlled selected state does not duplicate Calendly's own event information. Event URLs and Calendly settings have not changed.

Updated files: components/BookingOptions.js, content/booking.js, app/globals.css, README.md and BOOKING-REVIEW.md. No commit, push or deployment.

Inline-only QA: production build and all 14 tests pass. The generic Brand selection and direct brand/manufacturer/partnership presets loaded the actual Calendly iframe without leaving the site. The loading state cleared on Calendly readiness. Desktop and 320/375/390/430px checks passed, with no console/hydration errors and no horizontal overflow. Change conversation restored the choices. The sitemap still contains exactly 21 URLs; query states remain noindex, follow. Keyboard focus now goes to Change conversation instead of drawing a focus outline around the entire calendar container. Calendly still reported no available times in the inspected month; no booking was created.
