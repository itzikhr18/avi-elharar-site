# avielharar.co.il

> Landing page for Avi Elharar — certified driving instructor in Jerusalem & Ma'ale Adumim, Israel.

[![Live Site](https://img.shields.io/badge/live-avielharar.co.il-d4af37?style=flat-square)](https://avielharar.co.il)
[![GitHub Pages](https://img.shields.io/badge/hosting-GitHub%20Pages-0a0a0a?style=flat-square&logo=github)](https://pages.github.com)
[![Validate site](https://github.com/itzikhr18/avi-elharar-site/actions/workflows/validate-site.yml/badge.svg)](https://github.com/itzikhr18/avi-elharar-site/actions/workflows/validate-site.yml)
[![License](https://img.shields.io/badge/license-proprietary-red?style=flat-square)]()

## Overview

A high-performance, multi-page marketing site built for conversion and local search. It is fully static: no framework or runtime build step, just HTML/CSS/JS served through GitHub Pages with a custom domain.

**Operational profile:**
- 3 indexable URLs: homepage, article hub, and the first long-form article
- ~59 KB combined minified CSS and JS before transfer compression
- No external JavaScript dependencies beyond Google Analytics
- Automated checks for local links, canonical URLs, JSON-LD, sitemap coverage, and production assets

## Architecture

```
|-- index.html                  # Homepage and primary conversion sections
|-- maamarim/
|   |-- index.html              # Article hub
|   `-- 5-tauyot-test-yerushalayim/index.html
|-- style.css                   # Source CSS (dark theme, RTL, responsive)
|-- style.min.css               # Production CSS
|-- main.js                     # Source JS (interactions, a11y widget)
|-- main.min.js                 # Production JS
|-- sitemap.xml                 # XML sitemap with image extensions
|-- robots.txt                  # Crawler directives
|-- CNAME                       # Custom domain binding
|-- scripts/validate_site.py    # Dependency-free static-site validator
|-- .github/workflows/          # Pull request and main-branch validation
|-- CLAUDE.md                   # AI assistant project context
`-- docs/                        # SEO and directory tracking notes
```

## Tech Stack

| Layer | Tech |
|-------|------|
| Markup | Semantic HTML5, RTL, ARIA landmarks |
| Styling | Custom CSS (no preprocessor), CSS custom properties, `@property` animated gradients |
| Scripting | Vanilla JS (IIFE, no dependencies) |
| Hosting | GitHub Pages (custom domain via CNAME) |
| Analytics | Google Analytics 4 (G-Q3V66EP3E5) |
| Domain | `avielharar.co.il` (expires 2028) |

## Features

### Performance
- Zero external JS dependencies
- Minified assets served in production (`style.min.css`, `main.min.js`)
- `fetchpriority="high"` + `<link rel="preload">` for hero image
- `loading="lazy"` on all below-the-fold images
- `contain: strict` on background animations
- Particle canvas pauses on tab visibility change
- `prefers-reduced-motion` respected — all animations disabled

### SEO
- Homepage structured data: `DrivingSchool`, `FAQPage` (16 questions), and `WebSite`
- Article structured data: `Article` and `BreadcrumbList`
- Review and aggregate-rating markup is intentionally omitted while the current Google Business Profile remains unverified
- Open Graph + Twitter Card meta tags
- Canonical URL + hreflang (he + x-default)
- Image sitemap with alt-text optimized titles

### Accessibility (Israeli Standard 5568 / WCAG 2.1 AA)
- Built-in accessibility widget (font size, contrast, grayscale, link highlighting, readable font, large cursor, stop animations)
- Preferences persisted via `localStorage`
- Skip-to-content link
- Full keyboard navigation with visible focus indicators
- Focus trap + Escape key on mobile menu
- ARIA roles, labels, and live regions throughout
- Legal accessibility statement per Israeli law

### Conversion
- Sticky CTA bar (appears after hero, hides near contact form)
- Floating WhatsApp button with pre-filled message
- Contact form → WhatsApp redirect (no backend needed)
- Typewriter hero headline animation
- Animated stats counters on scroll
- 3D card tilt + magnetic buttons (desktop)

## Development

### Prerequisites
```bash
npm install -g terser clean-css-cli
```

### Edit → Build → Deploy
```bash
# Edit source files
vim style.css main.js index.html

# Rebuild minified assets
cleancss -o style.min.css style.css
terser main.js -o main.min.js --compress --mangle

# Commit & push (GitHub Pages auto-deploys from main)
git add -A && git commit -m "description" && git push
```

### Local Preview
```bash
# Any static file server works
npx serve .
# or
python3 -m http.server 8000
```

### Validation
```bash
python3 scripts/validate_site.py
```

The same validator runs automatically for every pull request and every push to `main`.

### Project Conventions
- **No build system** — intentionally simple. Source files and minified files coexist.
- **Static HTML pages** — the homepage owns the main conversion sections; `/maamarim/` contains indexable editorial content.
- **RTL-first** — all layout is `dir="rtl"`. CSS uses logical properties where applicable.
- **Dark + gold palette** — black (`#0a0a0a`) base, classic gold (`#d4af37`) accent, warm cream (`#faf7f0`) on light sections. No light-mode toggle.
- **Cache-busting via query string** — minified assets are referenced as `style.min.css?v=YYYYMMDD<letter>`. Bump the suffix when you change the file so returning visitors fetch fresh CSS.
- **Hebrew content** — all user-facing text is in Hebrew. Schema/meta includes English alternates for search engines.

## Structured Data

The homepage includes 3 JSON-LD blocks:

1. **DrivingSchool** — business info, hours, service area, and offers
2. **WebSite** — site name and publisher
3. **FAQPage** — 16 questions with accepted answers

The first article includes **Article** and **BreadcrumbList** blocks. Review and aggregate-rating markup stays out of the site until its source profile is verified and consistent.

Validate at: [Google Rich Results Test](https://search.google.com/test/rich-results?url=https://avielharar.co.il/)

## Deployment

Deployed automatically via GitHub Pages on push to `main`.

- **CI**: `Validate site` runs on pull requests and pushes to `main`
- **DNS**: CNAME record pointing to `itzikhr18.github.io`
- **HTTPS**: Enforced via GitHub Pages settings
- **Cache**: GitHub Pages default (10 min browser cache)

## Business Info

| | |
|---|---|
| **Instructor** | Avi Elharar (אבי אלחרר) |
| **School** | Yoni Driving School (since 1976) |
| **Areas** | Jerusalem, Ma'ale Adumim |
| **Vehicle** | Automatic |
| **Phone** | 052-8449147 |
| **Pricing** | ₪200 (single, 40 min) / ₪400 (double, 80 min) |

## License

All rights reserved. This is a proprietary commercial website. Code and content may not be reused without written permission.
