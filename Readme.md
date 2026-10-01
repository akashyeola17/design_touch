# Design Touch static website foundation

The site uses HTML, CSS, and vanilla JavaScript. The home, About, Services, portfolio, and Contact pages are implemented. Project detail routes use a shared data-driven page shell. It is a static site and does not need a build step or backend.

## Run locally

Open the repository in VS Code, install/use the Live Server extension, then right-click `index.html` and choose **Open with Live Server**. The ES module scripts require a local HTTP server; opening the file directly with `file://` is not supported.

## Foundation

- Design tokens live in `css/style.css` under `:root`.
- `css/responsive.css` contains responsive navigation, footer, buttons, and floating contact behavior.
- `css/animations.css` contains the small reduced-motion-aware reveal utility.
- `js/navbar.js` renders the sticky responsive navigation and accessible mobile menu.
- `js/main.js` renders the shared footer and WhatsApp control.
- Editable content is centralized under `data/`, including the shared approach and differentiators.

## Confirmation and asset TODOs

- WhatsApp is configured in `data/contact.js` to open a prefilled enquiry to the supplied number. Get a quote CTAs open that same WhatsApp conversation.
- Confirm the conflicting client, project, and state counts in `data/stats.js`.
- Verify contact details and final service names before production.
- Add the supplied company profile/content PDFs, approved logo, and original project/service/client imagery. Asset directories are ready under `assets/images/` and `assets/videos/`.
- Service descriptions on `services.html` are marked pending until the company profile PDF is provided; service names come from the project brief.
- About and service page visuals are placeholders until approved photography is supplied.
- The current circular “DT” typographic mark is a temporary text stand-in; replace it with the approved logo asset.
- Instagram, Facebook, and LinkedIn profile URLs are centralized in `data/contact.js`; footer and contact page social links use those values.
- Add only source-verified clients, testimonials, and project details to the corresponding data files.
- The project grid stays in placeholder mode until verified portfolio content and images are provided. Project name suggestions in the brief are not treated as verification.
- `projects.html` provides responsive category filtering and a source-aware empty state. Project detail shells share a data-driven renderer, responsive gallery, accessible lightbox, and related-project component. Add only verified records and local approved images to `data/projects.js` before publishing project claims.
- `contact.html` reads all address, phone, email, WhatsApp, and social profile values from `data/contact.js`. Its enquiry form performs browser-only validation and does not submit or store form data; connect an approved form service before accepting enquiries online.
- The homepage Instagram placeholders are driven by `js/instagram.js`; add only approved posts to the feed. Client names and short testimonial excerpts come from the current company website; logo files were not present in the workspace and have not been fabricated.
- SEO titles, descriptions, canonical URLs, and Open Graph title/description/URL are set on all HTML routes. The four empty project shells are `noindex` until approved project content is entered. `sitemap.xml` lists the five public site pages; `robots.txt` references it. Add an approved Open Graph/share image and verify production URLs before deployment.
- Phase 6 polish replaced the repeated homepage project skeletons with one editorial content-pending state and adjusted the Instagram layout for six feed slots. Remaining visible pending states are intentional where source photography, logo art, statistics, or project content are unavailable.
- Client/project counts and the reported state count remain pending confirmation in `data/stats.js`.
