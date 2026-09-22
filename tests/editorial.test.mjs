import test from 'node:test';
import assert from 'node:assert/strict';
import en from '../content/en.js';
import fr from '../content/fr.js';
import pt from '../content/pt.js';
import it from '../content/it.js';
import es from '../content/es.js';
import zh from '../content/zh.js';
import booking from '../content/booking.js';
import homepage from '../content/homepage.js';
import commercial from '../content/commercial.js';
import forms from '../content/forms.js';

test('all localized copy, including forms and email drafts, is free of em dashes', () => {
  assert.doesNotMatch(JSON.stringify({ en, fr, pt, it, es, zh, homepage, commercial, forms, booking }), /\u2014/);
});

test('approved brand headlines and factual identity survive editorial edits', () => {
  assert.equal(en.hero.lines.join(' '), 'FROM PRODUCT VISION TO MARKET.');
  assert.equal(en.audience.title, 'What brings you here?');
  assert.deepEqual(en.audience.items.slice(0, 2).map(item => item[0]), ['I’M A BRAND', 'I’M A MANUFACTURER']);
  assert.equal(en.network.headline.replace('\n', ' '), 'BUILT ON THE GROUND.');
  assert.equal(en.contact.headline.replace('\n', ' '), 'LET’S TALK POSSIBILITIES.');
  for (const copy of [en, fr, pt, it, es, zh]) {
    assert.match(copy.about.paragraphs.join(' '), /18/);
    assert.match(copy.about.paragraphs.join(' '), /Alexander McQueen/);
    assert.match(copy.about.paragraphs.join(' '), /Casablanca Paris/);
    assert.match(copy.about.paragraphs.join(' '), /CPO/);
    assert.match(copy.ui.company, /16738640/);
  }
});
