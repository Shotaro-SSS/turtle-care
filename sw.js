const CACHE_NAME = 'turtle-care-v1';
const urlsToCache = [
  '/',
  '/turtle-care/',
  '/turtle-care/index.html',
  '/turtle-care/styles.css',
  '/turtle-care/script.js',
  '/turtle-care/manifest.webmanifest',
  '/turtle-care/images/fruits.png',
  '/turtle-care/images/turtlefoods.png',
  '/turtle-care/images/vegetables.png',
  '/turtle-care/images/bath.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});