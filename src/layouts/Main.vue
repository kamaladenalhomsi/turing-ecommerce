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
    await this.$_async_mutation({
      mutation: {
        path: '/customers/login',
        method: 'post',
        variables: {
          email: 'Arabyd@alhumsi.com',
          password: '12345s6'
        }
      },
      doneNtf: {
        message: 'user has Logged in sucessfully!'
      },
      badRequestNtf: {
      },
      badRequest: res => {
        console.log(res)
      },
      unauthorized: res => {
        console.log(res, 'rwe')
      }
    })
  }
}
</script>
