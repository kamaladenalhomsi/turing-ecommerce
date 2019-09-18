import VeeValidate from 'vee-validate'
import Vue from 'vue'
import CustomErrors from '@/constants/veeValidateCustomErrors.json'
import CustomAttributes from '@/constants/veeValidateCustomAttributes.json'
const dictionary = {
  en: {
    custom: CustomErrors,
    attributes: CustomAttributes
  }
}

Vue.use(VeeValidate, {
  dictionary
})
