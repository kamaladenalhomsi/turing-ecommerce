module.exports = {
  devServer: {
    host: 'localhost',
    port: process.env.VUE_APP_PORT ? process.env.VUE_APP_PORT : 5000
  }
}