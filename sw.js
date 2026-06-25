const CACHE_NAME = 'prelowers-v2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './main.js',
  './tool.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      // Clone the response and cache it
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, responseClone);
      });
      return response;
    }).catch(() => caches.match(event.request))
  );
});
