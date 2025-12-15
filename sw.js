// Service Worker للتطبيق darmarket2
const CACHE_NAME = 'darmarket2-v1';
const urlsToCache = [
  '/Darmarket/',
  '/Darmarket/index.html',
  '/Darmarket/manifest.json',
  'https://i.ibb.co/SwVN7NNf/logo.png'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ تم فتح التخزين المؤقت');
        return cache.addAll(urlsToCache);
      })
  );
});

// التعامل مع الطلبات
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ حذف التخزين المؤقت القديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
