const CACHE_NAME = 'prelowers-v3';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './main.js',
    './tool.js',
    './manifest.json'
];

// Install: Cache core assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(names => 
            Promise.all(
                names.filter(name => name !== CACHE_NAME)
                     .map(name => caches.delete(name))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: Network-first for same-origin, skip third-party
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Only cache same-origin requests
    if (url.origin !== location.origin) return;
    
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Only cache successful responses
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
