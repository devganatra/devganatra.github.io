const CACHE_NAME = "dev-portfolio-v35";
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/product/",
  "/case-studies/",
  "/projects/",
  "/research/",
  "/experience/",
  "/notes/",
  "/styles.css?v=34",
  "/site.js?v=32",
  "/assets/og.png",
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
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("/index.html"))));
});
