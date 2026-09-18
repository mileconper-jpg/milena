import { allRoutes, languages, pageUrl } from '../content/site';

// The existing public domain; SITE_URL can override it for another approved environment.
export default function sitemap() {
  const origin = process.env.SITE_URL || 'https://milenapereira.co';
  return allRoutes().map(({ url, page }) => ({
    url: new URL(url, origin).href,
    alternates: { languages: Object.fromEntries(languages.map(item => [item.tag, new URL(pageUrl(item.code, page), origin).href])) },
  }));
}
