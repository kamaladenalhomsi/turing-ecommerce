<template>
  <div>
    Hello From LAyout
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  async created () {
    // console.log(axios, "axios")
    // this.$_async_query({
    //   query: {
    //     path: 'categories',
    //     params: {
    //       page: 1,
    //       limit: 5
    //     }
    //   },
    //   done: res => {
    //   }
    // })
    let data = await this.$_async_mutation({
      mutation: {
        path: '/orders',
        method: 'post',
      },
      unauthorized: res => {
        console.log(res, "rwe")
      }
    })
  }
}
</script>
