const CACHE_NAME = 'einkaufsliste-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// Install Event - Speichert die Dateien beim ersten Aufruf im Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching App Assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch Event - Lädt die Dateien aus dem Cache, wenn kein Internet da ist
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Gibt den Cache zurück, wenn gefunden, ansonsten lade aus dem Netz
        return response || fetch(event.request);
      })
  );
});

// Activate Event - Räumt alte Caches auf, falls sich die Version (CACHE_NAME) ändert
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});
