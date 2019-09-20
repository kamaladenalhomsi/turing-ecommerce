<template>
  <div class="home">
    <div class="container">
      <!-- Pagination -->
      <pagination-bar
        ref="paginationBar"
        :total="products.total"
        v-model="products.pagination.currentPage"
      ></pagination-bar>
      <div class="flex md:flex-row flex-col-reverse flex-wrap md:flex-no-wrap mt-10">
        <!-- Attrubites Sidebar -->
        <div class="w-full md:w-1/3">
          <attrs-sidebar :attributes="attributes"></attrs-sidebar>
        </div>
        <!-- Cards -->
        <div v-if="!nullSearch" class="w-full mt-8 md:mt-0 md:w-3/4" nm="cardsWrapper">
          <div class="flex flex-wrap">
            <template v-if="products.rows.length > 0">
              <div
                class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
                v-for="(product, index) in products.rows"
                :key="product.product_id"
              >
                <shop-card @imgLoaded="setProductImgStatus(index)" :item="product"></shop-card>
              </div>
            </template>
            <template v-if="products.rows.length === 0">
              <div
                v-for="i in products.pagination.limit"
                :key="i"
                class="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
              >
                <ContentLoader
                  primaryColor="#e4e4e4"
                  secondaryColor="#ecebeb"
                  :width="250"
                  :height="300"
                >
                  <rect x="70.69" y="247.67" rx="3" ry="3" width="114" height="13.82" />
                  <rect x="25.69" y="218.67" rx="3" ry="3" width="205.2" height="13.82" />
                  <rect x="19.69" y="12.67" rx="0" ry="0" width="209.09" height="182.04" />
                </ContentLoader>
              </div>
            </template>
          </div>
        </div>
        <h2 class="null-search items-center flex justify-center w-full md:w-3/4" v-if="nullSearch">
          Your search
          <span class="mx-4">"{{ searchWord.query_string }}"</span> does not match any product
        </h2>
      </div>
      <!-- Arrival Block -->
      <div class="mt-10">
        <div class="welcome-sction flex justify-center items-center c-white">
          <div>
            <h1 class="w-full text-center h-full text-5xl f-playFair">New Arrival</h1>
            <h2 class="font-bold w-full h-full text-center f-playFair">Be the first</h2>
            <div class="flex justify-center mt-8">
              <custom-button class="welcome-sction__btn" type="filled-white" size="large">View All</custom-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- NewsLetter -->
    <div class="newsletter mt-20">
      <div class="container w-11/12 md:w-auto">
        <div class="flex flex-wrap items-center newsletter__wrapper">
          <div class="w-full mt-4 md:mt-0 md:w-1/2">
            <h3
              class="c-white f-montserrat font-bold"
            >SUBSCRIBE FOR SHOP NEWS, UPDATES AND SPECIAL OFFERS</h3>
          </div>
          <div class="w-full my-4 md:my-0 md:w-1/2 flex justify-between items-center">
            <b-field class="mb-0-important w-9/12">
              <b-input class="rounded-input" placeholder="Your e-mail here" icon="envelope" rounded></b-input>
            </b-field>
            <custom-button class="newsletter__btn ml-2" type="filled-white">Subscribe</custom-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}

.pagination-previous, .pagination-next {
  display: none !important;
}
.home {
  &__pagination_nav_style {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: $paginationNavColor;
    border-radius: 50%;
    display: flex;
    @extend .transition;
    &:hover {
      background-color: $docColorFuchsia;
      color: $typeColorWhite
    }
  }
}

.pagination-link {
  font-weight: bold;
}

.newsletter {
  width: 100%;
  background-color: $docColorFuchsia;
  &__wrapper {
    min-height: 72px;
  }

  &__btn {
    padding: 0px 20px !important;
    height: 45px;
    border-radius: 30px;
  }
}

