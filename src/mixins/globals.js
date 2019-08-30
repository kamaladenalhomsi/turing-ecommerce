/**
 * @module globals is a vue global mixin
 */

import asyncHelpers from './asyncHelpers'

export default {
  data() {
    return {
      server_errors: {}
    }
  },
  methods: {
    ...asyncHelpers,
    $_compose_img_url(name) {
      return process.env.VUE_APP_BASE_IMAGES_DIR + name
    }
  }
}
