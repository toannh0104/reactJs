let staticCacheName = 'transport-static-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(
      caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(
            [
              '/',
              '/css/ki.css',
              '/build/static/main.bundle.js'
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
              if("HEAD" !== event.request.method){
                  cache.put(event.request, responseCache);
              }
          });
          return response;
        });
      })
  );
});