.welcome-sction {
  background-image: url('../assets/images/images-art.jpeg');
  min-height: 300px;
  background-repeat: no-repeat;
  width: 100%;
  background-size: cover;
  &__btn {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
}

.mb-0-important {
  margin-bottom: 0px !important;
}

.null-search {
  color: $docColorYellow;
  span {
    color: $typoColorBlack;
  }
}

</style>

<script>

import ShopCard from '@/components/Home/ShopCard.vue'
import AttrsSidebar from '@/components/Home/AttrsSidebar.vue'
import PaginationBar from '@/components/Home/PaginationBar.vue'
import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    ShopCard,
    AttrsSidebar,
    PaginationBar,
    ContentLoader
  },
  data() {
    return {
      products: {
        rows: [],
        total: 0,
        pagination: {
          currentPage: 1,
          limit: 9
        }
      },
      attributes: [],
      shopCardData: {
        name: 'Pull & Bear Jumper In Textured Knit In Blue',
        price: '£14.99'
      },
      nullSearch: false
    }
  },
  watch: {
    'products.pagination.currentPage': {
      handler() {
        if (this.searchWord.query_string)
          this.fetchProducts(this.searchWord)
        else
          this.fetchProducts()
      }
    },
    choosedCategory: {
      handler() {
        this.fetchProducts()
      }
    },
    choosedDepartment: {
      handler() {
        this.fetchProducts()
      }
    },
    searchWord: {
      handler(val) {
        if (val) {
          this.nullSearch = false
          this.$refs.paginationBar.pagination.current = 1
          this.fetchProducts(val)
        }
      }
    }
  },
  created() {
    const { query } = this.$route
    if (query) {
      if (query.dep || query.cat) {
        this.fetchUrl = query
      }
    }
    this.getAllAttributes()
    this.fetchProducts()
  },
  computed: {
    ...mapGetters({
      choosedCategory: 'product/GET_CHOOSED_CATEGROY',
      choosedDepartment: 'product/GET_CHOOSED_DEPARTMENT',
      searchWord: 'product/GET_SEARCH_WORD'
    }),
    fetchUrl: {
      get() {
        let url = `/products`
        const { choosedCategory, choosedDepartment } = this
        if (Object.keys(choosedCategory).length > 0)
          url = this.$rest.PRODUCTS.IN_CATEGORY(choosedCategory.category_id)
        if (Object.keys(choosedDepartment).length > 0)
          url = this.$rest.PRODUCTS.IN_DEPARTMENT(choosedDepartment.department_id)
        return url
      },
      set(value) {
        if (value.dep) {
          let parsed = JSON.parse(value.dep)
          this.$store.commit('product/PUSH_DEPARTMENT', parsed)
        }
        if (value.cat) {
          let parsed = JSON.parse(value.cat)
          this.$store.commit('product/PUSH_CATEGORY', parsed)
        }
      }
    }
  },
  methods: {
    setProductImgStatus(i) {
      this.$set(this.products.rows[i], 'loaded', true)
    },
    // Fetch All Attributes*
    async getAllAttributes() {
      await this.$_async_query({
        query: {
          path: this.$rest.ATTRIBUTES.ALL()
        },
        done: res => {
          this.$set(this, 'attributes', res)
          // Fetch All Attributes values
          this.attributes.forEach(async attr => {
            await this.$_async_query({
              query: {
                path: this.$rest.ATTRIBUTES.VALUES(attr.attribute_id)
              },
              done: res => {
                this.$set(attr, 'items', res)
              }
            })
          })
        }
      })
    },
    async fetchProducts(searchWord = {}) {
      this.products.rows = []
      await this.$_async_query({
        query: {
          path: searchWord.query_string ? this.$rest.PRODUCTS.SEARCH() : this.fetchUrl,
          params: {
            ...searchWord,
            page: this.products.pagination.currentPage,
            limit: this.products.pagination.limit
          }
        },
        done: res => {
          this.nullSearch = false
          this.$set(this.products, 'rows', res.rows)
          this.$set(this.products, 'total', res.count)
        },
        nullResult: res => {
          if (this.searchWord.query_string)
            this.nullSearch = true
        }
      })
    }
  }
}
</script>
