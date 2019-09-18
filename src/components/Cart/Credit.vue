<template>
  <div id="app">
    <card
      class="stripe-card mt-10"
      :class="{ complete, 'myStripe': true }"
      stripe="pk_test_NcwpaplBCuTL6I0THD44heRe"
      :options="stripeOptions"
      @change="complete = $event.complete"
    />
    <custom-button
      class="mt-4"
      @click.native="$emit('pay')"
      size="large"
      type="filled-fuchsia"
      :loading="btnLoading"
      nm="payWithCredit"
    >Pay with credit card</custom-button>
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  props: {
    btnLoading: {
      type: Boolean
    }
  },
  data () {
    return {
      complete: false,
      stripeOptions: {
        style: {
          base: {
            fontFamily: 'Montserrat'
          }
        }
        // see https://stripe.com/docs/stripe.js#element-options for details
      }
    }
  },

  components: { Card },

}
</script>

<style lang="scss">
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.StripeElement {
  box-sizing: border-box;

  height: 55px;

  padding: 18px 12px;

  border: 2px solid #e1e1e1;
  border-radius: 4px;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}


.StripeElement--focus {
  border: 2px solid $typoColorFuchsia;
}

.StripeElement--invalid {
  border-color: #fa755a;
}


.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>