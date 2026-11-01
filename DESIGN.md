# Design Guidelines

## 1. Purpose and direction
Create a welcoming, modern, trustworthy and accessible website. The interface should communicate solidarity, connection, community and transparency. Favor clarity, warmth and real community photography over decorative complexity.

This is a new design direction, not an instruction to reproduce the existing WordPress site. The legacy homepage source uses the Goodwish theme and references Merriweather, Open Sans, Roboto and Roboto Slab, plus historical colors such as #3d919f and #ffb422. These are references only; the new brand colors below take precedence.

## 2. Colors
Brand palette
Token	Hex	Intended use
Primary	#40B2AB	Brand identity, accent backgrounds, decorative elements
Primary dark	#176B66	Accessible primary buttons, links and text on light backgrounds
Primary subtle	#E7F6F4	Highlighted sections and selected surfaces
Secondary	#F2D788	Warm highlights, badges and supporting backgrounds
Secondary dark	#775A12	Text or borders requiring contrast on light backgrounds
Secondary subtle	#FFF8E5	Soft warm sections
Background	#FFFFFF	Main page background
Surface	#F8FAF9	Alternating sections and cards
Foreground	#182A29	Primary body text and headings
Muted foreground	#526461	Secondary text
Border	#DCE6E3	Dividers, card and input borders
Error	#B42318	Errors and destructive feedback
Success	#176B46	Success states

Contrast rule: #40B2AB and #F2D788 are not default white-text button backgrounds. Use dark text on those colors, or the darker semantic variants with verified contrast. Verify all text/background combinations against WCAG AA (4.5:1 normal text; 3:1 large text) and non-text UI indicators (3:1).

Suggested CSS variables
:root {
  --color-primary: #40b2ab;
  --color-primary-dark: #176b66;
  --color-primary-subtle: #e7f6f4;
  --color-secondary: #f2d788;
  --color-secondary-dark: #775a12;
  --color-secondary-subtle: #fff8e5;
  --color-background: #ffffff;
  --color-surface: #f8faf9;
  --color-foreground: #182a29;
  --color-muted: #526461;
  --color-border: #dce6e3;
  --color-error: #b42318;
  --color-success: #176b46;
}

## 3. Typography
- Preferred pairing: Open Sans for body and navigation, Merriweather for selected prominent headings. Both appear in the legacy site's font references; their use in the new site is a deliberate design recommendation, not proof of exact historical usage.
- Fallbacks: Arial, sans-serif for body; Georgia, serif for display headings.
- Base font: 16px minimum; body line-height 1.6–1.75.
- Heading scale: H1 clamp(2.25rem, 5vw, 4rem); H2 clamp(1.75rem, 3vw, 2.75rem); H3 1.25–1.5rem.
- Maintain logical heading hierarchy; avoid relying on heading size alone to indicate structure.
- Limit paragraph width to about 65–75 characters for comfortable reading.
- Ensure font files include Dutch and Turkish glyphs (ğ, ı, İ, ş, ç, ö, ü, ë). Prefer self-hosting or next/font for a Next.js project.

## 4. Spacing and layout
- Use a consistent 4px-based spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px.
- Max content width: 1200px; reading width: 720px.
- Page gutters: 16px on narrow screens, 24px on tablets, 32px on desktop.
- Section vertical padding: 48–64px mobile; 72–96px desktop.
- Use responsive CSS Grid/Flexbox, with breakpoints driven by content; typical references: 640px, 768px and 1024px.
- Avoid fixed heights for text sections, horizontal overflow, and layout dependent on a single language's text length.
- Cards: 12–16px corner radius, 1px subtle border, optional restrained shadow.
- Buttons and inputs: 8–12px radius, minimum 44px comfortable touch target.

