import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import buefy from 'buefy'
import globals from '@/mixins/globals'
import VeeValidate from 'vee-validate'
import restPaths from '@/contants/rest_paths'

export const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(buefy)
localVue.mixin(globals)
localVue.use(VeeValidate)
localVue.prototype.$rest = restPaths

localVue.prototype.$buefy = {
  notification: {
    open: () => true
  }
}
