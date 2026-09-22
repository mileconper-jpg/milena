// Insert only Milena's approved Calendly URLs. Event URLs take precedence.
export const CALENDLY_URL = null;
export const CALENDLY_BRAND_URL = 'https://calendly.com/milenapereira/brand-product-development';
export const CALENDLY_MANUFACTURER_URL = 'https://calendly.com/milenapereira/manufacturer-business-development';
export const CALENDLY_INTRO_URL = 'https://calendly.com/milenapereira/introduction-partnership';
// Optional locale overrides: en/fr/pt/it/es/zh: { brand, manufacturer, intro, general }.
export const CALENDLY_LOCALES = {};
export const CALENDLY_CONFIG = {
  general: CALENDLY_URL, brand: CALENDLY_BRAND_URL,
  manufacturer: CALENDLY_MANUFACTURER_URL, intro: CALENDLY_INTRO_URL,
  locales: CALENDLY_LOCALES,
};
export function calendlyUrl(category, language, config = CALENDLY_CONFIG) {
  const local = config.locales?.[language] || {};
  const value = local[category] || config[category] || local.general || config.general;
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['calendly.com', 'www.calendly.com'].includes(url.hostname)
      && !url.username && !url.password && !url.port ? url.href : null;
  } catch { return null; }
}
export const LINKEDIN_URL = 'https://www.linkedin.com/in/milenacp/';

// Approved local assets only. Leave null to render complete text-only layouts.
// Future shape: { src: '/images/...', width, height, alt: { en, fr, pt, it, es, zh } }.
export const EDITORIAL_IMAGES = {
  portrait: {
    src: '/images/846310bb-8612-465a-bea9-75e4187eabd7 (1).png',
    width: 1145,
    height: 1374,
    alt: {
      en: 'Milena Pereira, fashion product, manufacturing and business development consultant',
      fr: 'Milena Pereira, consultante en développement produit, fabrication et développement commercial dans la mode',
      pt: 'Milena Pereira, consultora de produto, fabricação e desenvolvimento de negócios na moda',
      it: 'Milena Pereira, consulente di prodotto, manifattura e sviluppo commerciale nella moda',
      es: 'Milena Pereira, consultora de producto, fabricación y desarrollo de negocio en moda',
      zh: 'Milena Pereira，时尚产品、制造与业务拓展顾问',
    },
  },
  manufacturing: null,
};

