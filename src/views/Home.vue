<template>
  <div class="home">
    <div class="container">
      <div class="md:flex md:justify-between mt-10">
        <div
          @click="decrementPage"
          class="flex w-full justify-center my-8 md:my-0 md:w-auto items-center f-opensans"
        >
          <div class="home__pagination_nav_style mr-4 flex justify-center items-center">
            <i class="fas fa-chevron-left"></i>
          </div>Back
        </div>
        <div class="w-full md:w-auto my-8 md:my-0 justify-center">
          <b-pagination
            :total="pagination.total"
            :current.sync="pagination.current"
            :range-before="2"
            :range-after="2"
            :simple="false"
            :rounded="true"
            :per-page="5"
          ></b-pagination>
        </div>
        <div
          @click="incrementPage"
          class="flex w-full justify-center my-8 md:my-0 md:w-auto items-center f-opensans"
        >
          Forward
          <div class="home__pagination_nav_style ml-4 flex justify-center items-center">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
      <div class="flex mt-20">
        <div class="w-1/3"></div>
        <div class="w-3/4">
          <div class="flex flex-wrap">
            <div class="w-1/2 lg:w-1/3 px-2 mb-10" v-for="i in 9" :key="i">
              <shop-card :item="shopCardData"></shop-card>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <div class="welcome-sction flex justify-center items-center c-white">
          <div>
            <h1 class="w-full text-center h-full text-5xl f-playFair">New Arrival</h1>
            <h2 class="font-bold w-full h-full text-center f-playFair">Be the first</h2>
            <div class="flex justify-center mt-8">
              <b-button class="welcome-sction__btn m-is-filled-white btn-size-large">View All</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
              <b-input
                class="newsletter__input"
                placeholder="Your e-mail here"
                icon="envelope"
                rounded
              ></b-input>
            </b-field>
            <b-button class="newsletter__btn m-is-filled-white">Subscribe</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.newsletter {
  width: 100%;
  background-color: $docColorFuchsia;
  &__wrapper {
    min-height: 72px;
  }
  &__input {
    input {
      padding-left: 50px !important;
    }
    span {
      padding-left: 15px;
    }
  }
  &__btn {
    padding: 0px 20px !important;
    height: 45px;
    border-radius: 30px;
  }
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
    transition: 0.3s;
    &:hover {
      background-color: $docColorFuchsia;
      color: $typeColorWhite
    }
  }
}

.pagination-link {
  font-weight: bold;
}

.welcome-sction {
  background-image: url('../assets/images/images-art.png');
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

</style>

<script>

import ShopCard from '@/components/Home/ShopCard.vue'
export default {
  name: 'home',
  components: {
    ShopCard
  },
  data() {
    return {
      pagination: {
        total: 300,
        current: 1
      },
      shopCardData: {
        name: 'Pull & Bear Jumper In Textured Knit In Blue',
        price: '£14.99',
        thumbnail: require('../assets/images/images-shirt13.png')
      }
    }
  },
  methods: {
    incrementPage () {
      this.pagination.current++
    },
    decrementPage () {
      this.pagination.current--
    }
  }
}
</script>
