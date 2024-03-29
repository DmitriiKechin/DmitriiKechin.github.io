'use strict';
const staticCacheName = 'static-v5';

const assetUrls = [
  'index.html',
  '/css/style.css',
  '/scripts/AI.js',
  '/scripts/GameUI.js',
  '/scripts/script.js',
  '/scripts/victory.js',
];

self.addEventListener('install', async (event) => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
  skipWaiting();
});

self.addEventListener('activate', async (event) => {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}
