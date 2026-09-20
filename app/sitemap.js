import { allRoutes } from '../content/site';
import { canonicalUrl, isApprovedRoute, languageAlternates } from '../lib/seo.mjs';

export default function sitemap() {
  return allRoutes().filter(({ language, page }) => isApprovedRoute(language, page)).map(({ url, page, language }) => ({
    url: canonicalUrl(url),
    alternates: { languages: languageAlternates(language, page) },
  }));
}
