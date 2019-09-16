import VeeValidate from 'vee-validate'
import Vue from 'vue'
const dictionary = {
  en: {
    custom: {
      shipping: {
        required: 'Please choose shipping region!'
      }
    },
    attributes: {
      address_1: 'Address 1',
      address_2: 'Address 2',
      postal_code: 'Postal Code',
      shipping_region_id: 'Shipping Region',
      credit_card: 'Credit Card'
    }
  }
}

Vue.use(VeeValidate, {
  dictionary
})
