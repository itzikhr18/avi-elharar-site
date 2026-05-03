# avielharar.co.il

> Landing page for Avi Elharar — certified driving instructor in Jerusalem & Ma'ale Adumim, Israel.

[![Live Site](https://img.shields.io/badge/live-avielharar.co.il-d4af37?style=flat-square)](https://avielharar.co.il)
[![GitHub Pages](https://img.shields.io/badge/hosting-GitHub%20Pages-0a0a0a?style=flat-square&logo=github)](https://pages.github.com)
[![License](https://img.shields.io/badge/license-proprietary-red?style=flat-square)]()

## Overview

A high-performance, single-page marketing site built for conversion. Fully static — no frameworks, no build pipelines, just HTML/CSS/JS served via GitHub Pages with a custom domain.

**Key metrics:**
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- First Contentful Paint: <1.5s
- Total bundle: ~110 KB (minified CSS + JS, no external dependencies beyond Google Fonts)

## Architecture

```
├── index.html              # Single-page site (all sections)
├── style.css               # Source CSS (dark theme, RTL, responsive)
├── style.min.css           # Minified CSS (production)
├── main.js                 # Source JS (interactions, a11y widget)
├── main.min.js             # Minified JS (production)
├── sitemap.xml             # XML sitemap with image extensions
├── robots.txt              # Crawler directives
├── CNAME                   # Custom domain binding
├── hero.{jpg,webp}         # Hero portrait + responsive variants (400/640/960/1240w)
├── proof-[1-3]-*.{jpg,webp} # Proof-section editorial photos (320/500/800w × 2 formats)
├── student[1-3].jpg        # Graduate photos
├── testimonial*.jpg        # Testimonial images
├── CLAUDE.md               # AI assistant project context
└── docs/
    ├── directory-submissions.md   # Business directory tracking
    └── seo-status-report.md       # SEO audit notes
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
- Structured Data: `DrivingSchool`, `FAQPage` (16 questions), `HowTo` (4 steps), `WebSite`
- `AggregateRating` + 4 verified Google reviews
- Open Graph + Twitter Card meta tags
- Canonical URL + hreflang (he + x-default)
- Image sitemap with alt-text optimized titles
- Content-Security-Policy meta tag

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

### Project Conventions
- **No build system** — intentionally simple. Source files and minified files coexist.
- **Single HTML file** — all sections live in `index.html`. Hidden sections (privacy, terms, a11y statement) are toggled via JS.
- **RTL-first** — all layout is `dir="rtl"`. CSS uses logical properties where applicable.
- **Dark + gold palette** — black (`#0a0a0a`) base, classic gold (`#d4af37`) accent, warm cream (`#faf7f0`) on light sections. No light-mode toggle.
- **Cache-busting via query string** — minified assets are referenced as `style.min.css?v=YYYYMMDD<letter>`. Bump the suffix when you change the file so returning visitors fetch fresh CSS.
- **Hebrew content** — all user-facing text is in Hebrew. Schema/meta includes English alternates for search engines.

## Structured Data

The site includes 4 JSON-LD blocks:

1. **DrivingSchool** — business info, offers, reviews, aggregate rating
2. **FAQPage** — 16 questions with accepted answers
3. **HowTo** — 4-step process to get a license
4. **WebSite** — site name and publisher

Validate at: [Google Rich Results Test](https://search.google.com/test/rich-results?url=https://avielharar.co.il/)

## Deployment

Deployed automatically via GitHub Pages on push to `main`.

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
| **Pricing** | ₪190 (single) / ₪380 (double) |

## License

All rights reserved. This is a proprietary commercial website. Code and content may not be reused without written permission.
