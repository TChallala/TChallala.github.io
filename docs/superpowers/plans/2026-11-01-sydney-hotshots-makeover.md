# Sydney Hotshots Makeover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, responsive Sydney Hotshots makeover prototype that makes sample shows, ticket actions, and private-booking enquiries immediately accessible.

**Architecture:** A semantic single-page document in `sydneyhotshotscom/` provides all useful content without JavaScript. A focused stylesheet owns the Electric Cabaret token system and responsive presentation. A dependency-free JavaScript module progressively enhances navigation, dialogs, scroll reveals, and form validation while exporting its pure validation function for Node tests.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner

**Spec:** `docs/superpowers/specs/2026-11-01-sydney-hotshots-makeover-design.md`

## Global Constraints

- Keep the main portfolio `index.html`, `css/`, `js/`, and existing assets unchanged.
- Use only HTML, CSS, and vanilla JavaScript with no build step or runtime dependencies.
- Mark all sample show dates, venues, availability, and ticket actions as demonstration content.
- Do not transmit enquiry data or claim the prototype is connected to WordPress, Eventbrite, or Google Search Console.
- Preserve the agreed Electric Cabaret palette: `#07111F`, `#122B52`, `#F238A7`, `#65E7FF`, `#DCE5F0`, and `#FFFFFF`.
- Support 320px-wide mobile screens, visible keyboard focus, reduced motion, and labelled controls.
- Prepare gallery and hero media regions for later user-supplied images without requiring layout changes.

## Review Focus

- Missing JavaScript: primary content, telephone details, and section links remain available; booking controls explain that interaction requires JavaScript.
- Invalid or incomplete enquiry data: required fields show specific inline errors, and invalid submissions never display success.
- Modal keyboard handling: Escape closes the active dialog, focus stays inside while open, and returns to the opener after close.
- Narrow mobile screens: navigation and cards do not overflow, and the fixed action bar does not cover footer content.
- Reduced-motion users: coordinated entrance and reveal animations are disabled without hiding content.

---

### Task 1: Build the Semantic Conversion Page

**Files:**
- Create: `sydneyhotshotscom/index.html`
- Create: `sydneyhotshotscom/tests/site-structure.test.js`

**Interfaces:**
- Consumes: Approved copy, palette, page sequence, and existing public URL paths from the specification.
- Produces: Stable IDs `site-nav`, `shows`, `experiences`, `private-bookings`, `about`, `gallery`, `faq`, `ticket-dialog`, `booking-dialog`, and `booking-form` for CSS and JavaScript.

- [ ] **Step 1: Write the failing structure tests**

Create Node tests that read `sydneyhotshotscom/index.html` and assert the descriptive title and meta description; header, main, and footer landmarks; every stable ID; two visible primary action labels; three `data-demo-show` cards; a visible “Demonstration event” label on each; five established service terms; telephone and email details; all eight labelled enquiry fields; and a no-script booking notice.

- [ ] **Step 2: Run the structure tests and confirm the missing page fails**

Run: `node --test sydneyhotshotscom/tests/site-structure.test.js`

Expected: FAIL because `sydneyhotshotscom/index.html` does not exist.

- [ ] **Step 3: Create the semantic page**

Create the full content hierarchy and both native `<dialog>` elements. Use buttons with `data-open-dialog="ticket-dialog"` and `data-open-dialog="booking-dialog"`; each dialog close control uses `data-close-dialog`. Give enquiry inputs the names `name`, `email`, `phone`, `eventType`, `eventDate`, `location`, `guestCount`, and `message`, with adjacent error containers named `<field>-error`.

- [ ] **Step 4: Run the structure tests**

Run: `node --test sydneyhotshotscom/tests/site-structure.test.js`

Expected: all structure tests pass.

- [ ] **Step 5: Commit the semantic page**

```bash
git add sydneyhotshotscom/index.html sydneyhotshotscom/tests/site-structure.test.js
git commit -m "feat: add Sydney Hotshots prototype structure"
```

### Task 2: Implement the Electric Cabaret Presentation

**Files:**
- Create: `sydneyhotshotscom/css/styles.css`
- Modify: `sydneyhotshotscom/tests/site-structure.test.js`

**Interfaces:**
- Consumes: Stable section, component, dialog, and form markup from Task 1.
- Produces: CSS custom-property tokens and responsive classes used by the page; no JavaScript dependency.

- [ ] **Step 1: Extend the tests for presentation requirements**

Assert that the HTML links `css/styles.css`; the stylesheet declares each exact palette value, visible `:focus-visible` styles, a `prefers-reduced-motion: reduce` rule, breakpoints for navigation and mobile action bar, dialog backdrop styling, bottom padding that protects the footer from the mobile action bar, and replaceable `.media-frame` regions.

