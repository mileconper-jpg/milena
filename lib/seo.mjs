import { languages, pageUrl } from '../content/routing.js';

export const SITE_URL = 'https://milenapereira.co';
export const SITE_NAME = 'Milena Pereira';
export const HOME_TITLE = 'Milena Pereira | Fashion Product, Manufacturing & Business Development';
export const HOME_DESCRIPTION = 'Milena Pereira is a fashion and luxury consultant specialising in product development, collection strategy, manufacturing, sourcing, supply chain and international business development.';

// Add an approved, original image here when available: { url, width, height, alt }.
// The favicon is not a social preview image.
export const SOCIAL_IMAGE = null;

export function isIndexable(env = process.env) {
  if (env.NODE_ENV !== 'production') return false;
  if (env.VERCEL_ENV) return env.VERCEL_ENV === 'production';
  if (env.VERCEL) return false;
  return true; // A production build hosted outside Vercel.
}

export const INDEXABLE_LANGUAGES = ['en', 'fr', 'pt'];
export const INDEXABLE_PAGES = ['home', 'brands', 'manufacturers', 'presentation', 'specialists', 'about', 'contact'];

export function isApprovedRoute(language, page) {
  return INDEXABLE_LANGUAGES.includes(language) && INDEXABLE_PAGES.includes(page);
}

export function routeRobots(language, page, env = process.env) {
  return { index: isIndexable(env) && isApprovedRoute(language, page), follow: true };
}

export function languageAlternates(language, page) {
  if (!isApprovedRoute(language, page)) return undefined;
  return Object.fromEntries([
    ...languages.filter(item => INDEXABLE_LANGUAGES.includes(item.code)).map(item => [item.tag, canonicalUrl(pageUrl(item.code, page))]),
    ['x-default', canonicalUrl(pageUrl('en', page))],
  ]);
}

export function canonicalUrl(path = '/') {
  return path === '/' ? SITE_URL : new URL(path, SITE_URL).href;
}

export function socialMetadata({ title, description, url, language }) {
  const locales = { en: 'en_GB', fr: 'fr_FR', pt: 'pt_BR', it: 'it_IT', es: 'es_ES', zh: 'zh_CN' };
  return {
    openGraph: {
      type: 'website', siteName: SITE_NAME, title, description, url,
      locale: locales[language],
      // Search language alternatives are controlled separately by languageAlternates.
      ...(SOCIAL_IMAGE ? { images: [SOCIAL_IMAGE] } : {}),
    },
    twitter: {
      card: SOCIAL_IMAGE ? 'summary_large_image' : 'summary', title, description,
      ...(SOCIAL_IMAGE ? { images: [SOCIAL_IMAGE] } : {}),
    },
  };
}

export function structuredData() {
  const person = `${SITE_URL}/#person`;
  const organization = `${SITE_URL}/#organization`;
  const website = `${SITE_URL}/#website`;
  const areas = ['Product development', 'Collection strategy', 'Manufacturing', 'Sourcing', 'Supply chain', 'Business development'];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': person, name: SITE_NAME, url: SITE_URL,
        jobTitle: 'Fashion and luxury consultant', knowsAbout: areas,
        worksFor: { '@id': organization }, mainEntityOfPage: SITE_URL,
      },
      {
        '@type': 'Organization', '@id': organization,
        name: 'MILENA PEREIRA LIMITED', legalName: 'MILENA PEREIRA LIMITED', url: SITE_URL,
        description: HOME_DESCRIPTION,
        identifier: { '@type': 'PropertyValue', propertyID: 'UK company number', value: '16738640' },
        employee: { '@id': person }, knowsAbout: areas,
        areaServed: ['London', 'Paris', 'Rio de Janeiro'].map(name => ({ '@type': 'City', name })),
      },
      {
        '@type': 'WebSite', '@id': website, name: SITE_NAME, url: SITE_URL,
        publisher: { '@id': organization }, about: { '@id': person },
        inLanguage: ['en', 'fr', 'pt-BR', 'it', 'es', 'zh-CN'],
      },
    ],
  };
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
