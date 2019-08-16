import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'

// Plugins
import './plugins/index'

// Global Mixin
import globalMixin from './mixins/globals.js'

Vue.mixin({
  ...globalMixin
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