- [ ] **Step 2: Run the focused tests and confirm the stylesheet assertions fail**

Run: `node --test sydneyhotshotscom/tests/site-structure.test.js`

Expected: FAIL because `css/styles.css` is missing.

- [ ] **Step 3: Implement the responsive visual system**

Create the Electric Cabaret tokens, condensed-display and geometric-body font stacks, diagonal stage-beam hero, conversion cards, responsive grids, gallery frames, dialogs, form states, mobile navigation, and fixed mobile conversion bar. Keep essential content visible before reveal enhancement by applying hidden reveal states only when the root has `.js`.

- [ ] **Step 4: Run the structure and presentation tests**

Run: `node --test sydneyhotshotscom/tests/site-structure.test.js`

Expected: all tests pass.

- [ ] **Step 5: Commit the presentation**

```bash
git add sydneyhotshotscom/css/styles.css sydneyhotshotscom/tests/site-structure.test.js
git commit -m "feat: style Sydney Hotshots makeover"
```

### Task 3: Add Accessible Interactions and Enquiry Validation

**Files:**
- Create: `sydneyhotshotscom/js/main.js`
- Create: `sydneyhotshotscom/tests/site-behavior.test.js`
- Modify: `sydneyhotshotscom/index.html`

**Interfaces:**
- Consumes: `data-open-dialog`, `data-close-dialog`, stable navigation IDs, `booking-form`, and the eight agreed input names.
- Produces: `validateBooking(values: Record<string, string>) -> Record<string, string>` exported through `module.exports` in Node and used by browser form handling.

- [ ] **Step 1: Write failing behaviour tests**

Test that `validateBooking` returns errors for all empty required values; rejects malformed email, phone, past event date, and guest counts outside 1–5000; accepts a complete valid submission; and that the source includes Escape handling, focus trapping, opener-focus restoration, menu state via `aria-expanded`, dialog open/close wiring, scroll reveal with an immediate reduced-motion path, inline error rendering, and a demo success state.

- [ ] **Step 2: Run the behaviour tests and confirm the missing module fails**

Run: `node --test sydneyhotshotscom/tests/site-behavior.test.js`

Expected: FAIL because `js/main.js` does not exist.

- [ ] **Step 3: Implement `validateBooking(values)` and progressive enhancement**

Use dependency-free functions for `openDialog(dialog, opener)`, `closeDialog(dialog)`, `trapDialogFocus(event, dialog)`, `setMenu(open)`, `renderErrors(form, errors)`, and `setupReveals()`. On valid submission, prevent transmission, reset the form, hide the form panel, and reveal a message that explicitly says it is a prototype confirmation.

- [ ] **Step 4: Link the JavaScript and run all tests**

Run: `node --test sydneyhotshotscom/tests/*.test.js && node --check sydneyhotshotscom/js/main.js`

Expected: all tests pass and the syntax check exits successfully.

- [ ] **Step 5: Commit the interactions**

```bash
git add sydneyhotshotscom/index.html sydneyhotshotscom/js/main.js sydneyhotshotscom/tests/site-behavior.test.js
git commit -m "feat: add ticket and booking interactions"
```

### Task 4: Verify the Complete Standalone Prototype

**Files:**
- Modify only when verification exposes a defect: `sydneyhotshotscom/index.html`, `sydneyhotshotscom/css/styles.css`, `sydneyhotshotscom/js/main.js`, and their tests

**Interfaces:**
- Consumes: Complete static prototype from Tasks 1–3.
- Produces: Verified application ready for user-supplied image replacement.

- [ ] **Step 1: Run the full automated suite**

Run: `node --test sydneyhotshotscom/tests/*.test.js && node --check sydneyhotshotscom/js/main.js && git diff --check`

Expected: all tests pass, syntax is valid, and no whitespace errors are reported.

- [ ] **Step 2: Verify isolation and references**

Confirm `git diff --name-only 639eed4..HEAD` contains only the specification, plan, and `sydneyhotshotscom/`; confirm every local `href` and `src` target in the prototype exists; confirm the root portfolio files have no new diff from this feature.

- [ ] **Step 3: Run browser checks when local tooling is available**

At desktop and 320px mobile widths, inspect the hero, show cards, navigation, dialogs, form errors, success state, fixed action bar, keyboard focus, Escape handling, and reduced-motion rendering. If browser tooling is unavailable, record that limit and rely on automated checks.

- [ ] **Step 4: Apply and retest any verification fixes**

Make only defect corrections supported by failing checks, then repeat Steps 1–3.

- [ ] **Step 5: Commit verification fixes if any**

```bash
git add sydneyhotshotscom
git commit -m "fix: polish Sydney Hotshots prototype"
```
