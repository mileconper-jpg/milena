import { notFound } from 'next/navigation';
import { SITE_URL, HOME_TITLE, HOME_DESCRIPTION, canonicalUrl, routeRobots, languageAlternates, socialMetadata, structuredData, serializeJsonLd } from '../../lib/seo.mjs';
import SitePage from '../../components/Site';
import { allRoutes, pageUrl, resolveRoute } from '../../content/site';

export function generateStaticParams() {
  return allRoutes().map(({ url }) => ({ path: url.split('/').filter(Boolean) }));
}
export async function generateMetadata({ params }) {
  const route = resolveRoute((await params).path);
  if (!route) notFound();
  const { copy, language, page } = route;
  const title = language === 'en' && page === 'home' ? HOME_TITLE : page === 'home' ? `Milena Pereira | ${copy.hero.eyebrow}` : `${copy[page].title} | Milena Pereira`;
  const description = language === 'en' && page === 'home' ? HOME_DESCRIPTION : copy[page]?.intro || (page === 'team' ? copy.team.body : page === 'about' ? copy.about.paragraphs[0] : copy.hero.intro);
  return {
    metadataBase: new URL(SITE_URL),
    title, description,
    robots: routeRobots(language, page),
    ...socialMetadata({ title, description, url: canonicalUrl(pageUrl(language, page)), language }),
    alternates: {
      canonical: canonicalUrl(pageUrl(language, page)),
      languages: languageAlternates(language, page),
    },
  };
}
export default async function Page({ params }) {
  const route = resolveRoute((await params).path);
  if (!route) notFound();
  return <>{route.page === 'home' && <script id="site-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData()) }}/>}<SitePage route={route}/></>;
}
