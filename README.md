# devganatra.me

A responsive, single-page product and engineering portfolio for Dev Praful Ganatra.

The repository list loads the latest public, non-forked projects directly from the GitHub API without browser caching, so new and renamed work appears automatically.

The interface supports English and German, automatically follows the visitor's browser language, and includes a persistent manual language switch.

The contact form delivers structured enquiries to Gmail through FormSubmit, with reCAPTCHA, honeypot, and content filtering enabled. The recipient address must confirm the first submission once before delivery becomes active.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The site uses plain HTML, CSS, and JavaScript, so it can be deployed directly to GitHub Pages, Netlify, Vercel, or any static host.
