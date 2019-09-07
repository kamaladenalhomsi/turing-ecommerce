// State
const state = () => ({
  category: {},
  department: {},
  searchWord: ''
})

// Getters
const getters = {
  GET_CHOOSED_CATEGROY: state => state.category,
  GET_CHOOSED_DEPARTMENT: state => state.department,
  GET_SEARCH_WORD: state => ({
    query_string: state.searchWord
  })
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
  },
  SET_SEARCH_WORD(state, word) {
    state.searchWord = word
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
