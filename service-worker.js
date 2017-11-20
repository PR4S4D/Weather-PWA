
var cacheName = 'weatherPWA-v1';

var filesToCache = [
  '/PWA/WeatherPWA/',
  '/PWA/WeatherPWA/index.html',
  '/PWA/WeatherPWA/scripts/app.js',
  '/PWA/WeatherPWA/scripts/localforage.js',
  '/PWA/WeatherPWA/styles/style.css',
  '/PWA/WeatherPWA/images/clear.png',
  '/PWA/WeatherPWA/images/cloudy-scattered-showers.png',
  '/PWA/WeatherPWA/images/cloudy.png',
  '/PWA/WeatherPWA/images/fog.png',
  '/PWA/WeatherPWA/images/ic_add_white_24px.svg',
  '/PWA/WeatherPWA/images/ic_refresh_white_24px.svg',
  '/PWA/WeatherPWA/images/partly-cloudy.png',
  '/PWA/WeatherPWA/images/rain.png',
  '/PWA/WeatherPWA/images/scattered-showers.png',
  '/PWA/WeatherPWA/images/sleet.png',
  '/PWA/WeatherPWA/images/snow.png',
  '/PWA/WeatherPWA/images/thunderstorm.png',
  '/PWA/WeatherPWA/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
