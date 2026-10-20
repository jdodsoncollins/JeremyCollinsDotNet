// Deliberately explicit: new routes must be reviewed before being measured.
export const publicAnalyticsPaths = new Set([
  '/', '/resume', '/privacy', '/codable', '/codable/privacy',
  '/taktung', '/taktung/privacy', '/taktung/support',
  '/tabforge', '/tabforge/privacy', '/paper-and-grain',
  '/paper-and-grain/privacy', '/paper-and-grain/support',
]);

export function analyticsLocation(pathname) {
  return publicAnalyticsPaths.has(pathname)
    ? `https://www.jeremycollins.net${pathname}`
    : null;
}

export function validMeasurementId(value) {
  return typeof value === 'string' && /^G-[A-Z0-9]+$/.test(value);
}

// Only these public, deliberately named campaigns can affect attribution.
// Never pass an arbitrary query value, hostname, URL, or referrer path to GA.
const sources = new Set(['linkedin', 'github', 'x', 'bluesky', 'newsletter', 'email', 'youtube', 'reddit']);
const media = new Set(['social', 'referral', 'email', 'video']);
const campaigns = new Set(['portfolio', 'app-launch', 'codable', 'taktung', 'tabforge', 'paper-and-grain']);
const referrers = new Map([
  ['www.google.com', ['https://www.google.com/', 'google', 'organic']],
  ['google.com', ['https://www.google.com/', 'google', 'organic']],
  ['www.bing.com', ['https://www.bing.com/', 'bing', 'organic']],
  ['duckduckgo.com', ['https://duckduckgo.com/', 'duckduckgo', 'organic']],
  ['www.linkedin.com', ['https://www.linkedin.com/', 'linkedin', 'social']],
  ['linkedin.com', ['https://www.linkedin.com/', 'linkedin', 'social']],
  ['github.com', ['https://github.com/', 'github', 'referral']],
  ['t.co', ['https://t.co/', 'x', 'social']],
  ['x.com', ['https://x.com/', 'x', 'social']],
  ['bsky.app', ['https://bsky.app/', 'bluesky', 'social']],
  ['www.youtube.com', ['https://www.youtube.com/', 'youtube', 'video']],
  ['www.reddit.com', ['https://www.reddit.com/', 'reddit', 'social']],
]);

export function analyticsAcquisition(search, referrer) {
  let knownReferrer;
  try {
    const parsed = new URL(referrer);
    if (parsed.protocol === 'https:' && !parsed.username && !parsed.password && !parsed.port) {
      knownReferrer = referrers.get(parsed.hostname);
    }
  } catch { /* Empty or malformed referrers are not sent. */ }
  const params = new URLSearchParams(search);
  const source = params.get('utm_source');
  const medium = params.get('utm_medium');
  const campaign = params.get('utm_campaign');
  const knownCampaign = sources.has(source) && media.has(medium) && campaigns.has(campaign);
  return {
    page_referrer: knownReferrer?.[0] || '',
    campaign_source: knownCampaign ? source : knownReferrer?.[1] || '(direct)',
    campaign_medium: knownCampaign ? medium : knownReferrer?.[2] || '(none)',
    campaign_name: knownCampaign ? campaign : '(not set)',
    // Prevent any incoming UTM term/content/ID from becoming campaign dimensions.
    campaign_term: '',
    campaign_content: '',
    campaign_id: '',
  };
}
