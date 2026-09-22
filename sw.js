/* ====================================================================
   SERVICE WORKER — OFFLINE SUPPORT FOR THE CUSTOMER MENU
   Caches the app shell (HTML/CSS/JS/fonts) on first visit so the menu
   keeps working with no signal. Admin edits and Firebase sync still
   need a connection — this only makes browsing the menu work offline.
   Bump CACHE_VERSION whenever app-shell files change so old caches
   are dropped and the new files are fetched.
   ==================================================================== */

const CACHE_VERSION = 'v1';
const SHELL_CACHE = `alankar-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `alankar-runtime-${CACHE_VERSION}`;

const SHELL_FILES = [
    './',
    './index.html',
    './css/variables.css',
    './css/style.css',
    './css/animations.css',
    './css/customer.css',
    './js/firebase-config.js',
    './js/menu.js',
    './js/search.js',
    './js/admin.js',
    './js/animations.js',
    './js/app.js',
    './assets/watermark-emblem.svg',
    './assets/watermark-pattern.svg',
    './manifest.json'
];

// Third-party hosts we opportunistically cache (fonts, QR/PDF libs, Firebase SDK).
// Never includes the Firebase *database* host — that must always hit the network.
const RUNTIME_HOSTS = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdnjs.cloudflare.com',
    'www.gstatic.com'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(SHELL_CACHE)
            .then((cache) => cache.addAll(SHELL_FILES))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Firebase Realtime Database traffic: always network, never cached —
    // menu/password sync must reflect the live server, not a stale copy.
    if (url.hostname.endsWith('firebaseio.com') || url.hostname.endsWith('firebasedatabase.app')) {
        return;
    }

    // Same-origin app shell: cache-first, falling back to network, then
    // to the cached index.html for navigations (so deep links work offline).
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;
                return fetch(request)
                    .then((response) => {
                        if (response.ok) {
                            const clone = response.clone();
                            caches.open(SHELL_CACHE).then((cache) => cache.put(request, clone));
                        }
                        return response;
                    })
                    .catch(() => {
                        if (request.mode === 'navigate') return caches.match('./index.html');
                    });
            })
        );
        return;
    }

    // Fonts / QR / PDF / Firebase SDK: stale-while-revalidate so repeat
    // visits are instant and still refresh quietly in the background.
    if (RUNTIME_HOSTS.includes(url.hostname)) {
        event.respondWith(
            caches.open(RUNTIME_CACHE).then((cache) =>
                cache.match(request).then((cached) => {
                    const network = fetch(request)
                        .then((response) => {
                            cache.put(request, response.clone());
                            return response;
                        })
                        .catch(() => cached);
                    return cached || network;
                })
            )
        );
    }
});
