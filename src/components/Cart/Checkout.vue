<template>
  <b-steps
    :has-navigation="true"
    icon-prev="arrow-left"
    icon-next="arrow-right"
    v-model="tab"
    class="mt-8 checkout-steper"
  >
    <b-step-item label="Delivery" :clickable="false" icon="truck">
      <div class="checkout-shipping mt-8">
        <h2 class="font-bold f-montserrat c-black">Address</h2>
        <div class="w-full flex flex-wrap mt-4">
          <b-field
            class="custom-input w-full md:w-1/2 pr-4"
            :message="server_errors['address_1'] || errors.first(`${addressScope}.address_1`)"
            :type="server_errors['address_1'] || errors.has(`${addressScope}.address_1`) ? 'is-danger' : ''"
          >
            <b-input
              v-model="customer.address_1"
              :data-vv-scope="addressScope"
              data-vv-name="address_1"
              placeholder="Address 1"
              v-validate="'required'"
            ></b-input>
          </b-field>
          <b-field
            class="custom-input w-full md:w-1/2 pr-4"
            :message="server_errors['region'] || errors.first(`${addressScope}.region`)"
            :type="server_errors['region'] || errors.has(`${addressScope}.region`) ? 'is-danger' : ''"
          >
            <b-input
              :data-vv-scope="addressScope"
              v-model="customer.region"
              data-vv-name="region"
              placeholder="Region"
              v-validate="'required'"
            ></b-input>
          </b-field>
          <b-field
            class="custom-input w-full md:w-1/2 pr-4"
            :message="server_errors['country'] || errors.first(`${addressScope}.country`)"
            :type="server_errors['country'] || errors.has(`${addressScope}.country`) ? 'is-danger' : ''"
          >
            <b-input
              :data-vv-scope="addressScope"
              v-model="customer.country"
              data-vv-name="country"
              placeholder="Country"
              v-validate="'required'"
            ></b-input>
          </b-field>
          <b-field
            class="custom-input w-full md:w-1/2 pr-4 select-error"
            :message="server_errors['shipping_region'] || errors.first(`${addressScope}.shipping_region_id`)"
            :type="server_errors['shipping_region'] || errors.has(`${addressScope}.shipping_region_id`) ? 'is-danger' : ''"
          >
            <b-select
              :data-vv-scope="addressScope"
              v-validate="'required|not_default_option'"
              name="shipping_region_id"
              v-model="customer.shipping_region_id"
              class="custom-select"
              placeholder="Select a name"
            >
              <option
                v-for="option in regions"
                :value="option.shipping_region_id"
                :key="option.shipping_region_id"
              >{{ option.shipping_region }}</option>
            </b-select>
          </b-field>
          <custom-button
            nm="updateAddressCheckout"
            class="mt-4"
            size="large"
            type="filled-fuchsia"
            @click.native="update"
            icon="fas fa-pencil-alt"
            :loading="addressLoading"
          >Update</custom-button>
        </div>
        <h2 class="font-bold f-montserrat c-black mt-8">Shipping</h2>
        <div class="w-full flex-wrap md:flex-no-wrap flex mt-4 checkout-steper__block pb-4">
          <template v-if="regions.length > 0">
            <div
              v-for="region in regions"
              :key="region.shipping_region_id"
              class="w-1/2 md:mt-0 mt-4 flex justify-start flex-wrap"
            >
              <div class="w-full">{{ region.shipping_region }}</div>
              <ul v-if="region.types">
                <li v-for="type in region.types" :key="type.shipping_id">
                  <b-radio
                    class="mt-2"
                    type="is-danger"
                    v-model="checkout.shipping"
                    :name="type.shipping_type"
                    :native-value="type"
                    data-vv-name="shipping"
                    v-validate="'required'"
                    data-vv-scope="order"
                    :nm="'shipping-' + type.shipping_id"
                  >
                    <span class="c-grey text-sm">{{ type.shipping_type }}</span>
                  </b-radio>
                </li>
              </ul>
              <ul class="ml-4" v-else>
                <li v-for="z in 3" :key="z" class="w-40 mt-4">
                  <content-loader
                    :height="15"
                    :width="173"
                    :speed="2"
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                  >
                    <rect x="3.69" y="0.67" rx="0" ry="0" width="169" height="15" />
                  </content-loader>
                </li>
              </ul>
            </div>
          </template>
          <div v-else v-for="i in 3" :key="i" class="w-1/2 flex justify-start flex-wrap">
            <div class="w-full">
              <content-loader
                :height="15"
                :width="173"
                :speed="2"
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
              >
                <rect x="3.69" y="0.67" rx="0" ry="0" width="169" height="15" />
              </content-loader>
            </div>
          </div>
          <h5 class="c-fushia">{{ errors.first('order.shipping') }}</h5>
        </div>
        <h2 class="font-bold f-montserrat c-black pt-4">Taxes</h2>
        <div class="w-full flex mt-4">
          <template v-if="taxes.length > 0">
            <div
              v-for="(tax, index) in taxes"
              :key="tax.tax_id"
              class="w-1/2 flex justify-start flex-wrap"
            >
              <b-radio
                class="mt-2"
                type="is-danger"
                v-model="checkout.tax"
                :name="tax.tax_type"
                :native-value="tax"
                data-vv-name="tax"
                v-validate="'required'"
                data-vv-scope="order"
                :nm="'tax-' + index"
              >
                <span class="c-grey text-sm">{{ tax.tax_type }}</span>
              </b-radio>
            </div>
          </template>
          <div v-else v-for="y in 3" :key="y" class="w-1/2 flex justify-start flex-wrap">
            <div class="w-40">
              <content-loader
                :height="15"
                :width="173"
                :speed="2"
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
              >
                <rect x="3.69" y="0.67" rx="0" ry="0" width="169" height="15" />
              </content-loader>
            </div>
          </div>
          <h5 class="c-fushia">{{ errors.first('order.shipping') }}</h5>
        </div>
      </div>
    </b-step-item>
    <b-step-item label="Confirmation" :clickable="false" icon="clipboard-check">
      <div class="mt-8">
        <h4 class="font-bold">Order Summary</h4>
        <div class="flex checkout-steper__block pb-4">
          <div class="w-3/4">
            <b-table :striped="true" :mobile-cards="true" class="cart-table" :data="cart_items">
              <template slot-scope="props">
                <b-table-column field="item" label="Item">{{ props.row.name }}</b-table-column>
                <b-table-column field="qty" label="Quantity">{{ props.row.quantity }}</b-table-column>
                <b-table-column field="price" label="Price">{{ props.row.price }}</b-table-column>
              </template>
            </b-table>
          </div>
          <div class="ml-8 w-1/3">
            <h4 class="font-bold">Delivery</h4>
            <h5 class="f-montserrat font-bold c-grey mt-4">Address</h5>
            <p class="mt-4">{{ customer.address_1 }}</p>
            <h5 class="f-montserrat font-bold c-grey mt-4">Delivery options</h5>
            <p class="mt-4" nm="confirmShipping">{{ checkout.shipping.shipping_type }}</p>
          </div>
        </div>
        <div class="flex mt-4">
          <div>
            <h4 class="f-montserrat font-bold c-grey mt-4">Subtotal</h4>
            <h4 class="mt-2 c-black font-bold">£{{ cart_total_amount }}</h4>
          </div>
          <div class="ml-10">
            <h4 class="f-montserrat font-bold c-grey mt-4">Delivery Cost</h4>
            <h4 class="mt-2 c-black font-bold">£{{ checkout.shipping.shipping_cost }}</h4>
          </div>
        </div>
      </div>
    </b-step-item>
    <b-step-item label="Payment" :clickable="false" icon="credit-card">
      <credit @pay="pay" :btnLoading="checkout.loading" stripe="pk_test_NcwpaplBCuTL6I0THD44heRe"></credit>
    </b-step-item>
    <b-step-item label="Finish" icon="check">
      <div class="flex justify-center flex-wrap">
        <img :src="require('@/assets/images/icons-rocket.png')" alt />
        <div class="w-full text-center">
          <h1 class="font-bold f-playFair c-black text-5xl">Success!</h1>
          <p class="c-grey mt-2">
            Your items will be shipped shortly,
            <br />you will get email with details.
          </p>
          <custom-button
            size="large"
            type="filled-fuchsia"
            class="mt-8"
            @click.native="$emit('closeModal')"
          >Back to shop</custom-button>
        </div>
      </div>
    </b-step-item>
  </b-steps>
