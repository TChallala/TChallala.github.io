const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

test('includes all platforms in search metadata', () => {
  const keywords = html.match(/<meta name="keywords" content="([^"]+)">/);

  assert.ok(keywords, 'keywords metadata should exist');
  assert.match(keywords[1], /Shopify/);
  assert.match(keywords[1], /WordPress/);
  assert.match(keywords[1], /Wix/);
});

test('adds a development-filtered CMS card with the agreed capabilities', () => {
  const card = html.match(
    /<!-- CMS & Website Platforms -->\s*<div class="skill-category reveal" data-category="dev">[\s\S]*?<h3>CMS &amp; Website Platforms<\/h3>[\s\S]*?<\/div>\s*<\/div>/
  );

  assert.ok(card, 'CMS card should exist and use the Development filter category');

  const expectedCapabilities = [
    'Shopify',
    'WordPress',
    'Wix',
    'Website Setup',
    'Theme Customization',
    'Content Management',
    'Site Maintenance',
    'Troubleshooting'
  ];

  for (const capability of expectedCapabilities) {
    assert.match(card[0], new RegExp(capability));
  }
});

test('adds the agreed freelance responsibility', () => {
  const currentRole = html.match(
    /<!-- Entry 1: Current Role - Freelance -->([\s\S]*?)<!-- Entry 2: QA Automation -->/
  );

  assert.ok(currentRole, 'current freelance role should exist');
  assert.match(
    currentRole[1],
    /Set up, customize, maintain, and troubleshoot Shopify, WordPress, and Wix websites for clients/
  );
});
