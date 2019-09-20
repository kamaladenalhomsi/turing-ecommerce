<template>
  <b-modal class="cart-modal" ref="modal" :active.sync="active" @close="$emit('close')">
    <div class="flex justify-center">
      <div class="cart-modal__wrapper">
        <div class="w-10/12 mx-auto h-full">
          <div class="flex justify-between">
            <div class="flex">
              <h1
                class="cart-modal__title text-center c-black font-bold f-Montserrat"
              >{{ modalTitle }}</h1>
            </div>
            <i class="fa fa-times cart-modal__close" @click="$emit('close')"></i>
          </div>
          <section class="h-full" v-if="!checkout.active">
            <b-tabs v-model="activeTab" class="cart-modal__tabs h-full">
              <b-tab-item label="Cart">
                <cart-table
                  :items="cartItems"
                  @updateQuantity="updateQuantity"
                  @removeCartItem="removeCartItem"
                  model="cart"
                ></cart-table>
              </b-tab-item>
              <b-tab-item label="Saved">
                <cart-table
                  :items="cart_saved"
                  @update="$store.dispatch('cart/getCartItems', cart_id)"
                  model="save"
                ></cart-table>
              </b-tab-item>
            </b-tabs>
          </section>
          <checkout
            ref="checkout"
            :regions="regions"
            :taxes="taxes"
            @closeModal="$emit('close'), checkout.active = false, checkout.tab = 0"
            @setTab="setTab"
            :tab="checkout.tab"
            v-else
          ></checkout>
        </div>
        <div class="cart-modal__footer mt-8">
          <div
            v-if="!checkout.active"
            class="w-10/12 h-full mx-auto md:flex-row flex-col-reverse flex-wrap md:flex-no-wrap flex items-center"
          >
            <div class="w-full py-4 md:w-1/2 flex justify-center md:justify-start">
              <custom-button
                size="large"
                type="filled-white"
                @click.native="$emit('close')"
              >Back to shop</custom-button>
            </div>
            <div
              class="w-full md:w-1/2 flex pt-4 justify-center md:justify-end"
              v-if="cart_count > 0 && activeTab === 0"
            >
              <confirm
                nm="deleteAllCart"
                title="Delete Cart"
                message="Are you sure you want to delete all items in your cart ?"
                cancelText="Cancel"
                confirmText="Yes, Delete"
                type="is-danger"
                @accept="removeAllCart"
              >
                <custom-button size="large" type="outlined-fuchsia">Delete All</custom-button>
              </confirm>
              <custom-button
                nm="openCheckout"
                size="large"
                type="filled-fuchsia"
                class="ml-4"
                @click.native="openCheckout"
              >Checkout</custom-button>
            </div>
          </div>
          <div v-else class="w-10/12 cart-modal__next_back h-full mx-auto flex items-center">
            <div class="w-full md:w-1/2 flex justify-start" v-if="checkout.tab !== 3">
              <custom-button size="large" type="filled-white" @click.native="backButton">Back</custom-button>
            </div>
            <div class="w-full md:w-1/2 flex justify-end" v-if="cart_count > 0 && activeTab === 0">
              <custom-button
                v-if="checkout.tab < 2"
                size="large"
                type="filled-fuchsia"
                class="ml-0 md:ml-4"
                @click.native="nextButton"
                nm="checkoutNext"
              >Next</custom-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<style lang="scss">
.cart-modal {
  .modal-content {
    max-width: 1200px !important
  }
  .tab-content, .tab-item {
    height: 94%;
  }
}

</style>

<style lang="scss" scoped>
.cart-modal {
  &__next_back {
    min-height: 90px
  }
  &__wrapper {
    position: relative;
    background-color: #ffffff;
    min-width: 1000px;
    min-height: 550px;
    box-shadow: 0px 20px 40px rgba(0,0,0, 0.3);
    padding: 30px 0px 130px 0px;
  }
  &__title {
    color: #2E2E2E;
    font-size: 24px
  }
  &__close {
    cursor: pointer;
    text-align: right;
    font-size: 30px;
  }
  &__footer {
    width: 100%;
    min-height: 90px;
    background-color: #EFEFEF;
    position: absolute;
    bottom: 0;
  }
}

</style>

<script>
import { mapGetters } from 'vuex'
import CartTable from './CartTable.vue'
import EventBus from '@/eventBus'
const Checkout = () => import(/* webpackPrefetch: true */'./Checkout.vue')

