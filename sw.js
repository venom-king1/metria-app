/* Macro v3: offline-first fallback, network-first updates. No remote APIs or data transfer. */
const CACHE = 'macro-programs-v3-2026-11-06-r2';
const FILES = ['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('macro-') && k !== CACHE).map(k => caches.delete(k)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const isPage = request.mode === 'navigate' || /\/(?:index\.html)?$/.test(new URL(request.url).pathname);
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (isPage) {
      try {
        const response = await fetch(request, { cache: 'no-store' });
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch {
        return (await cache.match(request)) || (await cache.match('./index.html')) || Response.error();
      }
    }
    const hit = await cache.match(request);
    if (hit) return hit;
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch { return Response.error(); }
  })());
});
