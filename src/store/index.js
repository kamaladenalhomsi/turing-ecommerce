import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstance from '@/plugins/axios'
import restPaths from '@/contants/rest_paths'
// Department Store
import departmentStore from './modules/department'
import productStore from './modules/product'
import customerStore from './modules/customer'
import cartStore from './modules/cart'

Vuex.Store.prototype.$axios = axiosInstance
Vuex.Store.prototype.$rest = restPaths
Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // Modules
    department: departmentStore,
    product: productStore,
    customer: customerStore,
    cart: cartStore
  }
})
