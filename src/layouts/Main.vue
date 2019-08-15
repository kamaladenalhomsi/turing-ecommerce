<template>
  <div>
    Hello From LAyout
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('department/getAllDepartments')
  }
}
</script>
