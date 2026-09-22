'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { languages, pageUrl } from '../content/routing';

export default function SiteHeader({ language, page, copy }) {
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const menuButton = useRef(null);
  const services = useRef(null);
  useEffect(() => {
    setOpen(false);
    if (services.current) services.current.open = false;
  }, [language, page]);
  useEffect(() => {
    function dismiss(event) {
      if (!header.current?.contains(event.target)) {
        setOpen(false);
        if (services.current) services.current.open = false;
      }
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  function escapeMenu(event) {
    if (event.key !== 'Escape') return;
    if (services.current?.open) {
      services.current.open = false;
      services.current.querySelector('summary').focus();
    } else if (open) {
      setOpen(false);
      menuButton.current?.focus();
    }
  }
  return <header className="siteHeader" ref={header} onKeyDown={escapeMenu}>
    <Link className="brand" href={pageUrl(language)}>MILENA PEREIRA</Link>
    <button className="menuToggle" ref={menuButton} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? copy.ui.close : copy.ui.menu}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="primary-navigation" className={`primaryNav ${open ? 'isOpen' : ''}`} aria-label={copy.ui.navigation}>
      <details className="servicesMenu" ref={services}>
        <summary>{copy.nav.services}<span aria-hidden="true">+</span></summary>
        <div className="servicesDropdown">
          {['services', 'brands', 'manufacturers', 'presentation'].map(key => <Link key={key} href={pageUrl(language, key)} aria-current={page === key ? 'page' : undefined}>{key === 'services' ? copy.ui.services : copy[key].title}</Link>)}
        </div>
      </details>
      {['team', 'projects', 'about', 'notes', 'contact'].map(key => <Link key={key} href={pageUrl(language, key)} aria-current={page === key ? 'page' : undefined}>{copy.nav[key]}</Link>)}
      <Link className="navBooking" href={pageUrl(language, 'booking')} aria-current={page === 'booking' ? 'page' : undefined}>{copy.booking.title}</Link>
    </nav>
    <nav className="languages" aria-label={copy.ui.languages}>
      {languages.map(item => <Link key={item.code} href={pageUrl(item.code, page)} hrefLang={item.tag} lang={item.tag} aria-label={item.name} aria-current={language === item.code ? 'page' : undefined}>{item.label}</Link>)}
    </nav>
  </header>;
}