</template>

<style lang="scss">

.select-error {
  p {
    margin-top: 15px;
  }
}

.checkout-steper {
  .step-marker {
    i {
      color: $typeColorWhite !important;
      font-size: 14px !important;
    }
  }
  .step-item.is-active, .step-item.is-previous {
    &::before {
      background: $docColorFuchsia !important
    }
  }
  .step-item.is-previous {
    .step-marker {
      background-color: $docColorFuchsia !important;
    }
  }
  .step-item.is-active .step-marker {
    background-color: $docColorFuchsia !important;
    border-color: $docColorFuchsia !important
  }
  &__block {
    border: 0px;
    border-bottom: 2px solid #E5E5E5
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import { createToken } from 'vue-stripe-elements-plus'
const Credit = () => import(/* webpackPrefetch: true */'@/components/Cart/Credit.vue')

export default {
  name: 'checkout',
  components: {
    Credit
  },
  props: {
    tab: {
      type: Number,
      required: true
    },
    regions: {
      type: Array
    },
    taxes: {
      type: Array
    }
  },
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      checkout: {
        shipping: '',
        tax: '',
        loading: false
      },
      addressLoading: false
    }
  },
  computed: {
    ...mapGetters({
      cart_items: 'cart/GET_CART_ITEMS',
      cart_id: 'cart/GET_CART_ID',
      cart_total_amount: 'cart/GET_CART_TOTAL_AMOUNT'
    }),
    customer() {
      // Clone customer data
      return JSON.parse(JSON.stringify(this.$store.getters['customer/GET_CUSTOMER']))
    },
    addressScope() {
      if (this.customer.address_1 === null &&
      this.customer.region === null &&
      this.customer.country === '' &&
      this.customer.shipping_region_id === 1) {
        return 'order'
      }
      return 'address'
    }
  },
  methods: {
    async validateAll() {
      // Check for validation
      let vaild = await this.$validator.validateAll('order')
      return vaild
    },
    async createOrder() {
      this.checkout.loading = true
      const { cart_id, checkout } = this
      return this.$_async_mutation({
        mutation: {
          path: this.$rest.ORDERS.ADD(),
          method: 'post',
          variables: {
            cart_id,
            shipping_id: checkout.shipping.shipping_id,
            tax_id: checkout.tax.tax_id
          }
        },
        disableNtf: true
      })
    },
    async pay() {
      let res = await this.createOrder()
      let { token } = await createToken()
      await this.$_async_mutation({
        mutation: {
          path: this.$rest.STRIPE.CHARGE(),
          method: 'post',
          variables: {
            stripeToken: token.id,
            order_id: res.data.orderId,
            description: 'Order',
            currency: 'gbp',
            amount: Math.round(this.cart_total_amount * 100)
          }
        },
        done: res => {
          this.checkout.loading = false
          this.$emit('setTab', 3)
          this.$store.commit('cart/REMOVE_ALL')
        }
      })
    },
    async update() {
      let isValid = await this.$validator.validateAll(this.addressScope)
      if (!isValid) return
      this.addressLoading = true
      await this.$_async_mutation({
        mutation: {
          method: 'PUT',
          path: this.$rest.CUSTOMERS.UPDATE_ADDRESS(),
          variables: this.customer
        },
        done: res => {
          this.$store.commit('customer/SET_CUSTOMER', res)
        },
        doneNtf: res => ({
          message: `Your Address has updated successfully`
        })
      })
      this.addressLoading = false
    }
  }
}
</script>
