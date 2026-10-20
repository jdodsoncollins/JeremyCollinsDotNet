// Review new routes before adding them. Never use a query, fragment, or dynamic ID.
const publicPaths = new Set([
  '/', '/resume', '/privacy', '/codable', '/codable/privacy',
  '/taktung', '/taktung/privacy', '/taktung/support',
  '/tabforge', '/tabforge/privacy', '/paper-and-grain',
  '/paper-and-grain/privacy', '/paper-and-grain/support',
]);
export function simpleAnalyticsPath(pathname) {
  return publicPaths.has(pathname) ? pathname : null;
}
