import { test } from 'node:test';
import assert from 'node:assert/strict';
import { visibleLinks, isSafeUrl, displayUrl } from './links.mjs';
test('published links preserve editor order, excluding drafts and unsafe schemes', () => {
 const links = [
  { label: 'Art', url: 'https://mxjxn.art', enabled: true },
  { label: 'Draft', url: 'https://example.com', enabled: false },
  { label: 'Unsafe', url: 'javascript:alert(1)', enabled: true },
  { label: 'Email', url: 'mailto:mxjxn.art@gmail.com', enabled: true },
 ];
 assert.deepEqual(visibleLinks(links).map(x => x.label), ['Art', 'Email']);
 assert.deepEqual(visibleLinks([]), []);
});
test('destinations allow web, mail, phone and reject executable or incomplete URLs', () => {
 for (const value of ['https://mxjxn.art', 'mailto:mxjxn.art@gmail.com', 'tel:+15551234567']) assert.equal(isSafeUrl(value), true);
 for (const value of ['javascript:alert(1)', 'data:text/html,hi', 'https://', '//example.com', 'mailto:', ' https://example.com']) assert.equal(isSafeUrl(value), false);
 assert.equal(displayUrl('https://mxjxn.art/'), 'mxjxn.art');
});
