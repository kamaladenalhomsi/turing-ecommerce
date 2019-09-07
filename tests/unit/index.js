import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import buefy from 'buefy'
import globals from '@/mixins/globals'
import VeeValidate from 'vee-validate'

export const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(buefy)
localVue.mixin(globals)
localVue.use(VeeValidate)

localVue.prototype.$buefy = {
  notification: {
    open: () => true
  }
}
