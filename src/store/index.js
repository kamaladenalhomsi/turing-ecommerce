import Vue from 'vue'
import Vuex from 'vuex'

// Department Store
import departmentStore from './modules/department'

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
