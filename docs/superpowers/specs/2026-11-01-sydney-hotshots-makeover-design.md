# Sydney Hotshots Makeover Prototype

## Goal

Create a polished standalone portfolio application that demonstrates how Sydney Hotshots could modernise its website while making shows, ticket actions, and private-booking enquiries easier to find. The prototype will use semantic HTML, CSS, and vanilla JavaScript and will not replace or modify the main portfolio homepage.

## Scope

Build a single-page, responsive concept in `sydneyhotshotscom/`. The experience will include:

- A compact header with links to Shows, Experiences, Private Bookings, About, and Contact.
- A conversion-focused hero with ticket and private-booking actions.
- Upcoming-show cards containing clearly labelled sample dates and venues.
- Experience cards for the Sydney show, touring revue, strippergrams, topless waiters, and harbour cruise.
- A private-booking explanation and enquiry flow.
- Trust content based on the existing 30-year history, 2,000 annual events, review rating, and safe/classy positioning.
- A performer and event-image showcase prepared for user-supplied images.
- A concise FAQ adapted from useful existing website content.
- A footer reflecting important existing service-page links and contact details.

The prototype will not send form data, claim that sample events are current, replace WordPress, connect to Search Console, or alter the live Sydney Hotshots website.

## User Journey

The page prioritises two visitor intentions:

1. Find a show and continue to tickets.
2. Enquire about a private booking.

The hero exposes both choices immediately. Upcoming shows follow directly beneath it. Desktop visitors can use persistent header actions; mobile visitors receive a fixed bottom action bar for Tickets and Private booking. Ticket actions open a show-selection panel. Private-booking actions open a focused enquiry modal.

## Content Structure

### Header

The header contains the Sydney Hotshots identity, section navigation, a phone action, and a high-emphasis Tickets button. On small screens, navigation becomes an accessible menu while the two primary conversion actions remain in the bottom action bar.

### Hero

The hero uses concise rewritten copy derived from the current website. It leads with the touring-show experience and reinforces the brand's long operating history. A next-show preview and both primary calls to action appear above the fold.

### Upcoming Shows

Three sample show cards demonstrate date, city, venue, availability, and ticket actions. Each card is visibly marked as demonstration content so no sample date can be mistaken for a confirmed event. Ticket buttons open the ticket-selection panel rather than navigating to an unverified listing.

### Experiences

Five service cards preserve established search terminology while tightening the copy. Cards point to representative existing URL paths, demonstrating how a production redesign could retain valuable page addresses and internal linking.

### Private Bookings

This section explains a three-step process: choose an experience, share event details, and confirm with the team. Its enquiry modal requests name, email, phone, event type, date, suburb or venue, guest count, and message. JavaScript validates required fields, provides specific inline errors, and displays a demo confirmation without transmitting data.

### Trust, Gallery, FAQ, and Footer

Trust statements use only claims already present on the public website. The gallery begins with deliberate image placeholders and includes a clear structure for replacing them with supplied assets. FAQ answers preserve useful existing information in shorter language. The footer exposes contact details and important service links.

## Visual Direction

The chosen direction is **Electric Cabaret**: energetic, premium, and recognisably live-entertainment focused without resembling a generic nightclub template.

### Colour tokens

- Backstage navy: `#07111F`
- Stage blue: `#122B52`
- Electric magenta: `#F238A7`
- Spotlight cyan: `#65E7FF`
- Cool silver: `#DCE5F0`
- White: `#FFFFFF`

### Typography

A condensed display face gives show headlines the presence of a tour poster. A geometric sans serif supports readable body copy, controls, and forms. Compact uppercase utility labels identify dates, availability, and content status. Web fonts will use resilient fallbacks, and the page will remain usable if remote fonts fail.

### Layout and signature

The visual signature is a diagonal stage beam that crosses the hero and connects visually to the next-show card. It is implemented with CSS rather than a heavy image. Asymmetric editorial spacing gives the page energy while content cards remain clear and scannable.

### Motion

The page uses one coordinated entrance sequence, restrained scroll reveals, modal transitions, and responsive hover feedback. `prefers-reduced-motion` disables non-essential animation.

## Components and Behaviour

- Responsive header and accessible mobile menu.
- Hero next-show preview.
- Upcoming-show card grid.
- Ticket-selection modal with demo notices.
- Experience card grid.
- Private-booking process and enquiry modal.
- Client-side validation with inline messages and a success state.
- Trust statistics and review summary.
- Replaceable gallery placeholders.
- Native disclosure-based FAQ.
- Mobile conversion bar.
- Escape-key modal closing, focus management, and background scroll locking.

JavaScript will be split into small functions for navigation, dialogs, validation, and scroll-reveal behaviour. The page will preserve useful content if JavaScript is unavailable; interactive panels will have clear fallback links or contact information.

## SEO Demonstration

The prototype will include a descriptive title and meta description, canonical-style URL documentation without claiming the prototype is the live site, semantic landmark and heading structure, descriptive image text, concise service copy, and representative internal links using established live URL paths. Sample-event content will be marked as demonstration content and excluded from structured event claims.

A production WordPress implementation would additionally require a complete URL and metadata inventory, Search Console review, redirect approval, staging controls, backups, form-delivery testing, performance measurement, and launch monitoring. The prototype will present this migration approach without pretending those production tasks have been performed.

## Responsive and Accessibility Requirements

- Support narrow mobile screens from 320px upward, tablets, laptops, and wide desktops.
- Maintain visible keyboard focus and logical tab order.
- Use labelled form controls, useful error text, and accessible dialog semantics.
- Meet readable contrast across text, controls, and status labels.
- Prevent mobile action bars from covering page content.
- Respect reduced-motion preferences.

## Verification

- Confirm the standalone demo does not change the main portfolio homepage.
- Run automated content and structure tests for landmarks, primary sections, demo labels, and form fields.
- Run JavaScript syntax checks.
- Check HTML/CSS for broken references and whitespace errors.
- Test navigation, menu, dialogs, ticket selection, field validation, success state, Escape handling, and focus return.
- Check representative desktop and mobile layouts in a browser when local browser tooling is available.
- Verify that supplied images can replace placeholders without structural changes.

## Deferred Inputs

User-supplied Sydney Hotshots images will replace the initial gallery and hero placeholders in a later content pass. Their absence does not block the first complete layout, interactions, or responsive implementation.
