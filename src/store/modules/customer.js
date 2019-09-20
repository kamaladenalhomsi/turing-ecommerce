// State
const state = () => ({
  info: JSON.parse(localStorage.getItem('customer')),
  token: localStorage.getItem('token'),
  token_expire: localStorage.getItem('expire_token'),
  regions: []
})

// Getters
const getters = {
  GET_CUSTOMER: state => state.info,
  GET_TOKEN: state => state.token,
  GET_IS_LOGGEDIN: state => (state.token ? true : false),
  GET_ALL_REGIONS: state => state.regions
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
    if (!customer.country) {
      customer.country = ''
    }
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
  },
  SET_REGIONS(state, regions) {
    state.regions = regions
  }
}

// Actions
const actions = {
  async getAllRegions({ commit }) {
    try {
      const regions = await this.$axios.get(this.$rest.SHIPPING.REGIONS())
      if (regions) {
        if (regions.status === 200) {
          commit('SET_REGIONS', regions.data)
          return regions
        }
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
