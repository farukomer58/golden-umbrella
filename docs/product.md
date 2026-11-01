# Product Brief — Stichting Gouden Paraplu

## 1. Product overview
**Project:** New public-facing website for Stichting Gouden Paraplu (Dutch) / Altın Şemsiye Vakfı (Turkish).

**Existing website:** https://goudenparaplu.nl/

**Purpose:** Promote solidarity, connect people and make it easy to learn about the foundation, its mission, activities, news, donation options and contact information. The new site should be welcoming, understandable, trustworthy and easy to maintain.

**Problem:** Visitors need a clear central source of information about the foundation and ways to participate or support it. The redesign should make important information easier to discover and use across mobile and desktop.

## 2. Organization context and source facts
The supplied legacy homepage HTML states that:
- Stichting Gouden Paraplu was founded in **2002** as an initiative of approximately twenty students with Turkish backgrounds.
- The foundation is situated in **Amsterdam-West, Geuzenveld-Slotermeer**.
- The legacy description focuses on Muslim young people with migrant backgrounds in and around Amsterdam.
- The existing site has Dutch and Turkish language links.
- The site exposes About, Organization, Board, Annual Accounts, Donations, Bank Account, Authorization, ANBI and Contact navigation.
- A contact email `info@goudenparaplu.nl` and phone number `+31 6 409 405 33` appear in the supplied homepage HTML.

**Verification required before publication:** Confirm the current mission wording, audience, legal/ANBI status, contact details, board, donation information, and whether the historical founding description is still approved. Do not present historical descriptions as current policy without confirmation.

## 3. Audience
Primary audiences:
- People interested in the foundation and its activities.
- Existing community members and volunteers.
- Prospective participants, supporters and donors.
- Dutch- and Turkish-speaking visitors; English-speaking visitors as an additional audience.

The experience must work for visitors with limited technical experience and for people using mobile devices or assistive technologies.

## 4. Core visitor journeys
1. **Discover:** Arrive on the homepage → understand the mission → read About.
2. **Participate:** Find Activities → read relevant details → use published participation/contact instructions.
3. **Stay informed:** View recent News → open a full article.
4. **Support:** Open Donate → understand how donations help → follow a verified donation method.
5. **Contact:** Find accurate contact details → use email, telephone or a supported form.
6. **Switch language:** Select Turkish, Dutch or English → continue using the site in the chosen language.

## 5. Version 1 scope
### Shared layout
- Responsive header with logo, navigation, language switcher and donation CTA.
- Responsive footer with organization summary, navigation, contact information and relevant legal links.
- Consistent accessible page layout, loading/empty/error feedback where applicable.

### Homepage (`/` or localized equivalent)
- **Hero:** Who the foundation is, concise value proposition and a primary CTA.
- **About preview:** Mission summary linking to About.
- **News preview:** Most recent published news items linking to News and article pages.
- **Activities preview:** Selected activities linking to Activities and details where available.
- **Donate preview:** Why and how to support the foundation; link to Donate.
- **Contact preview:** Contact invitation and link to Contact.

### About page
- Detailed mission, background, purpose and whom the foundation serves.
- Optionally organization/board details and annual accounts, **only if approved content is supplied**.
- Link to Activities, Donate and Contact where relevant.

### Activities page
- List of activities with title, summary, image, date/location if relevant, and status (upcoming/past) when the source data supports it.
- Individual activity detail pages are recommended only when enough information exists.
- Do not invent dates, schedules or registration workflows.

### News page
- List of published articles with title, summary, image, publication date and article link.
- Article detail pages with semantic headings, dates and shareable URLs.
- Avoid publishing sample or placeholder news as real news.

### Donate page
- Explain donation purpose and how contributions support the foundation.
- Display verified bank-transfer or other donation instructions.
- If an external payment provider is used, link clearly to it; no custom payment processing in v1 unless explicitly required.
- ANBI or tax-related claims must be verified before publication.

### Contact page
- Verified email, phone and location/contact details.
- Optional map or contact form only if needed and implemented in a privacy-conscious manner.
- Clear response expectations only if the organization has confirmed them.

## 6. Navigation and information architecture
Suggested primary navigation: Home, About, Activities, News, Donate, Contact.

Existing site also has Organization, Board, Annual Accounts, Authorization and ANBI. Decide whether these should appear as About/Donate subpages or footer links; do not silently remove required transparency or legal information during migration.

For multilingual routes, prefer a consistent locale-aware URL scheme (for example `/tr/`, `/nl/`, `/en/`) that is compatible with the chosen static-export approach. Confirm canonical URL and legacy redirect requirements before implementation.

## 7. Languages and content
**Proposed new-site languages:** Turkish (`tr`), Dutch (`nl`) and English (`en`). **Proposed default:** Turkish, based on the project owner's earlier technical requirements; confirm before release. The legacy HTML explicitly shows Dutch and Turkish, not English.

- Every visible UI string must have a translation.
- Publish translated article/activity content only when translations are available and approved.
- Decide on a clear policy for content without a translation (for example, omit it from that locale rather than silently mix languages).
- Use appropriate locale-specific metadata and `hreflang` links.
- The organization owns and approves all official text, imagery, logos, legal statements and translations.

