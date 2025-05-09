// service-worker.js

// Define a cache name for our static assets
const CACHE_NAME = 'static-v1';

// List of assets to cache on installation
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/back-to-top-button.js',
  '/script.js'
];

// Install event: Cache static assets
self.addEventListener('install', (event) => {
  // Wait until the cache is opened and all assets are added
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // console.log('Opened cache');
        // Add all assets to cache
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch event: Serve cached assets or fetch from network
self.addEventListener('fetch', (event) => {
  // Respond with a cached resource if it exists, otherwise fetch from network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Cache miss - fetch from network
        return fetch(event.request);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  // Define a list of allowed cache names
  const cacheWhitelist = [CACHE_NAME];

  // Wait until old caches are deleted
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Delete caches that are not in the whitelist
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              // console.log('Deleting cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});