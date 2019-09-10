<template>
  <div class="container py-10">
    <div class="single-product">
      <div class="w-full flex product-wrapper">
        <div class="w-1/2 single-product__gallery">
          <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide class="flex justify-center items-center">
              <img :src="$_compose_img_url(product.image)" alt />
            </swiper-slide>
            <swiper-slide class="flex justify-center items-center">
              <img :src="$_compose_img_url(product.image_2)" alt />
            </swiper-slide>
            <swiper-slide class="flex justify-center items-center">
              <img :src="$_compose_img_url(product.thumbnail)" alt />
            </swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          </swiper>
          <!-- swiper2 Thumbs -->
          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide class="flex justify-center items-center">
              <img :src="$_compose_img_url(product.image)" alt />
            </swiper-slide>
            <swiper-slide class="flex justify-center items-center">
              <img :src="$_compose_img_url(product.image_2)" alt />
            </swiper-slide>
            <swiper-slide class="flex justify-center items-center">
              <img :src="$_compose_img_url(product.thumbnail)" alt />
            </swiper-slide>
          </swiper>
        </div>
        <div class="w-1/2 pl-10">
          <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
            <ul>
              <li>
                <a href="#">Bulma</a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">Components</a>
              </li>
              <li class="is-active">
                <a href="#" aria-current="page">Breadcrumb</a>
              </li>
            </ul>
          </nav>
          <h1 class="single-product__name f-montserrat font-bold mb-4">{{ product.name }}</h1>
          <h2 class="font-bold c-fushia f-montserrat">£13.99</h2>
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
              <b-numberinput class="single-product__quantity" controls-rounded></b-numberinput>
            </b-field>
          </div>
          <div class="mt-10">
            <custom-button class="single-product__button" type="filled-fuchsia">Add to cart</custom-button>
            <custom-button
              class="single-product__button ml-4"
              type="filled-white"
              icon="far fa-heart"
            >Add to wish list</custom-button>
          </div>
        </div>
      </div>
      <div class="reviews">
        <div class="container reviews__container">
          <h1 class="font-bold f-montserrat c-black">Product reviews</h1>
          <div class="reviews_wrapper">
            <review></review>
          </div>
          <div class="reviews-add mt-10">
            <h1 class="font-bold f-montserrat c-black">Add a Review</h1>
            <div class="flex mt-10">
              <div class="w-1/3">
                <h3>Your Review</h3>
              </div>
              <div class="w-3/4">
                <b-field>
                  <b-input class="reviews-add__input" maxlength="200" type="textarea"></b-input>
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
                  :rating="5"
                  inactive-color="#EEE"
                  active-color="#FFC94F"
                  :show-rating="false"
                ></star-rating>
              </div>
            </div>
            <custom-button class="mt-8" type="filled-fuchsia" size="large">Submit</custom-button>
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
    &__main_slide {
      background-repeat: no-repeat
    }
  }
  &__name {
    color: $typoColorBlack
  }
  &__quantity {
    .icon {
      i {
        font-size: 14px
      }
    }
    input {
      border-radius: 20px;
      border: 2px solid #E1E1E1;
    }
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
export default {
  name: 'single-product',
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
      }
    }
  },
  methods: {
    async getSingle() {
      await this.$_async_query({
        query: {
          path: this.$rest.PRODUCTS.SINGLE(this.$route.params.id)
        },
        done: res => {
          this.product = res
        }
      })
    },
    async getAttributes() {
      await this.$_async_query({
        query: {
          path: this.$rest.ATTRIBUTES.IN_PRODUCT(this.$route.params.id)
        },
        done: res => {
          console.log(res, 'res')
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
    }
  }
}
</script>
