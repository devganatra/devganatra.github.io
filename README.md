# Dev Ganatra — Product and Engineering Portfolio

A responsive, bilingual product and engineering portfolio for Dev Praful Ganatra, hosted on GitHub Pages.

## Included

- English and German content with browser-language detection and a persistent manual switch
- Light and dark themes with a persistent manual switch
- A concise homepage with audience-specific routes
- Dedicated product, case-study, project, research, experience, and notes pages
- Curated public projects with quiet, automatically refreshed GitHub metadata
- Public-safe professional case studies that do not expose confidential company information
- Downloadable one-page English and German résumés
- Installable web-app metadata and offline caching
- A protected Web3Forms contact form with hCaptcha, honeypot, and server-side spam filtering
- Search metadata, structured data, a multi-page sitemap, and social-sharing artwork

## GitHub project automation

The `Refresh portfolio projects` GitHub Action runs daily and can also be started manually. It updates `data/projects.json` only when public repository data changes. The projects page uses that snapshot for live language and update metadata on selected public projects; the portfolio remains curated instead of displaying every repository.

## Preview locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

The site uses plain HTML, CSS, and JavaScript, so it can be deployed directly to GitHub Pages, Netlify, Vercel, or any static host.

## Generate the résumés

The résumé generator uses ReportLab:

```bash
python3 scripts/generate_resumes.py
```

Generated documents are written to `output/pdf/` and are intentionally committed so GitHub Pages can serve them.

## Optional privacy-friendly analytics

Analytics are intentionally not enabled with a placeholder credential. Cloudflare Web Analytics can be added on its free plan by creating a site in Cloudflare, copying the site-specific beacon token, and adding Cloudflare's generated script immediately before `</body>`. No cookie banner is required for the standard privacy-focused beacon, but the site's privacy wording should still reflect whichever configuration is chosen.
