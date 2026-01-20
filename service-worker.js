const CACHE_NAME = "pwa-laudos-v1";

/* ✅ Arquivos para cache (GitHub Pages-friendly) */
const ASSETS = [
  "./",
  "./index.html",
  "./sistema-laudo.html",
  "./manifest.json",
  "./service-worker.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

/* ✅ Instala e salva os arquivos no cache */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* ✅ Remove caches antigos */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

/* ✅ Offline-first */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
