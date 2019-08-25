<template>
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
</template>

<script>
export default {
  name: 'pagination-bar',
  data() {
    return {
      pagination: {
        total: 300,
        current: 1
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
