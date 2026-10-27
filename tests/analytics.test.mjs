import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';

test('Site uses only Vercel analytics, with no third-party analytics scripts', () => {
  const layout = fs.readFileSync('app/layout.tsx', 'utf8');
  assert.match(layout, /<Analytics \/>/); assert.match(layout, /<SpeedInsights \/>/);
  assert.doesNotMatch(layout, /simpleanalytics|SimpleWebsiteAnalytics|gtag|googletagmanager/i);
});
