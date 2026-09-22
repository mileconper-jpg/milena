'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { pageUrl } from '../content/routing';
import { calendlyUrl } from '../lib/site-config.mjs';

export default function BookingOptions({ copy, language }) {
  const searchParams = useSearchParams();
  const preset = searchParams.get('type');
  const [selected, setSelected] = useState(null);
  const choices = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const calendar = useRef(null);
  const panel = useRef(null);
  const options = copy.options.map(option => ({ ...option, url: calendlyUrl(option.id, language) }));
  const active = options.find(option => option.id === selected);
  useEffect(() => {
    const syncSelection = () => {
      const raw = new URLSearchParams(window.location.search).get('type') || window.location.hash.slice(1);
      const id = ['introduction', 'partnership'].includes(raw) ? 'intro' : raw;
      setSelected(copy.options.some(option => option.id === id) ? id : null);
    };
    syncSelection();
    window.addEventListener('popstate', syncSelection);
    window.addEventListener('hashchange', syncSelection);
    return () => {
      window.removeEventListener('popstate', syncSelection);
      window.removeEventListener('hashchange', syncSelection);
    };
  }, [copy.options, preset]);
  function choose(event, id) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const url = new URL(window.location.href);
    url.hash = '';
    url.searchParams.set('type', id === 'intro' ? 'partnership' : id);
    if (selected !== id) window.history.pushState(null, '', url.pathname + url.search);
    setLoaded(false);
    setSelected(id);

  }
  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [active?.url]);
  useEffect(() => {
    if (!active?.url || loaded) return;
    const timeout = window.setTimeout(() => setFailed(true), 20000);
    return () => window.clearTimeout(timeout);
  }, [active?.url, loaded]);
  useEffect(() => {
    if (!active?.url || !ready || !window.Calendly || !calendar.current) return;
    const container = calendar.current;
    setLoaded(false);
    function onMessage(event) {
      if (event.origin !== 'https://calendly.com' || event.source !== container.querySelector('iframe')?.contentWindow) return;
      if (event.data?.event === 'calendly.event_type_viewed') {
        setLoaded(true);
        setFailed(false);
      }
    }
    window.addEventListener('message', onMessage);
    window.Calendly.initInlineWidget({ url: active.url, parentElement: container, resize: true });
    const labelFrame = () => container.querySelector('iframe')?.setAttribute('title', `${copy.title}: ${active.title}`);
    labelFrame();
    const observer = new MutationObserver(labelFrame);
    observer.observe(container, { childList: true });
    return () => { window.removeEventListener('message', onMessage); observer.disconnect(); container.replaceChildren(); };
  }, [active?.url, active?.title, ready, copy.title]);
  useEffect(() => {
    if (!selected) return;
    panel.current?.querySelector('button')?.focus({ preventScroll: true });
    panel.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }, [selected]);
  function changeConversation() {
    const url = new URL(window.location.href);
    url.searchParams.delete('type');
    url.hash = '';
    window.history.replaceState(null, '', url.pathname + url.search);
    setSelected(null);
    requestAnimationFrame(() => choices.current?.querySelector('a')?.focus());
  }
  return <section className="section bookingOptions" aria-label={copy.title}>
    {!active?.url && <div ref={choices}><BookingChoices copy={copy} language={language} onChoose={choose}/></div>}
    {active?.url && <section id="booking-calendar" className="bookingPanel" ref={panel} aria-label={active.title}>
      <button className="arrow changeConversation" onClick={changeConversation}><span aria-hidden="true">←</span>{copy.change}</button>
      {!loaded && <p className="calendarStatus" role="status">{failed ? copy.error : copy.loading}</p>}
      <div className="calendarEmbed" ref={calendar}/>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => setFailed(true)}/>
    </section>}
  </section>;
}

export function BookingChoices({ copy, language, onChoose }) {
  return copy.options.map((option) => <a className="bookingOption bookingSelector" key={option.id}
    href={`${pageUrl(language, 'booking')}?type=${option.id === 'intro' ? 'partnership' : option.id}`} onClick={onChoose ? event => onChoose(event, option.id) : undefined}>
    <div><div className="bookingRowHeading"><h2>{option.title}</h2><span className="kicker">{option.duration} {copy.minutes}</span></div><p>{option.description}</p></div>
    <span className="bookingRowArrow" aria-hidden="true">→</span>
  </a>);
}
