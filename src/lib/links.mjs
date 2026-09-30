export function isSafeUrl(value) {
 if (typeof value !== 'string' || /\s/.test(value)) return false;
 try {
  const url = new URL(value);
  return ['http:', 'https:'].includes(url.protocol) ? Boolean(url.hostname) : ['mailto:', 'tel:'].includes(url.protocol) && Boolean(url.pathname);
 } catch { return false; }
}
export function visibleLinks(links) {
 return links.filter(link => link.enabled && isSafeUrl(link.url));
}
export function displayUrl(value) {
 return value.replace(/^(https?:\/\/|mailto:|tel:)/i, '').replace(/\/$/, '');
}
