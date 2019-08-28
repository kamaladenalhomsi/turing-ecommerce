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

// Inject the axios instance in the vue prototype

Vue.mixin({
  ...globalMixin
})

Vue.config.productionTip = false
console.log(store, 'store')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
