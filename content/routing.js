export const languages = [
  { code: 'en', label: 'EN', name: 'English', tag: 'en' },
  { code: 'fr', label: 'FR', name: 'Français', tag: 'fr' },
  { code: 'pt', label: 'PT', name: 'Português', tag: 'pt-BR' },
  { code: 'it', label: 'IT', name: 'Italiano', tag: 'it' },
  { code: 'es', label: 'ES', name: 'Español', tag: 'es' },
  { code: 'zh', label: '中文', name: '简体中文', tag: 'zh-CN' },
];
// Stable page keys keep language switches on the equivalent translated page.
export const slugs = {
  en: { home: '', services: 'services', brands: 'brands', manufacturers: 'manufacturers', presentation: 'presentation-collections', specialists: 'specialists', team: 'team', projects: 'projects', about: 'about', notes: 'field-notes', contact: 'contact' },
  fr: { home: '', services: 'services', brands: 'marques', manufacturers: 'fabricants', presentation: 'collections-de-presentation', specialists: 'specialistes', team: 'equipe', projects: 'projets', about: 'a-propos', notes: 'carnet-de-terrain', contact: 'contact' },
  pt: { home: '', services: 'servicos', brands: 'marcas', manufacturers: 'fabricantes', presentation: 'colecoes-de-apresentacao', specialists: 'especialistas', team: 'equipe', projects: 'projetos', about: 'sobre', notes: 'notas-de-campo', contact: 'contato' },
  it: { home: '', services: 'servizi', brands: 'brand', manufacturers: 'produttori', presentation: 'collezioni-di-presentazione', specialists: 'specialisti', team: 'team', projects: 'progetti', about: 'chi-sono', notes: 'note-dal-campo', contact: 'contatti' },
  es: { home: '', services: 'servicios', brands: 'marcas', manufacturers: 'fabricantes', presentation: 'colecciones-de-presentacion', specialists: 'especialistas', team: 'equipo', projects: 'proyectos', about: 'sobre-milena', notes: 'notas-de-campo', contact: 'contacto' },
  zh: { home: '', services: 'services', brands: 'brands', manufacturers: 'manufacturers', presentation: 'presentation-collections', specialists: 'specialists', team: 'team', projects: 'projects', about: 'about', notes: 'field-notes', contact: 'contact' },
};
const bookingRoutes = { en: 'book-a-call', fr: 'prendre-rendez-vous', pt: 'agendar-conversa', it: 'prenota-colloquio', es: 'reservar-llamada', zh: 'book-a-call' };
for (const [locale, slug] of Object.entries(bookingRoutes)) slugs[locale].booking = slug;
const intakeRoutes = {
  en: ['brand-enquiry', 'manufacturer-application', 'specialist-application'],
  fr: ['demande-marque', 'candidature-fabricant', 'candidature-specialiste'],
  pt: ['consulta-marca', 'candidatura-fabricante', 'candidatura-especialista'],
  it: ['richiesta-brand', 'candidatura-produttori', 'candidatura-specialisti'],
  es: ['consulta-marca', 'solicitud-fabricantes', 'solicitud-especialistas'],
  zh: ['brand-enquiry', 'manufacturer-application', 'specialist-application'],
};
for (const [locale, routes] of Object.entries(intakeRoutes)) {
  ['brandEnquiry', 'manufacturerApplication', 'specialistApplication'].forEach((key, i) => { slugs[locale][key] = routes[i]; });
}
export function pageUrl(language, page = 'home') {
  return '/' + [language === 'en' ? '' : language, slugs[language][page]].filter(Boolean).join('/');
}
