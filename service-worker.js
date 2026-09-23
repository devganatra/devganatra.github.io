const CACHE_NAME = "dev-portfolio-v46";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/product/",
  "/case-studies/",
  "/case-studies/connected-climate-products/",
  "/case-studies/engineering-tools/",
  "/case-studies/neural-implant-sensing/",
  "/projects/",
  "/research/",
  "/experience/",
  "/notes/",
  "/notes/product-ownership-embedded-systems/",
  "/notes/engineering-depth-product-clarity/",
  "/notes/feedback-delivery-system/",
  "/styles.css?v=46",
  "/site.js?v=46",
  "/assets/og.png",
  "/assets/icon.svg",
  "/assets/dev-ganatra-portrait.jpg",
  "/manifest.webmanifest",
  "/robots.txt",
  "/sitemap.xml",
  "/data/projects.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  const requestUrl = new URL(event.request.url);
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request, { ignoreSearch: true }).then((cached) => cached
    || caches.match(requestUrl.pathname)
    || caches.match("/index.html"))));
});
