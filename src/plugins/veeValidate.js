import VeeValidate from 'vee-validate'
import Vue from 'vue'
import CustomErrors from '@/constants/veeValidateCustomErrors.json'
import CustomAttributes from '@/constants/veeValidateCustomAttributes.json'

VeeValidate.Validator.extend('not_default_option', {
  validate(value, [args]) {
    console.log(value, 'value')
    return value !== 1
  },
  getMessage() {
    return 'Please Select a vaild value'
  }
})

const dictionary = {
  en: {
    custom: CustomErrors,
    attributes: CustomAttributes
  }
}

Vue.use(VeeValidate, {
  dictionary
})
