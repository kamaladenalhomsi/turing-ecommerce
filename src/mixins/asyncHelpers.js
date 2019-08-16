
/**
 * @module AsyncHelper
 * this module is responsible for all asynchronous operations, it has only two functions
 * @function $_async_query is a wrapper for queries (Get) @params
 * - payload
 * -- inside payload, there is four callbacks:
 * --- @done when request handled successfully
 * --- @badRequest when there is validation errors or input error (User mistake)
 * --- @unauthorized if user has not permission
 * --- @nullResult if response data length === 0
 */

export default {
  async $_async_query (payload, testStore) {
    let store = this.$store
    if (testStore) {
      store = testStore
    }
    const response = await store.dispatch(
      payload.query.action, // action to dispatch
      payload.query.variables ? payload.query.variables : {} // variables (optional)
    )
    // if response does not null or undefiend
    if (response) {
      // Success
      if (response.status === 200) {
        // the if condition above each callback check if callback exist
        if (payload.done && typeof payload.done !== 'undefined') {
          payload.done(response.data)
        }
        if (response.data.length === 0) {
          if (payload.done && typeof payload.nullResult !== 'undefined') {
            payload.nullResult(response)
          }
        }
      }
      // Bad Request
      if (response.status === 400) {
        if (payload.badRequest && typeof payload.badRequest !== 'undefined') {
          payload.badRequest(response)
        }
      }
      // Unauthorized
      if (response.status === 500) {
        if (payload.done && typeof payload.unauthorized !== 'undefined') {
          payload.unauthorized(response)
        }
      }
      return response
    }
  }
}
