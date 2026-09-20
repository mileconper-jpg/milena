import '../globals.css';
import SiteHeader from '../../components/SiteHeader';
import { Footer } from '../../components/Site';
import { resolveRoute } from '../../content/site';

export default async function RootLayout({ children, params }) {
  const { language, page, copy } = resolveRoute((await params).path) || resolveRoute([]);
  return <html lang={copy.locale} data-scroll-behavior="smooth"><body>
    <a className="skipLink" href="#main">{copy.ui.skip}</a>
    <SiteHeader language={language} page={page} copy={{ nav: copy.nav, ui: { close: copy.ui.close, menu: copy.ui.menu, navigation: copy.ui.navigation, services: copy.ui.services, languages: copy.ui.languages }, ...Object.fromEntries(['brands', 'manufacturers', 'presentation'].map(key => [key, { title: copy[key].title }])) }}/>
    <main id="main">{children}</main>
    <Footer copy={copy} language={language}/>
  </body></html>;
}
