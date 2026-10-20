import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { simpleAnalyticsPath } from '../lib/simple-analytics.mjs';

test('Simple Analytics allows only reviewed public paths without query or fragments', () => {
  assert.equal(simpleAnalyticsPath('/codable'), '/codable');
  for (const path of ['/oauth', '/mobileflow-token', '/mobileflow-callback', '/unknown', '/codable?token=private', '/codable#private', '/private/person']) assert.equal(simpleAnalyticsPath(path), null);
});
test('Simple Analytics integration has no consent UI, disables automatic collection and preserves Vercel', () => {
  const source = fs.readFileSync('components/simple-website-analytics.tsx', 'utf8');
  assert.match(source, /https:\/\/scripts.simpleanalyticscdn.com\/latest.js/);
  assert.match(source, /data-auto-collect="false"/);
  assert.match(source, /data-ignore-metrics="referrer,utm"/);
  assert.match(source, /window.sa_pageview\(path\)/);
  assert.doesNotMatch(source, /localStorage|gtag|googletagmanager|<button|<aside/);
  const layout = fs.readFileSync('app/layout.tsx', 'utf8');
  assert.match(layout, /<Analytics \/>/); assert.match(layout, /<SpeedInsights \/>/);
  assert.doesNotMatch(layout, /<WebsiteAnalytics \/>/);
});
