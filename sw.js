// اسم الـ cache
const CACHE_NAME = 'darmarket-v2.0.0';

// الملفات التي سيتم تخزينها في cache
const STATIC_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker] التثبيت');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] تخزين الملفات في cache');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] التفعيل');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] حذف cache قديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// اعتراض الطلبات
self.addEventListener('fetch', event => {
  // تجاهل طلبات POST
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في cache
        if (response) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return response;
        }

        // إذا لم يجده في cache، يجلب من الشبكة
        console.log('[Service Worker] جلب من الشبكة:', event.request.url);
        return fetch(event.request)
          .then(networkResponse => {
            // التحقق من أن الرد صالح للتخزين
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // نسخ الرد وتخزينه في cache
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(error => {
            console.log('[Service Worker] فشل الجلب:', error);
            
            // إذا كان الطلب لصفحة HTML، عرض صفحة بديلة
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // عرض رسالة خطأ بسيطة للأنواع الأخرى
            return new Response('عذراً، أنت غير متصل بالإنترنت', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
      })
  );
});

// استقبال رسائل من الصفحة الرئيسية
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// مزامنة الخلفية
self.addEventListener('sync', event => {
  if (event.tag === 'sync-properties') {
    event.waitUntil(syncProperties());
  }
});

// دالة المزامنة
function syncProperties() {
  console.log('[Service Worker] مزامنة البيانات');
  // هنا يمكنك إضافة كود لمزامنة البيانات مع الخادم
  return Promise.resolve();
}

// إشعارات push
self.addEventListener('push', event => {
  console.log('[Service Worker] إشعار push مستلم');
  
  const options = {
    body: event.data ? event.data.text() : 'إشعار جديد من دار ماركت',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'استعرض',
        icon: '/icons/explore-icon.png'
      },
      {
        action: 'close',
        title: 'إغلاق',
        icon: '/icons/close-icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('دار ماركت', options)
  );
});

// النقر على الإشعارات
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] نقر على الإشعار:', event.notification.tag);
  
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow('/');
      })
  );
});
