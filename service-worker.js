// اسم التطبيق والإصدار
const APP_NAME = 'DarMarket-PWA';
const APP_VERSION = '1.0.0';
const CACHE_NAME = `${APP_NAME}-${APP_VERSION}`;

// الملفات التي سيتم تخزينها مؤقتاً
const STATIC_CACHE_FILES = [
  '/',
  '/index.html',
  '/add-property.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  console.log(`[Service Worker] تثبيت ${CACHE_NAME}`);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] تخزين الملفات الأساسية مؤقتاً');
        return cache.addAll(STATIC_CACHE_FILES);
      })
      .then(() => {
        console.log('[Service Worker] تثبيت Service Worker مكتمل');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] خطأ في التثبيت:', error);
      })
  );
});

// تفعيل Service Worker
self.addEventListener('activate', event => {
  console.log(`[Service Worker] تفعيل ${CACHE_NAME}`);
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // حذف الذاكرة المؤقتة القديمة
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] حذف الذاكرة المؤقتة القديمة: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Service Worker مفعل وجاهز للعمل');
      return self.clients.claim();
    })
  );
});

// اعتراض الطلبات
self.addEventListener('fetch', event => {
  // استبعاد طلبات POST وغيرها من الطلبات غير القابلة للتخزين المؤقت
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا كان الملف موجوداً في الذاكرة المؤقتة، إرجاعه
        if (response) {
          console.log(`[Service Worker] تقديم من الذاكرة المؤقتة: ${event.request.url}`);
          return response;
        }
        
        // إذا لم يكن موجوداً، جلبها من الشبكة
        console.log(`[Service Worker] جلب من الشبكة: ${event.request.url}`);
        return fetch(event.request)
          .then(response => {
            // التحقق من أن الاستجابة صالحة
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // استنساخ الاستجابة لأنها يمكن استخدامها مرة واحدة فقط
            const responseToCache = response.clone();
            
            // تخزين الاستجابة الجديدة في الذاكرة المؤقتة
            caches.open(CACHE_NAME)
              .then(cache => {
                // استبعاد بعض أنواع الطلبات من التخزين المؤقت
                const url = new URL(event.request.url);
                if (url.origin !== location.origin || 
                    event.request.url.includes('/api/') ||
                    event.request.url.includes('chrome-extension')) {
                  return;
                }
                
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('[Service Worker] خطأ في جلب المورد:', error);
            
            // إذا فشل جلب المورد، يمكن إرجاع صفحة بديلة
            if (event.request.url.includes('.html')) {
              return caches.match('/index.html');
            }
            
            // أو إرجاع رسالة خطأ مناسبة
            return new Response('عذراً، أنت غير متصل بالإنترنت ولا يوجد نسخة مخزنة من هذه الصفحة.', {
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

// التعامل مع الرسائل من الصفحة الرئيسية
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// تحديث التطبيق في الخلفية
self.addEventListener('sync', event => {
  if (event.tag === 'update-properties') {
    console.log('[Service Worker] مزامنة بيانات العقارات');
    // هنا يمكن إضافة كود لمزامنة البيانات مع الخادم
  }
});
