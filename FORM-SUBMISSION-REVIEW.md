# Direct form submission review

Reviewed 28 September 2026. Recommendation only; the live form behaviour has not changed.

## Current implementation

`components/IntakeForm.js` is shared by brand enquiries, manufacturer applications and specialist applications. It validates fields in the browser, creates a draft and offers clipboard or mailto actions. `lib/intake.mjs` provides reusable field schemas and validation. There is no delivery endpoint in this implementation. Existing consent explicitly says information is not sent or stored by the form.

## Recommended experience

Keep the existing fields, page layouts and languages. Replace draft preparation with a Submit enquiry / Submit application action. Show a pending state, then an accessible confirmation after the server accepts the submission. Preserve entered details on failure and offer a retry. No email application or copy/paste should be required.

## Recommended delivery

Use one Next.js POST endpoint with a transactional email service such as Resend. Deliver all three types to the existing destination, milena@milenapereira.co. Use a verified sender and set Reply-To to the validated applicant address. The recipient and subject templates must be controlled by the server, never by arbitrary request input.

Required setup before activation: a delivery-service account, a server-only API key, and a verified sending domain or subdomain. Resend requires domain verification. This may require separate DNS work, which is not authorized in this review. Do not alter existing mailbox/MX settings. An already configured delivery service can be used instead after its configuration is confirmed. Never paste API keys into conversation or expose them in browser code.

## Implementation requirements

- Reuse schemas but validate types, lengths, allowed flow, select values and consent again on the server. Limit request size.
- Add spam protection and a shared rate limit suitable for serverless deployment; do not rely on an in-memory counter alone.
- Prevent double submissions and use provider idempotency for retries.
- Send plain text or safely escaped HTML. Do not log submitted personal information.
- Update consent/privacy text in every language: the current statement that the form does not send information would become false. Explain delivery and processing accurately, including provider retention; do not promise that nothing is stored.
- Distinguish provider acceptance from confirmed inbox delivery. A success message must not claim Milena has read the submission or that delivery is guaranteed.
- Use disabled/pending controls, accessible status/error announcements and preserved form values on failure.
- Keep booking, SEO, routes and the 21-URL sitemap unchanged.

## Validation before launch

Test all three forms with mocked delivery: valid submission, invalid fields/consent, oversized request, spam/rate limit, duplicate retry, provider rejection, timeout and missing configuration. Check localized success/error states, keyboard navigation and mobile layout. No real messages should be sent without authorization. After account setup, separately authorize a controlled delivery test and verify receipt/reply behaviour before deployment.

## Sources

- https://resend.com/docs/send-with-nextjs
- https://resend.com/docs/dashboard/domains/introduction

No packages, application code, DNS, email settings or Vercel configuration were changed for this review. No messages were sent.
