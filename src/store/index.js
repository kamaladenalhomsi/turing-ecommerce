import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// Department Store
import departmentStore from './modules/department'
Vuex.Store.prototype.$axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer `
  },
});
Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({

  }),
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    // Modules
    department: departmentStore
  }
})
