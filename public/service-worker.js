if (workbox) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest)

  workbox.routing.registerRoute(
    new RegExp('https://backendapi.turing.com'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api'
    })
  )

  workbox.routing.registerRoute(
    new RegExp('https://backendapi.turing.com/images/products'),
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxAgeSeconds: 2.628e6
        })
      ]
    })
  )
} else {
  console.log(`Workbox didn't load`)
}
