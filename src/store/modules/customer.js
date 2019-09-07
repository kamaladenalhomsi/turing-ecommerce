// State
const state = () => ({
  info: JSON.parse(localStorage.getItem('customer')),
  token: localStorage.getItem('token'),
  token_expire: localStorage.getItem('expire_token')
})

// Getters
const getters = {
  GET_CUSTOMER: state => state.info,
  GET_TOKEN: state => state.token,
  GET_IS_LOGGEDIN: state => (state.token ? true : false)
}

// Mutations
const mutations = {
  UPDATE_CUSTOMER(state, payload) {
    localStorage.setItem('customer', payload)
  },
  SET_TOKEN(state, token) {
    localStorage.setItem('token', token)
    this.$axios.defaults.headers['user-key'] = token
    state.token = token
  },
  SET_CUSTOMER(state, customer) {
    localStorage.setItem('customer', JSON.stringify(customer))
    state.info = customer
  },
  SET_TOKEN_EXPIRE(state, expire) {
    localStorage.setItem('token_expire', expire)
    state.token_expire = expire
  },
  LOGOUT(state) {
    localStorage.removeItem('token')
    localStorage.removeItem('customer')
    localStorage.removeItem('token_expire')
    state.info = {}
    state.token = ''
    state.token_expire = ''
    this.$axios.defaults.headers['user-key'] = ''
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
