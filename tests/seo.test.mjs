import test from 'node:test';
import assert from 'node:assert/strict';
import { isIndexable, canonicalUrl, SITE_URL, HOME_TITLE, HOME_DESCRIPTION, structuredData, serializeJsonLd, socialMetadata } from '../lib/seo.mjs';

test('index only production, never Vercel preview or development', () => {
  assert.equal(isIndexable({ NODE_ENV: 'production', VERCEL_ENV: 'production' }), true);
  assert.equal(isIndexable({ NODE_ENV: 'production' }), true);
  for (const env of [{ NODE_ENV: 'development' }, { NODE_ENV: 'development', VERCEL_ENV: 'production' }, { NODE_ENV: 'production', VERCEL_ENV: 'preview' }, { NODE_ENV: 'production', VERCEL_ENV: 'development' }, { NODE_ENV: 'production', VERCEL: '1' }]) assert.equal(isIndexable(env), false);
});
test('canonical home uses the approved origin without a trailing slash', () => {
  assert.equal(canonicalUrl('/'), SITE_URL);
  assert.equal(canonicalUrl('/fr/marques'), `${SITE_URL}/fr/marques`);
});
test('structured entities connect and do not fabricate reputation or contact details', () => {
  const data = structuredData();
  const entities = data['@graph'];
  assert.deepEqual(entities.map(entity => entity['@type']), ['Person', 'Organization', 'WebSite']);
  const ids = new Set(entities.map(entity => entity['@id']));
  for (const ref of [entities[0].worksFor, entities[1].employee, entities[2].publisher, entities[2].about]) assert.ok(ids.has(ref['@id']));
  assert.equal(entities[1].identifier.value, '16738640');
  assert.deepEqual(entities[0].sameAs, ['https://www.linkedin.com/in/milenacp/']);
  assert.doesNotMatch(JSON.stringify(data), /aggregateRating|review|telephone|streetAddress/);
  assert.equal(JSON.parse(serializeJsonLd({ text: '</script>' })).text, '</script>');
  assert.ok(!serializeJsonLd({ text: '</script>' }).includes('<'));
});
test('social cards use approved copy without a fabricated image or handle', () => {
  const result = socialMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, url: SITE_URL, language: 'en' });
  assert.equal(result.openGraph.title, HOME_TITLE);
  assert.equal(result.twitter.description, HOME_DESCRIPTION);
  assert.equal(result.openGraph.siteName, 'Milena Pereira');
  assert.equal(result.twitter.card, 'summary');
  assert.equal(result.openGraph.images, undefined);
  assert.equal(result.twitter.creator, undefined);
});

test('launch policy admits exactly 21 routes and limits reciprocal language alternatives', async () => {
  const { languages, slugs } = await import('../content/routing.js');
  const { routeRobots, languageAlternates } = await import('../lib/seo.mjs');
  const approvedPages = ['home', 'brands', 'manufacturers', 'presentation', 'specialists', 'about', 'contact'];
  let indexed = 0;
  for (const { code } of languages) for (const page of Object.keys(slugs[code])) {
    const expected = ['en', 'fr', 'pt'].includes(code) && approvedPages.includes(page);
    const production = routeRobots(code, page, { NODE_ENV: 'production', VERCEL_ENV: 'production' });
    assert.deepEqual(production, { index: expected, follow: true });
    if (production.index) indexed++;
    for (const env of [{ NODE_ENV: 'development' }, { NODE_ENV: 'production', VERCEL_ENV: 'preview' }]) {
      assert.deepEqual(routeRobots(code, page, env), { index: false, follow: true });
    }
    const alternatives = languageAlternates(code, page);
    if (expected) {
      assert.deepEqual(Object.keys(alternatives), ['en', 'fr', 'pt-BR', 'x-default']);
      for (const url of Object.values(alternatives)) assert.ok(url.startsWith(SITE_URL));
    } else assert.equal(alternatives, undefined);
  }
  assert.equal(indexed, 21);
});
