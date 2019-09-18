if (workbox) {
  workbox.precaching.precacheAndRoute(self.__precacheManifest)

  workbox.routing.registerRoute(
    new RegExp('https://backendapi.turing.com'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api'
    })
  )
} else {
  console.log(`Workbox didn't load`)
}
