import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstance from '@/plugins/axios'
// Department Store
import departmentStore from './modules/department'
import productStore from './modules/product'

Vuex.Store.prototype.$axios = axiosInstance
Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // Modules
    department: departmentStore,
    product: productStore
  }
})
