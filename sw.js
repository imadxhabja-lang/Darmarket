// Service Worker for darmarket2 PWA
const CACHE_NAME = 'darmarket2-v1';
const urlsToCache = [
  '/Darmarket/',
  '/Darmarket/index.html',
  'https://i.ibb.co/SwVN7NNf/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
