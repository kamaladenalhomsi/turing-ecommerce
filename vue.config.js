module.exports = {
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
