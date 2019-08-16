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
      const departments = await this.$axios.get('/departments')
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
