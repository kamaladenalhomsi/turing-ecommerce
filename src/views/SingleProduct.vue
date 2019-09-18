<template>
  <div class="container py-10">
    <div class="single-product">
      <div class="w-full flex product-wrapper" nm="product-wrapper">
        <div class="w-1/2 single-product__gallery">
          <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide class="flex justify-center items-center">
              <div class="single-product__gallery__img">
                <lazyload-image v-if="product.image" :src="$_compose_img_url(product.image)" />
              </div>
            </swiper-slide>
            <swiper-slide class="flex justify-center items-center">
              <div class="single-product__gallery__img">
                <lazyload-image v-if="product.image_2" :src="$_compose_img_url(product.image_2)" />
              </div>
            </swiper-slide>
            <swiper-slide class="flex justify-center items-center">
              <div class="single-product__gallery__img">
                <lazyload-image
                  v-if="product.thumbnail"
                  :src="$_compose_img_url(product.thumbnail)"
                />
              </div>
            </swiper-slide>
          </swiper>
          <!-- swiper2 Thumbs -->
          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide class="flex justify-center items-center">
              <div class="single-product__gallery__img">
                <lazyload-image v-if="product.image" :src="$_compose_img_url(product.image)" />
              </div>
            </swiper-slide>
            <swiper-slide class="flex justify-center items-center">
              <div class="single-product__gallery__img">
                <lazyload-image v-if="product.image_2" :src="$_compose_img_url(product.image_2)" />
              </div>
            </swiper-slide>
            <swiper-slide class="flex justify-center items-center">
              <div class="single-product__gallery__img">
                <lazyload-image
                  v-if="product.thumbnail"
                  :src="$_compose_img_url(product.thumbnail)"
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="w-1/2 pl-10">
          <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
            <ul>
              <li class="breadcrumb__item">
                <router-link
                  v-if="Object.keys(productLocation).length > 0"
                  :to="{name: 'home',
                        query: {dep: JSON.stringify(
                        {
                          department_id: productLocation.department_id,
                          name: productLocation.department_name
                        }
                      ),
                  }}"
                >{{ productLocation.department_name }}</router-link>
              </li>
              <li>
                <router-link
                  :to="{name: 'home',
                        query: {cat: JSON.stringify(
                        {
                          category_id: productLocation.category_id,
                          name: productLocation.category_name
                        }
                      )
                  }}"
                >{{ productLocation.category_name }}</router-link>
              </li>
            </ul>
          </nav>
          <h1
            nm="singleProductName"
            class="single-product__name f-montserrat font-bold mb-4"
            v-if="product.name"
          >{{ product.name }}</h1>
          <div class="w-40" v-else>
            <content-loader
              :height="30"
              :width="200"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <rect x="1.69" y="1.67" rx="0" ry="0" width="199" height="29" />
            </content-loader>
          </div>
          <div class="flex">
            <h2
              class="font-bold f-montserrat"
              :class="{'line-through c-grey': product.discounted_price, 'c-fushia': !product.discounted_price}"
            >£{{ product.price }}</h2>
            <h2 class="ml-4 font-bold c-fushia f-montserrat">£{{ product.discounted_price }}</h2>
          </div>
          <color-attributes
            class="mt-8"
            :title="attributes[0] ? attributes[0].name: ''"
            :items="attributes[0] ? attributes[0].items : []"
            v-model="product.color"
          ></color-attributes>
          <size-attributes
            class="mt-8"
            :title="attributes[1] ? attributes[1].name: ''"
            :items="attributes[1] ? attributes[1].items : []"
            v-model="product.size"
          ></size-attributes>
          <h4 class="f-montserrat font-bold attrs-sidebar__attrs__section__title mt-8">Quantity</h4>
          <div class="w-40 mt-6">
            <b-field>
              <b-numberinput v-model="addedQuantity" class="quantity-input" controls-rounded></b-numberinput>
            </b-field>
          </div>
          <div class="mt-10">
            <custom-button
              class="single-product__button"
              @click.native="addToCart"
              type="filled-fuchsia"
              nm="addToCart"
            >Add to cart</custom-button>
          </div>
        </div>
      </div>
      <div class="reviews">
        <div class="container reviews__container">
          <div class="reviews-add mt-10">
            <h1 class="font-bold f-montserrat c-black">Add a Review</h1>
            <div class="flex mt-10">
              <div class="w-1/3">
                <h3>Your Review</h3>
              </div>
              <div class="w-3/4">
                <b-field>
                  <b-input
                    v-model="newReview.review"
                    class="reviews-add__input"
                    maxlength="200"
                    type="textarea"
                    nm="reviewText"
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="flex mt-5">
              <div class="w-1/3">
                <h3>Over Rating</h3>
              </div>
              <div class="w-3/4">
                <star-rating
                  :star-size="30"
                  :rating="0"
                  v-model="newReview.rating"
                  :max-rating="5"
                  inactive-color="#EEE"
                  active-color="#FFC94F"
                  :show-rating="false"
                  nm="reviewRate"
                ></star-rating>
              </div>
            </div>
            <custom-button
              @click.native="submitReview"
              class="mt-8"
              type="filled-fuchsia"
              size="large"
              nm="reviewSubmitButton"
            >Submit</custom-button>
          </div>
          <h1 class="font-bold f-montserrat c-black mt-20">Product reviews</h1>
          <div class="reviews_wrapper">
            <review v-for="(review, index) in reviews" :review="review" :key="index"></review>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.single-product {
  .product-wrapper {
    background-color: $docColorWhite;
    padding: 30px 0px;
  }
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.20);
  &__gallery {
    height: 600px;
    &__img {
      width: 300px;
      height: 300px
    }
    &__main_slide {
      background-repeat: no-repeat
    }
  }
  &__name {
    color: $typoColorBlack
  }
  &__button {
    height: 60px;
    border-radius: 40px;
    padding-left: 50px !important;
    padding-right: 50px !important;
  }
}