## 8. Content model (suggested)
**NewsArticle:** `slug`, `locale`, `title`, `summary`, `body`, `publishedAt`, `coverImage`, `coverAlt`, `status`.

**Activity:** `slug`, `locale`, `title`, `summary`, `description`, `startDate` (optional), `endDate` (optional), `location` (optional), `coverImage`, `coverAlt`, `status`.

**SiteSettings:** organization names, contact details, social links, donation information and navigation.

Prefer typed content files (Markdown/MDX/JSON) in the repository for a small static site. Do not add a database solely for infrequently updated public content.

## 9. Technical approach (proposed, not extracted from source)
- **Framework:** Next.js App Router + TypeScript.
- **Deployment:** Static export to low-cost static hosting, provided all selected features support static generation.
- **Styling:** Tailwind CSS or the project's existing CSS approach, using `docs/design.md` tokens.
- **Translations:** Build-time locale dictionaries and static locale routes; manually selectable language.
- **State:** Local component state by default; Zustand only for genuinely shared interactive state, not required for static page content.
- **Content:** Repository-managed Markdown/MDX/JSON initially.
- **Images:** Optimized static assets with proper rights and attribution where required.
- **Hosting:** Compare Cloudflare Pages, GitHub Pages or other static hosts once deployment constraints and domain/DNS ownership are known.

The legacy site uses WordPress with Goodwish and several plugins. That is a description of the current source, **not** a requirement to retain WordPress or reproduce its dependencies.

## 10. Data, accounts and administration
- **Visitor accounts:** Not required for v1.
- **Admin dashboard:** Not required for v1 unless nontechnical editors need to publish independently.
- **Database:** Not required if all published content is build-time data.
- **Content editing:** Maintainers edit repository content and redeploy, or later introduce a Git-based CMS if editing frequency warrants it.
- **Contact submissions:** No backend is needed if contact is email/phone only. A real contact form requires a verified submission service, spam protection and privacy handling.
- **Donations:** Never collect or store payment credentials in the static frontend. Use verified external payment services or published bank-transfer instructions.

## 11. Quality requirements
- **Accessibility:** Aim for WCAG 2.2 AA; semantic HTML, contrast, focus visibility, keyboard usability, labels and alt text.
- **Mobile:** Mobile-first layout with no horizontal scrolling at common narrow widths.
- **Performance:** Minimize JavaScript, optimize images/fonts and avoid unnecessary third-party embeds.
- **SEO:** Pre-rendered indexable pages, localized titles/descriptions, canonical and `hreflang`, sitemap, robots and social metadata.
- **Privacy:** Data minimization, appropriate privacy information, no nonessential tracking without a lawful basis and applicable consent controls.
- **Security:** HTTPS, no secrets in client code, safe handling of external links and any forms/payments.
- **Maintainability:** Small reusable components, typed content, clear documentation, and no needless abstraction.

## 12. Deployment, costs and traffic
**Working assumption:** Small-to-moderate public traffic; low ongoing budget and minimal operational maintenance. Actual visitor volume and budget have not been supplied.

Target a static hosting setup with low or zero base hosting costs where feasible. Budget separately for domain registration, optional email, content maintenance and any paid forms/payment services. Do not promise zero total costs.

## 13. Out of scope for v1
- User registration, login and member profiles.
- Custom donation/payment processing or recurring billing infrastructure.
- Full admin panel, database and bespoke CMS.
- Event ticketing, booking, registration and attendance management.
- Forums, private messaging and social networking features.
- Advanced site search, personalization and marketing automation.
- Automated translation of official content without human review.

These can be reconsidered when there is a documented need.

## 14. Acceptance criteria
- Visitors can understand the foundation and reach About, Activities, News, Donate and Contact from the homepage.
- Each core page has complete, approved content or an honest empty state.
- Navigation and language switching work on mobile and desktop.
- Every supported locale has correctly translated interface text and metadata.
- News and activities can be updated through the chosen content workflow and deployed successfully.
- Donation/contact details are verified and usable; no fake transactions or dead-end forms.
- Site passes project accessibility, responsive, lint/build and basic functional checks.
- SEO routes, metadata, sitemap and language alternates are correct for the deployed URLs.

## 15. Decisions to confirm with the foundation
1. Final approved mission, founding history, audience wording and organization name spelling.
2. Whether Turkish is the default and whether English content will be fully translated for launch.
3. Which of Organization, Board, Annual Accounts, ANBI and Authorization are mandatory in v1.
4. Official current phone, email, postal/visiting address, social profiles and logo.
5. Approved bank/payment information and donation-provider choice.
6. Existing news and activities to migrate, and who approves/translates them.
7. Who will update content and how frequently; whether a Git-based CMS is necessary.
8. Deployment domain, legacy redirects, hosting budget and privacy/legal review.

## 16. Source notes
The supplied source is **the existing homepage HTML**, not a complete export of every subpage. It supports the historical organization description, navigation structure, contact information and site technology described above. It does **not** verify the full text of the About, ANBI, donation, news or activity pages, nor does it prove current legal status or payment details. All new architecture, page structures, content models and design recommendations are proposed decisions for the redesign.
