<template>
  <div class="flex justify-center md:justify-between mt-10">
    <div
      @click="decrementPage"
      class="flex justify-center my-8 md:my-0 md:w-auto items-center f-opensans"
    >
      <div class="home__pagination_nav_style mr-4 flex justify-center items-center">
        <i class="fas fa-chevron-left"></i>
      </div>
      <span v-if="!small_screen">Back</span>
    </div>
    <div class="md:w-auto my-8 md:my-0 justify-center">
      <b-pagination
        :total="total"
        :current.sync="pagination.current"
        :range-before="2"
        :range-after="2"
        :simple="false"
        :rounded="true"
        :per-page="9"
      ></b-pagination>
    </div>
    <div
      @click="incrementPage"
      class="flex justify-center my-8 md:my-0 md:w-auto items-center f-opensans"
    >
      <span v-if="!small_screen">Forward</span>
      <div class="home__pagination_nav_style ml-4 flex justify-center items-center">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'pagination-bar',
  props: {
    total: {
      type: Number
    },
    value: {
      type: Number
    }
  },
  data() {
    return {
      pagination: {
        current: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      small_screen: 'GET_SMALL_SCREEN'
    })
  },
  watch: {
    'pagination.current': {
      handler(page) {
        this.$emit('input', page)
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
