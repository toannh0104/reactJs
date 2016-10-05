let staticCacheName = 'transport-static-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(
            [
              '/',
              '/css/ki.css',
              '/build/data/stops.json',
              '/build/data/stop_list.json',
              '/build/data/stop_time.json',
              '/build/data/trips.json',
              '/build/assets/images/train_logo.jpg',
              '/build/static/main.bundle.js'
              // '_tmp/vendors.dll.js'
            ]
        );
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request.clone()).then(function (response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseCache = response.clone();
          caches.open(staticCacheName).then(function (cache) {
            cache.put(event.request, responseCache);
          });
          return response;
        });
      })
  );
});

