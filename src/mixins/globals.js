/**
 * @module globals is a vue global mixin
 */

import asyncHelpers from './asyncHelpers'

export default {
  methods: {
    ...asyncHelpers
  }
}
