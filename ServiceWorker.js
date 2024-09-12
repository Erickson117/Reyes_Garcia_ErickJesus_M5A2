const cacheName = "DefaultCompany-Project_1_prueba_v1-0.1";
const contentToCache = [
    "Build/Reyes_Garcia_ErickJesus_M5A2.loader.js",
    "Build/Reyes_Garcia_ErickJesus_M5A2.framework.js",
    "Build/Reyes_Garcia_ErickJesus_M5A2.data",
    "Build/Reyes_Garcia_ErickJesus_M5A2.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
