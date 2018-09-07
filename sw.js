//tutorials from here:  https://matthewcranford.com/category/blog-posts/walkthrough/restaurant-reviews-app/ and https://www.youtube.com/watch?v=ksXwaWHCW6k

//submitted via ZIP file due to API key

const cacheName = "v1";

const cacheList = [
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];

//install
self.addEventListener('install', e => {
	console.log('service worker: installed');
});

//activate
self.addEventListener('activate', e => {
	console.log('service worker: activated');
	//clear old cache
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== cacheName){
						console.log('Service worker: clear');
						return caches.delete(cache);
					}
				})
			);
		})
	)
});

//fetch
self.addEventListener('fetch', e => {
	console.log("service worker: fetching");
	e.respondWith(
		fetch(e.request)
			.then(res => {
				const resClone = res.clone();
				caches.open(cacheName).then(cache => {
					cache.put(e.request, resClone);
				});
				return res;
			})
		.catch(err => caches.match(e.request).then(res => res))
	);
});