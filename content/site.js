import en from './en';
import fr from './fr';
import pt from './pt';
import zh from './zh';
import it from './it';
import es from './es';
import commercial from './commercial';
import forms from './forms';

export const dictionaries = Object.fromEntries(Object.entries({ en, fr, pt, it, es, zh }).map(([code, base]) => {
  const extra = commercial[code];
  return [code, {
    ...base, commercial: extra, forms: forms[code],
    brandEnquiry: extra.brandEnquiry, manufacturerApplication: extra.manufacturerApplication, specialistApplication: extra.specialistApplication,
    audience: { ...base.audience, items: base.audience.items.map((item, i) => [item[0], i === 0 ? extra.brandConcept : i === 1 ? extra.makerConcept : item[1]]) },
    brands: { ...base.brands, services: [...base.brands.services.slice(0, -1), extra.manufacturingStrategy, base.brands.services.at(-1)] },
    manufacturers: { ...base.manufacturers, services: base.manufacturers.services.slice(0, 7) },
    ui: { ...base.ui, join: extra.secondaryLink },
  }];
}));
export { languages, pageUrl } from './routing';
import { languages, slugs, pageUrl } from './routing';

export function resolveRoute(path = []) {
  const [first] = path;
  const language = languages.some(item => item.code !== 'en' && item.code === first) ? first : 'en';
  const parts = language === 'en' ? path : path.slice(1);
  if (parts.length > 1) return null;
  const page = Object.keys(slugs[language]).find(key => slugs[language][key] === (parts[0] || ''));
  return page ? { language, page, copy: dictionaries[language] } : null;
}
export function allRoutes() {
  return languages.flatMap(({ code }) => Object.keys(slugs[code]).map(page => ({ language: code, page, url: pageUrl(code, page) })));
}
export const email = 'milena@milenapereira.co';
export function emailUrl(subject, body) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
}
export const projectDestinations = ['presentation', 'brands', 'contact'];
// Add real, approved profiles here; no empty or speculative profiles are rendered.
export const teamProfiles = [{ id: 'milena', name: 'MILENA PEREIRA', roleKey: 'role', page: 'about' }];
