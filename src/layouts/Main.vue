<template>
  <div>
    Hello From LAyout
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created () {
    // console.log(axios, "axios")
    this.$_async_query({
      query: {
        path: 'categories',
        params: {
          page: 1,
          limit: 5
        }
      },
      done: res => {
      }
    })
  }
}
</script>
