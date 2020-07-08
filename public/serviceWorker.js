const CACHE_NAME = 'v1';

function install(event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(['/offline.html', '/favicon.svg']))
  );
}

async function cacheProxy(event) {
  // https://stackoverflow.com/a/46098981
  if (event.request.mode === 'navigate') {
    return event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
  }
}

self.addEventListener('install', install);
self.addEventListener('fetch', cacheProxy);