.reviews {
  background-color: #fafafa;
  padding: 50px 0px;
  &__container {
    width: 80%
  }
  .reviews-add {
    &__input {
      textarea {
        border: 2px solid #E1E1E1
      }
    }
  }
}

.breadcrumb {
  &__item {
    min-width: 73px
    svg {
      width: 100%
    }
  }
}

@import 'swiper/dist/css/swiper.css';

.gallery-top {
  height: 80%!important;
  width: 100%;
}
.gallery-thumbs {
  height: 20%!important;
  box-sizing: border-box;
  padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import SizeAttributes from '@/components/Home/Sidebar/SizeAttributes'
import ColorAttributes from '@/components/Home/Sidebar/ColorAttributes'
import Review from '@/components/SingleProduct/Review.vue'
import StarRating from 'vue-star-rating'
import EventBus from '@/eventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'single-product',
  props: ['id'],
  components: {
    swiper,
    swiperSlide,
    SizeAttributes,
    ColorAttributes,
    Review,
    StarRating
  },
  created() {
    this.getSingle()
    this.getAttributes()
    this.getLocation()
    this.getReviews()
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  data() {
    return {
      product: {},
      reviews: [{}, {}, {}, {}, {}],
      newReview: {
        rating: 0
      },
      productLocation: {},
      attributes: [],
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      },
      addedQuantity: 1
    }
  },
  computed: {
    ...mapGetters({
      is_loggedin: 'customer/GET_IS_LOGGEDIN',
      cart_id: 'cart/GET_CART_ID'
    })
  },
  methods: {
    async getSingle() {
      await this.$_async_query({
        query: {
          path: this.$rest.PRODUCTS.SINGLE(this.id)
        },
        done: res => {
          this.product = res
        }
      })
    },
    async getLocation() {
      await this.$_async_query({
        query: {
          path: this.$rest.PRODUCTS.LOCATIONS(this.id)
        },
        done: res => {
          this.productLocation = res[0]
        }
      })
    },
    async getReviews() {
      await this.$_async_query({
        query: {
          path: this.$rest.PRODUCTS.REVIEWS.ALL(this.id)
        },
        done: res => {
          this.reviews = res
        }
      })
    },
    async getAttributes() {
      await this.$_async_query({
        query: {
          path: this.$rest.ATTRIBUTES.IN_PRODUCT(this.id)
        },
        done: res => {
          let classfictedAttrs = []
          /**
           * Loop over the returend items to orgnaize them to match
           * size and color attributes components structure
           */
          res.forEach(e => {
            if (classfictedAttrs.length > 0) {
              let returnedGroup = classfictedAttrs.filter(group => {
                if (group.name === e.attribute_name)
                  return group
              })[0]
              if (returnedGroup) {
                returnedGroup.items.push({
                  attribute_value_id: e.attribute_value_id,
                  value: e.attribute_value
                })
              } else {
                classfictedAttrs.push({
                  name: e.attribute_name,
                  items: [
                    {
                      attribute_value_id: e.attribute_value_id,
                      value: e.attribute_value
                    }
                  ]
                })
              }
            } else {
              classfictedAttrs.push({
                name: e.attribute_name,
                items: [
                  {
                    attribute_value_id: e.attribute_value_id,
                    value: e.attribute_value
                  }
                ]
              })
            }
          })
          this.attributes = classfictedAttrs
        }
      })
    },
    async submitReview() {
      if (!this.is_loggedin) {
        EventBus.$emit('openLogin')
        return
      }
      const { rating, review } = this.newReview
      await this.$_async_mutation({
        mutation: {
          path: this.$rest.PRODUCTS.REVIEWS.ADD(this.id),
          method: 'post',
          variables: {
            rating,
            review
          }
        },
        done: res => {
          this.newReview.created_on = new Date(Date.now())
          this.newReview.name = this.$store.getters['customer/GET_CUSTOMER'].name
          this.reviews.unshift(this.newReview)
        }
      })
    },
    async addToCart() {
      const { cart_id, product, addedQuantity } = this
      await this.$_async_mutation({
        mutation: {
          path: this.$rest.SHOPPING_CART.ADD(),
          method: 'post',
          variables: {
            cart_id,
            product_id: product.product_id,
            attributes: `color: ${product.color || ''}, size: ${product.size || ''}`
          }
        },
        done: async res => {
          let item = res[res.length - 1]
          await this.$_async_mutation({
            mutation: {
              method: 'put',
              path: this.$rest.SHOPPING_CART.UPDATE_ITEM(item.item_id),
              variables: {
                item_id: item.item_id,
                quantity: addedQuantity
              }
            },
            done: updateRes => {
              item.quantity = addedQuantity
              this.$store.commit('cart/SET_CART_ITEMS', res)
            },
            disableNtf: true
          })
        },
        doneNtf: res => ({
          message: 'Item has been added to cart successfully!'
        })
      })
    }
  }
}
</script>
