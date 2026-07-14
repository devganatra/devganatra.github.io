# devganatra.me

A responsive, bilingual product and engineering portfolio for Dev Praful Ganatra, hosted on GitHub Pages.

## Included

- English and German content with browser-language detection and a persistent manual switch
- Light and dark themes that follow the visitor's system preference
- Searchable, filterable, and sortable GitHub project explorer
- Detailed work case studies and engineering notes in an accessible dialog
- Downloadable one-page English and German résumés
- Installable web-app metadata and offline caching
- A protected Web3Forms contact form with hCaptcha, honeypot, and server-side spam filtering

## GitHub project automation

The site reads `data/projects.json` first and falls back to the public GitHub API when needed. The `Refresh portfolio projects` GitHub Action runs daily and can also be started manually. It updates the snapshot only when repository data actually changes, so renamed and newly published projects appear without creating empty commits.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The site uses plain HTML, CSS, and JavaScript, so it can be deployed directly to GitHub Pages, Netlify, Vercel, or any static host.

## Generate the résumés

The résumé generator uses ReportLab:

```bash
python3 scripts/generate_resumes.py
```

Generated documents are written to `output/pdf/` and are intentionally committed so GitHub Pages can serve them.

## Optional privacy-friendly analytics

Analytics are intentionally not enabled with a placeholder credential. Cloudflare Web Analytics can be added on its free plan by creating a site in Cloudflare, copying the site-specific beacon token, and adding Cloudflare's generated script immediately before `</body>`. No cookie banner is required for the standard privacy-focused beacon, but the site's privacy wording should still reflect whichever configuration is chosen.
