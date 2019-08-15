import axios from 'axios'

// State
const state = () => ({

})

// Getters
const getters = {

}

// Mutations
const mutations = {

}

// Actions
const actions = {
  async getAllDepartments () {
    try {
      const departments = await axios.get(process.env.VUE_APP_BASE_API_URL + '/departments')
      if (departments) {
        return departments
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
