// State
const state = () => ({
  category: {},
  department: {}
})

// Getters
const getters = {
  GET_CHOOSED_CATEGROY: state => state.category,
  GET_CHOOSED_DEPARTMENT: state => state.department
}

// Mutations
const mutations = {
  PUSH_CATEGORY(state, category) {
    state.department = {}
    state.category = category
  },
  PUSH_DEPARTMENT(state, department) {
    state.category = {}
    state.department = department
  },
  DELETE_DEPARTMENT(state) {
    state.department = {}
  },
  DELETE_CATEGORY(state) {
    state.category = {}
  }
}

// Actions
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
