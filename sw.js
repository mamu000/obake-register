const C = 'obake-register-v2';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(['./', './index.html'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(r => {
      const cl = r.clone();
      caches.open(C).then(c => c.put(e.request, cl));
      return r;
    }).catch(() =>
      caches.match(e.request, {ignoreSearch: true})
        .then(m => m || caches.match('./index.html'))
    )
  );
});
