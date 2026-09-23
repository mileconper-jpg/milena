'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import homepage from '../content/homepage';
import { languages, pageUrl } from '../content/routing';

export default function SiteHeader({ language, page, copy }) {
  const [open, setOpen] = useState(false);
  const header = useRef(null);
  const menuButton = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [language, page]);
  useEffect(() => {
    function dismiss(event) {
      if (!header.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  function escapeMenu(event) {
    if (event.key !== 'Escape') return;
    if (open) {
      setOpen(false);
      menuButton.current?.focus();
    }
  }
  return <header className="siteHeader" ref={header} onKeyDown={escapeMenu}>
    <Link className="brand" href={pageUrl(language)}>MILENA PEREIRA</Link>
    <button className="menuToggle" ref={menuButton} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? copy.ui.close : copy.ui.menu}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="primary-navigation" className={`primaryNav ${open ? 'isOpen' : ''}`} aria-label={copy.ui.navigation}>
      {['brands', 'manufacturers', 'specialists', 'about', 'booking'].map((key, index) => <Link key={key} className={key === 'booking' ? 'navBooking' : undefined} href={pageUrl(language, key)} aria-current={page === key ? 'page' : undefined}>{homepage[language].navigation[index]}</Link>)}
    </nav>
    <nav className="languages" aria-label={copy.ui.languages}>
      {languages.map(item => <Link key={item.code} href={pageUrl(item.code, page)} hrefLang={item.tag} lang={item.tag} aria-label={item.name} aria-current={language === item.code ? 'page' : undefined}>{item.label}</Link>)}
    </nav>
  </header>;
}
