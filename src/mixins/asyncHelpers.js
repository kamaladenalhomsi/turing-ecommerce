/**
 * @module AsyncHelper
 * this module is responsible for all asynchronous operations, it has only two functions
 * @function $_async_query is a wrapper for queries (Get) @params
 * - payload
 * -- inside payload, there is four callbacks:
 * --- @nullResult if response data length === 0
 * @function $_async_mutation is a wrapper for post, put, delete operations
 * - payload
 * -- inside payload, there is four callbacks:
 * --- @badRequest when there is validation errors or input error (User mistake)
 * - in case there is errors returned from server, it will automatically injected in server_errors
 * both function have:
 * -- @done when request handled successfully
 * -- @unauthorized if user has not permission
 * callbacks inisde there payload
 */
import axiosInstance from '@/plugins/axios'
import Vue from 'vue'
const constructNotification = (type, defaultMessage, override) => {
  let notification = {
    message: defaultMessage,
    type: type,
    duration: 500000,
    position: 'is-bottom-right',
    hasIcon: true,
    iconPack: 'fas'
  }
  if (override) {
    for (let key in override) {
      notification[key] = override[key]
    }
  }
  return notification
}

export default {
  async $_async_query(payload) {
    let response
    // if action exist, dispatch
    if (payload.query.action) {
      response = await this.$store.dispatch(
        payload.query.action, // action to dispatch
        payload.query.variables ? payload.query.variables : {} // variables (optional)
      )
      // if path exist
    } else if (payload.query.path) {
      response = await axiosInstance.get(payload.query.path, {
        params: payload.query.params
      })
    }
    // if response does not null or undefiend
    if (response) {
      // Success
      if (response.status === 200 || response.status === 201) {
        // the if condition above each callback check if callback exist
        if (payload.done && typeof payload.done !== 'undefined') {
          payload.done(response.data)
        }
        if (response.data && response.data.length === 0) {
          if (payload.nullResult && typeof payload.nullResult !== 'undefined') {
            payload.nullResult(response)
          }
        }
      }
      // Unauthorized
      if (response.status === 401) {
        if (
          payload.unauthorized &&
          typeof payload.unauthorized !== 'undefined'
        ) {
          payload.unauthorized(response)
        }
      }
      return response
    }
  },
  async $_async_mutation(payload) {
    let response
    // if action exist, dispatch
    if (payload.mutation.action) {
      response = await this.$store.dispatch(
        payload.mutation.action, // action to dispatch
        payload.mutation.variables ? payload.mutation.variables : {} // variables (optional)
      )
      // if path exist
    } else if (payload.mutation.path) {
      try {
        response = await axiosInstance({
          method: payload.mutation.method,
          url: payload.mutation.path,
          data: payload.mutation.variables
        })
      } catch (e) {
        response = e.response
      }
    }
    // if response does not null or undefiend
    if (response) {
      // Success
      if (response.status === 200) {
        this.$buefy.notification.open(
          constructNotification(
            'is-success',
            'Operation has done successfully',
            payload.doneNtf
          )
        )
        // the if condition above each callback check if callback exist
        if (payload.done && typeof payload.done !== 'undefined') {
          payload.done(response.data)
        }
        if (response.data && response.data.length === 0) {
          if (payload.nullResult && typeof payload.nullResult !== 'undefined') {
            payload.nullResult(response)
          }
        }
      }
      // Bad Request
      if (response.status === 400) {
        if (payload.badRequestNtf) {
          this.$buefy.notification.open(
            constructNotification(
              'is-danger',
              'Ops! Something went wrong, Check you inputs and try again',
              payload.badRequestNtf
            )
          )
        }
        // Inject error returned from server in server_errors
        Vue.set(
          this.$data.server_errors,
          response.data.error.field,
          response.data.error.message
        )
        if (payload.badRequest && typeof payload.badRequest !== 'undefined') {
          payload.badRequest(response)
        }
      }
      // Unauthorized
      if (response.status === 401) {
        this.$buefy.notification.open(
          constructNotification(
            'is-danger',
            'You do not have permission to perform this operation!',
            payload.unauthorizedNtf
          )
        )
        if (
          payload.unauthorized &&
          typeof payload.unauthorized !== 'undefined'
        ) {
          payload.unauthorized(response)
        }
      }
      return response
    }
  }
}
