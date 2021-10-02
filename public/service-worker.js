var FILES_TO_CACHE = [
    '/',
    '/styles.css',
    '/index.js',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png',
    '/manifest.webmanifast.json',
    '/db.js',
    './favicon.ico'

  ];
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Open cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() =>{
            return caches.match(event.request).then((res) => {
                if (res) {
                    return res;
                }else if (event.request.headers.get("accept").includes("text/html")){
                    return caches.match("/index.html");
                }
            });
        })
    );
});
