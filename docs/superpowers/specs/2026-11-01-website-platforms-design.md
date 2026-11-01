# Website Platforms Portfolio Update

## Goal

Show that Teofilo can set up, customize, maintain, and troubleshoot Shopify, WordPress, and Wix websites while preserving the portfolio's primary Full Stack Developer and QA Engineer positioning.

## Scope

Update the existing portfolio content in three places:

1. Add a **CMS & Website Platforms** card to the Skills section.
2. Add one responsibility to the current Freelance Full Stack Developer experience.
3. Add Shopify, WordPress, and Wix to the page's search metadata.

No new project cards, images, JavaScript behavior, or visual redesign will be introduced because no platform-specific project details or media were supplied.

## Content Design

The new skills card will follow the existing skill-card markup and filtering behavior. It will be categorized under Development and contain these capabilities:

- Shopify
- WordPress
- Wix
- Website setup
- Theme customization
- Content management
- Site maintenance
- Troubleshooting

The freelance timeline will gain one concise bullet stating that Teofilo sets up, customizes, maintains, and troubleshoots Shopify, WordPress, and Wix websites. The same three platform names will be added to the metadata keywords for discoverability.

## Visual and Technical Integration

The implementation will reuse existing `.skill-category`, `.skill-tag`, timeline, and filtering patterns. Platform icons may use the Devicon library already loaded by the page when supported; unsupported platforms will remain readable text labels. No new CSS is expected.

## Verification

- Confirm the new card appears in **All Skills** and **Development** filters and hides under unrelated filters.
- Confirm all three platform names and the agreed service scope appear in the rendered HTML.
- Confirm the HTML remains structurally valid and existing JavaScript selectors require no changes.
- Confirm no unrelated user changes are overwritten.
