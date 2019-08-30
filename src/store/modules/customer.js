// State
const state = () => ({
  info: JSON.parse(localStorage.getItem('customer')),
  token: localStorage.getItem('token')
})

// Getters
const getters = {
  GET_CUSTOMER: state => state.info,
  GET_IS_LOGGEDIN: state => (state.token ? true : false)
}

// Mutations
const mutations = {
  UPDATE_CUSTOMER(state, payload) {
    localStorage.setItem('customer', payload)
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
