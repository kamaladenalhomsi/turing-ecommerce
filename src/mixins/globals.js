/**
 * @module globals is a vue global mixin
 */

import asyncHelpers from './asyncHelpers'

export default {
  data () {
    return {
      $_server_errors: {}
    }
  },
  methods: {
    ...asyncHelpers
  }
}
