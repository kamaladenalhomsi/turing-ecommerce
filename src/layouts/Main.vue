<template>
  <div>
    Hello From LAyout
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    this.$_async_query({
      query: {
        action: 'department/getAllDepartments'
      },
      done: res => {
        console.log(res, 'res')
      }
    })
  }
}
</script>
