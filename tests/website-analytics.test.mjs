import assert from 'node:assert/strict';
import test from 'node:test';
import { analyticsLocation, validMeasurementId } from '../lib/website-analytics.mjs';

test('only explicitly reviewed public paths are eligible', () => {
  assert.equal(analyticsLocation('/codable'), 'https://www.jeremycollins.net/codable');
  for (const route of ['/oauth', '/mobileflow-token', '/mobileflow-callback', '/unknown', '/codable?code=secret', '/codable#secret', '/codable/private']) {
    assert.equal(analyticsLocation(route), null);
  }
});
test('measurement IDs require the public GA4 ID shape', () => {
  assert.equal(validMeasurementId('G-ABC123'), true);
  for (const id of [undefined, '', 'UA-123', 'G-ABC&x=1']) assert.equal(validMeasurementId(id), false);
});

test('acquisition keeps only predefined public labels and known referrer origins', async () => {
  const { analyticsAcquisition } = await import('../lib/website-analytics.mjs');
  const campaign = analyticsAcquisition('?utm_source=linkedin&utm_medium=social&utm_campaign=portfolio&utm_content=private&code=secret', 'https://www.linkedin.com/in/private?token=secret');
  assert.equal(campaign.campaign_source, 'linkedin');
  assert.equal(campaign.campaign_name, 'portfolio');
  assert.equal(campaign.page_referrer, 'https://www.linkedin.com/');
  assert.ok(!JSON.stringify(campaign).match(/private|secret|token/));
  for (const query of ['?utm_source=person@example.com&utm_medium=email&utm_campaign=portfolio', '?utm_source=linkedin&utm_medium=social&utm_campaign=private', '?utm_source=linkedin&utm_medium=private&utm_campaign=portfolio']) {
    assert.equal(analyticsAcquisition(query, '').campaign_source, '(direct)');
  }
  for (const referrer of ['https://person.example.com/private', 'https://www.google.com.evil.test/', 'https://user:password@www.google.com/', 'http://www.google.com/', 'https://www.google.com:444/', 'not a URL']) {
    assert.equal(analyticsAcquisition('', referrer).page_referrer, '');
  }
  assert.equal(analyticsAcquisition('', 'https://www.google.com/search?q=private').campaign_medium, 'organic');
});

test('consent persistence requires successful write and matching readback before reload', async () => {
  const { persistAnalyticsConsent } = await import('../lib/website-analytics.mjs');
  let value = 'accepted';
  const good = { setItem(_key, next) { value = next; }, getItem() { return value; } };
  assert.equal(persistAnalyticsConsent(good, 'consent', 'declined'), true);
  assert.equal(value, 'declined');
  assert.equal(persistAnalyticsConsent({ setItem() { throw new Error('blocked'); }, getItem() { return 'accepted'; } }, 'consent', 'declined'), false);
  assert.equal(persistAnalyticsConsent({ setItem() {}, getItem() { return 'accepted'; } }, 'consent', 'declined'), false);
  assert.equal(persistAnalyticsConsent({ setItem() {}, getItem() { throw new Error('blocked'); } }, 'consent', 'declined'), false);
});
