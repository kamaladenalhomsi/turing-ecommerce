module.exports = {
  chainWebpack: config => {
    config.plugin('preload').tap(options => {
      options[0].rel = 'preload'
    })
  },
  productionSourceMap: false,
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js'
      // ...other Workbox options...
    }
  },
  devServer: {
    host: 'localhost',
    port: process.env.VUE_APP_PORT ? process.env.VUE_APP_PORT : 5000,
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_extends.scss";
        `
      }
    }
  }
}
