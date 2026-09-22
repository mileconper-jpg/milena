# Milena Pereira — Consultancy Website

An editorial Next.js website connecting brands, manufacturers, specialists and markets. English is the default; French, Brazilian Portuguese, Italian, Spanish and Simplified Chinese use dedicated URL prefixes.

## Local development

With Node.js and the existing dependencies available:

```sh
npm install
npm run dev
npm test
npm run build
```

## Content and architecture

- `content/en.js`, `fr.js`, `pt.js`, `it.js`, `es.js` and `zh.js`: core editorial copy.
- `content/commercial.js`: audience positioning, selective manufacturer representation and intake page descriptions.
- `content/forms.js`: translated field labels, guidance, validation and email-draft messages.
- `content/routing.js`: stable page keys and localized URLs, including the three intake journeys. The language selector retains the equivalent page.
- `content/site.js`: shared content composition and approved team profiles. Milena is the only named profile.
- `app/[[...path]]/`: 84 statically generated destinations with localized document language and metadata. Unknown destinations return 404.
- `components/Site.js`: shared editorial page layouts. Project models remain illustrative, not completed client case studies.
- `components/SiteHeader.js`: accessible mobile navigation and language links.
- `components/IntakeForm.js`: accessible, validated intake forms and reviewable email drafts.
- `lib/intake.mjs`: separate schemas for `brand_lead`, `manufacturer_application` and `specialist_application`, with stable field IDs and validation functions for a future private intake service.
- `tests/intake.test.mjs`: validation, translation coverage, safe URL handling and long-email fallback checks.

## Current enquiry handling — email drafts only

The three forms validate entries locally and prepare an email draft. They do **not** send submissions, write to a database or store entries in local/session storage. Visitors must review and send the email using their own email service. The interface states this before and after preparing the draft.

Short drafts can be included in a `mailto:` link. For longer applications, the interface offers the full draft to copy and opens an email with only the recipient and subject, avoiding silent truncation. Clipboard failure has a manual-copy fallback. No files are uploaded; document and portfolio links are accepted. Without JavaScript, form fields are disabled and the direct contact email remains available.

Automatic delivery, centralised application records, private file uploads and a searchable partner database still require a securely configured backend. No external form processor, database, paid service or credentials are included. Any future submission endpoint must revalidate the same fields on the server and implement appropriate access controls, abuse prevention and retention handling before claiming successful delivery or storage.

Field Notes remains a coming-soon editorial destination with an email request link, not an automated subscription system.

## Publishing

Use only the existing `main` → GitHub → Vercel workflow when publication is authorised. Canonical URLs, language alternates and the generated sitemap use the fixed public origin `https://milenapereira.co`. No DNS, mail records or hosting account configuration is changed by the application.

## Search metadata and indexing

`lib/seo.mjs` owns the canonical origin, approved English homepage metadata, social card settings and linked Person, Organization and WebSite entities. Other pages retain their localized titles/descriptions. The homepage in each language includes the same verified entity graph. No social profile or preview image is fabricated; set `SOCIAL_IMAGE` only after an original image is approved.

Production builds emit `index, follow` only for Home, Brands, Manufacturers, Presentation Collections, Specialists, About and Contact in English, French and Brazilian Portuguese (21 URLs). All other public pages emit `noindex, follow`, including every Italian, Spanish and Chinese page. Development and Vercel preview builds emit `noindex, follow`; a Vercel environment without a recognized production designation also remains non-indexable. These values are resolved when pages are built, so production must be built in its production environment rather than reusing a preview build. Canonicals always point to the public domain. Unknown URLs return 404 with Next.js's automatic `noindex`.

`app/robots.js` permits crawling, including CSS, JavaScript and images, and advertises the production sitemap. Crawling remains permitted on previews so crawlers can read their `noindex` directive. The sitemap filters the 84 public routes to the 21 approved canonical URLs. Only those routes advertise reciprocal EN/FR/PT-BR language alternates and `x-default`; no fabricated modification dates are used.

See `SEO-AUDIT.md` for validation results and the post-publication Search Console checklist. Run `npm test` and `npm run build` before publication.

## Homepage contact and editorial assets

`content/homepage.js` contains localized introductions, About headings and contact/booking labels. The homepage sequence is hero → audience choice → three service pillars → About Milena → Global Network → illustrative project models → contact. Team, Specialists and Field Notes retain their existing routes; their homepage teasers are omitted.

`lib/site-config.mjs` holds the three approved live Calendly event URLs in `CALENDLY_BRAND_URL`, `CALENDLY_MANUFACTURER_URL` and `CALENDLY_INTRO_URL`. Every language uses these same event URLs. The optional general URL remains null and locale overrides remain empty. Only HTTPS calendly.com URLs are accepted.

Booking CTAs lead to the localized booking page. Each entire conversation row progressively enhances to Calendly's official inline widget, loaded on demand with automatic resizing. Selection replaces the choices with the calendar; “Change conversation” restores them without an extra page or confirmation step. Booking selections stay on the website and load the official inline calendar. The selected state contains only Change conversation, a minimal loading/error status and Calendly itself; no external booking link or email action is shown there. JavaScript is required for the Calendly embed. Query presets `?type=brand`, `?type=manufacturer` and `?type=partnership` open the corresponding calendar directly and survive refresh and browser back/forward. Previous hash links remain supported. Contextual links on Brands, Manufacturers and Presentation Collections use these presets; the main navigation remains generic. Calendly manages availability, invitee details, conferencing and confirmation; no credentials or scheduling backend are used. Real calendar submissions are excluded from automated QA.

Booking routes are `/book-a-call`, `/fr/prendre-rendez-vous`, `/pt/agendar-conversa`, `/it/prenota-colloquio`, `/es/reservar-llamada` and `/zh/book-a-call`. They use `noindex, follow`, self-canonicals and no search hreflang. The approved 21-URL sitemap is unchanged. Project enquiries continue to use the existing forms.

`EDITORIAL_IMAGES.portrait` uses the approved local PNG portrait, rendered only in the homepage About Milena section. The supplied file is `public/images/846310bb-8612-465a-bea9-75e4187eabd7 (1).png` (1145 × 1374); the previously referenced JPG filename was not present. `.manufacturing` remains null. The portrait uses a 4:5 crop, object-position 50% 35%, localized alt text and lazy responsive Next.js Image loading. To add approved assets later, place local files in `public`, provide their source path, intrinsic width/height and descriptive alt text for each supported language. `EditorialImage` uses Next.js Image, responsive sizes, lazy loading and reserved 4:5 portrait / 16:9 landscape proportions. Review cropping and responsive layouts with the actual approved assets before publication. Never use these slots for unapproved client/factory information.

The Person entity links only to the supplied LinkedIn profile via `sameAs`. The 21-page indexing policy, canonicals, sitemap and robots remain unchanged.
