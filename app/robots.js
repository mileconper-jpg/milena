import { SITE_URL } from '../lib/seo.mjs';

export default function robots() {
  // Keep resources crawlable. Preview/development HTML uses noindex metadata;
  // blocking crawling here would prevent a crawler from seeing that directive.
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
