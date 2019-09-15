<template>
  <div class="h-full">
    <b-table :mobile-cards="true" class="cart-table" :data="items" v-if="items.length > 0">
      <template slot-scope="props">
        <b-table-column field="item" label="Item">
          <div class="flex cart-table__item">
            <div class="cart-table__item__img" v-if="model === 'cart'">
              <lazyload-image :src="$_compose_img_url(props.row.image)"></lazyload-image>
            </div>
            <div class="cart-table__item__details mt-2 ml-4">
              <h4 class="c-black f-playFair font-bold">{{ props.row.name }}</h4>
              <h4 class="c-grey mt-1">{{ props.row.attributes }}</h4>
              <confirm
                v-if="model === 'cart'"
                title="Deleting Item"
                message="Are you sure you want to delete this item ?"
                type="is-danger"
                confirmText="Delete item"
                cancelText="Cancel"
                @accept="$emit('removeCartItem', props.row.item_id, props.index)"
              >
                <p class="c-grey cursor-pointer">
                  <i class="fa fa-times mt-1 c-fushia mr-1"></i> Remove
                </p>
              </confirm>
            </div>
          </div>
        </b-table-column>
        <b-table-column
          v-if="model === 'cart'"
          field="quantity"
          label="Quantity"
          class="align-middle"
        >
          <b-numberinput
            v-model="props.row.quantity"
            class="quantity-input cart-table__quantity"
            controls-rounded
            @input="$emit('updateQuantity', props.row)"
          ></b-numberinput>
        </b-table-column>
        <b-table-column field="unitPrice" label="Unit Price" class="align-middle">
          <div class="flex items-center">
            <span class="font-bold c-black f-montserrat">£{{ props.row.price }}</span>
          </div>
        </b-table-column>
        <b-table-column
          v-if="model === 'cart'"
          field="subtotal"
          label="Total Price"
          class="align-middle"
        >
          <div class="flex items-center">
            <span class="font-bold c-black text-2xl f-montserrat">£{{ props.row.subtotal }}</span>
          </div>
        </b-table-column>
        <b-table-column
          field="saveForLater"
          :label="model === 'cart' ? 'Save For Later' : 'Move to Cart'"
          class="align-middle"
        >
          <div class="flex items-center">
            <custom-button
              v-if="model === 'cart'"
              type="outlined-fuchsia"
              @click.native="saveForLater(props.row.item_id, props.index)"
            >Save</custom-button>
            <custom-button
              v-if="model === 'save'"
              type="outlined-fuchsia"
              @click.native="moveToCart(props.row.item_id, props.index)"
            >Move</custom-button>
          </div>
        </b-table-column>
      </template>
    </b-table>
    <div class="flex justify-center items-center h-full" v-else>
      <h1 class="font-bold c-black f-montserrat">YOUR {{ model.toUpperCase() }} IS EMPTY!</h1>
    </div>
  </div>
</template>

<style lang="scss">
.cart-table {
  &__table {
    .th-wrap {
      color: $typeColorLightGray;
      margin-bottom: 5px
    }
  }
}
</style>

<style lang="scss" scoped>
.cart-table {
  &__item {
    &__img {
      width: 100px;
      height: 100px;
      border: 2px solid #E5E5E5;
      padding: 8px
    }
  }
  &__quantity {
    width: 180px
  }
}

</style>

<script>
export default {
  name: 'cart-table',
  props: {
    items: {
      type: Array
    },
    model: {
      type: String,
      required: true
    }
  },
  methods: {
    async saveForLater(item_id, index) {
      await this.$_async_mutation({
        mutation: {
          method: 'get',
          path: this.$rest.SHOPPING_CART.SAVE_FOR_LATER(item_id)
        },
        done: res => {
          this.$store.commit('cart/SAVE_ITEM_FOR_LATER', index)
        }
      })
    },
    async moveToCart(item_id, index) {
      await this.$_async_mutation({
        mutation: {
          method: 'get',
          path: this.$rest.SHOPPING_CART.MOVE_TO_CART(item_id)
        },
        done: res => {
          this.$store.commit('cart/MOVE_TO_CART', index)
          this.$emit('update')
        }
      })
    }
  }
}
</script>
