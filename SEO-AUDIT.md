# Technical SEO audit — final launch configuration, 20 September 2026

Changes are local only. No commit, push, deployment, DNS/email change or Vercel configuration change was performed.

## Implemented

- Canonical homepage and metadata base: **https://milenapereira.co**.
- Exact approved English homepage title and description; localized metadata retained for other pages.
- Site name **Milena Pereira** in Open Graph and WebSite structured data; existing visible header and company footer preserved.
- Unique page titles/descriptions within each language, self-referencing canonicals and reciprocal hreflang alternatives.
- Only the 21 approved production pages (seven page types in EN/FR/PT-BR): **index, follow**. The other 63 public production pages: **noindex, follow**. Development/Vercel preview pages: **noindex, follow**. Missing pages retain their intentional noindex and HTTP 404.
- **https://milenapereira.co/robots.txt** allows all user agents and all public resources; advertises **https://milenapereira.co/sitemap.xml**.
- Generated Next.js sitemap: exactly 21 approved public pages in EN/FR/PT-BR, with canonical URLs and reciprocal language alternatives. Other public pages retain self-canonicals but advertise no hreflang alternatives. No invented pages, anchor URLs or last-modified dates.
- Linked JSON-LD entities: **Person, Organization, WebSite**, with stable @id references. Includes verified company name/number, profession and work areas. London, Paris and Rio de Janeiro are areas served, not invented office addresses. Organization is used instead of a LocalBusiness subtype because a public business address has not been verified.
- Open Graph and Twitter summary cards. No fabricated image or social account. `SOCIAL_IMAGE` is an explicit extension point for a future approved image.
- Existing square SVG favicon remains valid and crawlable.
- Project-page headings now follow H1 → H2; generic exploration links have descriptive accessible labels. The semantic fixes preserve appearance. The final launch update changes only the three approved English pillar sentences; the hero introduction remains exact.
- Header client props now contain only navigation content, avoiding serialization of the full locale dictionary on every page.

## Validation

- Production build and separate preview-environment build completed successfully; all 84 public destinations are statically generated.
- Ten automated tests passed, including preview/production indexing, canonical origin, schema references, JSON-LD escaping and existing enquiry validation.
- Browser checks: 84 pages and 84 distinct internal destinations returned 200; 336 responsive checks at 320, 390, 768 and 1440 px passed.
- Each page has one H1 and one main landmark, logical heading levels, one title, one description and one canonical tag. No duplicate titles/descriptions within a language; social titles match page titles.
- No browser console or hydration errors during the 84-page audit. Unknown-page 404 and noindex behavior verified.
- Sitemap contains exactly the 21 approved canonical routes, including the homepage without a trailing slash. Robots and favicon endpoints return successfully.
- Development homepage noindex verified in rendered HTML. A separate build of identical source with VERCEL_ENV=preview verified noindex, follow on all 84 generated public pages. No remote preview deployment was created.
- Mobile navigation, Escape handling, keyboard skip link and meaningful homepage text without JavaScript passed.
- Final homepage screenshots at 390 and 1440 px differ from the pre-copy-change baseline only in the approved pillar text region; page dimensions are unchanged. Projects and brands screenshots are pixel-identical. All other main-content text matches the baseline.
- Performance risk review: static HTML, system fonts, no large content images or external font requests. A local desktop Chrome run at a mobile viewport recorded no layout shift and no long tasks on the homepage. These are local lab observations, **not** measured production Core Web Vitals or a guarantee of passing them. INP and real-user LCP/CLS still need field data in Search Console/PageSpeed Insights. Existing small editorial text and language controls were retained under the approved-design constraint; this was a targeted usability audit, not a full WCAG certification.

## Existing production site (read-only checks)

- HTTPS homepage: HTTP 200 from Vercel; no X-Robots-Tag or robots meta blocking indexing found on the homepage.
- Live title is still the previous title; the local changes have not been published.
- Live sitemap: HTTP 200, 84 entries. Live favicon: HTTP 200.
- Live robots.txt: HTTP 404. The new robots route will become available after an approved deployment.
- HTTP redirects to HTTPS with 308.
- **www.milenapereira.co currently returns 200**, rather than redirecting to the preferred non-www domain. The local metadata consistently nominates the non-www canonical. A permanent www → non-www redirect is a possible later hosting improvement requiring separate approval; no hosting settings were changed here.
- Google indexing status and Google's chosen canonical cannot be verified without access to the relevant Search Console property.

## Manual Google Search Console steps after approval and deployment

1. Open the existing verified property covering `https://milenapereira.co`. If none exists, verify a URL-prefix property using an available verification method; any required verification token must be supplied separately. No token or DNS verification record was invented.
2. Recheck the deployed homepage, robots.txt and sitemap.xml, ensuring production pages say index, follow and use the intended canonical.
3. Submit **https://milenapereira.co/sitemap.xml** under Sitemaps.
4. Inspect **https://milenapereira.co** with URL Inspection, run the live test, and request indexing after the approved changes are live. Check Google's selected canonical and inspect representative language and service pages.
5. Monitor Page Indexing, sitemap processing, HTTPS and Core Web Vitals reports as Google collects data. Structured data can be checked in Schema Markup Validator; not every valid schema type produces a Google rich result.

Google decides whether and when to crawl, index and display results. These changes make the technical signals explicit; they do not guarantee rankings, rich results or indexing times.

## Changed files

- `app/[[...path]]/page.js`
- `app/[[...path]]/layout.js`
- `app/robots.js` (new)
- `app/sitemap.js`
- `app/globals.css` (heading selector only)
- `components/Site.js`
- `lib/seo.mjs` (new)
- `tests/seo.test.mjs` (new)
- `README.md`
- `SEO-AUDIT.md` (new)

Final launch-policy update also changes `content/en.js` (only three approved pillar sentences) and `SEO-STRATEGY.md` (approval decisions and retained next-phase briefs). The hero introduction is unchanged. No service pages or articles were created.
