// State
const state = () => ({
  cart_id: localStorage.getItem('cart_id'),
  cart_items: [],
  saved_items: [],
  total_amount: 0
})

// Getters
const getters = {
  GET_CART_ID: state => state.cart_id,
  GET_CART_ITEMS: state => state.cart_items,
  GET_CART_COUNT: state => state.cart_items.length,
  GET_SAVED_COUNT: state => state.saved_items.length,
  GET_CART_SAVED: state => state.saved_items,
  GET_CART_TOTAL_AMOUNT: state => Number(state.total_amount)
}

// Mutations
const mutations = {
  SET_CART_ID(state, id) {
    localStorage.setItem('cart_id', id)
    state.cart_id = id
  },
  SET_CART_ITEMS(state, items) {
    state.cart_items = items
  },
  DELETE_CART_ITEM(state, index) {
    state.cart_items.splice(index, index + 1)
  },
  REMOVE_ALL(state) {
    state.cart_items = []
  },
  SET_SAVED_ITEMS(state, items) {
    state.saved_items = items
  },
  SAVE_ITEM_FOR_LATER(state, index) {
    let item = state.cart_items.splice(index, index + 1)[0]
    state.saved_items.unshift(item)
  },
  MOVE_TO_CART(state, index) {
    let item = state.saved_items.splice(index, index + 1)[0]
    state.cart_items.unshift(item)
  },
  SET_TOTAL_AMOUNT(state, total) {
    state.total_amount = total
  },
  REMOVE_ALL_SAVED(state) {
    state.saved_items = []
  }
}

// Actions
const actions = {
  async getTotalAmount({ commit }, { cart_id }) {
    try {
      const total = await this.$axios.get(
        this.$rest.SHOPPING_CART.TOTAL_AMOUNT(cart_id)
      )
      if (total) {
        if (total.status === 200) {
          commit('SET_TOTAL_AMOUNT', total.data.total_amount)
          return total
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
  async getCartItems({ commit }, cart_id) {
    try {
      const res = await this.$axios.get(this.$rest.SHOPPING_CART.GET(cart_id))
      if (res) {
        if (res.status === 200) {
          commit('SET_CART_ITEMS', res.data)
          return res
        }
      }
    } catch (e) {
      console.log(e)
    }
  },
  async getSavedItems({ commit }, cart_id) {
    try {
      const res = await this.$axios.get(
        this.$rest.SHOPPING_CART.GET_SAVED(cart_id)
      )
      if (res) {
        if (res.status === 200) {
          commit('SET_SAVED_ITEMS', res.data)
          return res
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