## 5. Page structure
Shared header
- Logo/organization name linked to home.
- Clear primary navigation: Home, About, Activities, News, Donate, Contact (localized).
- Language switcher, visible and keyboard accessible.
- Donate CTA distinguishable from standard navigation.
- Mobile navigation must have explicit open/close controls, accessible labels, correct expanded state and reliable focus handling.
Shared footer
- Short organization description, primary links, contact information, language links and legal/privacy links.
- Display registration, ANBI and financial disclosures only with verified current details.
- Avoid displaying unverified social media profiles or contact details.
Home page
1. Hero: concise community-focused headline, short supporting text, clear primary action and authentic image.
2. About: mission summary with link to full About page.
3. Activities: selected upcoming/recent activities with links.
4. News: latest published articles with dates and links.
5. Donate: transparent explanation and link to donation information.
6. Contact: short invitation and contact route.
Internal pages
- Consistent page title, introductory summary and readable content container.
- Activities and News: responsive card listings; detail pages only where real content exists.
- Donate: purpose of contributions, verified payment instructions, transparent expectations.
- Contact: verified contact methods; add a form only if submission handling and privacy protections are implemented.

## 6. Components and interaction
- Reuse Button, Link, Container, SectionHeading, Card, PageHeader, LanguageSwitcher, Header, and Footer where repeated.
- Primary button: dark teal background with white text; secondary button: pale yellow with dark text; tertiary: underlined text link.
- Links should look interactive without relying solely on color.
- Provide hover, focus-visible, active, disabled and loading states where relevant.
- Use straightforward feedback for errors, empty news/activity lists, and unavailable external payment services.
- Do not add carousels, auto-playing video, counters or animations without clear user value.

## 7. Imagery and icons
- Prefer genuine photos of the foundation, people and activities, used with appropriate permission.
- Use consistent image ratios: 16:9 for hero/featured media; 4:3 or 3:2 for content cards.
- Optimize images; provide responsive sizes and reserve space to prevent layout shift.
- Write meaningful alt text for informative photos; decorative images use empty alt text.
- Use a restrained, consistent icon set. Icons supplement rather than replace labels.
- Treat the existing logo as a reference asset; confirm whether a new approved logo is available.

## 8. Accessibility and internationalization
- Target WCAG 2.2 AA.
- Use semantic landmarks (header, nav, main, footer) and a skip-to-content link.
- Keyboard operation and visible focus indicators are mandatory.
- Ensure all form fields have labels and errors are programmatically associated.
- Respect prefers-reduced-motion.
- Support Turkish, Dutch and English; Turkish is the default proposed product decision to confirm, not a fact extracted from the legacy site.
- Translate all navigation, buttons, metadata, errors, dates and content that is published in a given locale; no accidental mixed-language pages.
- Use correct lang, localized date formatting, canonical URLs and hreflang where applicable.
- Test long Dutch labels and Turkish characters on mobile.

## 9. Performance and implementation
- Favor semantic HTML, server-rendered/static content and minimal client JavaScript.
- For a Next.js static export, avoid runtime-only server features unless backed by a separate service.
- Use Tailwind CSS if already chosen; otherwise plain CSS/CSS Modules are sufficient. Do not add a component library by default.
- Use responsive images and efficient font loading; minimize third-party scripts.
- Maintain SEO metadata, Open Graph previews, sitemap and robots directives.
- Avoid analytics or external embeds without an explicit privacy decision.

## 10. Definition of done
- Page works at approximately 320px, 375px, 768px and 1440px widths without horizontal overflow.
- Navigation, language switcher and CTAs work by mouse, touch and keyboard.
- Focus is visible; text and control contrast are checked.
- Page titles, meta descriptions, heading order and image alternatives are meaningful.
- All user-visible text is localized or explicitly marked pending translation.
- Images and fonts load efficiently; layout remains stable.
- No fabricated organizational facts, news, events, bank details or testimonials appear.

## 11. Sources and provenance
- Legacy homepage HTML supplied with the project (source: https://goudenparaplu.nl/). It shows a Dutch/Turkish language switcher, logo, donation links, contact information and an existing WordPress/Goodwish presentation.
- Brand colors #40B2AB and #F2D788 are new requirements supplied by the project owner.
- Other tokens, typography usage, layouts, accessibility standards and component choices above are new design recommendations, not exact values extracted from the old site.