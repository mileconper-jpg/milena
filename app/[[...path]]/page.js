import { notFound } from 'next/navigation';
import SitePage from '../../components/Site';
import { allRoutes, languages, pageUrl, resolveRoute } from '../../content/site';

export function generateStaticParams() {
  return allRoutes().map(({ url }) => ({ path: url.split('/').filter(Boolean) }));
}
export async function generateMetadata({ params }) {
  const route = resolveRoute((await params).path);
  if (!route) notFound();
  const { copy, language, page } = route;
  const title = page === 'home' ? `Milena Pereira | ${copy.hero.eyebrow}` : `${copy[page].title} | Milena Pereira`;
  const description = copy[page]?.intro || (page === 'team' ? copy.team.body : page === 'about' ? copy.about.paragraphs[0] : copy.hero.intro);
  return {
    metadataBase: new URL(process.env.SITE_URL || 'https://milenapereira.co'),
    title, description,
    alternates: {
      canonical: pageUrl(language, page),
      languages: Object.fromEntries([...languages.map(item => [item.tag, pageUrl(item.code, page)]), ['x-default', pageUrl('en', page)]]),
    },
  };
}
export default async function Page({ params }) {
  const route = resolveRoute((await params).path);
  if (!route) notFound();
  return <SitePage route={route}/>;
}
