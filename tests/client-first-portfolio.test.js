const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const javascript = readFileSync(join(root, 'js', 'main.js'), 'utf8');

test('opens with the agreed client outcome and project actions', () => {
  const heading = html.match(/<h1 class="hero-name reveal">([\s\S]*?)<\/h1>/);

  assert.ok(heading, 'hero heading should exist');
  const visibleHeading = heading[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  assert.equal(
    visibleHeading,
    'Websites and web applications that are fast, reliable, and easy to manage.'
  );
  assert.match(html, /href="#services"[^>]*>[\s\S]*?See How I Can Help/);
  assert.match(html, /href="#contact"[^>]*>[\s\S]*?Discuss Your Project/);
});

test('presents the four agreed client services', () => {
  const services = html.match(
    /<section class="section services" id="services">([\s\S]*?)<\/section>/
  );

  assert.ok(services, 'client services section should exist');

  for (const service of [
    'Business Websites &amp; CMS',
    'Custom Web Applications',
    'APIs &amp; Integrations',
    'QA, Maintenance &amp; Support'
  ]) {
    assert.match(services[1], new RegExp(service));
  }
});

test('orders navigation around services, work, evidence, and contact', () => {
  const nav = html.match(
    /<nav class="sidebar-nav" aria-label="Primary">([\s\S]*?)<\/nav>/
  );

  assert.ok(nav, 'primary navigation should exist');

  const expectedHrefs = [
    '#services',
    '#projects',
    '#experience',
    '#skills',
    '#about',
    '#contact'
  ];
  const positions = expectedHrefs.map((href) => nav[1].indexOf(`href="${href}"`));

  assert.ok(positions.every((position) => position >= 0), 'all client-first navigation links should exist');
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('renders page sections in the same client-first sequence', () => {
  assert.match(
    javascript,
    /const clientSectionOrder = \[\s*'services',\s*'projects',\s*'experience',\s*'skills',\s*'about',\s*'contact'\s*\]/
  );
  assert.match(javascript, /insertBefore\(section, footer\)/);
});

test('describes selected work through the need each project solves', () => {
  const projects = html.match(
    /<section class="section projects" id="projects">([\s\S]*?)<\/section>/
  );

  assert.ok(projects, 'selected work section should exist');
  assert.equal((projects[1].match(/class="project-title"/g) || []).length, 9);
  assert.match(projects[1], /Gives viewers a consistent streaming experience/);
  assert.match(projects[1], /Helps a massage business manage appointments/);
  assert.match(projects[1], /Keeps tenant, lease, payment, and financial records/);
});

test('invites both project enquiries and employment conversations', () => {
  const contact = html.match(
    /<section class="section contact" id="contact">([\s\S]*?)<\/section>/
  );

  assert.ok(contact, 'contact section should exist');
  assert.match(contact[1], /Have a project or role in mind\?/);
  assert.match(contact[1], /business website/i);
  assert.match(contact[1], /full-time role/i);
});

test('keeps platform proof public without naming the NDA project', () => {
  const publicSource = `${html}\n${javascript}`;

  assert.doesNotMatch(publicSource, /VistaFlix/i);
  assert.match(html, /Shopify/);
  assert.match(html, /WordPress/);
  assert.match(html, /Wix/);
});
