const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/html-agencia-de-viagens-main/images/icon.png',
 
];

// Instalando o Service Worker e adicionando arquivos ao cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache criado!');
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptando requisições e servindo do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});

// Atualizando o Service Worker e limpando caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Cache antigo removido:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
