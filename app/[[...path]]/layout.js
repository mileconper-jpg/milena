import '../globals.css';
import SiteHeader from '../../components/SiteHeader';
import { Footer } from '../../components/Site';
import { resolveRoute } from '../../content/site';

export default async function RootLayout({ children, params }) {
  const { language, page, copy } = resolveRoute((await params).path) || resolveRoute([]);
  return <html lang={copy.locale} data-scroll-behavior="smooth"><body>
    <a className="skipLink" href="#main">{copy.ui.skip}</a>
    <SiteHeader language={language} page={page} copy={copy}/>
    <main id="main">{children}</main>
    <Footer copy={copy} language={language}/>
  </body></html>;
}
