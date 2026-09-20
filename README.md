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
