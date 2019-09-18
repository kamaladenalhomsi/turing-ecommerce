import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// Plugins
import './plugins/index'

// Global Mixin
import globalMixin from './mixins/globals.js'

// Global Scss Style
import '@/assets/scss/main.scss'

// Global Components
import '@/components/index.js'

// Rest API path
import restPaths from '@/contants/rest_paths'

// Install Service Workers
import './registerServiceWorker'

Vue.mixin({
  ...globalMixin
})

Vue.config.productionTip = false

// Inject Paths in the Vue prototype
Vue.prototype.$rest = restPaths

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
