/**
 * Here is all components thats are registred globally
 */
import Vue from 'vue'
import CustomButton from './CustomButton.vue'
import LazyLoadImage from './LazylodaImage.vue'
import Confirm from './Confirm.vue'

Vue.component('custom-button', CustomButton)
Vue.component('lazyload-image', LazyLoadImage)
Vue.component('confirm', Confirm)
