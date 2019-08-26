import Vue from 'vue'
// State
const state = () => ({
  departments: []
})

// Getters
const getters = {
  GET_ALL_DEPARTMENTS: state => state.departments
}

// Mutations
const mutations = {
  SET_DEPARTMENTS(state, departments) {
    Vue.set(state, 'departments', departments)
  },
  SET_DEPARTMENT_CATEGORIES(state, { id, categories }) {
    state.departments.forEach(dep => {
      if (dep.department_id === id) {
        Vue.set(dep, 'categories', categories)
      }
    })
  }
}

// Actions
const actions = {
  async getAllDepartments({ commit }) {
    try {
      const departments = await this.$axios.get('/departments')
      if (departments) {
        commit('SET_DEPARTMENTS', departments.data)
        return departments
      }
    } catch (e) {
      console.log(e)
    }
  },
  async getDepartmentCategories({ commit }, { params }) {
    try {
      const categories = await this.$axios.get(
        `/categories/inDepartment/${params.id}`
      )
      if (categories) {
        commit('SET_DEPARTMENT_CATEGORIES', {
          categories: categories.data,
          id: params.id
        })
        return categories
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