export default {
  name: 'cart',
  components: {
    CartTable,
    Checkout
  },
  props: {
    active: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      activeTab: 0,
      checkout: {
        active: false,
        tab: 0
      },
      regions: [],
      taxes: []
    }
  },
  created() {
    // If logged
    if (this.is_loggedin) {
      // Fetch Cart Items
      this.$store.dispatch('cart/getCartItems', this.cart_id)
      // Fetch Saved Items
      this.$store.dispatch('cart/getSavedItems', this.cart_id)
    }
  },
  mounted() {
    /**
     * Close event
     */
    this.$refs.modal.close = () => {
      this.$emit('close')
    }
    this.$once('fetchCheckoutData', () => {
      this.getShippingRegions()
      this.getAllTaxes()
      this.$store.dispatch('cart/getTotalAmount', {
        cart_id: this.cart_id
      })
    })
  },
  watch: {
    'checkout.active': {
      handler(val) {
        if (val) {
          this.$emit('fetchCheckoutData')
        }
      }
    }
  },
  methods: {
    openCheckout() {
      const { is_loggedin, checkout } = this
      if (is_loggedin) {
        checkout.active = true
      } else {
        EventBus.$emit('openLogin')
      }
    },
    async nextButton() {
      const { checkout } = this
      let { vaild, address } = await this.$refs.checkout.validateAll()
      if (vaild) {
        if (address) this.$refs.checkout.update()
        checkout.tab++
      }
    },
    backButton() {
      const { checkout } = this
      if (checkout.tab === 0) checkout.active = false
      else checkout.tab--
    },
    setTab(tab) {
      this.$set(this.checkout, 'tab', tab)
    },
    setActiveTab() {
      if (this.activeTab === 1) this.activeTab = 0
      else this.activeTab = 1
    },
    async removeCartItem(id, index) {
      this.$store.commit('cart/DELETE_CART_ITEM', index)
      await this.$_async_mutation({
        mutation: {
          path: this.$rest.SHOPPING_CART.DELETE_PRODUCT(id),
          method: 'delete'
        },
        done: res => {
          this.$store.dispatch('cart/getTotalAmount', {
            cart_id: this.cart_id
          })
        },
        doneNtf: res => ({
          message: 'Item has deleted successfully'
        })
      })
    },
    async updateQuantity(item) {
      const { item_id, quantity } = item
      await this.$_async_mutation({
        mutation: {
          method: 'put',
          path: this.$rest.SHOPPING_CART.UPDATE_ITEM(item_id),
          variables: {
            item_id,
            quantity
          }
        },
        done: res => {
          this.$store.dispatch('cart/getTotalAmount', {
            cart_id: this.cart_id
          })
        },
        disableNtf: true
      })
    },
    async removeAllCart() {
      await this.$_async_mutation({
        mutation: {
          method: 'delete',
          path: this.$rest.SHOPPING_CART.EMPTY_CART(this.cart_id)
        },
        done: res => {
          this.$store.dispatch('cart/getTotalAmount', {
            cart_id: this.cart_id
          })
        }
      })
      this.$store.commit('cart/REMOVE_ALL')
    },
    async getShippingRegions() {
      await this.$_async_query({
        query: {
          path: this.$rest.SHIPPING.REGIONS()
        },
        done: res => {
          this.regions = res
          this.regions.forEach(async (region, index) => {
            await this.$_async_query({
              query: {
                path: this.$rest.SHIPPING.SINGLE_REGION(region.shipping_region_id)
              },
              done: res => {
                this.$set(this.regions[index], 'types', res)
              }
            })
          })
        }
      })
    },
    async getAllTaxes() {
      await this.$_async_query({
        query: {
          path: this.$rest.TAX.ALL()
        },
        done: res => {
          this.taxes = res
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      cart_id: 'cart/GET_CART_ID',
      cartItems: 'cart/GET_CART_ITEMS',
      cart_count: 'cart/GET_CART_COUNT',
      cart_saved: 'cart/GET_CART_SAVED',
      saved_count: 'cart/GET_SAVED_COUNT',
      is_loggedin: 'customer/GET_IS_LOGGEDIN'
    }),
    modalTitle() {
      const { activeTab, checkout, cart_count, saved_count } = this
      if (!checkout.active) {
        if (activeTab === 0) {
          return `${cart_count} Items In Your Cart`
        } else {
          return `${saved_count} Items In Your Saved list`
        }
      } else {
        return 'Checkout'
      }
    }
  }
}
</script>
