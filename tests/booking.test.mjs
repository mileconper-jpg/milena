import test from 'node:test';
import assert from 'node:assert/strict';
import { calendlyUrl, CALENDLY_CONFIG } from '../lib/site-config.mjs';
import copy from '../content/booking.js';
import { routeRobots, languageAlternates } from '../lib/seo.mjs';

test('all locales use the approved live events and remain noindex', () => {
  for (const language of Object.keys(copy)) {
    assert.deepEqual(copy[language].options.map(x => x.duration), [30, 30, 30]);
    const events = { brand: 'introduction-partnership', manufacturer: 'introduction-partnership', intro: 'introduction-partnership' };
    for (const option of copy[language].options) assert.equal(calendlyUrl(option.id, language), `https://calendly.com/milenapereira/${events[option.id]}`);
    assert.deepEqual(routeRobots(language, 'booking', { NODE_ENV: 'production' }), { index: false, follow: true });
    assert.equal(languageAlternates(language, 'booking'), undefined);
  }
  assert.equal(CALENDLY_CONFIG.general, null);
});

test('Calendly resolution respects event and locale priorities and rejects unsafe URLs', () => {
  // Test fixtures only, never published configuration or booking links.
  const general = 'https://calendly.com/test-fixture/general';
  const brand = 'https://calendly.com/test-fixture/brand';
  const french = 'https://calendly.com/test-fixture/fr';
  assert.equal(calendlyUrl('brand', 'fr', { general, brand, locales: { fr: { brand: french } } }), french);
  assert.equal(calendlyUrl('brand', 'fr', { general, brand }), brand);
  assert.equal(calendlyUrl('intro', 'fr', { general, locales: { fr: { general: french } } }), french);
  assert.equal(calendlyUrl('intro', 'en', { general }), general);
  for (const general of ['javascript:alert(1)', 'http://calendly.com/test', 'https://calendly.com.evil.invalid/test', 'https://user:secret@calendly.com/test', 'invalid']) assert.equal(calendlyUrl('brand', 'en', { general }), null);
});
